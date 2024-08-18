
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA9eVYd_-dYJ_KCENQeeFHzqNXU-7YWb1I",
  authDomain: "cmu-bank.firebaseapp.com",
  projectId: "cmu-bank",
  storageBucket: "cmu-bank.appspot.com",
  messagingSenderId: "346556244339",
  appId: "1:346556244339:web:4cc227b0e95cba530e6506",
  measurementId: "G-KSCJF816CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
