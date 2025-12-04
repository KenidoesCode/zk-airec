# ZeroKnowledge-AiRecommendations 🚀

**ZK-AI-Rec — Privacy-Preserving Personalized Recommendations Using Zero-Knowledge Proofs**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Zero-Knowledge Proofs](https://img.shields.io/badge/ZKP-Groth16-blue)](https://z.cash/technology/groth16/)
[![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-orange)](https://ethereum.org/)

> **Elevator Pitch:** Client proves "I belong to preference group X" _without revealing_ private attributes like age or preferences. Proof verified on-chain for privacy-preserving AI recommendations. Full demo in < 10 minutes!

## 🌟 Features

- **🔒 Privacy-First:** Zero-knowledge proofs ensure user data stays private
- **🤖 AI-Powered:** Personalized recommendations based on user groups
- **⛓️ On-Chain Verification:** Smart contracts verify proofs without revealing secrets
- **⚡ Fast Demo:** Complete end-to-end flow in under 10 minutes
- **🛠️ No Dependencies:** Fully functional demo without external installations
- **🎨 Modern UI:** Clean, responsive web interface
- **📊 Real-Time Proof Generation:** Generate and verify ZK proofs instantly

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │───▶│  Proof Generation│───▶│ Smart Contract  │
│   (Age, Pref)   │    │   (ZK Circuit)   │    │   Verification   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │   Backend API   │    │   On-Chain       │
│   (React)       │    │   (Node.js)     │    │   Storage        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components

- **Circuits:** ZK circuits written in Circom for group classification
- **Prover:** Node.js service generating Groth16 proofs
- **Backend:** REST API handling proof submission and verification
- **Frontend:** React app for user interaction
- **Contracts:** Solidity verifier contracts for on-chain proof validation

## 🚀 Quick Start (No Dependencies!)

### Prerequisites

- Node.js >= 18.0.0
- That's it! No global npm installs, no Circom, no SnarkJS, no Hardhat.

### Run the Full Demo

1. **Clone the repository**

   ```bash
   git clone https://github.com/KenidoesCode/zk-airec.git
   cd zk-airec
   ```

2. **Start the Backend**

   ```bash
   cd backend/src
   node index.js
   ```

   Backend runs on http://localhost:5000

3. **Open the Demo**
   Open `demo.html` in your browser (double-click or `start demo.html`)

4. **Generate a Proof**
   - Enter your age and preference (0 or 1)
   - Click "Generate Proof & Submit"
   - See instant proof generation and mock on-chain verification!

## 📖 Detailed Usage

### Proof Generation Flow

1. **User Input:** Age and preference data
2. **Circuit Execution:** ZK circuit classifies user into group (age % 3)
3. **Proof Generation:** Groth16 proof created (mocked for demo)
4. **Verification:** Proof verified locally and submitted to contract (mocked)
5. **Result:** User group revealed without exposing private data

### API Endpoints

```bash
POST /submit-proof
Content-Type: application/json

{
  "age": 25,
  "pref": 1
}
```

Response:

```json
{
  "ok": true,
  "txHash": "0x...",
  "group": 1
}
```

## 🔧 Development

### Project Structure

```
zk-airec/
├── circuits/           # ZK circuits (Circom, Noir)
├── prover/             # Proof generation scripts
├── backend/            # Node.js API server
├── frontend/           # React web app
├── contracts/          # Solidity verifier contracts
├── docs/               # Documentation and diagrams
├── tests/              # Unit tests and security notes
├── demo.html           # Standalone demo (no dependencies)
└── build_all.sh        # Full build script
```

### Circuit Details

- **Group Classifier:** Simple circuit grouping users by age % 3
- **Range Proofs:** Additional circuits for value range verification
- **Verifier Contract:** Auto-generated Solidity contract for proof verification

### Mock Implementation

For zero-dependency demo:

- Proof generation returns mock data
- Contract submission is simulated
- All external dependencies (snarkjs, ethers, hardhat) are mocked

## 🧪 Testing

### Unit Tests

```bash
cd backend
npm test  # Jest tests for API endpoints
```

### Circuit Tests

- Manual verification of circuit logic
- Proof generation and verification tests
- Security fuzzing notes in `tests/security/`

### Integration Tests

- Full end-to-end flow testing
- API endpoint validation
- Frontend-backend communication

## 🔒 Security Considerations

- **Trusted Setup:** Uses pre-computed trusted setup (pot12_final.ptau)
- **Circuit Security:** Circuits designed to minimize constraints
- **Privacy Guarantees:** Zero-knowledge ensures data privacy
- **Audit Notes:** Security considerations documented in `tests/security/`

## 📚 Documentation

- **[Architecture Overview](docs/architecture.md)** - System design and components
- **[ZK Design](docs/zk-design.md)** - Zero-knowledge proof implementation
- **[Demo Flow](examples/demo_flow.md)** - Step-by-step demo walkthrough
- **[Circuit Tests](tests/circuits/circuit_unit_tests.md)** - Circuit verification tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure zero-dependency demo works

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Circom:** For ZK circuit development
- **SnarkJS:** For proof generation tooling
- **Hardhat:** For Ethereum development
- **Zero-Knowledge Community:** For pioneering privacy-preserving tech

## 📞 Contact

**Pranauv Shrinaath**

- GitHub: [@KenidoesCode](https://github.com/KenidoesCode)
- Project: [zk-airec](https://github.com/KenidoesCode/zk-airec)

---

**⭐ Star this repo if you find it useful!**

**🚀 Ready to revolutionize privacy-preserving AI recommendations?**
