// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6Jgq96kFhF5bFJNGyQE8DA_TE8pJLCfA",
    authDomain: "evaluation-cc676.firebaseapp.com",
    projectId: "evaluation-cc676",
    storageBucket: "evaluation-cc676.appspot.com",
    messagingSenderId: "627352153637",
    appId: "1:627352153637:web:a85163f7d19f4800cc59cc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { app as default, db }