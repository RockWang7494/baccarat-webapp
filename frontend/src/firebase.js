// 1. 安裝 Firebase SDK（如果尚未安裝） // npm install firebase

// 2. 在你的 React 專案中建立 firebase.js

// src/firebase.js import { initializeApp } from "firebase/app"; import { getFirestore } from "firebase/firestore";

const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_PROJECT_ID.firebaseapp.com", projectId: "YOUR_PROJECT_ID", storageBucket: "YOUR_PROJECT_ID.appspot.com", messagingSenderId: "YOUR_SENDER_ID", appId: "YOUR_APP_ID" };

const app = initializeApp(firebaseConfig); const db = getFirestore(app);

export { db };

