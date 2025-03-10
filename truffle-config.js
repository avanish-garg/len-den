const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config(); // Load environment variables

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (Ganache)
      port: 7545,        // Ganache default port
      network_id: "*",   
      gas: 6000000,      
      gasPrice: 40000000000, // 20 Gwei (in wei)
    },
    amoy: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY], // Your wallet's private key
        providerOrUrl: `https://rpc-amoy.polygon.technology`, // Amoy Testnet RPC URL
      }),
      network_id: 80002, // Amoy Testnet network ID
      gas: 6000000,       // Gas limit
      gasPrice: 40000000000, // Gas price (20 Gwei in wei)
      confirmations: 2,   // Number of confirmations to wait for deployment
      timeoutBlocks: 200, // Timeout for transactions
      skipDryRun: true,   // Skip dry run before deployment
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",  // Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  // Paths to your contracts and build output
  contracts_build_directory: "./build/contracts",
  contracts_directory: "./contracts",
};