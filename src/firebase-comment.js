import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAR3f6y2wh7U6q94WzjhxKMLoa9-klqbwQ",
  authDomain: "manojshenbagaraj.firebaseapp.com",
  projectId: "manojshenbagaraj",
  storageBucket: "manojshenbagaraj.firebasestorage.app",
  messagingSenderId: "51944135479",
  appId: "1:51944135479:web:947ed235b43993fcac98b2",
  measurementId: "G-3C26BD3KXR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };