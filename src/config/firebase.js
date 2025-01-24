// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5hhY0Fs-ljwqKv3Ei3SIqcCj0zsrD-mU",
  authDomain: "digi-b14f3.firebaseapp.com",
  projectId: "digi-b14f3",
  storageBucket: "digi-b14f3.firebasestorage.app",
  messagingSenderId: "12642590015",
  appId: "1:12642590015:web:78114fb3fa7a26cd66078a",
  measurementId: "G-VB1ENE2R41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
