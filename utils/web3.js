const Web3 = require("web3");
require("dotenv").config();

// Initialize Web3 with blockchain provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));

// Load the contract ABI and address
const contractABI = require("../abis/RentalAgreement.json"); // Ensure ABI file is present
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create a contract instance
const rentalContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to call a read-only contract method
const callContractMethod = async (method, params = [], fromAddress) => {
  try {
    return await rentalContract.methods[method](...params).call({ from: fromAddress });
  } catch (error) {
    console.error(`Error calling method ${method}:`, error);
    throw new Error("Smart contract call failed");
  }
};

// Function to send a transaction to the contract
const sendTransaction = async (method, params, fromAddress, privateKey, value = "0") => {
  try {
    const encodedABI = rentalContract.methods[method](...params).encodeABI();

    const tx = {
      from: fromAddress,
      to: contractAddress,
      gas: 3000000,
      value: web3.utils.toWei(value, "ether"),
      data: encodedABI,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt;
  } catch (error) {
    console.error(`Error sending transaction for ${method}:`, error);
    throw new Error("Smart contract transaction failed");
  }
};

// Export functions
module.exports = { web3, rentalContract, callContractMethod, sendTransaction };
