import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, CartesianGrid
} from "recharts";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const labelMap = { "莊": 0, "閒": 1, "和": 2 };
const reverseLabelMap = ["莊", "閒", "和"];

function predictNext(history) {
  if (history.length < 3) return "不足三局";
  const last = history[history.length - 1];
  const secondLast = history[history.length - 2];
  const thirdLast = history[history.length - 3];

  const pattern = `${thirdLast}${secondLast}${last}`;
  const patterns = {};
  for (let i = 0; i < history.length - 3; i++) {
    const seq = `${history[i]}${history[i+1]}${history[i+2]}`;
    const next = history[i+3];
    if (seq === pattern) {
      patterns[next] = (patterns[next] || 0) + 1;
    }
  }

  const sorted = Object.entries(patterns).sort((a,b) => b[1]-a[1]);
  if (sorted.length > 0) return sorted[0][0];
  return last === "莊" ? "閒" : "莊"; // fallback
}

export default function BaccaratPredictor() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [records, setRecords] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [simulationRounds, setSimulationRounds] = useState(5);
  const [simulatedResults, setSimulatedResults] = useState([]);
  const [predictionLog, setPredictionLog] = useState([]);

  const handleClear = () => {
    setInput("");
    setPrediction("");
    setHistory([]);
    setRecords([]);
    setAccuracy(null);
    setSimulatedResults([]);
    setPredictionLog([]);
  };

  const handleAdd = async (symbol) => {
    const updated = [...history, symbol];
    setHistory(updated);
    const next = predictNext(updated);
    setPrediction(next);
    const updatedRecords = [...records, { actual: symbol, predicted: next }];
    setRecords(updatedRecords);
    updateAccuracy(updatedRecords);
    simulateFuture(updated, simulationRounds);
    setPredictionLog(prev => [...prev, { round: updated.length, actual: symbol, predicted: next }]);

    // Fire