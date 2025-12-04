# zk-design.md

## High-level
User privately categorizes themselves (age/preferences). The circuit computes a public group id; the proof proves correctness of the classification without revealing private inputs.

### Circuit choices
- Circom + Groth16 (snarkjs) used for fast prototyping and widely available verifier generator.
- Comparators: circomlib LessThan for range checks.
- Commitment pattern: user state should be committed via Poseidon hash in production. This PoC uses a placeholder commitment.

### Security considerations
- Prevent replay: include session-nonce or epoch in circuit public inputs (future work).
- Proof size & gas: Groth16 proofs are succinct; verifier gas cost is non-trivial — we export solidity verifier and annotate gas in `contracts/verifier/`.
- Batch verification: include VerifierV2 notes for aggregation (future work).

### Roadmap
- Replace raw comparators with optimized range proof.
- Use Noir for faster developer ergonomics.
- Add Poseidon-based commitments and Merkle membership.
- Add recursive proofs to aggregate daily attestations.
