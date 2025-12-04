#!/usr/bin/env bash
set -e

# Ensure circom & snarkjs are available
if ! command -v circom >/dev/null 2>&1; then
  echo "circom not found. Install: npm i -g circom"
  exit 1
fi
if ! command -v snarkjs >/dev/null 2>&1; then
  echo "snarkjs not found. Install: npm i -g snarkjs"
  exit 1
fi

mkdir -p wasm
cd circom

echo "[1/4] Compile group_classifier.circom -> group_classifier.r1cs"
circom group_classifier.circom --r1cs --wasm --sym -o ../wasm

echo "[2/4] Compile range_proof.circom -> range_proof.r1cs"
circom range_proof.circom --r1cs --wasm --sym -o ../wasm

cd ../wasm

echo "[3/4] Setup trusted ceremony & zkey for group_classifier"
snarkjs groth16 setup group_classifier.r1cs pot12_final.ptau group_classifier_0000.zkey
snarkjs zkey contribute group_classifier_0000.zkey group_classifier_final.zkey --name="dev" -v

echo "[4/4] Export verifier JSON for solidity"
snarkjs zkey export verificationkey group_classifier_final.zkey group_classifier_verification_key.json
snarkjs zkey export solidityverifier group_classifier_final.zkey ../contracts/verifier/Verifier.sol

echo "Build finished. Artifacts are in circuits/wasm and contracts/verifier/"
