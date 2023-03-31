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
        // console.log(result);
      });
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <Text style={styles.otpText}>Login</Text>
      <TextInput
        placeholder="Phone Number with Country code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        style={styles.textInput}
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  sendVerification: {
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  otpText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    margin: 20,
  },
});
