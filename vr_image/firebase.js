// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeRcNQWe_3uLviyce2q1ktL_1TzU7nN4I",
  authDomain: "vr-image-285ac.firebaseapp.com",
  projectId: "vr-image-285ac",
  storageBucket: "vr-image-285ac.appspot.com",
  messagingSenderId: "589934469186",
  appId: "1:589934469186:web:a7787a55641a34d2ee4ddb",
  measurementId: "G-983N90R1XC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize storage

// Export storage
export { storage };
