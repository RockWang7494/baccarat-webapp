import React, { useState } from 'react';
import { predictNextResult } from '../utils/predictor';

export default function Predictor() {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');

  const addResult = (result) => {
    const newHistory = [...history, result];
    setHistory(newHistory);
    setPrediction(predictNextResult(newHistory));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">百家樂預測器</h2>
      <div className="mb-4">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => addResult('莊')}>莊</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => addResult('閒')}>閒</button>
      </div>
      <div className="mb-2">
        <strong>歷史紀錄：</strong>{history.join('、')}
      </div>
      <div>
        <strong>預測下手：</strong>
        <span className="text-lg text-green-600 ml-2">{prediction}</span>
      </div>
    </div>
  );
}
