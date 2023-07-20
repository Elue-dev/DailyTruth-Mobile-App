import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCRVDwYThmulK-_ohxgGWHGEpzN7LLctgw",
  authDomain: "dailytruthapp.firebaseapp.com",
  projectId: "dailytruthapp",
  storageBucket: "dailytruthapp.appspot.com",
  messagingSenderId: "9751620876",
  appId: "1:9751620876:web:1a9119c0b1e7ea741e2d29",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore();
