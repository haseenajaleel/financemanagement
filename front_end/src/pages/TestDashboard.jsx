import React from 'react';

export default function TestDashboard() {
  return (
    <div style={{ minHeight: '100vh', padding: '30px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ textAlign: 'center' }}> FINMAN Dashboard Test</h1>

      <div style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '40px auto'
      }}>
        <p>This is a clean test dashboard layout.</p>

        <p>Try loading only this layout first.</p>
      </div>
    </div>
  );
}
