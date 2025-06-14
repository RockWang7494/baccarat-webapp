import React, { useState } from "react"; import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const labelMap = { "莊": 0, "閒": 1, "和": 2 }; const reverseLabelMap = ["莊", "閒", "和"];

function predictNext(history) { if (history.length < 3) return "不足三局"; const last3 = history.slice(-3); if (last3.every(v => v === "閒")) return "莊"; if (last3.every(v => v === "莊")) return "閒"; const count = { "莊": 0, "閒": 0, "和": 0 }; last3.forEach(c => count[c]++); return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b); }

export default function BaccaratPredictor() { const [input, setInput] = useState(""); const [history, setHistory] = useState([]); const [prediction, setPrediction] = useState(""); const [records, setRecords] = useState([]); const [accuracy, setAccuracy] = useState(null);

const handlePredict = () => { const clean = input.replace(/\s|,|→/g, "").split("").filter(c => ["莊", "閒", "和"].includes(c)); setHistory(clean); const next = predictNext(clean); setPrediction(next); const newRecords = [...records, { actual: null, predicted: next }]; setRecords(newRecords); updateAccuracy(newRecords); };

const handleClear = () => { setInput(""); setPrediction(""); setHistory([]); setRecords([]); setAccuracy(null); };

const handleAdd = (symbol) => { const updated = [...history, symbol]; setHistory(updated); const next = predictNext(updated); setPrediction(next); const newRecords = [...records, { actual: symbol, predicted: next }]; setRecords(newRecords); updateAccuracy(newRecords); };

const updateAccuracy = (records) => { const correct = records.filter(r => r.actual && r.actual === r.predicted).length; const total = records.filter(r => r.actual !== null).length; setAccuracy(total > 0 ? ((correct / total) * 100).toFixed(1) : null); };

const simulateFuture = (rounds = 5) => { let simHistory = [...history]; let simRecords = [...records]; for (let i = 0; i < rounds; i++) { const next = predictNext(simHistory); simRecords.push({ actual: null, predicted: next }); simHistory.push(next); } setHistory(simHistory); setRecords(simRecords); };

const generateRandomRounds = (n = 10) => { const options = ["莊", "閒", "和"]; const generated = Array.from({ length: n }, () => options[Math.floor(Math.random() * 3)]); const updated = [...history, ...generated]; setHistory(updated); setInput(updated.join("")); };

const chartData = history.map((label, index) => ({ name: index + 1, value: labelMap[label] ?? null })).filter(d => d.value !== null);

return ( <div className="max-w-xl mx-auto mt-10 space-y-4"> <h2 className="text-xl font-bold">百家樂走勢預測</h2>

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
    <button onClick={() => simulateFuture(5)} className="bg-purple-500 text-white px-4 py-1 rounded">模擬5局</button>
    <button onClick={() => generateRandomRounds(10)} className="bg-yellow-500 text-white px-4 py-1 rounded">隨機10局</button>
  </div>

  <div className="flex gap-2 mt-2">
    <button onClick={() => handleAdd("莊")} className="bg-red-500 text-white px-3 py-1 rounded">莊</button>
    <button onClick={() => handleAdd("閒")} className="bg-green-500 text-white px-3 py-1 rounded">閒</button>
    <button onClick={() => handleAdd("和")} className="bg-gray-500 text-white px-3 py-1 rounded">和</button>
  </div>

  {prediction && (
    <div className="text-lg mt-4">👉 預測下一局：<span className="font-bold text-blue-600">{prediction}</span></div>
  )}

  {accuracy !== null && (
    <div className="text-md mt-2">🎯 命中率：<span className="font-semibold">{accuracy}%</span></div>
  )}

  {records.length > 0 && (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-semibold">🧾 預測紀錄</h3>
      <ul className="text-sm list-disc pl-5">
        {records.map((r, i) => (
          <li key={i}>第{i + 1}局：預測👉 {r.predicted} {r.actual !== null ? `/ 實際👉 ${r.actual}` : ''}</li>
        ))}
      </ul>
    </div>
  )}

  <div className="mt-4">
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} domain={[0, 2]} tickFormatter={(v) => reverseLabelMap[v]} />
        <Tooltip formatter={(value) => reverseLabelMap[value]} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

); }

