import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";

const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      reject("Permission to access location was denied");
    } else {
      try {
        const location: any = await Location.getCurrentPositionAsync({});
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

export { getCurrentLocation, showError, showSuccess };
