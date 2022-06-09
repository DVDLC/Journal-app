
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAWz0km-tguKKZ6pAQIaFUnvoty9rAqwws",
    authDomain: "react-app-cursos-1d31f.firebaseapp.com",
    projectId: "react-app-cursos-1d31f",
    storageBucket: "react-app-cursos-1d31f.appspot.com",
    messagingSenderId: "954234289903",
    appId: "1:954234289903:web:bb7c0d6d5261956712651a",
    measurementId: "G-KR54Y0FH9Z"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore( app )
  const googleAuthProvider = new GoogleAuthProvider()

  export {
      db, 
      googleAuthProvider
  }