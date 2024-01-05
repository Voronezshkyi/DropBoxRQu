// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmVqzFZOrlp6DXd-u5kqcaA5HEvU58JeQ",
  authDomain: "voronezhkyi-portfolio.firebaseapp.com",
  projectId: "voronezhkyi-portfolio",
  storageBucket: "voronezhkyi-portfolio.appspot.com",
  messagingSenderId: "179002904256",
  appId: "1:179002904256:web:7460d0b3d38d093baea725",
  measurementId: "G-TXM1SH198C"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export {db,storage}
