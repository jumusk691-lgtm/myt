import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAH3rgHd_7IE2KBmd2FTbc_4vmoKiSulA",
  authDomain: "trade-f600a.firebaseapp.com", 
  databaseURL: "https://trade-f600a-default-rtdb.firebaseio.com",
  projectId: "trade-f600a",
  storageBucket: "trade-f600a.firebasestorage.app",
  messagingSenderId: "322191828273",
  appId: "1:322191828273:android:34e8fb8abdf9815b013c10"
};

// Firebase initialize karo
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const database = getDatabase(app);
