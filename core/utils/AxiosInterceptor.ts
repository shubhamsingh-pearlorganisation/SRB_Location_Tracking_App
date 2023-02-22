import axios from "axios";
import { showError } from "./helper";

export const instance = axios.create({
  baseURL: "https://lms.srbitsolution.com/api", //Will replace this baseURL to process.env.REACT_APP_API_BASE_URL
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    // ...(jwtToken && { Authorization: `Bearer: ${jwtToken}` }),
  },
  //   timeout: 1000,
});

// Added a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("config: ", config);

    // const jwtToken = "";
    // if (jwtToken) {
    //   config.headers["Authorization"] = "Bearer " + jwtToken;
    // }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  function (error) {
    // Do something with request error
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
    let errorMessage = "Sorry, something went wrong. Please try again later.";

    switch (error?.response?.status) {
      case 404:
        errorMessage =
          "The requested url is not found. Please check the url again.";
        showError(errorMessage);
      default:
        errorMessage;
        showError(errorMessage);
    }
    return Promise.reject(error);
  }
);
