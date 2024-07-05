// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU4zz__uD6PLhnRaPn5xofdrO6yT5Vah0",
  authDomain: "advwebdev-dbf13.firebaseapp.com",
  projectId: "advwebdev-dbf13",
  storageBucket: "advwebdev-dbf13.appspot.com",
  messagingSenderId: "625348954341",
  appId: "1:625348954341:web:d3c1bbff4d7906d772ec0c",
  measurementId: "G-Q6VPJ2J1TX"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);