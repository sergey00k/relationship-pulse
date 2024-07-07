///

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQoxdY-v4WzrCbx4ajSBYbfS7ilB-fEzM",
    authDomain: "relationshippulse-427504.firebaseapp.com",
    projectId: "relationshippulse-427504",
    storageBucket: "relationshippulse-427504.appspot.com",
    messagingSenderId: "274020289013",
    appId: "1:274020289013:web:ea393e7d1c878ddabe78bc",
    measurementId: "G-SVXMJ3BREH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const analytics = getAnalytics(app);

export { db };
