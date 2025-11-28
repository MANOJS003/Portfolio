import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAR3f6y2wh7U6q94WzjhxKMLoa9-klqbwQ",
  authDomain: "manojshenbagaraj.firebaseapp.com",
  projectId: "manojshenbagaraj",
  storageBucket: "manojshenbagaraj.firebasestorage.app",
  messagingSenderId: "51944135479",
  appId: "1:51944135479:web:947ed235b43993fcac98b2",
  measurementId: "G-3C26BD3KXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
