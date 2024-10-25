// config/firebase.ts
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
// export const githubProvider = new GithubAuthProvider();
