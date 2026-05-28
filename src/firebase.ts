import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDgc00pz2xQTjfm_eJYmxsaXleFBkzwEcA",
  authDomain: "blynticconz.firebaseapp.com",
  projectId: "blynticconz",
  storageBucket: "blynticconz.firebasestorage.app",
  messagingSenderId: "1032404067700",
  appId: "1:1032404067700:web:1681df85e88129651b3821",
  measurementId: "G-C2FG6XZR4M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
// export const db = getFirestore(app); // Firestore not used yet
