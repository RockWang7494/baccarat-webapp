import React, { useState } from "react";

const labelMap = { "莊": 0, "閒": 1, "和": 2 };
const reverseLabelMap = ["莊", "閒", "和"];

// 簡單預測函數
function predictNext(history) {
  if (history.length < 3) return "不足三局";
  const last3 = history.slice(-3);
  if (last3.every(v => v === "閒")) return "莊";
  if (last3.every(v => v === "莊")) return "閒";
  return "莊";
}

export default function BaccaratPredictor() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState("");

  const handlePredict = () => {
    const clean = input.replace(/\\s|,|→/g, "").split("").filter(c => ["莊", "閒", "和"].includes(c));
    setHistory(clean);
    const next = predictNext(clean);
    setPrediction(next);
  };

  const handleClear = () => {
    setInput("");
    setPrediction("");
    setHistory([]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">百家樂走勢預測</h2>
      <input
        type="text"
        placeholder="請輸入走勢，如：閒閒莊和和..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2 mt-2">
        <button onClick={handlePredict} className="bg-blue-500 text-white px-4 py-1 rounded">預測下一局</button>
        <button onClick={handleClear} className="border px-4 py-1 rounded">清除</button>
      </div>
      {prediction && (
        <div className="text-lg mt-4">👉 預測下一局：<span className="font-bold text-blue-600">{prediction}</span></div>
      )}
    </div>
  );
}
