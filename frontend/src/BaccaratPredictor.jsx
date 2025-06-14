import React, { useState, useEffect } from "react"; import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const labelMap = { "莊": 0, "閒": 1, "和": 2 }; const reverseLabelMap = ["莊", "閒", "和"];

function predictNext(history) { if (history.length < 3) return "不足三局"; const last3 = history.slice(-3); if (last3.every(v => v === "閒")) return "莊"; if (last3.every(v => v === "莊")) return "閒"; return "莊"; }

function getStats(history) { const counts = { "莊": 0, "閒": 0, "和": 0 }; for (let c of history) { if (counts.hasOwnProperty(c)) counts[c]++; } return Object.entries(counts).map(([label, count]) => ({ label, count })); }

function formatTrend(history) { return history.map((h, i) => ({ index: i + 1, label: h, value: labelMap[h] })); }

export default function BaccaratPredictor() { const [input, setInput] = useState(""); const [history, setHistory] = useState([]); const [prediction, setPrediction] = useState(""); const [records, setRecords] = useState([]);

useEffect(() => { const clean = input.replace(/\s|,|→/g, "").split("").filter(c => ["莊", "閒", "和"].includes(c)); setHistory(clean); const next = predictNext(clean); setPrediction(next); if (clean.length >= 3) { const actual = clean.at(-1); const recent = clean.slice(-4, -1).join(""); const predicted = predictNext(clean.slice(0, -1)); setRecords(prev => [...prev, { input: recent, prediction: predicted, actual, hit: predicted === actual }]); } }, [input]);

const handleClear = () => { setInput(""); setPrediction(""); setHistory([]); setRecords([]); };

const total = records.length; const hits = records.filter(r => r.hit).length; const accuracy = total > 0 ? ((hits / total) * 100).toFixed(1) : "0.0";

return ( <div className="max-w-xl mx-auto mt-10 space-y-4"> <h2 className="text-xl font-bold">百家樂走勢預測</h2> <input type="text" placeholder="請輸入走勢，如：閒閒莊和和..." value={input} onChange={(e) => setInput(e.target.value)} className="w-full border p-2 rounded" />

<div className="flex gap-2 mt-2">
    <button onClick={handleClear} className="border px-4 py-1 rounded">清除</button>
  </div>

  {prediction && (
    <div className="text-lg mt-4">👉 預測下一局：<span className="font-bold text-blue-600">{prediction}</span></div>
  )}

  <div className="mt-6">
    <h3 className="font-semibold">出現次數統計</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={getStats(history)}>
        <XAxis dataKey="label" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {history.length > 0 && (
    <div className="mt-6">
      <h3 className="font-semibold">📈 走勢折線圖</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formatTrend(history)}>
          <XAxis dataKey="index" />
          <YAxis ticks={[0, 1, 2]} domain={[0, 2]} tickFormatter={(v) => reverseLabelMap[v]} />
          <Tooltip formatter={(v) => reverseLabelMap[v]} labelFormatter={(l) => `局數 ${l}`} />
          <Line type="monotone" dataKey="value" stroke="#10b981" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}

  {records.length > 0 && (
    <div className="mt-6">
      <h3 className="font-semibold">🧾 預測紀錄與命中率</h3>
      <p className="text-sm">🎯 命中率：{hits} / {total}（{accuracy}%）</p>
      <ul className="text-sm list-disc pl-5 mt-1">
        {records.map((rec, i) => (
          <li key={i} className={rec.hit ? "text-green-600" : "text-red-600"}>
            最近三局：{rec.input} → 預測：{rec.prediction}，實際：{rec.actual}（{rec.hit ? "✔ 正確" : "✘ 錯誤"}）
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

); }

