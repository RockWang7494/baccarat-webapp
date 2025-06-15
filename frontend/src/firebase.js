// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyCY_FH81SfoFghi2xp69-8-1n5pn11V3Yg",
  authDomain: "baccarat-predictor-c5e6b.firebaseapp.com",
  projectId: "baccarat-predictor-c5e6b",
  storageBucket: "baccarat-predictor-c5e6b.appspot.com",
  messagingSenderId: "455344532976",
  appId: "1:455344532976:web:6606d1c9799bbbd0e1c135",
  measurementId: "G-Q922F4DNZS"
};

// 初始化 Firebase App
const app = initializeApp(firebaseConfig);

// 初始化 Firestore
const db = getFirestore(app);

// 匯出
export { app, db };