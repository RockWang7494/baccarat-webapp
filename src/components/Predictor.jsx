import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const labelMap = { "莊": 0, "閒": 1, "和": 2 };
const reverseLabelMap = ["莊", "閒", "和"];

// 模擬預測函數
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
    const clean = input.replace(/\s|,|→/g, "").split("").filter(c => ["莊", "閒", "和"].includes(c));
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
    <Card className="p-4 bg-white rounded shadow">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">百家樂走勢預測</h2>
        <div className="mb-4">
          <Input
            placeholder="請輸入走勢，如：閒閒莊和和..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="mb-4 flex gap-2">
          <Button onClick={handlePredict} className="bg-blue-500">預測下一局</Button>
          <Button onClick={handleClear} className="bg-red-500">清除</Button>
        </div>
        {prediction && (
          <div className="text-lg text-green-600">👉 預測下一局：{prediction}</div>
        )}
      </CardContent>
    </Card>
  );
}
