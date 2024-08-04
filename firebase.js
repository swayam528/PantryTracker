// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXAdBy3-z1X4y0JlHIVrP_9zoa0L8lZwU",
  authDomain: "inventory-management-3c092.firebaseapp.com",
  projectId: "inventory-management-3c092",
  storageBucket: "inventory-management-3c092.appspot.com",
  messagingSenderId: "1026985493542",
  appId: "1:1026985493542:web:65b2a5334c7e130bd992e7",
  measurementId: "G-P9EJT2JYGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export {firestore};