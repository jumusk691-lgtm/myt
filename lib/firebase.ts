// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9JvroqZtwREJX51m6Jg_dRfYdvuuQHvU",
  authDomain: "trade-f600a.firebaseapp.com",
  databaseURL: "https://trade-f600a-default-rtdb.firebaseio.com",
  projectId: "trade-f600a",
  storageBucket: "trade-f600a.firebasestorage.app",
  messagingSenderId: "322191828273",
  appId: "1:322191828273:web:25a6f46512472d32013c10"
};

// Initialize Firebase (Prevent multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export auth and database
export const auth = getAuth(app);
export const database = getDatabase(app);
