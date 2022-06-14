import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6Yhdn7eLe9R5lT8E9D6oHfvVzNsHlQrw",
  authDomain: "todo-ef108.firebaseapp.com",
  databaseURL: "https://todo-ef108-default-rtdb.firebaseio.com",
  projectId: "todo-ef108",
  storageBucket: "todo-ef108.appspot.com",
  messagingSenderId: "274990843496",
  appId: "1:274990843496:web:2dcfe1f7268ce920319ddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();