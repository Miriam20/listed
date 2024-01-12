import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhMDt3bAbZhCMq5_AMxgw-bc2G1lLvW1M",
  authDomain: "listed-3cfa1.firebaseapp.com",
  projectId: "listed-3cfa1",
  storageBucket: "listed-3cfa1.appspot.com",
  messagingSenderId: "322997094658",
  appId: "1:322997094658:web:b6cc4f864161ad1e2a1a1b",
  measurementId: "G-ZV86SPME7G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
