// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyB6Yhdn7eLe9R5lT8E9D6oHfvVzNsHlQrw",
  authDomain: "todo-ef108.firebaseapp.com",
  projectId: "todo-ef108",
  storageBucket: "todo-ef108.appspot.com",
  messagingSenderId: "274990843496",
  appId: "1:274990843496:web:2dcfe1f7268ce920319ddd"
});

const db = firebaseApp.firestore();
export default db;