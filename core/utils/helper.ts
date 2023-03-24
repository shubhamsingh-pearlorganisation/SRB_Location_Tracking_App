import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
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
        const { timestamp } = location;
        const { latitude, longitude } = location.coords;
        resolve({ latitude, longitude, timestamp });
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
  console.log("convertedDate::: ", convertedDate);
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
  return monthName.substring(0, 3);
};

export {
  getCurrentLocation,
  showError,
  showSuccess,
  fetchAuthenticationToken,
  add_AMPM_With_Date,
  convertDateIn_DDMMYYYY_Format,
  convertMonthNumberToName
};
