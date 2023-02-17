import React, { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../firebaseConfig";
import fireb from "firebase/compat";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../core/utils/AxiosInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountryDropdown from "../components/CountryDropdownComponent";
import { SIZES } from "../constants";
import { regexes } from "../core/utils/constants";
// ---------------------------------------------------------------------------------------------

const Login = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);

  // Component's Local States
  // ========================

  // completePhoneNumber state - Used to send mobile number to firebase's generate verification code api
  const [completePhoneNumber, setCompletePhoneNumber] = useState("");

  // mobileNumberWithoutCode state - Used to send mobile number to client's generate token api
  const [mobileNumberWithoutCode, setMobileNumberWithoutCode] =
    useState<any>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);
  const [disableVerificationBtn, setDisableVerificationBtn] = useState(true);
  const [disableConfirmVerificationBtn, setDisableConfirmVerificationBtn] =
    useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [counter, setCounter] = useState(30);

  // Enabling or Disabling Send Verification Code Button
  useEffect(() => {
    // According to Google Global Mobile Numbers must lies between 7 to 15 digits
    if (
      completePhoneNumber?.length > 0 &&
      !completePhoneNumber?.toString().includes("+91") &&
      (mobileNumberWithoutCode.length < 7 ||
        mobileNumberWithoutCode.length > 15)
    ) {
      // console.log("completePhoneNumber::: ", completePhoneNumber);
      // console.log(
      //   "!completePhoneNumber?.toString().includes('+91')::: ",
      //   !completePhoneNumber?.toString().includes("+91")
      // );
      // console.log("mobileNumberWithoutCode::: ", mobileNumberWithoutCode);

      setDisableVerificationBtn(true);
    } // For INDIA specific phone numbers
    else if (
      completePhoneNumber?.toString().includes("+91") &&
      mobileNumberWithoutCode.length != 10
    )
      setDisableVerificationBtn(true);
    else if (completePhoneNumber?.length === 0) setDisableVerificationBtn(true);
    else setDisableVerificationBtn(false);
  }, [mobileNumberWithoutCode, completePhoneNumber]);

  // Enabling or Disabling Confirm Verification Code Button
  useEffect(() => {
    // Verification code must contain 6 digits
    if (verificationCode && verificationCode.length === 6)
      setDisableConfirmVerificationBtn(false);
    else setDisableConfirmVerificationBtn(true);
  }, [verificationCode]);

  // -------------------------------------------------------------------------------------------

  // This method is used to send verification code from firebase.
  const sendVerification = async () => {
    if (
      mobileNumberWithoutCode?.length > 0 &&
      completePhoneNumber.toString().includes("+91") &&
      !regexes.indianMobileNumberRegex.test(mobileNumberWithoutCode)
    ) {
      toast.show("Please Enter Valid Indian Mobile Number", { type: "error" });
      return;
    }
    try {
      setShowLoader(true);
      const phoneProvider = new fireb.auth.PhoneAuthProvider();
      const verCode: any = await phoneProvider.verifyPhoneNumber(
        completePhoneNumber,
        recaptchaVerifier.current
      );
      // If Verification code received
      if (verCode) {
        setCounter(30);
        setShowLoader(false);
        setVerificationId(verCode);
        toast.show("Verification code sent successfully!", {
          type: "success",
        });
      }
    } catch (error: any) {
      setShowLoader(false);
      toast.show(
        error.message
          ? error.message
          : "Getting an error in sending verification code. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // This method is used to confirm verification code from firebase.
  const confirmCode = async () => {
    try {
      setShowLoader(true);
      const credential = fireb.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      if (credential) {
        const result = await fireb.auth().signInWithCredential(credential);
        // If Verification code matched from firebase
        if (result) {
          setVerificationCode(""); // Clear Verification Code Input box
          setVerificationId(null);
          setShowLoader(false);

          generateAuthenticationToken(); //Generating Authentication Token to proceed further
        }
      }
    } catch (error: any) {
      setShowLoader(false);
      toast.show(
        error.message
          ? error.message
          : "Getting an error in validating verification code. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // This method is used to generating authentication token using api
  const generateAuthenticationToken = async () => {
    try {
      setShowLoader(true);
      setVerificationCode("");

      // For "Content-Type": "multipart/form-data",
      const formData = new FormData();
      formData.append("contact", mobileNumberWithoutCode);

      const response = await instance.post("/generate_api_token", formData);
      if (response.status === 200 && response.data?.status === true) {
        const isNewUser = response.data?.is_new_user;
        const jwtToken = response.data?.token_id;
        const userDetails = response?.data.data;

        // console.log("isNewUser: ", isNewUser);
        // console.log("authentication-token: ", jwtToken);
        // console.log("userDetails: ", userDetails);

        //This method is used to save JWT Token in @react-native-async-storage/async-storage
        if (jwtToken) {
          await AsyncStorage.setItem("authentication-token", jwtToken);
          authContextData.setTokenAfterLogin(jwtToken);
        }
        setShowLoader(false);

        // Redirection of user based on below conditions:
        // ================================================
        // When user is not new
        // When we received contact number in api's response
        // when we don't received name or dob
        if (
          !isNewUser &&
          userDetails.contact.length > 0 &&
          (userDetails.name === "" ||
            // userDetails.email === "" || //Client Refused to add email check here
            userDetails.dob === "")
        ) {
          navigation.navigate("Register", { userDetails });
        }
        // Redirection of user based on below condition:
        // When user is new
        else if (isNewUser) navigation.navigate("Register", { userDetails });
        // Redirection of user based on below conditions:
        // When user is not new and when we received name, dob and contact in api's response
        else navigation.navigate("Main");
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error in generating authentication code. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      setShowLoader(false);
      toast.show(
        error.message
          ? error.message
          : "Getting an error in generating authentication code. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // Receiving Complete Mobile Number with and without country code respectively from CountryDropdown Component
  const getCompleteMobileNumber = (
    mobileNumberWithCountryCode: string,
    mobileNumberWithoutCountryCode: string
  ) => {
    if (mobileNumberWithCountryCode)
      setCompletePhoneNumber(mobileNumberWithCountryCode);
    if (mobileNumberWithoutCountryCode)
      setMobileNumberWithoutCode(mobileNumberWithoutCountryCode);
  };

  useEffect(() => {
    if (verificationId) {
      setDisableVerificationBtn(true);
      const timer: any =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        setDisableVerificationBtn(false);
      }
      return () => clearInterval(timer);
    }
  }, [counter, disableVerificationBtn, verificationId]);

  // -------------------------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text style={styles.otpText}>
          Let’s start{"\n"} Sign up with number
        </Text>
        {showLoader && <ActivityIndicator size={SIZES.width > 400 ? 40 : 20} />}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CountryDropdown getCompleteMobileNumber={getCompleteMobileNumber} />
        </View>
        <TouchableOpacity
          style={[
            styles.sendVerification,
            {
              opacity: disableVerificationBtn ? 0.5 : 1,
            },
          ]}
          onPress={sendVerification}
          disabled={disableVerificationBtn}
        >
          <Text
            disabled={disableVerificationBtn}
            style={[
              styles.buttonText,
              {
                opacity: disableVerificationBtn ? 0.5 : 1,
              },
            ]}
          >
            Send Verification
          </Text>
        </TouchableOpacity>

        {verificationId && (
          <>
            <View
              style={{
                margin: "5%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: SIZES.width > 400 ? 22 : 18,
                }}
              >
                Resend OTP in 00:{counter < 10 ? "0" + counter : counter} sec.
              </Text>
            </View>
            <TextInput
              placeholder="Confirm code"
              onChangeText={setVerificationCode}
              keyboardType="phone-pad"
              autoComplete="tel"
              style={styles.textInput}
              placeholderTextColor="rgba(255,255,255,0.6)"
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.sendCode}
              onPress={confirmCode}
              disabled={disableConfirmVerificationBtn}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    opacity: disableConfirmVerificationBtn ? 0.5 : 1,
                  },
                ]}
                disabled={disableConfirmVerificationBtn}
              >
                Confirm Verification
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;
// ==================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#705ECF",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: SIZES.width > 400 ? 25 : 18,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },

  sendVerification: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sendCode: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    lineHeight: 50,
    justifyContent: "center",
    position: "relative",
    paddingStart: 10,
    paddingEnd: 10,
    height: 50,
    color: "#705ECF",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
  },
  otpText: {
    position: "relative",
    width: "90%",
    height: "auto",
    marginBottom: 150,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

// =============================================== THE END =====================================================
