// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDGP9z89uSVRr1-gExA679VNxsbZd5lmTA",
  authDomain: "idawebapp-1.firebaseapp.com",
  projectId: "idawebapp-1",
  storageBucket: "idawebapp-1.appspot.com",
  messagingSenderId: "308527365811",
  appId: "1:308527365811:web:091c6120dbd9c4378bfac6",
  measurementId: "G-9P77W0P0MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);