// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD9KqxAGwiZs_z6tPG8MBn8d-5LM_vbX0I",
//   authDomain: "movie-portal-2cc76.firebaseapp.com",
//   projectId: "movie-portal-2cc76",
//   storageBucket: "movie-portal-2cc76.firebasestorage.app",
//   messagingSenderId: "757791237168",
//   appId: "1:757791237168:web:d8f41fbb6524a05a2ff9f5"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

