// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc6eY_V5UwGRqv03If-OsJQ3PlFMSMTqQ",
  authDomain: "react-blog-1b680.firebaseapp.com",
  projectId: "react-blog-1b680",
  storageBucket: "react-blog-1b680.appspot.com",
  messagingSenderId: "358068388504",
  appId: "1:358068388504:web:3853106c358876b702c6ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();