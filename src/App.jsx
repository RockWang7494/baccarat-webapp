import React from 'react';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ color: '#333' }}>🎲 百家樂預測工具</h1>
      <p style={{ fontSize: '1.2rem' }}>
        歡迎使用本工具，預測下一步可能開出「莊」「閒」或「和」。
      </p>
    </div>
  );
}

export default App;
