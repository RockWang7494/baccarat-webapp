import React from 'react';
import Predictor from './components/Predictor';

function App() {
  return (
    <div style={{
      fontFamily: 'sans-serif',
      padding: '1rem',
      textAlign: 'center',
    }}>
      <h1>🎲 百家樂預測工具</h1>
      <p>歡迎使用本工具，預測下一步可能開出「莊」「閒」或「和」。</p>
      <Predictor />
    </div>
  );
}

export default App;
