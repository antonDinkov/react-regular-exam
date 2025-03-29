import { getFirestore, doc, setDoc, updateDoc, getDocs, getDoc, collection, addDoc, query, where } from "firebase/firestore"
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSjbxL9N2DMxDdY5VYHIgSS8xcEXT54xE",
  authDomain: "my-first-project-7cbf9.firebaseapp.com",
  databaseURL: "https://my-first-project-7cbf9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-first-project-7cbf9",
  storageBucket: "my-first-project-7cbf9.firebasestorage.app",
  messagingSenderId: "424606795900",
  appId: "1:424606795900:web:61a3a0683433959a3da1f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);

export { db, doc, setDoc, updateDoc, getDocs, getDoc, collection, addDoc, query, where, createUserWithEmailAndPassword, signInWithEmailAndPassword, auth, signOut, getIdToken};