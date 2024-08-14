// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCiI7EGDULZ7HNCWFzg52nhmXkaBnn8d-0",
  authDomain: "triviaally-99f6a.firebaseapp.com",
  databaseURL: "https://triviaally-99f6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "triviaally-99f6a",
  storageBucket: "triviaally-99f6a.appspot.com",
  messagingSenderId: "1087957779282",
  appId: "1:1087957779282:web:8eff33008264d3621ef08b",
  measurementId: "G-SLD6F9BHGS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const Database = getFirestore(app);