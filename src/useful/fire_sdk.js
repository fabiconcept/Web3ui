// Import the functions you need from the SDKs you need
import { initializeApp } from "https://github.com/firebase/firebase-js-sdk/tree/master/packages/app";
import { getAnalytics } from "https://github.com/firebase/firebase-js-sdk/tree/master/packages/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.App_apiKey,
  authDomain: process.env.App_authDomain,
  projectId: process.env.App_projectId,
  storageBucket: process.env.App_storageBucket,
  messagingSenderId: process.env.App_msgSenderId,
  appId: process.env.App_id,
  measurementId: process.env.App_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);