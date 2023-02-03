import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../firebaseConfig";
import fireb from "firebase/compat";


const Otp = ({ navigation }: any) => {
  const onPressSubmit = () => {
    navigation.navigate("Home");
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState<any>(null);
  const recaptchaVerifier = useRef<any>(null);
  const sendVerification = () => {
    const phoneProvider = new fireb.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };
  const confirmCode = () => {
    const credential = fireb.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    fireb
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        navigation.navigate("Home");
        console.log(result);
      });
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <Text style={styles.otpText}>Let’s start.{"\n"} Sign up with number.</Text>
      <TextInput
        placeholder="Enter Number"
        onChangeText={setPhoneNumber}
        keyboardType="number-pad"
        autoComplete="tel"
        style={styles.textInput}
        placeholderTextColor="rgba(255,255,255,0.6)"
      />

      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>Send Verification</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirm code"
        onChangeText={setCode}
        keyboardType="number-pad"
        autoComplete="tel"
        style={styles.textInput}
        placeholderTextColor="rgba(255,255,255,0.6)"
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Verification</Text>
      </TouchableOpacity>
    </View>
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
    // borderRadius: 500,
  },
  otpText: {
    position: "relative",
    width: 350,
    height: 82,
    left: 10,
    top: 10,
    marginBottom: 150,

    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",

    color: "#FFFFFF",
  },
  // mybtn: {
  //   position: "relative",
  //   width: 350,
  //   height: 82,
  //   left: 10,
  //   top: 10,

  //   fontFamily: "Poppins",
  //   fontStyle: "normal",
  //   fontWeight: "bold",
  //   fontSize: 30,
  //   lineHeight: 35,
  //   textAlign: "center",

  //   color: "#FFFFFF",
  // },
});
