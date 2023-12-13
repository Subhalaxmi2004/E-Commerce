// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCDXealycHMJU4Xrt7EfQm4i_4FaqIgYDY",
  authDomain: "deft-clarity-398115.firebaseapp.com",
  projectId: "deft-clarity-398115",
  storageBucket: "deft-clarity-398115.appspot.com",
  messagingSenderId: "767555368333",
  appId: "1:767555368333:web:c9d2ba2e852fe6dbd9b9c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export {fireDB,auth}