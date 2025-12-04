import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ResultDisplay() {
  const [msg, setMsg] = useState('No result yet.');

  useEffect(() => {
    // optionally poll backend or display instructions
  }, []);

  return (
    <div style={{ marginTop: 18 }}>
      <strong>Demo Result:</strong>
      <div style={{ marginTop: 8 }}>{msg}</div>
      <div style={{ marginTop: 12 }}>
        After running `prover/make_proof.sh`, press the button above to submit proof to the local verifier.
      </div>
    </div>
  );
}
