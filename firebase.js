// IMPORT FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// EXPORT AUTH
export const auth = getAuth(app);
