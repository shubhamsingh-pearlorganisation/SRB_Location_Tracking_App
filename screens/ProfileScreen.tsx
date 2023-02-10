import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../core/utils/AxiosInterceptor";
import { profile } from "../constants/images";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { fetchAuthenticationToken } from "../core/utils/helper";

const ProfileScreen = ({ navigation }: any) => {
  const toast = useToast();

  // Component's Local States
  const [showLoader, setShowLoader] = useState(false);
  const [jwtToken, setJwtToken] = useState<any>("");
  const [userDetails, setUserDetails] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);

  // Fetching JWT Token  when component's mounted
  useEffect(() => {
    setJwtToken(fetchAuthenticationToken()); // Fetching Authentication Token
  }, []);

  // Fetching  User's details if toke available
  useEffect(() => {
    jwtToken.length && fetchUserDetails();
  }, [jwtToken]);
  // ---------------------------------------------------------------------------------------------------

  // Redirect to back
  const goBack = () => {
    navigation.navigate("Main");
  };
  //This method is used to fetch JWT Token from @react-native-async-storage/async-storage
  const fetchAuthenticationToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authentication-token");
      if (token !== null) {
        console.log("token:::::::::::::::::: ", token);
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
        setUserDetails(response.data?.data);
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
  // --------------------------- Date Picker Handling -- Finish -----------------------------------

  return !isEditable ? (
    // ---------------------------------non editable view----------------------------------------
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
            onPress={() => goBack()}
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

          {/* -------------------------Edit Profile Button--------------------------------------  */}
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
          source={userDetails?.image ? { uri: userDetails?.image } : profile}
          style={styles.profileImage}
        />
        <Text
          style={[
            styles.textView,
            { fontWeight: "600", color: COLORS.white, padding: 0 },
          ]}
        >
          {userDetails?.name ? userDetails?.name : "User Name"}
        </Text>
        {showLoader && <ActivityIndicator size={"large"} />}
      </View>

      <View style={styles.bottomView}>
        <Text style={styles.textView}>
          {userDetails?.email ? userDetails?.email : "Email"}
        </Text>
        <Text style={styles.textView}>
          {userDetails?.dob
            ? userDetails?.dob.toString().split("-")[2] +
              "-" +
              userDetails?.dob.toString().split("-")[1] +
              "-" +
              userDetails?.dob.toString().split("-")[0]
            : "Date of Birth"}
        </Text>
        <Text style={styles.textView}>
          {userDetails?.contact ? userDetails?.contact : "Contact Number"}
        </Text>
      </View>
    </View>
  ) : (
    // ---------------------------------editable view----------------------------------------
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
            onPress={() => goBack()}
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

          {/* -------------------------Edit Profile Button--------------------------------------  */}
          <TouchableOpacity
            style={{
              right: 0,
              top: 0,
              position: "absolute",
            }}
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
        </View>

        {/* ---------------------------implement image picker functionality here------------------  */}
        <Image
          source={userDetails?.image ? { uri: userDetails?.image } : profile}
          style={styles.profileImage}
        />
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
        >
          {userDetails?.name ? userDetails?.name : "User Name"}
        </TextInput>
        {showLoader && <ActivityIndicator size={"large"} />}
      </View>

      <View style={styles.bottomView}>
        <TextInput
          style={[
            styles.textView,
            styles.textInputStyle,
            { backgroundColor: "white" },
          ]}
          underlineColor="transparent"
        >
          {userDetails?.email ? userDetails?.email : "Email"}
        </TextInput>
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
        >
          {userDetails?.contact ? userDetails?.contact : "Contact Number"}
        </TextInput>
      </View>
    </View>
  );
};

// ==================================================
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
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.2,
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
});
export default ProfileScreen;
