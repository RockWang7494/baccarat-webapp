import React, { useState } from "react";

const labelMap = { "莊": 0, "閒": 1, "和": 2 }; const reverseLabelMap = ["莊", "閒", "和"];

// 簡單預測函數 function predictNext(history) { if (history.length < 3) return "不足三局"; const last3 = history.slice(-3); if (last3.every(v => v === "閒")) return "莊"; if (last3.every(v => v === "莊")) return "閒"; return "莊"; }

export default function BaccaratPredictor() { const [input, setInput] = useState(""); const [history, setHistory] = useState([]); const [prediction, setPrediction] = useState(""); const [record, setRecord] = useState([]); const [simulateResult, setSimulateResult] = useState([]); const [simCount, setSimCount] = useState(10);

const handlePredict = () => { const clean = input.replace(/\s|,|→/g, "").split("").filter(c => ["莊", "閒", "和"].includes(c)); setHistory(clean); const next = predictNext(clean); setPrediction(next); setRecord(prev => [...prev, { input: [...clean], prediction: next }]); };

const handleClear = () => { setInput(""); setPrediction(""); setHistory([]); setRecord([]); setSimulateResult([]); };

const handleSimulate = () => { let simHist = [...history]; const result = []; for (let i = 0; i < simCount; i++) { const next = predictNext(simHist); result.push(next); simHist.push(next); } setSimulateResult(result); };

return ( <div className="max-w-xl mx-auto mt-10 space-y-4"> <h2 className="text-xl font-bold">百家樂走勢預測</h2> <input type="text" placeholder="請輸入走勢，如：閒閒莊和和..." value={input} onChange={(e) => setInput(e.target.value)} className="w-full border p-2 rounded" /> <div className="flex gap-2 mt-2"> <button onClick={handlePredict} className="bg-blue-500 text-white px-4 py-1 rounded">預測下一局</button> <button onClick={handleClear} className="border px-4 py-1 rounded">清除</button> </div> {prediction && ( <div className="text-lg mt-4">👉 預測下一局：<span className="font-bold text-blue-600">{prediction}</span></div> )}

{record.length > 0 && (
    <div className="mt-4">
      <h3 className="font-semibold mb-1">預測紀錄：</h3>
      <ul className="text-sm list-disc pl-5 space-y-1">
        {record.map((r, i) => (
          <li key={i}>
            輸入：{r.input.join("")} → 預測：<span className="text-blue-600 font-bold">{r.prediction}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  <div className="mt-6">
    <h3 className="font-semibold mb-1">🔮 模擬連續對局</h3>
    <div className="flex gap-2 items-center mb-2">
      <label>模擬局數：</label>
      <input type="number" value={simCount} min={1} max={50} onChange={e => setSimCount(parseInt(e.target.value))} className="w-20 border px-2 py-1 rounded" />
      <button onClick={handleSimulate} className="bg-green-600 text-white px-4 py-1 rounded">開始模擬</button>
    </div>
    {simulateResult.length > 0 && (
      <div>
        <div className="text-sm">模擬結果：</div>
        <div className="text-lg font-mono bg-gray-100 p-2 rounded">
          {simulateResult.join(" → ")}
        </div>
      </div>
    )}
  </div>
</div>

); }

