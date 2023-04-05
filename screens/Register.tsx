import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import { instance } from "../core/utils/AxiosInterceptor";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useToast } from "react-native-toast-notifications";
import {
  AuthContext,
  GroupsAndMembersContext,
  UserDetailsContext,
} from "../App";
import { regexes } from "../core/utils/constants";
import ImageUploadDialog from "../components/ImageUploadDialog";
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
  const [showImageUploadLoader, setShowImageUploadLoader] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

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
  const [pickedImagePath, setPickedImagePath] = useState<any>({}); // Used to store data of the picked image

  const [uploadImageModal, setUploadImageModal] = useState(false);

  // This method is used to receive image data after image selection.
  const receiveImageData = (data: any) => {
    setUploadImageModal(false);
    setPickedImagePath(data);
  };

  useEffect(() => {
    if (Object.keys(pickedImagePath).length > 0) {
      uploadProfileImage();
    }
  }, [pickedImagePath]);

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
      setShowImageUploadLoader(true);
      setDisableSubmitBtn(true);
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("image", imageData);
      const response = await instance.post("/users_image_update", formData);
      if (response.status === 200 && response.data?.status === true) {
        setDisableSubmitBtn(false);
        setShowImageUploadLoader(false);
        toast.show("Profile Image updated successfully!", {
          type: "success",
        });
      } else {
        setShowImageUploadLoader(false);
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
      setShowImageUploadLoader(false);
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
      setShowLoader(true);

      const { name, emailId, dob } = userDetails;

      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("name", name);
      formData.append("email", emailId);
      formData.append("dob", dob);

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
    // let tempDate = new Date(date);
    let tempDate = new Date(date.nativeEvent.timestamp);
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
    <View style={styles.container}>
      <View style={styles.container}>
        {uploadImageModal && (
          <ImageUploadDialog
            visibility={uploadImageModal}
            sendData={receiveImageData}
            updateModalVisibility={(data: string) => {
              data === "close" && setUploadImageModal(false);
            }}
          />
        )}
        {showLoader && (
          <ActivityIndicator size={SIZES.width > 400 ? 40 : 20} color="white" />
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
            <Pressable
              style={[styles.imgBtns, { backgroundColor: "#452FFF" }]}
              onPress={() => setUploadImageModal(true)}
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
            {(showLoader || showImageUploadLoader) && <Loader />}
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

          {isDatePickerVisible && (
            <RNDateTimePicker
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              minimumDate={new Date("1930-01-01")}
              value={new Date(userDetails?.dob)}
              onChange={(val: any) => handleConfirm(val)}
              positiveButton={{ label: "OK", textColor: "green" }}
            />
          )}
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

        <TouchableOpacity style={styles.sendCode} onPress={updateDetails}>
          <Text style={styles.buttonText} disabled={disableSubmitBtn}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    textAlignVertical: "center",
    paddingHorizontal: 20,
    fontSize: SIZES.height > 700 ? 24 : 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 0,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },

  textInput2: {
    textAlignVertical: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: SIZES.height > 700 ? 24 : 20,
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
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.06,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    justifyContent: "center",
    position: "relative",
    paddingStart: 10,
    paddingEnd: 10,
    textAlignVertical: "center",
    color: "#705ECF",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    fontSize: SIZES.height > 700 ? 24 : 20,
    alignSelf: "center",
  },
  otpText: {
    position: "relative",
    width: "auto",
    height: "auto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: SIZES.height > 700 ? 30 : 24,
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
