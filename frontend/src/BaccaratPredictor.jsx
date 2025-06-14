import React, { useState, useMemo } from "react"; import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, CartesianGrid } from "recharts";

const labelMap = { "莊": 0, "閒": 1, "和": 2 }; const reverseLabelMap = ["莊", "閒", "和"];

function predictNext(history) { if (history.length < 3) return "不足三局"; const last3 = history.slice(-3); if (last3.every((v) => v === "閒")) return "莊"; if (last3.every((v) => v === "莊")) return "閒"; return "莊"; }

export default function BaccaratPredictor() { const [input, setInput] = useState(""); const [history, setHistory] = useState([]); const [prediction, setPrediction] = useState(""); const [records, setRecords] = useState([]); const [accuracy, setAccuracy] = useState(null); const [simulationRounds, setSimulationRounds] = useState(5); const [simulatedResults, setSimulatedResults] = useState([]);

const handleClear = () => { setInput(""); setPrediction(""); setHistory([]); setRecords([]); setAccuracy(null); setSimulatedResults([]); };

const handleAdd = (symbol) => { const updated = [...history, symbol]; setHistory(updated); const next = predictNext(updated); setPrediction(next); const updatedRecords = [...records, { actual: symbol, predicted: next }]; setRecords(updatedRecords); updateAccuracy(updatedRecords); simulateFuture(updated, simulationRounds); };

const updateAccuracy = (records) => { const correct = records.filter((r) => r.actual === r.predicted).length; const total = records.length; setAccuracy(total > 0 ? ((correct / total) * 100).toFixed(1) : null); };

const handleInputChange = (e) => { const value = e.target.value; setInput(value); const clean = value.replace(/\s|,|→/g, "").split("").filter((c) => ["莊", "閒", "和"].includes(c)); setHistory(clean); const next = predictNext(clean); setPrediction(next); updateAccuracy(records); simulateFuture(clean, simulationRounds); };

const simulateFuture = (startHistory, rounds) => { let future = []; let current = [...startHistory]; for (let i = 0; i < rounds; i++) { const next = predictNext(current); future.push(next); current.push(next); } setSimulatedResults(future); };

const chartData = useMemo(() => history.map((label, index) => ({ name: index + 1, value: labelMap[label], })), [history]);

const patternAnalysis = useMemo(() => { const result = { 莊: 0, 閒: 0 }; let last = null; let count = 0; history.forEach((val) => { if (val === last) { count++; } else { if (last === "莊" || last === "閒") { result[last] = Math.max(result[last], count); } count = 1; last = val; } }); if (last === "莊" || last === "閒") { result[last] = Math.max(result[last], count); } return [ { name: "莊連續次數", value: result["莊"] }, { name: "閒連續次數", value: result["閒"] } ]; }, [history]);

const streakStats = useMemo(() => { let longStreak = 0; let singleJumps = 0; let count = 1; for (let i = 1; i < history.length; i++) { if (history[i] === history[i - 1]) { count++; } else { if (count >= 3) longStreak++; if (count === 1) singleJumps++; count = 1; } } if (count >= 3) longStreak++; if (count === 1) singleJumps++; const total = longStreak + singleJumps; return { longStreak, singleJumps, longRate: total > 0 ? ((longStreak / total) * 100).toFixed(1) : 0, jumpRate: total > 0 ? ((singleJumps / total) * 100).toFixed(1) : 0 }; }, [history]);

return ( <div className="max-w-xl mx-auto mt-10 space-y-4"> <h2 className="text-xl font-bold">百家樂走勢預測</h2> <input
type="text"
placeholder="請輸入走勢，如：閒閒莊和和..."
value={input}
onChange={handleInputChange}
className="w-full border p-2 rounded"
/> <div className="flex gap-2 mt-2"> <button onClick={handleClear} className="border px-4 py-1 rounded">清除</button> </div> <div className="flex gap-2 mt-2"> <button onClick={() => handleAdd("莊")} className="bg-red-500 text-white px-3 py-1 rounded">莊</button> <button onClick={() => handleAdd("閒")} className="bg-green-500 text-white px-3 py-1 rounded">閒</button> <button onClick={() => handleAdd("和")} className="bg-gray-500 text-white px-3 py-1 rounded">和</button> </div> {prediction && ( <div className="text-lg mt-4">👉 預測下一局：<span className="font-bold text-blue-600">{prediction}</span></div> )} {accuracy !== null && ( <div className="text-md mt-2">🎯 命中率：<span className="font-semibold">{accuracy}%</span></div> )} {simulatedResults.length > 0 && ( <div className="text-sm mt-2">🔮 模擬預測（{simulationRounds} 局）：{simulatedResults.join(" → ")}</div> )} <div className="mt-4"> <ResponsiveContainer width="100%" height={200}> <LineChart data={chartData}> <XAxis dataKey="name" /> <YAxis allowDecimals={false} domain={[0, 2]} tickFormatter={(v) => reverseLabelMap[v]} /> <Tooltip formatter={(value) => reverseLabelMap[value]} /> <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} /> </LineChart> </ResponsiveContainer> </div> <div className="mt-4"> <h3 className="font-semibold">📊 走勢型態分析</h3> <ResponsiveContainer width="100%" height={150}> <BarChart data={patternAnalysis}> <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis allowDecimals={false} /> <Tooltip /> <Legend /> <Bar dataKey="value" fill="#82ca9d" /> </BarChart> </ResponsiveContainer> <div className="text-sm mt-2"> 📈 長龍次數：{streakStats.longStreak}（{streakStats.longRate}%）｜單跳次數：{streakStats.singleJumps}（{streakStats.jumpRate}%） </div> </div> </div> ); }

