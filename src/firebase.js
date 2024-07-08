// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDem2mxnU8fI3MdveMIcv4rjJR2_WECCmM",
  authDomain: "reduxpodcastproject.firebaseapp.com",
  projectId: "reduxpodcastproject",
  storageBucket: "reduxpodcastproject.appspot.com",
  messagingSenderId: "117898417164",
  appId: "1:117898417164:web:7e44f25289b0088ef24a29",
  measurementId: "G-5EQ3YMHKX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth, db, storage}