<<<<<<< HEAD
import * as firebase from 'firebase/compat';
import '@firebase/auth';
import '@firebase/firestore';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCiIlnIjXu-m20RcxA4XvTXJm8SyZjBhSM",
  authDomain: "srb-tracking-react-native.firebaseapp.com",
  projectId: "srb-tracking-react-native",
  storageBucket: "srb-tracking-react-native.appspot.com",
  messagingSenderId: "35120521852",
  appId: "1:35120521852:web:c00ffd602bf65fff8b5ff9",
  measurementId: "G-YDV1Y8YXL0"
};
if(!firebase.apps.length > 0){
firebase.initializeApp(firebaseConfig);

}
=======
import * as firebase from "firebase/compat";
import "@firebase/auth";
import "@firebase/firestore";
import { getDatabase } from "firebase/database";

// ---------------------------------------------------------------------------------------------

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDmMbC5Sj6mHS7ayztybPV-HEqAd-3k0gU",
  authDomain: "srb-reactnativeapp.firebaseapp.com",
  projectId: "srb-reactnativeapp",
  storageBucket: "srb-reactnativeapp.appspot.com",
  messagingSenderId: "771423723462",
  appId: "1:771423723462:web:f3a4f165e1184d97921cc7",
  measurementId: "G-C4WZ7DHHWZ",
};

if (!firebase.apps.length > 0) firebase.initializeApp(firebaseConfig);
const db = getDatabase();

export { db };

// ---------------------------------------------------------------------------------------------
>>>>>>> edd76d43422cf2833160d11b1f435603bfcbeac1
