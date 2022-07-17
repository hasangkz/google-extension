import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAP4fGtACV67yh9D9_XfC9sNHmippbGAc",
  authDomain: "extension-e6768.firebaseapp.com",
  projectId: "extension-e6768",
  storageBucket: "extension-e6768.appspot.com",
  messagingSenderId: "145228421888",
  appId: "1:145228421888:web:6771653f385a5acd4a71e5",
  measurementId: "G-TNJ0TV8HYD",
};

export const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const auth = getAuth(app);

export const signUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateCurrentUser(auth, { name });
  return name;
};
export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
