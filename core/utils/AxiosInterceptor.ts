import axios from "axios";
// import { handleLogout } from "../../screens/MenuScreen";
// import { showError } from "./helper";

export const instance = axios.create({
  baseURL: "https://lms.srbitsolution.com/api", //Will replace this baseURL to process.env.REACT_APP_API_BASE_URL
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Added a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("config: ", config);

    return config;
  },
  function (error) {
    // Do something with request error
    // console.log("config error::: ", error);
    return Promise.reject(error);
  }
);

// Added a response interceptor
instance.interceptors.response.use(
  function (response) {
    // console.log("response: ", response);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // console.log("response error::: ", error);

    // let errorMessage = "Sorry, something went wrong. Please try again later.";
    // console.log("error?.response?.status::: ", error?.response?.status);

    // switch (error?.response?.status) {
    //   case 400:
    //     errorMessage =
    //       "Bad Request. Please check the data which you are providing for accessing resource.";
    //     showError(errorMessage);
    //     break;

    //   case 401:
    //     errorMessage = "Unauthorized access. Please check login credentials.";
    //     showError(errorMessage);
    //     // handleLogout();
    //     break;

    //   case 404:
    //     errorMessage =
    //       "The requested url is not found. Please check the url again.";
    //     showError(errorMessage);
    //     break;

    //   case 500:
    //     errorMessage = "Internal server error. Please try again in some time.";
    //     showError(errorMessage);
    //     break;

    //   default:
    //     showError(errorMessage);
    // }
    return Promise.reject(error);
  }
);
