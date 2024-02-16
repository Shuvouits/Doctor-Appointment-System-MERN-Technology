import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNMJ-dsLRKg7gOw5Ki8Sdhj7iznKNp9xM",
  authDomain: "real-state-f1278.firebaseapp.com",
  projectId: "real-state-f1278",
  storageBucket: "real-state-f1278.appspot.com",
  messagingSenderId: "766074428975",
  appId: "1:766074428975:web:14d21b6130f52c3cc330da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
