// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
    apiKey: "AIzaSyDAjwOWepvZW4wi6xldqPBkG9p9_bjLlcg",
    authDomain: "offrrtoken.firebaseapp.com",
    projectId: "offrrtoken",
    storageBucket: "offrrtoken.appspot.com",
    messagingSenderId: "663305173350",
    appId: "1:663305173350:web:c71650d39859fcc71b70a7",
    measurementId: "G-CL12151V4V"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireStore = getFirestore(app);