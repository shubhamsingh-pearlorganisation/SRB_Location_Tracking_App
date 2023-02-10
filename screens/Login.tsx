import React, { useRef, useState, useEffect } from "react";
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
import CountryDropdown from "../components/CountryDropdown";
// ---------------------------------------------------------------------------------------------

const Login = ({ navigation }: any) => {
  const toast = useToast();

  // Component's Local States
  const [completePhoneNumber, setCompletePhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);
  const [disableVerificationBtn, setDisableVerificationBtn] = useState(true);
  const [disableConfirmVerificationBtn, setDisableConfirmVerificationBtn] =
    useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // Enabling or Disabling Send Verification Code Button
  useEffect(() => {
    if (completePhoneNumber.length < 13) setDisableVerificationBtn(true);
    else setDisableVerificationBtn(false);
  }, [completePhoneNumber]);

  // Enabling or Disabling Confirm Verification Code Button
  useEffect(() => {
    if (verificationCode && verificationCode.length === 6)
      setDisableConfirmVerificationBtn(false);
    else setDisableConfirmVerificationBtn(true);
  }, [verificationCode]);

  // -------------------------------------------------------------------------------------------

  // This method is used to send verification code from firebase.
  const sendVerification = async () => {
    try {
      setShowLoader(true);
      const phoneProvider = new fireb.auth.PhoneAuthProvider();
      const verCode: any = await phoneProvider.verifyPhoneNumber(
        completePhoneNumber,
        recaptchaVerifier.current
      );
      // If Verification code received
      if (verCode) {
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

  // This method is used to generating authentication token
  const generateAuthenticationToken = async () => {
    try {
      setShowLoader(true);
      setVerificationCode("");

      // For "Content-Type": "multipart/form-data",
      const formData = new FormData();
      formData.append("contact", completePhoneNumber);

      const response = await instance.post("/generate_api_token", formData);
      if (response.status === 200 && response.data?.status === true) {
        const isNewUser = response.data?.is_new_user;
        const jwtToken = response.data?.token_id;
        const userDetails = response?.data.data;

        console.log("isNewUser: ", isNewUser);
        console.log("authentication-token: ", jwtToken);
        console.log("userDetails: ", userDetails);

        //This method is used to save JWT Token in @react-native-async-storage/async-storage
        jwtToken &&
          (await AsyncStorage.setItem("authentication-token", jwtToken));
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

  // Receiving Complete Mobile Number from CountryDropdown Component
  const getCompleteMobileNumber = (mobileNumberWithCountryCode: string) => {
    console.log("mobileNumberWithCountryCode::: ", mobileNumberWithCountryCode);
    if (mobileNumberWithCountryCode)
      setCompletePhoneNumber(mobileNumberWithCountryCode);
  };

  // -------------------------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text style={styles.otpText}>
          Let’s start.{"\n"} Sign up with number.
        </Text>
        {showLoader && <ActivityIndicator />}

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
    fontSize: 24,
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
  },
  sendCode: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
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
    width: 350,
    height: 82,
    left: 10,
    top: 10,
    marginBottom: 150,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
