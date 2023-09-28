// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCxNNzDVKfVg0Kb9hY8FEIFkxQ0bsxUn4",
  authDomain: "quizapp-66801.firebaseapp.com",
  projectId: "quizapp-66801",
  storageBucket: "quizapp-66801.appspot.com",
  messagingSenderId: "266723587051",
  appId: "1:266723587051:web:7acae12cc7c528d7c15fae",
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
