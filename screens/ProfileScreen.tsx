import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Button,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../core/utils/AxiosInterceptor";
import { profile } from "../constants/images";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

// ============================================================================================

const ProfileScreen = ({ navigation }: any) => {
  const toast = useToast();

  // Component's Local States
  const [showLoader, setShowLoader] = useState(false);
  const [jwtToken, setJwtToken] = useState<any>("");
  // "userDetailsPrefilled" state is used to prefilled user's data from the api during view profile
  const [userDetailsPrefilled, setUserDetailsPrefilled] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);
  // "userDetails" state is used to store user's form data during update profile
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    email: "",
    dob: "",
    contact: "",
    image: "",
  });

  // Fetching JWT Token when component's mounted
  useEffect(() => {
    setJwtToken(fetchAuthenticationToken()); // Fetching Authentication Token
  }, []);

  // Fetching User's details if token available
  useEffect(() => {
    jwtToken.length && !isEditable && fetchUserDetails();
  }, [jwtToken]);

  useEffect(() => {
    if (userDetailsPrefilled) {
      setUserDetails({
        name: userDetailsPrefilled?.name,
        email: userDetailsPrefilled?.email,
        dob: userDetailsPrefilled?.dob,
        contact: userDetailsPrefilled?.contact,
        image: userDetailsPrefilled?.image,
      });
    }
  }, [userDetailsPrefilled]);

  // =============================== Image Upload Functionality -- Start =========================
  // The data of the picked image
  const [pickedImagePath, setPickedImagePath] = useState<any>({});

  // This function is triggered when the "Select from Gallery" button pressed
  const uploadImageFromGallery = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this appp to access your photos!");
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
      Alert.alert("You've refused to allow this appp to access your camera!");
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
      Alert.alert("Please select the image first");
    else if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    )
      updateUserProfileImage(imageData);
    else
      Alert.alert(
        "The selected file type is invalid. Please choose image with PNG, JPG or JPEG format only."
      );
  };

  // This method is used to update user's profile image using an API
  const updateUserProfileImage = async (imageData: any) => {
    try {
      const formData = new FormData();
      formData.append("token_id", jwtToken);
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

  // Redirect to back screen
  const goToBackScreen = () => {
    navigation.navigate("Main");
  };

  //This method is used to fetch JWT Token from @react-native-async-storage/async-storage
  const fetchAuthenticationToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authentication-token");
      if (token !== null) {
        console.log("token::::::::: ", token);
        setJwtToken(token);
      }
    } catch (e: any) {
      console.log("Getting an error while fetching JWT Token:: ", e.message);
    }
  };

  // This method is used to fetch user details from the api based on token
  const fetchUserDetails = async () => {
    try {
      const formData = new FormData();
      formData.append("token_id", jwtToken);

      setShowLoader(true);

      const response = await instance.post("/user_details", formData);
      if (response.status === 200 && response.data?.status === true) {
        setShowLoader(false);
        setUserDetailsPrefilled(response.data?.data);
        toast.show("User's details fetched successfully!", {
          type: "success",
          placement: "bottom",
        });
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching user details. Please try again later.",
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
          : "Getting an error while fetching user details. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // --------------------------- Date Picker Handling -- Start -----------------------------------

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

    // Making Full Date of Birth which we need to send in API
    let fullDate = `${year}-${month < 10 ? "0" + month : month}-${
      currentDate < 10 ? "0" + currentDate : currentDate
    }`;

    setUserDetails({ ...userDetails, dob: fullDate });
    hideDatePicker();
  };

  // --------------------------- Date Picker Handling -- Finished -----------------------------------

  // This method is used to update User details
  const updateUserDetails = async () => {
    try {
      const { name, email, dob } = userDetails;

      const formData = new FormData();
      formData.append("token_id", jwtToken);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("dob", dob);
      setShowLoader(true);

      const response = await instance.post("/users_update", formData);
      if (response.status === 200 && response.data?.status === true) {
        setShowLoader(false);
        toast.show("User's details updated successfully!", {
          type: "success",
        });
        goToBackScreen();
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while updating user details. Please try again later.",
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
          : "Getting an error while updating user details. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  return !isEditable ? (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View
          style={{
            top: "2%",
            left: "2%",
            right: "2%",
            position: "absolute",
            flexDirection: "row",
            width: "auto",
          }}
        >
          <TouchableOpacity
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              flexDirection: "row",
              width: "100%",
            }}
            onPress={() => goToBackScreen()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={COLORS.white}
            />
            <Text
              style={[
                styles.textView,
                {
                  fontWeight: "600",
                  color: COLORS.white,
                  alignSelf: "center",
                  textAlign: "left",
                  padding: 0,
                  borderWidth: 0,
                },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              right: 0,
              top: 0,
              position: "absolute",
            }}
            onPress={() => setIsEditable(true)}
          >
            <MaterialIcons name="edit" size={30} color={COLORS.white} />
            {showLoader && <ActivityIndicator size={50} />}
          </TouchableOpacity>
        </View>

        <Image
          source={
            userDetailsPrefilled?.image
              ? { uri: userDetailsPrefilled?.image }
              : profile
          }
          style={styles.profileImage}
        />
        <Text
          style={[
            styles.textView,
            { fontWeight: "600", color: COLORS.white, padding: 0 },
          ]}
        >
          {userDetailsPrefilled?.name
            ? userDetailsPrefilled?.name
            : "User Name"}
        </Text>
      </View>

      <View style={styles.bottomView}>
        <Text style={styles.textView}>
          {userDetailsPrefilled?.email ? userDetailsPrefilled?.email : "Email"}
        </Text>
        <Text style={styles.textView}>
          {userDetailsPrefilled?.dob
            ? userDetailsPrefilled?.dob.toString().split("-")[2] +
              "-" +
              userDetailsPrefilled?.dob.toString().split("-")[1] +
              "-" +
              userDetailsPrefilled?.dob.toString().split("-")[0]
            : "Date of Birth"}
        </Text>
        <Text style={styles.textView}>
          {userDetailsPrefilled?.contact
            ? userDetailsPrefilled?.contact
            : "Contact Number"}
        </Text>
      </View>
    </View>
  ) : (
    // ---------------------------------Editable View----------------------------------------
    <View style={styles.container}>
      <View style={styles.topView}>
        <View
          style={{
            top: "2%",
            left: "2%",
            right: "2%",
            position: "absolute",
            flexDirection: "row",
            width: "auto",
          }}
        >
          <TouchableOpacity
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              flexDirection: "row",
              width: "100%",
            }}
            onPress={() => goToBackScreen()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={COLORS.white}
            />
            <Text
              style={[
                styles.textView,
                {
                  fontWeight: "600",
                  color: COLORS.white,
                  alignSelf: "center",
                  textAlign: "left",
                  padding: 0,
                  borderWidth: 0,
                },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              right: 0,
              top: 0,
              position: "absolute",
            }}
            onPress={updateUserDetails}
          >
            <Text
              style={[
                styles.textView,
                {
                  color: COLORS.white,
                  textAlign: "right",
                  padding: 0,
                  borderWidth: 0,
                },
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
          <View
            style={{
              right: 0,
              top: 30,
              position: "absolute",
            }}
          >
            {showLoader && <ActivityIndicator size={50} />}
          </View>
        </View>

        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            {userDetails?.image === "" &&
              pickedImagePath &&
              pickedImagePath?.uri !== "" && (
                <Image
                  source={{ uri: pickedImagePath?.uri }}
                  style={styles.profileImage}
                />
              )}
            {userDetails?.image !== "" && pickedImagePath && (
              <Image
                source={{ uri: userDetails.image }}
                style={styles.profileImage}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={uploadImageFromGallery}
              title="Select from Gallery"
            />
            <Button onPress={uploadImageFromCamera} title="Open camera" />
            <Button
              onPress={uploadProfileImage}
              title="Upload Image"
              color="orange"
            />
          </View>
        </View>

        <TextInput
          style={[
            styles.textView,
            styles.textInputStyle,
            {
              fontWeight: "600",
              color: COLORS.white,
              padding: 0,
              backgroundColor: "white",
            },
          ]}
          underlineColor="transparent"
          value={userDetails?.name ? userDetails?.name : ""}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, name: val })
          }
        ></TextInput>
      </View>

      <View style={styles.bottomView}>
        <TextInput
          style={[
            styles.textView,
            styles.textInputStyle,
            { backgroundColor: "white" },
          ]}
          underlineColor="transparent"
          value={userDetails?.email ? userDetails?.email : ""}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, email: val })
          }
        ></TextInput>
        <Pressable onPress={showDatePicker}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={styles.textView}>
            {userDetails?.dob
              ? userDetails?.dob.toString().split("-")[2] +
                "-" +
                userDetails?.dob.toString().split("-")[1] +
                "-" +
                userDetails?.dob.toString().split("-")[0]
              : "Date of Birth"}
          </Text>
        </Pressable>

        <TextInput
          style={[
            styles.textView,
            styles.textInputStyle,
            { backgroundColor: "white" },
          ]}
          underlineColor="transparent"
          value={userDetails?.contact ? userDetails?.contact : ""}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, contact: val })
          }
        ></TextInput>
      </View>
    </View>
  );
};

// ====================================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: "40%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: COLORS.voilet,
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
  },
  profileImage: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderRadius: 40,
    marginBottom: "5%",
  },
  bottomView: {
    margin: "5%",
    alignItems: "center",
    height: "30%",
    justifyContent: "space-evenly",
  },
  textView: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.voilet,
    borderColor: COLORS.voilet,
    borderWidth: 1,
    width: SIZES.width * 0.7,
    textAlign: "center",
    padding: "2%",
    borderRadius: 30,
  },
  textInputStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 0,
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 30,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 600,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});
export default ProfileScreen;

// =============================================== THE END =====================================================
