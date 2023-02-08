import * as firebase from "firebase/compat";
import "@firebase/auth";
import "@firebase/firestore";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyC77X8vst2FAz_OLxb3FqBuWiJa-tDpIsA",
  authDomain: "srb-location-app-1ddbb.firebaseapp.com",
  projectId: "srb-location-app-1ddbb",
  storageBucket: "srb-location-app-1ddbb.appspot.com",
  messagingSenderId: "976516671492",
  appId: "1:976516671492:web:d339de72f8e225ee056d51",
  measurementId: "G-DY7MF230PL",
};
if (!firebase.apps.length > 0) {
  firebase.initializeApp(firebaseConfig);
}
