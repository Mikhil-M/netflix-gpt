import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "netflixgpt-6887b.firebaseapp.com",
    projectId: "netflixgpt-6887b",
    storageBucket: "netflixgpt-6887b.firebasestorage.app",
    messagingSenderId: "68310419182",
    appId: "1:68310419182:web:c9b7a12b52c0b019a215ff",
    measurementId: "G-2E5YXRP43Q"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();