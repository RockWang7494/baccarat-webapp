<<<<<<< HEAD
import React, { useState } from 'react';
import { sampleHistory } from './data/sampleHistory';
import { predictNext } from './utils/predictor';
import Predictor from './components/Predictor';

// 英文轉中文
const convertToChinese = (word) => {
  if (word === 'banker') return '莊家';
  if (word === 'player') return '閒家';
  return word;
};

function App() {
  const [history, setHistory] = useState(sampleHistory);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    const result = predictNext(history);
    setPrediction(result);
  };

  const handleChangeData = () => {
    setHistory([...sampleHistory]);
    setPrediction(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">百家樂預測 App</h1>

      <button
        onClick={handlePredict}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        預測下一局
      </button>

      <button
        onClick={handleChangeData}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
      >
        換資料
      </button>

      {prediction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">👉 預測結果：</h2>
          <p
            className={`text-2xl font-bold ${
              prediction === 'banker' ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {convertToChinese(prediction)}
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">歷史紀錄：</h3>
        <ul className="list-disc ml-6">
          {history.map((item, index) => (
            <li key={index}>
              第 {item.round} 局：{convertToChinese(item.result)}
            </li>
          ))}
        </ul>
=======
import React from 'react';
import Predictor from './components/Predictor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">百家樂預測 App</h1>
        <Predictor />
>>>>>>> 5bb0cc86d46028f8088d31b86fefe75e0325c49f
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
import React, { useState } from 'react';
import { sampleHistory } from './data/sampleHistory';
import { predictNext } from './utils/predictor';
import Predictor from './components/Predictor';

// 英文轉中文
const convertToChinese = (word) => {
  if (word === 'banker') return '莊家';
  if (word === 'player') return '閒家';
  return word;
};

function App() {
  const [history, setHistory] = useState(sampleHistory);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    const result = predictNext(history);
    setPrediction(result);
  };

  const handleChangeData = () => {
    setHistory([...sampleHistory]);
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">百家樂預測 App</h1>

        <button
          onClick={handlePredict}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          預測下一局
        </button>

        <button
          onClick={handleChangeData}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
        >
          換資料
        </button>

        {prediction && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">👉 預測結果：</h2>
            <p
              className={`text-2xl font-bold ${
                prediction === 'banker' ? 'text-red-500' : 'text-green-600'
              }`}
            >
              {convertToChinese(prediction)}
            </p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">歷史紀錄：</h3>
          <ul className="list-disc ml-6">
            {history.map((item, index) => (
              <li key={index}>
                第 {item.round} 局：{convertToChinese(item.result)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App
