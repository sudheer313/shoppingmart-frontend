import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUKET,
    messagingSenderId: process.env.REACT_APP_APIKEY,
    appId: process.env.REACT_APP_APPID
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
//named export
export const auth=getAuth();

export const googleProvider = new GoogleAuthProvider();

//default export
export default app;