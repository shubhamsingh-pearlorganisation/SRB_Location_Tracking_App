import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { instance } from "../core/utils/AxiosInterceptor";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useToast } from "react-native-toast-notifications";
import {
  AuthContext,
  GroupsAndMembersContext,
  UserDetailsContext,
} from "../App";
import { regexes } from "../core/utils/constants";
import Loader from "../components/Loader";

// -----------------------------------------------------------------------------------

const Register = ({ route }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  // Component's Local States
  // ========================
  const [showLoader, setShowLoader] = useState(false);

  // Saving Route's data in component's local state - userDetails
  const [userDetails, setUserDetails] = useState<any>({
    name: route?.params?.userDetails?.name
      ? route?.params?.userDetails?.name
      : "",
    emailId: route?.params?.userDetails?.email
      ? route?.params?.userDetails?.email
      : "",
    dob: route?.params?.userDetails?.dob ? route?.params?.userDetails?.dob : "",
    contact: route?.params?.userDetails?.contact
      ? route?.params?.userDetails?.contact
      : "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // ================================== Image Upload Functionality -- Start =========================
  // The data of the picked image
  const [pickedImagePath, setPickedImagePath] = useState<any>({});

  // This function is triggered when the "Select from Gallery" button pressed
  const uploadImageFromGallery = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Failed",
        "You've refused to allow this app to access your photos!"
      );
      return;
    }

    const result: any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
      setUserDetails({ ...userDetails, image: "" });
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const uploadImageFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Failed",
        "You've refused to allow this app to access your camera!"
      );
      return;
    }

    const result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
      setUserDetails({ ...userDetails, image: "" });
    }
  };

  // This method is used to validate iimage data and call upload image api
  const uploadProfileImage = () => {
    // Image URL
    const uri = pickedImagePath?.uri ? pickedImagePath?.uri : "";

    // URL Last Segment means file name with extension
    const uriLastSegment = pickedImagePath?.uri
      ? pickedImagePath?.uri.toString().split("/")[
          pickedImagePath?.uri.toString().split("/").length - 1
        ]
      : "";

    // Image Extension
    const fileExtension = uriLastSegment && uriLastSegment.split(".")[1];

    // Image Type
    let type;
    if (
      pickedImagePath?.type &&
      pickedImagePath?.type.toString().includes("image/") === true
    )
      type = pickedImagePath?.type;
    else if (
      pickedImagePath?.type &&
      pickedImagePath?.type.toString().includes("image/") === false
    )
      type = "image/" + pickedImagePath?.type;
    else type = "";

    // Name
    const name = pickedImagePath?.name ? pickedImagePath?.name : uriLastSegment;

    // File Name
    const filename = pickedImagePath?.filename
      ? pickedImagePath?.filename
      : uriLastSegment;

    // This is the data which we pass in form data inside image param
    const imageData = {
      uri,
      type,
      name,
      filename,
    };

    // Check Valid Image types
    if (Object.keys(pickedImagePath).length === 0)
      Alert.alert("Validation Failed", "Please select the image first");
    else if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    )
      updateUserProfileImage(imageData);
    else
      Alert.alert(
        "Validation Failed",
        "The selected file type is invalid. Please choose image with PNG, JPG or JPEG format only."
      );
  };

  // This method is used to update user's profile image using an API
  const updateUserProfileImage = async (imageData: any) => {
    try {
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("image", imageData);

      setShowLoader(true);
      const response = await instance.post("/users_image_update", formData);
      if (response.status === 200 && response.data?.status === true) {
        setShowLoader(false);
        toast.show("Profile Image updated successfully!", {
          type: "success",
        });
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while updating user's profile image. Please try again later.",
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
          : "Getting an error while updating user's profile image. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };
  // ================================== Image Upload Functionality -- Finished =========================

  // This method is used to update User Details
  const updateUserDetails = async () => {
    // Form Validation
    if (userDetails?.name?.toString().length === 0) {
      toast.show("User Name is required", { type: "error" });
      return;
    } else if (userDetails?.name?.toString().length < 2) {
      toast.show("Name should contain minimum 2 characters", { type: "error" });
      return;
    } else if (userDetails?.emailId?.toString().length === 0) {
      toast.show("Email Id is required", { type: "error" });
      return;
    } else if (
      userDetails?.emailId?.toString().length > 0 &&
      !regexes.validEmailRegex.test(userDetails?.emailId?.toString())
    ) {
      toast.show("Please enter a valid email id.", { type: "error" });
      return;
    } else if (userDetails?.dob?.toString().length === 0) {
      toast.show("Please enter your date of birth", { type: "error" });
    }
    try {
      const { name, emailId, dob } = userDetails;

      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("name", name);
      formData.append("email", emailId);
      formData.append("dob", dob);
      setShowLoader(true);

      const response = await instance.post("/users_update", formData);
      if (response.status === 200 && response.data?.status === true) {
        setShowLoader(false);
        toast.show(
          "Account created successfully. Now you can login to continue.",
          {
            type: "success",
          }
        );
        userDetailsContextData?.updateUserDetails();
        groupsAndMembersData.fetchGroupsAndMembersList(true); //Update Groups Listing
        authContextData.setTokenAfterLogin(null);
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while saving user details. Please try again later.",
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
          : "Getting an error while saving user details. Please try again later.",
        {
          type: "error",
        }
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
    // Making full "Date of Birth" which we need to send in generate token API
    let fullDate = `${year}-${month < 10 ? "0" + month : month}-${
      currentDate < 10 ? "0" + currentDate : currentDate
    }`;

    setUserDetails({ ...userDetails, dob: fullDate });
    hideDatePicker();
  };
  // --------------------------- Date Picker Handling -- Finish -----------------------------------

  // This method is used to update profile details
  const updateDetails = () => {
    updateUserDetails();
  };
  // ---------------------------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        {showLoader && (
          <Loader
            message="Please wait.. we are creating your account."
            msgTextColor="white"
          />
        )}

        <Text style={styles.otpText}>
          You haven’t got account?{"\n"} Let's Create...
        </Text>
        <View>
          <View style={styles.imageContainer}>
            {!pickedImagePath?.uri && (
              <Text
                style={{
                  color: "white",
                  margin: 30,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Add Profile Image
              </Text>
            )}
            {pickedImagePath?.uri && (
              <Image
                source={{ uri: pickedImagePath?.uri }}
                style={styles.profileImage}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.imgBtns} onPress={uploadImageFromGallery}>
              <Text style={styles.imgBtnText}>Gallery</Text>
            </Pressable>
            <Pressable style={styles.imgBtns} onPress={uploadImageFromCamera}>
              <Text style={styles.imgBtnText}>Camera</Text>
            </Pressable>
            <Pressable
              style={[styles.imgBtns, { backgroundColor: "#452FFF" }]}
              onPress={uploadProfileImage}
            >
              <Text
                style={[
                  styles.imgBtnText,
                  { fontWeight: "600", color: "white" },
                ]}
              >
                Upload Image
              </Text>
            </Pressable>
          </View>
        </View>

        <View pointerEvents="none">
          <TextInput
            style={styles.textInput}
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={userDetails?.contact}
            contextMenuHidden={true}
          />
        </View>

        <TextInput
          placeholder="Enter your name"
          keyboardType="default"
          style={styles.textInput2}
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={userDetails?.name}
          maxLength={30}
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
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto",
          }}
          onPress={showDatePicker}
        >
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
            maximumDate={new Date()}
            minimumDate={new Date("1930-01-01")}
          />
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
            }}
          >
            <Text style={styles.dobContainers}>
              {userDetails?.dob
                ? userDetails?.dob.toString().split("-")[2]
                : "00"}
            </Text>
            <Text style={styles.dobseperators}>-</Text>
            <Text style={styles.dobContainers}>
              {userDetails?.dob
                ? userDetails?.dob.toString().split("-")[1]
                : "00"}
            </Text>
            <Text style={styles.dobseperators}>-</Text>
            <Text style={styles.dobContainers}>
              {userDetails?.dob
                ? userDetails?.dob.toString().split("-")[0]
                : "0000"}
            </Text>
          </View>
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
// ==================================================
// CSS CODE
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
  dobContainers: {
    fontSize: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    color: COLORS.black,
    padding: 5,
    textAlign: "center",
    alignContent: "center",
  },
  dobseperators: {
    backgroundColor: "transparent",
    color: COLORS.white,
    padding: 5,
    textAlign: "center",
    alignContent: "center",
  },
  profileImage: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderRadius: 40,
    marginBottom: "5%",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: SIZES.width > 400 ? SIZES.width * 0.3 : SIZES.width * 0.5,
    height: SIZES.width > 400 ? SIZES.width * 0.3 : SIZES.width * 0.5,
    resizeMode: "contain",
  },

  buttonContainer: {
    width: SIZES.width * 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "10%",
  },
  imgBtns: {
    padding: "2%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: "5%",
    marginLeft: "2%",
    marginRight: "2%",
  },
  imgBtnText: {
    fontSize: SIZES.width > 400 ? 20 : 15,
    color: COLORS.voilet,
  },
});

export default Register;

// =============================================== THE END =====================================================
