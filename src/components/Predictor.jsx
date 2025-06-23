import React, { useState } from 'react';

const Predictor = () => {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');

  const handleRecord = (outcome) => {
    const newHistory = [...history, outcome];
    setHistory(newHistory);

    // 從第 4 局開始預測
    if (newHistory.length >= 3) {
      const outcomes = ['莊', '閒', '和'];
      const predicted = outcomes[Math.floor(Math.random() * outcomes.length)];
      setPrediction(predicted);
    } else {
      setPrediction('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>請點選本局結果：</h2>
      <div style={{ marginBottom: '1rem' }}>
        {['莊', '閒', '和'].map((label) => (
          <button
            key={label}
            onClick={() => handleRecord(label)}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {prediction && (
        <div style={{ marginTop: '1rem', fontSize: '20px' }}>
          🔮 預測下一局：<strong>{prediction}</strong>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>歷史紀錄：</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              第 {index + 1} 局：{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Predictor;
