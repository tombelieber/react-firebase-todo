// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// auth.languageCode = "zh_tw"; // 繁體

export const generateReCaptcha = (elementId: string) => {
  // // @ts-ignore
  // if (window.recaptchaVerifier?.destroyed === false) return;

  // @ts-ignore
  window.recaptchaVerifier = new RecaptchaVerifier(
    elementId,
    { size: "invisible" },
    auth,
  );
};

export const getRecaptchaVerifier = () => {
  // @ts-ignore
  return window.recaptchaVerifier as RecaptchaVerifier;
};

// Create a reference with an initial file path and name
export const storage = getStorage();
