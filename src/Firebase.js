import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHFZbLLT-QrUaPssco_-a18NtPk_Zl8rM",
  authDomain: "echo-a2bac.firebaseapp.com",
  projectId: "echo-a2bac",
  storageBucket: "echo-a2bac.appspot.com",
  messagingSenderId: "56784142923",
  appId: "1:56784142923:web:0389456f947fdafc8043ce",
  measurementId: "G-9JQ2SFZHLX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
