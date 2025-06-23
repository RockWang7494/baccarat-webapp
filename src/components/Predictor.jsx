import React, { useState } from 'react';

const Predictor = () => {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');

  const handlePredict = () => {
    const outcomes = ['莊', '閒', '和'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    setPrediction(result);
    setHistory([...history, result]);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button 
        onClick={handlePredict}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        預測下一局
      </button>

      {prediction && (
        <div style={{ marginTop: '1rem', fontSize: '20px' }}>
          🧠 預測結果：<strong>{prediction}</strong>
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <h3>歷史預測紀錄：</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>第 {index + 1} 局：{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Predictor;
