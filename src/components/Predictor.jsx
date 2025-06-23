import React, { useState } from 'react';

const Predictor = () => {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState('');

  const handleSelect = (choice) => {
    setHistory([...history, choice]);

    // 前三局不預測
    if (history.length + 1 < 4) {
      setPrediction('');
      return;
    }

    // 取最近三局
    const recent3 = [...history, choice].slice(-3);
    const count = { '莊': 0, '閒': 0, '和': 0 };

    recent3.forEach(item => {
      count[item] += 1;
    });

    const max = Math.max(...Object.values(count));
    const candidates = Object.entries(count)
      .filter(([_, v]) => v === max)
      .map(([k]) => k);

    const result = candidates[Math.floor(Math.random() * candidates.length)];
    setPrediction(result);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div>
        <button onClick={() => handleSelect('莊')}
          style={{ padding: '10px 20px', margin: '0 10px', fontSize: '16px' }}>
          莊
        </button>
        <button onClick={() => handleSelect('閒')}
          style={{ padding: '10px 20px', margin: '0 10px', fontSize: '16px' }}>
          閒
        </button>
        <button onClick={() => handleSelect('和')}
          style={{ padding: '10px 20px', margin: '0 10px', fontSize: '16px' }}>
          和
        </button>
      </div>

      {history.length >= 3 && prediction && (
        <div style={{ marginTop: '1rem', fontSize: '20px' }}>
          🔮 預測下一局：<strong>{prediction}</strong>
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <h3>歷史紀錄：</h3>
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
