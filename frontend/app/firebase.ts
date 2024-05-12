
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyBkdfNwrZsiA1nBgIBiP2Uz8f0X2ux4MaM",
  authDomain: "urban-pulse-4d160.firebaseapp.com",
  projectId: "urban-pulse-4d160",
  storageBucket: "urban-pulse-4d160.appspot.com",
  messagingSenderId: "320036774093",
  appId: "1:320036774093:web:b686a71ae50aef4d050984",
  measurementId: "G-3LP0MY4TQ9"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
