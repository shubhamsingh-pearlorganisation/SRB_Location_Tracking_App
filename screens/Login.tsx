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
import countriesData from "../assets/api-data/countriesData.json";
import { SelectList } from "react-native-dropdown-select-list";
import { regexes } from "../core/utils/constants";
import { instance } from "../core/utils/AxiosInterceptor";
import * as SecureStore from "expo-secure-store";

// ---------------------------------------------------------------------------------------------

const Login = ({ navigation }: any) => {
  const toast = useToast();

  // Local Component's State
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);
  const [disableVerificationBtn, setDisableVerificationBtn] = useState(true);
  const [disableConfirmVerificationBtn, setDisableConfirmVerificationBtn] =
    useState(true);
  const [countriesList, setCountriesList] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = React.useState("");
  const [completePhoneNumber, setCompletePhoneNumber] = useState("");

  // Fetching Countries and store in component's state
  useEffect(() => {
    setCountriesList(countriesData);
  }, []);

  // Enabling or Disabling Send Verification Button
  useEffect(() => {
    if (
      phoneNumber &&
      phoneNumber.length >= 10 &&
      phoneNumber.length < 13 &&
      selectedCountryCode
    )
      setDisableVerificationBtn(false);
    else setDisableVerificationBtn(true);
  }, [phoneNumber, selectedCountryCode]);

  //Merging Phone Number with Country Code
  useEffect(() => {
    if (phoneNumber && selectedCountryCode) {
      setCompletePhoneNumber(selectedCountryCode + "" + phoneNumber);
    }
  }, [phoneNumber, selectedCountryCode]);

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
      const globalMobileNumberRegex = regexes.tenDigitMobileNumber; //10 digit mobile number regex

      if (
        isNaN(phoneNumber) ||
        (phoneNumber &&
          phoneNumber.length >= 10 &&
          phoneNumber.length < 13 &&
          !globalMobileNumberRegex.test(phoneNumber))
      ) {
        toast.show("Please enter a valid Mobile Number", {
          type: "error",
        });
      } else if (
        phoneNumber.length >= 10 &&
        phoneNumber.length < 13 &&
        globalMobileNumberRegex.test(phoneNumber)
      ) {
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
      }
    } catch (error: any) {
      setShowLoader(false);
      toast.show(error.message, {
        type: "error",
      });
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
          setShowLoader(false);
          generateAuthenticationToken(); //Generating Authentication Token to proceed further
        }
      }
    } catch (error: any) {
      setShowLoader(false);
      toast.show(error.message, {
        type: "error",
      });
    }
  };

  // This method is used to generating authentication token
  const generateAuthenticationToken = async () => {
    try {
      setShowLoader(true);

      // For "Content-Type": "multipart/form-data",
      const formData = new FormData();
      formData.append("contact", completePhoneNumber);

      const response = await instance.post("/api/generate_api_token", formData);
      if (response.status === 200) {
        const isNewUser = response.data?.is_new_user;
        const jwtToken = response.data?.token_id;
        const userDetails = response?.data.data;

        console.log("isNewUser: ", isNewUser);
        console.log("authentication-token: ", jwtToken);
        console.log("userDetails: ", userDetails);

        // Saving JWT (Authentication) token to Expo Secure Store
        await SecureStore.setItemAsync("authentication-token", jwtToken);

        setShowLoader(false);

        if (isNewUser) navigation.navigate("Register");
        else navigation.navigate("Main");
      } else {
        setShowLoader(false);
        console.log("Getting an error while generating authentication token");
      }
    } catch (error) {
      setShowLoader(false);
      console.log(
        "Getting an error while generating authentication token : ",
        error
      );
    }
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
          {countriesList && (
            <SelectList
              boxStyles={{ backgroundColor: "#fff" }}
              setSelected={(val: any) => {
                setSelectedCountryCode(val);
              }}
              data={countriesList}
              save="key"
            />
          )}

          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>
            {selectedCountryCode && <Text>{selectedCountryCode}</Text>}
          </Text>

          <TextInput
            placeholder="Enter Number"
            onChangeText={(value: any) => {
              setPhoneNumber(value);
            }}
            keyboardType="phone-pad"
            autoComplete="tel"
            style={styles.textInput}
            placeholderTextColor="rgba(255,255,255,0.6)"
            maxLength={12}
          />
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
