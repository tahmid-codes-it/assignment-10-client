import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ2flzapGdtq0MZy2jdYu9FLlQNXiNsIE",
  authDomain: "local-food-firebase.firebaseapp.com",
  projectId: "local-food-firebase",
  storageBucket: "local-food-firebase.appspot.com",   // FIXED
  messagingSenderId: "604012104306",
  appId: "1:604012104306:web:d376eb40c89e73f2b290eb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
