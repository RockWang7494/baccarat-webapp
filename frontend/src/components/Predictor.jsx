import React from 'react';
import { sampleHistory } from '../data/sampleHistory';
import { predictNext } from '../utils/predictor';

const Predictor = () => {
  const prediction = predictNext(sampleHistory);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">預測下一局結果</h2>
      <p className="text-blue-600 text-xl">👉 {prediction.toUpperCase()}</p>
    </div>
  );
};

export default Predictor;
