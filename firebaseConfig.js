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
  apiKey: "AIzaSyDmMbC5Sj6mHS7ayztybPV-HEqAd-3k0gU",
  authDomain: "srb-reactnativeapp.firebaseapp.com",
  projectId: "srb-reactnativeapp",
  storageBucket: "srb-reactnativeapp.appspot.com",
  messagingSenderId: "771423723462",
  appId: "1:771423723462:web:f3a4f165e1184d97921cc7",
  measurementId: "G-C4WZ7DHHWZ"
};
if (!firebase.apps.length > 0) {
  firebase.initializeApp(firebaseConfig);
}
