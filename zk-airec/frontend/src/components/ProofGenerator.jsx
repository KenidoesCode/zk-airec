import React, { useState } from 'react';
import axios from 'axios';

export default function ProofGenerator() {
  const [status, setStatus] = useState('idle');
  const [age, setAge] = useState(25);
  const [pref, setPref] = useState(1);

  const generateAndSubmit = async () => {
    setStatus('generating proof...');
    try {
      const response = await axios.post('http://localhost:5000/submit-proof', { age: Number(age), pref: Number(pref) });
      setStatus(`Proof submitted! Group: ${response.data.group}, Tx: ${response.data.txHash}`);
    } catch (err) {
      setStatus('error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
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
