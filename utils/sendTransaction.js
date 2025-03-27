const sendTransaction = async (method, args, from, privateKey, value) => {
    console.log(`Mock Blockchain Call: ${method} with args:`, args);
    
    return {
      transactionHash: "0xmockedtx123456789abcdef", // Dummy transaction hash
    };
  };
  
  module.exports = sendTransaction;
  