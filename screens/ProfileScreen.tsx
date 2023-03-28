import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useEffect, useState, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../core/utils/AxiosInterceptor";
import { profile } from "../constants/images";
import { TextInput } from "react-native-paper";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import {
  AuthContext,
  GroupsAndMembersContext,
  UserDetailsContext,
} from "../App";
import { regexes } from "../core/utils/constants";
import ImageUploadDialog from "../components/ImageUploadDialog";
import Loader from "../components/Loader";

// ============================================================================================

const ProfileScreen = ({ navigation }: any) => {
  const toast = useToast();

  const authContextData: any = useContext(AuthContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  // Component's Local States
  // ========================
  const [showLoader, setShowLoader] = useState(false);
  const [showImageUploadLoader, setShowImageUploadLoader] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // "userDetailsPrefilled" state is used to prefilled user's data from the api during view profile
  const [userDetailsPrefilled] = useState<any>(
    userDetailsContextData?.userDetails
  );

  // "userDetails" state is used to store user's form data during update profile
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    email: "",
    dob: "",
    contact: "",
    image: "",
  });

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
    ) {
      type = pickedImagePath?.type;
    } else if (
      pickedImagePath?.type &&
      pickedImagePath?.type.toString().includes("image/") === false
    ) {
      type = "image/" + pickedImagePath?.type;
    } else type = "";

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
    ) {
      updateUserProfileImage(imageData);
    } else
      Alert.alert(
        "Validation Failed",
        "The selected file type is invalid. Please choose image with PNG, JPG or JPEG format only."
      );
  };

  // This method is used to update user's profile image using an API
  const updateUserProfileImage = async (imageData: any) => {
    try {
      setDisableSubmitBtn(true);
      setShowImageUploadLoader(true);
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

  // Redirect to back screen
  const goToBackScreen = () => navigation.navigate("Main");

  // --------------------------- Date Picker Handling -- Start -----------------------------------

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // console.log("date:: ", date.nativeEvent.timestamp)
    let tempDate = new Date(date.nativeEvent.timestamp);
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
    // Form Validation
    if (userDetails?.name?.toString().length === 0) {
      toast.show("User Name is required", { type: "error" });
      return;
    } else if (userDetails?.name?.toString().length < 2) {
      toast.show("Name should contain minimum 2 characters", { type: "error" });
      return;
    } else if (userDetails?.email?.toString().length === 0) {
      toast.show("Email Id is required", { type: "error" });
      return;
    } else if (
      userDetails?.email?.toString().length > 0 &&
      !regexes.validEmailRegex.test(userDetails?.email?.toString())
    ) {
      toast.show("Please enter a valid email id.", { type: "error" });
      return;
    }

    try {
      setShowLoader(true);

      const { name, email, dob } = userDetails;

      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("dob", dob);

      const response = await instance.post("/users_update", formData);
      if (response.status === 200 && response.data?.status === true) {
        setShowLoader(false);
        toast.show("User's details updated successfully!", {
          type: "success",
        });
        userDetailsContextData?.updateUserDetails();
        groupsAndMembersData.fetchGroupsAndMembersList(true); //Update Groups Listing
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
  // ----------------------------------------------------------------------------
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
              width: SIZES.width * 0.25,
            }}
            onPress={() => goToBackScreen()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={SIZES.width > 400 ? 40 : 30}
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
                  fontSize: SIZES.width > 400 ? 30 : 20,
                  width: "auto",
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
            {
              fontWeight: "600",
              color: COLORS.white,
              padding: 0,
            },
          ]}
        >
          {userDetailsPrefilled?.name
            ? userDetailsPrefilled?.name
            : "User Name"}
        </Text>
      </View>

      <View style={styles.bottomView}>
        <Text
          style={[styles.textView, { fontSize: SIZES.width > 400 ? 25 : 20 }]}
        >
          {userDetailsPrefilled?.email ? userDetailsPrefilled?.email : "Email"}
        </Text>
        <Text
          style={[styles.textView, { fontSize: SIZES.width > 400 ? 25 : 20 }]}
        >
          {userDetailsPrefilled?.dob
            ? userDetailsPrefilled?.dob.toString().split("-")[2] +
              "-" +
              userDetailsPrefilled?.dob.toString().split("-")[1] +
              "-" +
              userDetailsPrefilled?.dob.toString().split("-")[0]
            : "Date of Birth"}
        </Text>
        <Text
          style={[styles.textView, { fontSize: SIZES.width > 400 ? 25 : 20 }]}
        >
          {userDetailsPrefilled?.contact
            ? userDetailsPrefilled?.contact
            : "Contact Number"}
        </Text>
      </View>
    </View>
  ) : (
    // ---------------------------------Editable View----------------------------------------
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
      <View
        style={[
          styles.topView,
          {
            height: SIZES.height * 0.5,
          },
        ]}
      >
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
              width: SIZES.width * 0.25,
            }}
            onPress={() => goToBackScreen()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={SIZES.width > 400 ? 40 : 30}
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
                  fontSize: SIZES.width > 400 ? 30 : 20,
                  width: "auto",
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
              width: "15%",
            }}
            onPress={updateUserDetails}
            disabled={disableSubmitBtn}
          >
            <Text
              style={[
                styles.textView,
                {
                  color: COLORS.white,
                  textAlign: "left",
                  padding: 0,
                  borderWidth: 0,
                  fontSize: SIZES.width > 400 ? 30 : 20,
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
            {(showLoader || showImageUploadLoader) && <Loader />}
          </View>
        </View>

        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: pickedImagePath?.uri
                  ? pickedImagePath?.uri
                  : userDetailsPrefilled?.image
                  ? userDetailsPrefilled?.image
                  : profile,
              }}
              style={styles.profileImage}
            />
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
          maxLength={30}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, name: val.toString() })
          }
        ></TextInput>
      </View>

      <View style={styles.bottomView}>
        <TextInput
          style={[
            styles.textView,
            styles.textInputStyle,
            {
              backgroundColor: "white",
              paddingHorizontal: 5,
              paddingVertical: 0,
            },
          ]}
          underlineColor="transparent"
          value={userDetails?.email ? userDetails?.email : ""}
          onChangeText={(val: any) =>
            setUserDetails({ ...userDetails, email: val.toString() })
          }
        ></TextInput>
        <Pressable onPress={showDatePicker}>
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

        <Text style={[styles.textView, { backgroundColor: "#e6e6e6" }]}>
          {userDetails?.contact ? userDetails?.contact : ""}
        </Text>
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
    height: "45%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: COLORS.voilet,
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    paddingBottom: "5%",
  },
  profileImage: {
    width: SIZES.width > 400 ? SIZES.width * 0.3 : SIZES.width * 0.4,
    height: SIZES.width > 400 ? SIZES.width * 0.3 : SIZES.width * 0.4,
    borderRadius: 20,
    marginTop: "10%",
    margin: "5%",
  },
  bottomView: {
    margin: "5%",
    alignItems: "center",
    height: "30%",
    justifyContent: "space-evenly",
  },
  textView: {
    fontSize: SIZES.width > 400 ? 27 : 24,
    fontWeight: "600",
    color: COLORS.voilet,
    borderColor: COLORS.voilet,
    borderWidth: 1,
    width: SIZES.width * 0.9,
    textAlign: "center",
    padding: "2%",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  textInputStyle: {
    fontSize: SIZES.width > 400 ? 25 : 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
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
    width: SIZES.width * 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "10%",
  },
  imageContainer: {
    marginTop: "10%",
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
export default ProfileScreen;

// =============================================== THE END =====================================================