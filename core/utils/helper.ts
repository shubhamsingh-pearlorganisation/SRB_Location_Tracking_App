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
        let geolocationAddress = "";
        const location: any = await Location.getCurrentPositionAsync({});
        const { timestamp, coords } = location;
        const { latitude, longitude } = location.coords;
        if (coords) {
          // fetching Address based on latitude and longitude
          let reverseGeocodingResponse: any =
            await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });
          if (Object.keys(reverseGeocodingResponse[0]).length > 0) {
            const streetName = reverseGeocodingResponse[0]?.street
              ? reverseGeocodingResponse[0]?.street
              : "";
            const districtName = reverseGeocodingResponse[0]?.district
              ? reverseGeocodingResponse[0]?.district
              : "";
            const cityName = reverseGeocodingResponse[0]?.city
              ? reverseGeocodingResponse[0]?.city
              : "";
            const postalCode = reverseGeocodingResponse[0]?.postalCode
              ? reverseGeocodingResponse[0]?.postalCode
              : "";
            const isoCountryCode = reverseGeocodingResponse[0]?.isoCountryCode
              ? reverseGeocodingResponse[0]?.isoCountryCode
              : "";
            // combining address
            let myGeolocationAddress = `${streetName}, ${districtName}, ${cityName} - ${postalCode}, ${isoCountryCode}`;
            geolocationAddress = myGeolocationAddress;
          }
        }
        // Returning Location Data to Manage Map component
        resolve({
          latitude,
          longitude,
          timestamp,
          geolocationAddress,
        });
      } catch (err) {
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

// This method is used to return time in "12:02:02 PM" format.
const add_AMPM_With_Date = (date: any) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime.toString();
};

// This method is used to convert date in "23-03-2023" format.
const convertDateIn_DDMMYYYY_Format = (selectedDate: any) => {
  const selDate = selectedDate ? selectedDate : new Date();
  let date: any = selDate.getDate();
  let month: any = selDate.getMonth() + 1;
  let year: any = selDate.getFullYear();
  if (date < 10) date = "0" + date;
  if (month < 10) month = "0" + month;
  const convertedDate = date + "-" + month + "-" + year;
  return convertedDate.toString();
};

// This method is used to convert given month number to Month Name.
const convertMonthNumberToName = (monthNumber: number) => {
  let monthName = "";
  switch (monthNumber) {
    case 0:
      monthName = "January";
      break;
    case 1:
      monthName = "February";
      break;

    case 2:
      monthName = "March";
      break;

    case 3:
      monthName = "April";
      break;

    case 4:
      monthName = "May";
      break;

    case 5:
      monthName = "June";
      break;

    case 6:
      monthName = "July";
      break;

    case 7:
      monthName = "August";
      break;

    case 8:
      monthName = "September";
      break;

    case 9:
      monthName = "October";
      break;

    case 10:
      monthName = "November";
      break;

    case 11:
      monthName = "December";
      break;
  }
  return monthName.substring(0, 3); //sending first 3 characters of month name as per our requirement.
};

export {
  getCurrentLocation,
  showError,
  showSuccess,
  fetchAuthenticationToken,
  add_AMPM_With_Date,
  convertDateIn_DDMMYYYY_Format,
  convertMonthNumberToName,
};