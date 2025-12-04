import React, { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [age, setAge] = useState(25);
  const [pref, setPref] = useState(1);

  const generateAndSubmit = async () => {
    setStatus('generating proof...');
    try {
      const response = await fetch('http://localhost:5000/submit-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: Number(age), pref: Number(pref) })
      });
      const data = await response.json();
      if (data.ok) {
        setStatus(`Proof submitted! Group: ${data.group}, Tx: ${data.txHash}`);
      } else {
        setStatus('error: ' + data.error);
      }
    } catch (err) {
      setStatus('error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, Arial' }}>
      <h1>zk-AI-Rec — Demo</h1>
      <p>Generate ZK proof for user input and submit to the on-chain verifier (mock demo).</p>
      <div style={{ marginBottom: 12 }}>
        <label>Age: <input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Preference (0 or 1): <input type="number" min="0" max="1" value={pref} onChange={(e) => setPref(e.target.value)} /></label>
      </div>
      <button onClick={generateAndSubmit} style={{ padding: 12, fontSize: 16 }}>
        Generate Proof & Submit
      </button>
      <div style={{ marginTop: 12 }}>{status}</div>
    </div>
  );
}
