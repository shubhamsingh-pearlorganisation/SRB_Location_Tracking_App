import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  originMarker: require("../../assets/origin-marker.png"),
  destinationMarker: require("../../assets/destination-marker.png"),
  centerBtn: require("../../assets/center-btn.png"),
  zoomOut: require("../../assets/zoom-out.png"),
};

export const GOOGLE_API_KEY = "AIzaSyAlx8qGhesdmQOyprqMV3Wzppo4Ih4kFso";
export const regexes = {
  indianMobileNumberRegex: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
  indianMobileWithPlus91Regex: /^[0]?[6789]\d{9}$/,
  tenDigitMobileNumber: /^[0-9]{10}$/,
};

//This method is used to fetch JWT Token from @react-native-async-storage/async-storage
export const fetchJWTToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authentication-token");
    if (token !== null) {
      console.log("token:::::::::::::::::: ", token);
      return token; // JSON.stringify(token);
    }
  } catch (e: any) {
    console.log("Getting an error while fetching JWT Token:: ", e.message);
  }
};
