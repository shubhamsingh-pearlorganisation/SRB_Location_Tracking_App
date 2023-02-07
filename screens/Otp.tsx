import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../firebaseConfig";
import fireb from "firebase/compat";
import { useToast } from "react-native-toast-notifications";
import countriesData from "../assets/api-data/countries.json";

// ---------------------------------------------------------------------------------------------

const Otp = ({ navigation }: any) => {
  const onPressSubmit = () => {
    navigation.navigate("Main");
  };

  const toast = useToast();
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);
  const [disableVerificationBtn, setDisableVerificationBtn] = useState(true);
  const [disableConfirmVerificationBtn, setDisableConfirmVerificationBtn] =
    useState(true);
  const [countriesList, setCountriesList] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);

  // Fetching Countries and store in component's state
  useEffect(() => {
    setCountriesList(countriesData);
  }, []);

  // Enabling or Disabling Send Verification Button
  useEffect(() => {
    if (phoneNumber && phoneNumber.length === 13)
      // 13 length to check +91 also
      setDisableVerificationBtn(false);
    else setDisableVerificationBtn(true);
  }, [phoneNumber]);

  // Enabling or Disabling Confirm Verification Code Button
  useEffect(() => {
    if (verificationCode && verificationCode.length === 6)
      setDisableConfirmVerificationBtn(false);
    else setDisableConfirmVerificationBtn(true);
  }, [verificationCode]);

  // This method is used to send verification code from firebase.
  const sendVerification = async () => {
    try {
      const reg = /^[0]?[6789]\d{9}$/; // Normal Indian Mobile Number Regex
      const regexWithPlus91 = /^((\+91?)|\+)?[7-9][0-9]{9}$/; // Indian Mobile Number Regex with +91

      if (isNaN(phoneNumber) && phoneNumber != "+") {
        toast.show("This is not a valid Mobile Number", { type: "error" });
      } else if (
        phoneNumber.length === 13 && // 13 length to check +91 also
        regexWithPlus91.test(phoneNumber) === false
      ) {
        toast.show("Please enter a valid Indian Mobile Number", {
          type: "error",
        });
      } else if (
        phoneNumber.length === 13 && // 13 length to check +91 also
        regexWithPlus91.test(phoneNumber) === true
      ) {
        setShowLoader(true);

        const phoneProvider = new fireb.auth.PhoneAuthProvider();
        const verCode = await phoneProvider.verifyPhoneNumber(
          phoneNumber,
          recaptchaVerifier.current
        );
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
        if (result) {
          navigation.navigate("Main");
          setShowLoader(false);
        }
      }
    } catch (error: any) {
      setShowLoader(false);
      toast.show(error.message, {
        type: "error",
      });
    }
  };

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
      <TextInput
        placeholder="Enter Number"
        onChangeText={(value: any) => {
          setPhoneNumber(value);
        }}
        keyboardType="phone-pad"
        autoComplete="tel"
        style={styles.textInput}
        placeholderTextColor="rgba(255,255,255,0.6)"
        maxLength={13} // 13 length to check +91 also
      />
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
export default Otp;

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
