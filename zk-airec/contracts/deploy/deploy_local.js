// deploy_local.js - uses ethers.js to deploy on Hardhat local node
const hre = require("hardhat");
const fs = require("fs");
async function main() {
  await hre.run('compile');

  const Verifier = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Verifier deployed at:", verifier.address);

  // Deploy manager with verifier address
  const Manager = await hre.ethers.getContractFactory("zkVerifierManager");
  const manager = await Manager.deploy(verifier.address);
  await manager.deployed();
  console.log("zkVerifierManager deployed at:", manager.address);

  // Save addresses
  const out = {
    verifier: verifier.address,
    manager: manager.address
  };
  fs.writeFileSync('../deployed_addresses.json', JSON.stringify(out, null, 2));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
