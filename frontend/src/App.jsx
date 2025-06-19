import React from 'react';
import Predictor from './components/Predictor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">百家樂預測 App</h1>
        <Predictor />
      </div>
    </div>
  );
}

export default App;