import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzQLU1t8TbiDjFTG95Y06hwODWxan5OJg",
  authDomain: "react-firebase-auth-7397b.firebaseapp.com",
  projectId: "react-firebase-auth-7397b",
  storageBucket: "react-firebase-auth-7397b.appspot.com",
  messagingSenderId: "505544599058",
  appId: "1:505544599058:web:714462b520eee55ef5dacb",
};

// const firebaseDB = firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

// const db = firebaseDB.database().ref();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export { auth, googleAuthProvider };
