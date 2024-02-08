// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpiHuT4MVPp-f4nU3WLn4-3uRkmm1ehD4",
  authDomain: "notes-82314.firebaseapp.com",
  projectId: "notes-82314",
  storageBucket: "notes-82314.appspot.com",
  messagingSenderId: "919809223874",
  appId: "1:919809223874:web:2f43ec959941d504a8df5b",
  measurementId: "G-J8N48KXPQ6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);