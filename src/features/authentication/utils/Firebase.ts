import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfA-a3kQX4jSiM_VpgvTqwZJ_F5T9dsfU",
  authDomain: "gradetracker-833d3.firebaseapp.com",
  projectId: "gradetracker-833d3",
  storageBucket: "gradetracker-833d3.firebasestorage.app",
  messagingSenderId: "946587282387",
  appId: "1:946587282387:web:ac750c3dd808b7d4051d26",
  measurementId: "G-R196Y06LZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getFirestore(app);
