import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwxs2J41jz2DLQXcj19byVtB43dPlwYJY",
  authDomain: "mindbloom-f5f06.firebaseapp.com",
  projectId: "mindbloom-f5f06",
  appId: "1:495718895172:web:f63fd58f598321ba653611",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
