// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_7g9dxAMOJIwPX1SU0Z3qxDbSTCxiyGM",
    authDomain: "form-68ca8.firebaseapp.com",
    projectId: "form-68ca8",
    storageBucket: "form-68ca8.appspot.com",
    messagingSenderId: "458197924677",
    appId: "1:458197924677:web:f4730bf10b57da99e95c2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { ref, app as default, db }