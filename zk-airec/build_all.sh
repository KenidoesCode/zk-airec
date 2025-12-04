#!/bin/bash

echo "Starting zk-airec full-stack application (assuming pre-installed dependencies)..."

# Start Hardhat node
echo "Starting Hardhat node..."
cd contracts
node node_modules/.bin/hardhat node &
HARDHAT_PID=$!
cd ..

# Deploy contracts
echo "Deploying contracts..."
cd contracts
node node_modules/.bin/hardhat run deploy/deploy_local.js --network localhost
cd ..

# Start backend
echo "Starting backend..."
cd backend
node src/index.js &
BACKEND_PID=$!
cd ..

# Start frontend
echo "Starting frontend..."
cd frontend
node node_modules/.bin/vite &
FRONTEND_PID=$!
cd ..

echo "zk-airec is now running!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo "Hardhat: http://localhost:8545"
echo "Press Ctrl+C to stop"

# Wait for processes
wait $HARDHAT_PID $BACKEND_PID $FRONTEND_PID
