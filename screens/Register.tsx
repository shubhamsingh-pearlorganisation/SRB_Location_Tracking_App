import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { instance } from "../core/utils/AxiosInterceptor";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// -----------------------------------------------------------------------------------

const Register = ({ route, navigation }: any) => {
  const [enabledAddIcon, setEnabledAddIcon] = useState(true);
  const [image, setImage] = useState<any>(null);
  const [mobileNumber] = useState(
    route?.params?.userDetails?.contact
      ? route?.params?.userDetails?.contact
      : ""
  );
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    emailId: "",
    dob: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    console.log("Profile Image: ", image);
    image && updateUserProfileImage(); //Upload Profile Image API Called
  }, [image]);

  // This method is used to select profile image
  const uploadProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
      setEnabledAddIcon(false);
    }
  };

  // This method is used to update User Details
  const updateUserDetails = async () => {
    try {
      const { name, emailId, dob } = userDetails;
      const formData = new FormData();
      formData.append("token_id", "8cd4a0e0b8d5ceb20d46728fd531a04b");
      formData.append("name", name);
      formData.append("email", emailId);
      formData.append("dob", dob);

      const response = await instance.post("/users_update", formData);
      if (response.status === 200) {
        console.log("User Details Update Response:: ", response);
        // navigation.navigate("Main");
      } else {
        console.log("Getting an error while updating User Details");
      }
    } catch (error) {
      console.log("Getting an error while updating User Details:: ", error);
    }
  };

  // This method is used to update user's profile image
  const updateUserProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("token_id", "8cd4a0e0b8d5ceb20d46728fd531a04b");
      formData.append("image", image);
      const response = await instance.post("/users_image_update", formData);
      if (response.status === 200) {
        console.log("Image Upload API Response:: ", response);
      } else {
        console.log("Getting an error while updating User's Profile Image");
      }
    } catch (error) {
      console.log(
        "Getting an error while updating User Profile Image :: ",
        error
      );
    }
  };

  // --------------------------- Date Picker Handling -- Start -----------------------------------
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    let tempDate = new Date(date);

    const currentDate = tempDate.getDate();
    const month = tempDate.getMonth() + 1;
    const year = tempDate.getFullYear();
    let fullDate = `${year}-${month < 10 ? "0" + month : month}-${
      currentDate < 10 ? "0" + currentDate : currentDate
    }`;

    console.log("fDate::: ", fullDate);
    setUserDetails({ ...userDetails, dob: fullDate });
    hideDatePicker();
  };
  // --------------------------- Date Picker Handling -- Finish -----------------------------------

  // This method is used to update profile details
  const updateDetails = () => {
    // navigation.navigate("Main");
    console.log("userDetails::: ", userDetails);
    updateUserDetails();
  };
  // ---------------------------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.otpText}>
          You haven’t got account?{"\n"} Let's Create...
        </Text>
        <TouchableOpacity style={styles.addImage} onPress={uploadProfileImage}>
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
        <View pointerEvents="none">
          <TextInput
            style={styles.textInput}
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={mobileNumber}
            contextMenuHidden={true}
          />
        </View>

        <TextInput
          placeholder="Enter your name"
          keyboardType="default"
          style={styles.textInput2}
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={userDetails?.name}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, name: val })
          }
        />

        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          style={styles.textInput2}
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={userDetails?.emailId}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, emailId: val })
          }
        />
        <Pressable onPress={showDatePicker}>
          <Text
            style={{
              color: "white",
              margin: 10,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Your Birthday
          </Text>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text
            style={{
              fontSize: 20,
              color: "#FFF",
              fontWeight: "600",
              marginLeft: 10,
            }}
          >
            {userDetails?.dob}
          </Text>
        </Pressable>

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
          onPress={updateDetails}
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
