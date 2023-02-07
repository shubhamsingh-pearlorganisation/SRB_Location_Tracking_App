import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../firebaseConfig";
import fireb from "firebase/compat";
import { useToast } from "react-native-toast-notifications";
import countriesData from "../assets/api-data/countries.json";

import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants";

import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";

const Register = ({ navigation }: any) => {
  const onPressSubmit = () => {
    navigation.navigate("Main");
  };

  const [date, setDate] = useState("09-10-2020");

  const [enabledAddIcon, setEnabledAddIcon] = useState(true);

  const [image, setImage] = useState(null);

  useEffect(() => {
    async () => {};
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setEnabledAddIcon(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        {/* Firebase captcha verification */}
        {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      /> */}
        <Text style={styles.otpText}>
          You haven’t got account?{"\n"} Let's Create...
        </Text>
        <TouchableOpacity style={styles.addImage} onPress={pickImage}>
          {enabledAddIcon && (
            <Ionicons
              name="add"
              size={40}
              color={COLORS.voilet}
              style={{
                margin: 20,
              }}
            />
          )}
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", borderRadius: 30 }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            margin: 10,
          }}
        >
          Image
        </Text>
        {/* {showLoader && <ActivityIndicator />} */}
        <TextInput
          placeholder="Enter Number"
          onChangeText={(value: any) => {
            //   setPhoneNumber(value);
          }}
          keyboardType="phone-pad"
          autoComplete="tel"
          style={styles.textInput}
          placeholderTextColor="rgba(255,255,255,0.6)"
          maxLength={13} // 13 length to check +91 also
        />
        {/* <TouchableOpacity
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
      )} */}

        <TextInput
          placeholder="Enter Name"
          keyboardType="default"
          style={styles.textInput2}
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <TextInput
          placeholder="Enter Email"
          keyboardType="email-address"
          style={styles.textInput2}
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <Text
          style={{
            color: "white",
            margin: 10,
          }}
        >
          Your Birthday
        </Text>

        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: "none",
            },
            // dateInput: {
            //   marginLeft: 36,
            // },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />

        <TouchableOpacity
          style={{
            position: SIZES.height > 500 ? "relative" : "absolute",
            bottom: SIZES.height > 500 ? "2%" : "5%",
            marginTop: "5%",
            alignSelf: "center",
            width: SIZES.width - SIZES.width * 0.2,
            height: 60,
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "white",
          }}
          onPress={onPressSubmit}
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: SIZES.width > 300 && SIZES.height > 600 ? 25 : 20,
              color: "#705ECF",
              alignSelf: "center",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#705ECF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  datePickerStyle: {
    width: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 30,
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 0,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },

  textInput2: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 24,
    width: "80%",
    borderRadius: 30,
    borderColor: "#fff",
    borderWidth: 1,
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

    width: "auto",
    height: "auto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default Register;
