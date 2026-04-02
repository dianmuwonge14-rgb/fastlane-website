import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// YOUR CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyA2MBWKrUuZWS3XRQVv3836CVwQS7NrG_4",
    authDomain: "fastlane-marketplace.firebaseapp.com",
    projectId: "fastlane-marketplace",
    storageBucket: "fastlane-marketplace.firebasestorage.app",
    messagingSenderId: "193589920178",
    appId: "1:193589920178:web:dd0aec5dd6b1a8a7a3e4ab",
    measurementId: "G-04F57XHYP3"
};

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// MAKE GLOBAL
window.db = db;
