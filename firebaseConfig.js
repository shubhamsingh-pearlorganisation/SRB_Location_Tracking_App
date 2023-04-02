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
