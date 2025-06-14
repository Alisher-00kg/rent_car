import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmbcIfAvbOmgyxIhcS8O_KCSdY2J3hnXI",
  authDomain: "rentcar-b8ca8.firebaseapp.com",
  projectId: "rentcar-b8ca8",
  storageBucket: "rentcar-b8ca8.appspot.com",
  messagingSenderId: "691280216696",
  appId: "1:691280216696:web:b09ecab94d47ab20b0e38d",
  measurementId: "G-NRHVR5PTHD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const firebaseAuth = getAuth(app);
