// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDJhDVSBFaqgeRlfZ4cV1YhTf9pJptbK3s",
  authDomain: "twitter-clone-6b4c7.firebaseapp.com",
  projectId: "twitter-clone-6b4c7",
  storageBucket: "twitter-clone-6b4c7.appspot.com",
  messagingSenderId: "45112949734",
  appId: "1:45112949734:web:7a5781afd813d6c488f427",
  measurementId: "G-F0Z9FXWF80",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
