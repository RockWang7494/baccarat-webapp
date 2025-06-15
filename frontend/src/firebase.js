// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔧 Firebase 專案設定（來自 Firebase 控制台）
const firebaseConfig = {
  apiKey: "AIzaSyCY_FH81SfoFghi2xp69-8-1n5pn11V3Yg",
  authDomain: "baccarat-predictor-c5e6b.firebaseapp.com",
  projectId: "baccarat-predictor-c5e6b",
  storageBucket: "baccarat-predictor-c5e6b.appspot.com",
  messagingSenderId: "455344532976",
  appId: "1:455344532976:web:6606d1c9799bbbd0e1c135",
  measurementId: "G-Q922F4DNZS" // 如未使用 Analytics 可省略
};

// ✅ 初始化 Firebase
const app = initializeApp(firebaseConfig);

// ✅ 初始化 Firestore
const db = getFirestore(app);

// ✅ 匯出供其他檔案使用
export { app, db };