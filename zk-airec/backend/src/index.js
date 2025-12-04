// Mock backend for zk-airec: no dependencies
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit-proof') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { age, pref } = JSON.parse(body);
        if (age == null || pref == null) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'age and pref required' }));
          return;
        }

        // Create temp input file
        const inputData = { age: Number(age), pref: Number(pref) };
        const inputFile = path.join(__dirname, '../../prover/temp_input.json');
        fs.writeFileSync(inputFile, JSON.stringify(inputData));

        // Generate proof
        execSync(`node ${path.join(__dirname, '../../prover/proof_generator.js')} ${inputFile}`, { stdio: 'inherit' });

        // Read generated proof
        const proofPath = path.join(__dirname, '../../prover/output/proof.json');
        const publicPath = path.join(__dirname, '../../prover/output/public.json');
        if (!fs.existsSync(proofPath)) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'proof generation failed' }));
          return;
        }
        const proof = JSON.parse(fs.readFileSync(proofPath));
        const pub = JSON.parse(fs.readFileSync(publicPath));
        const pubSignals = pub.map(x => Number(x));

        // Mock contract submission
        console.log('Mocking contract submission...');
        const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);

        // Cleanup temp file
        if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, txHash: mockTxHash, group: pubSignals[0] }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(5000, () => {
  console.log('Mock backend listening on http://localhost:5000');
});
