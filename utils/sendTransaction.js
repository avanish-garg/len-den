// const { AptosClient, AptosAccount } = require("aptos");
// require("dotenv").config();

// const APTOS_NODE_URL = process.env.APTOS_NODE_URL;
// const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

// const client = new AptosClient(APTOS_NODE_URL);

// async function sendTransaction(functionName, args) {
//   try {
//     if (!OWNER_PRIVATE_KEY) throw new Error("Private key not found in .env file");

//     const sender = new AptosAccount(Uint8Array.from(Buffer.from(OWNER_PRIVATE_KEY, "hex")));
//     const keyBuffer = Buffer.from(privateKey, "hex");
//     if (keyBuffer.length !== 32) {
//       throw new Error(`Invalid private key length: ${keyBuffer.length} bytes. Expected 32.`);
//     }
//     const payload = {
//       function: `rental::RentalAgreement::${functionName}`,
//       type_arguments: [],
//       arguments: args
//     };

//     const txnRequest = await client.generateTransaction(sender.address(), payload);
//     const signedTxn = await client.signTransaction(sender, txnRequest);
//     const txnResponse = await client.submitTransaction(signedTxn);
//     await client.waitForTransaction(txnResponse.hash);

//     return txnResponse.hash;
//   } catch (error) {
//     console.error("Blockchain transaction error:", error);
//     throw error;
//   }
// }

// module.exports = sendTransaction;


const { AptosClient, AptosAccount } = require("aptos");
// require("dotenv").config();
require("dotenv").config({ path: "./.env" });
const APTOS_NODE_URL = process.env.APTOS_NODE_URL;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

const client = new AptosClient(APTOS_NODE_URL);

async function sendTransaction(functionName, args) {
  console.log("sendTransaction called")
  try {
    if (!OWNER_PRIVATE_KEY) throw new Error("Private key not found in .env file");

    // ✅ Directly pass private key as hex
     const sender = new AptosAccount(Buffer.from(OWNER_PRIVATE_KEY, "hex"));
    const privateKeyBytes = Buffer.from(OWNER_PRIVATE_KEY, "hex");
    console.log("Private Key Length:", privateKeyBytes.length); 

// // ✅ Ensure it's the correct 32-byte seed by slicing the first 32 bytes
// const sender = new AptosAccount(privateKeyBytes.slice(0, 32));


    // ✅ Validate private key length
    if (OWNER_PRIVATE_KEY.length !== 64) {
      throw new Error(`Invalid private key length: ${OWNER_PRIVATE_KEY.length} characters. Expected 64.`);
    }

    // const payload = {
    //   function: `rental::RentalAgreement::${functionName}`,
    //   type_arguments: [],
    //   arguments: args
    // };
    // const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    console.log("Contract Address Sent:", CONTRACT_ADDRESS);
    const MODULE_NAME = "RentalAgreement";

    const payload = {
      // function: `${CONTRACT_ADDRESS}::RentalAgreement::${functionName}`,
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::${functionName}`,
      type_arguments: [],
      arguments: args
    };
    
    const txnRequest = await client.generateTransaction(sender.address(), payload);
    const signedTxn = await client.signTransaction(sender, txnRequest);
    const txnResponse = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(txnResponse.hash);

    return txnResponse.hash;
  } catch (error) {
    console.error("Blockchain transaction error:", error.message);
    throw error;
  }
}

module.exports = sendTransaction;
