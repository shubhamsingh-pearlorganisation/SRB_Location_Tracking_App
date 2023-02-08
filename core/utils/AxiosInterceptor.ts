import axios from "axios";
import * as SecureStore from "expo-secure-store";

//This method is used to fetch JWT token from expo secure storage
const fetchAuthenticationTokenFromExpoStore = async () => {
  return await SecureStore.getItemAsync("authentication-token");
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
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
    console.log("config: ", config);
    // Fetching JWT (Authentication) token from Expo Secure Store
    // const jwtToken = fetchAuthenticationTokenFromExpoStore();

    // console.log("jwtToken::::jwtToken::: ", jwtToken);
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
    console.log("response: ", response);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
