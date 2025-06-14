import React, { useState, useRef } from "react"; import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"; import * as XLSX from "xlsx";

const labelMap = { "莊": 0, "閒": 1, "和": 2 }; const reverseMap = { 0: "莊", 1: "閒", 2: "和" };

// 初始化並過濾預設歷史資料中的非法符號 const rawDefault = "莊莊莊閒閒閒莊閒莊閒閒閒閒閒莊閒閒和莊閒閒莊莊閒莊閒莊莊莊莊閒閒和閒莊閒莊和和".split(""); const defaultHistory = rawDefault.filter(c => Object.prototype.hasOwnProperty.call(labelMap, c));

const errorLogRef = { current: [] };

function isValidSymbol(symbol) { return Object.prototype.hasOwnProperty.call(labelMap, symbol); }

function trainModel(history, inputLength) { const data = []; const globalCounts = { 0: 0, 1: 0, 2: 0 }; errorLogRef.current = [];

for (let i = inputLength; i < history.length; i++) { const row = []; let valid = true;

for (let j = inputLength; j > 0; j--) {
  const symbol = history[i - j];
  if (!isValidSymbol(symbol)) {
    const msg = `無效輸入符號 '${symbol}'，在 index ${i - j}`;
    console.warn(msg);
    errorLogRef.current.push(msg);
    valid = false;
    break;
  }
  row.push(labelMap[symbol]);
}

const outputSymbol = history[i];
if (!valid || !isValidSymbol(outputSymbol)) {
  if (!isValidSymbol(outputSymbol)) {
    const msg = `無效預測符號 '${outputSymbol}'，在 index ${i}`;
    console.warn(msg);
    errorLogRef.current.push(msg);
  }
  continue;
}

row.push(labelMap[outputSymbol]);
data.push(row);
globalCounts[labelMap[outputSymbol]]++;

}

return (input) => { if (!Array.isArray(input) || input.length !== inputLength || input.some(v => typeof v !== "number" || Number.isNaN(v))) { const msg = 輸入格式錯誤，必須是長度為 ${inputLength} 的數字陣列：${JSON.stringify(input)}; console.error(msg); errorLogRef.current.push(msg); return { result: 0, distribution: [ { label: "莊", count: 0 }, { label: "閒", count: 0 }, { label: "和", count: 0 } ] }; }

const inputStr = input.join("");
const votes = {};

for (const row of data) {
  const key = row.slice(0, inputLength).join("");
  if (key === inputStr) {
    const label = row[inputLength];
    votes[label] = (votes[label] || 0) + 1;
  }
}

const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
if (sortedVotes.length > 0) {
  return {
    result: Number(sortedVotes[0][0]),
    distribution: sortedVotes.map(([label, count]) => ({ label: reverseMap[label], count }))
  };
}

const fallback = Object.entries(globalCounts).sort((a, b) => b[1] - a[1]);
return {
  result: fallback.length > 0 ? Number(fallback[0][0]) : 0,
  distribution: fallback.map(([label, count]) => ({ label: reverseMap[label], count }))
};

}; }

function getErrorLog() { return [...errorLogRef.current]; }

export { trainModel, defaultHistory, labelMap, reverseMap, getErrorLog };

