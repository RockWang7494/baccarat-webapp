// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 若你要用資料庫功能

const firebaseConfig = {
  apiKey: "AIzaSyCY_FH81SfoFghi2xp69-8-1n5pn11V3Yg",
  authDomain: "baccarat-predictor-c5e6b.firebaseapp.com",
  projectId: "baccarat-predictor-c5e6b",
  storageBucket: "baccarat-predictor-c5e6b.firebasestorage.app",
  messagingSenderId: "455344532976",
  appId: "1:455344532976:web:6606d1c9799bbbd0e1c135",
  measurementId: "G-Q922F4DNZS"
};

// 初始化 Firebase App
const app = initializeApp(firebaseConfig);

// 你可選擇使用的服務
const analytics = getAnalytics(app);
const db = getFirestore(app); // 若要存資料進 Firestore

// 匯出
export { app, analytics, db };