export default {
  originMarker: require("../../assets/origin-marker.png"),
  destinationMarker: require("../../assets/destination-marker.png"),
  centerBtn: require("../../assets/center-btn.png"),
  zoomOut: require("../../assets/zoom-out.png"),
};

//Will replace this GOOGLE_API_KEY value to process.env.REACT_APP_GOOGLE_API_KEY
export const GOOGLE_API_KEY = "AIzaSyAlx8qGhesdmQOyprqMV3Wzppo4Ih4kFso";

export const regexes = {
  indianMobileWithPlus91Regex: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
  indianMobileNumberRegex: /^[0]?[6789]\d{9}$/,
  tenDigitMobileNumber: /^[0-9]{10}$/,
  validEmailRegex:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  validFullNameRegex: /^[\\p{L} .'-]+$/,
};
