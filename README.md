Token Details

Token Name: CryptoDevToken
Token Symbol: CDT
Decimals: 18
Initial Supply: 1,000,000 CDT

Features:
ERC-20 standard compliant
Mintable (owner only)
Burnable
Ownable with transferable ownership

Deployment Steps (Using Hardhat)
1. Prerequisites
  Node.js (v16+ recommended)
  MetaMask installed
  Testnet ETH (get from Sepolia Faucet)

2. Project Setup
  mkdir custom-erc20
  cd custom-erc20
  npm init -y
  npm install --save-dev hardhat
  npx hardhat
  # Choose "Create a JavaScript project"
  npm install @openzeppelin/contracts @nomicfoundation/hardhat-toolbox dotenv

3. Configuration
  Create .env file:
  SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
  PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
  ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY

Update hardhat.config.js:
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

4. Deployment Script
Create scripts/deploy.js:

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("MyCustomToken");
  const token = await Token.deploy(
    "CryptoDevToken",   // Name
    "CDT",              // Symbol
    18,                 // Decimals
    1000000             // Initial supply (1 million)
  );

  await token.deployed();

  console.log("Token deployed to:", token.address);
  
  // Verify contract (optional)
  try {
    await hre.run("verify:verify", {
      address: token.address,
      constructorArguments: [
        "CryptoDevToken",
        "CDT",
        18,
        1000000
      ],
    });
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  5. Deploy to Sepolia Testnet
  npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

Deployment Proof Example
Deploying contracts with the account: 0x7423a7C69A194E53C3a5f250d9B72f267A11F0E1
Account balance: 349538627863276800
Token deployed to: 0x89aC2B5c7e1B7F1167f8A9D3B4eB45e4228D623e
Verifying contract...
Successfully verified contract MyCustomToken on Etherscan.
https://sepolia.etherscan.io/address/0x89aC2B5c7e1B7F1167f8A9D3B4eB45e4228D623e#code

Interacting with the Token
Add to MetaMask:

Token Address: 0x89aC2B5c7e1B7F1167f8A9D3B4eB45e4228D623e (example)

Token Symbol: CDT

Decimals: 18

Verify on Etherscan:

Visit your contract address on Sepolia Etherscan

Check the "Contract" tab to interact with functions

Sample Transactions:

Transfer tokens to another address

Mint new tokens (owner only)

Burn tokens

Security Considerations
The contract uses OpenZeppelin's audited ERC-20 implementation

Minting capability is restricted to the owner

Ownership can be transferred securely

Always verify your contract on Etherscan

This implementation provides a secure, standard-compliant ERC-20 token with basic functionality that can be extended as needed.
