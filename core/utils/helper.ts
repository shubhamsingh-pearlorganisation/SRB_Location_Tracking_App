import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
// --------------------------------------------------------------------------------------

// This method is used to fetch user's current location
const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted")
      reject("Permission to access location was denied");
    else {
      try {
        const location: any = await Location.getCurrentPositionAsync({});
        // console.log("My Location Details:: ", location);
        const { latitude, longitude } = location.coords;
        resolve({ latitude, longitude });
      } catch (err) {
        console.error(err, "something went wrong");
        reject(new Error("something went wrong"));
      }
    }
  });
};

const showError = (message: string) => {
  showMessage({
    message,
    type: "danger",
    icon: "danger",
  });
};

const showSuccess = (message: string) => {
  showMessage({
    message,
    type: "success",
    icon: "success",
  });
};

//This method is used to fetch JWT Token from @react-native-async-storage/async-storage
const fetchAuthenticationToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authentication-token");
    if (token !== null) {
      // console.log("token:::::::::::::::::: ", token);
      return token;
    } else return "";
  } catch (e: any) {
    // console.log("Getting an error while fetching JWT Token:: ", e.message);
  }
};

export { getCurrentLocation, showError, showSuccess, fetchAuthenticationToken };
