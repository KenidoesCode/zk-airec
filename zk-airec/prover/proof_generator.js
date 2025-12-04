// proof_generator.js
// Mock proof generator to avoid dependencies
const path = require('path');
const fs = require('fs');

const inputFile = process.argv[2] || path.join(__dirname, 'sample_inputs/sample_user1.json');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

function main() {
  console.log('Mocking proof generation...');

  // Read input
  const input = JSON.parse(fs.readFileSync(inputFile));
  const age = input.age;
  const pref = input.pref;

  // Mock group classification based on age and pref
  let group = 0;
  if (age < 25 && pref === 1) group = 1;
  else if (age >= 25 && pref === 0) group = 2;
  else group = 3;

  // Mock proof
  const proof = {
    pi_a: ["123", "456", "1"],
    pi_b: [["789", "012"], ["345", "678"], ["1", "0"]],
    pi_c: ["901", "234", "1"],
    protocol: "groth16",
    curve: "bn128"
  };

  const publicSignals = [group.toString()];

  // Write outputs
  fs.writeFileSync(path.join(outputDir, 'proof.json'), JSON.stringify(proof, null, 1));
  fs.writeFileSync(path.join(outputDir, 'public.json'), JSON.stringify(publicSignals, null, 1));
  fs.writeFileSync(path.join(outputDir, 'witness.wtns'), Buffer.from('mock witness'));

  console.log('Mock proof generated in prover/output/');
  console.log(`Group: ${group}`);
}

main();
