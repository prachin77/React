// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFUchRguJr8BYFOS4oelk_g69UetNk0UY",
  authDomain: "blogweb-9b28d.firebaseapp.com",
  projectId: "blogweb-9b28d",
  storageBucket: "blogweb-9b28d.appspot.com",
  messagingSenderId: "212525301717",
  appId: "1:212525301717:web:5f874061b800a2d5b1875c",
  measurementId: "G-CB4TTX1TWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth , db , storage};