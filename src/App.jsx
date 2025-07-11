// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { saveResult, loadHistory } from "./utils/firebase";
import dragonPredictor from "./utils/dragonPredictor";
import knnPredict from "./utils/knn";

const LABELS = { 0: "莊", 1: "閒", 2: "和" };
const COLORS = { 0: "#ef4444", 1: "#3b82f6", 2: "#10b981" };

export default function App() {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [dragonTrend, setDragonTrend] = useState("");
  const [aiMode, setAiMode] = useState(false);

  // 一開始先從 Firebase 載入歷史紀錄
  useEffect(() => {
    async function fetchHistory() {
      const history = await loadHistory();
      if (history) setData(history);
    }
    fetchHistory();
  }, []);

  // 新增一筆結果
  const addResult = async (value) => {
    const newData = [...data, value];
    setData(newData);

    let pred;
    if (aiMode) {
      pred = await dragonPredictor(newData);
      setDragonTrend(pred);
    } else {
      pred = knnPredict(newData);
      setDragonTrend("");
    }

    setPrediction(pred);
    updateAccuracy(newData, pred);
  };

  // 刪除最後一筆
  const removeLast = () => {
    const newData = data.slice(0, -1);
    setData(newData);
    setPrediction("");
    setDragonTrend("");
    setAccuracy(0);
  };

  // 全部重設
  const resetAll = () => {
    setData([]);
    setPrediction("");
    setDragonTrend("");
    setAccuracy(0);
  };

  // 切換 AI 模式
  const toggleAiMode = () => setAiMode(!aiMode);

  // 存到 Firebase
  const saveToFirebase = async () => {
    await saveResult(data);
    alert("已儲存至 Firebase！");
  };

  // 計算準確率
  const updateAccuracy = (arr, pred) => {
    if (arr.length < 2) return;
    let correct = 0;
    // 用前一次的 prediction 跟當前結果比對
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === (i === arr.length - 1 ? pred : arr[i - 1])) {
        correct++;
      }
    }
    setAccuracy(((correct / (arr.length - 1)) * 100).toFixed(2));
  };

  return (
    <div className="p-4">
      {/* 標題 */}
      <h1 className="text-3xl font-bold text-center mb-6">百家樂預測</h1>

      {/* 三個按鈕：莊、閒、和 */}
      <div className="flex justify-center gap-4 mb-4">
        {Object.entries(LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => addResult(parseInt(key, 10))}
            className="text-white font-bold px-6 py-3 rounded-lg text-2xl"
            style={{ backgroundColor: COLORS[key] }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 預測結果 & 準確率 & 趨勢 */}
      <div className="text-center mb-4">
        <p>
          目前預測：<strong>{prediction !== "" ? LABELS[prediction] : ""}</strong>
        </p>
        <p>
          準確率：<strong>{accuracy}%</strong>
        </p>
        <p className="text-green-600 font-bold">{dragonTrend}</p>
      </div>

      {/* 操作按鈕 */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={removeLast}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          移除
        </button>
        <button
          onClick={resetAll}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          重設
        </button>
        <button
          onClick={saveToFirebase}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          儲存
        </button>
        <button
          onClick={toggleAiMode}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          AI 模式：{aiMode ? "開啟" : "關閉"}
        </button>
      </div>

      {/* 走勢圖 */}
      <h2 className="text-2xl font-bold mb-2">走勢圖</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.map((value, idx) => ({ idx: idx + 1, val: value }))}
        >
          <XAxis dataKey="idx" />
          <YAxis
            domain={[0, 2]}
            ticks={[0, 1, 2]}
            tickFormatter={(v) => LABELS[v]}
          />
          <Tooltip formatter={(v) => LABELS[v]} />
          <Line
            type="monotone"
            dataKey="val"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 歷史資料 */}
      <h2 className="text-xl font-bold mt-4 mb-2">歷史資料：</h2>
      <div className="flex flex-wrap">
        {data.map((v, i) => (
          <span key={i} className="mx-1">
            {LABELS[v]}
          </span>
        ))}
      </div>
    </div>
  );
}
