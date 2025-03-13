const RentalAgreement = artifacts.require("RentalAgreement");

contract("RentalAgreement", (accounts) => {
  let contract;
  const owner = accounts[0];
  const renter = accounts[1];
  const deposit = web3.utils.toWei("0.1", "ether");
  const rentAmount = web3.utils.toWei("0.2", "ether");
  const OTP = "123456";

  beforeEach(async () => {
    contract = await RentalAgreement.new(rentAmount, deposit, { from: owner });

    // Fund the renter with 2 Ether
    await web3.eth.sendTransaction({
      from: owner,
      to: renter,
      value: web3.utils.toWei("2", "ether"),
    });

    // Fund the owner with 2 Ether
    await web3.eth.sendTransaction({
      from: accounts[2], // Use another account to fund the owner
      to: owner,
      value: web3.utils.toWei("2", "ether"),
    });
  });

  it("should allow owner to rent item to renter", async () => {
    await contract.rentItem(renter, OTP, { from: owner, value: rentAmount + deposit });

    assert.equal(await web3.eth.getBalance(contract.address), rentAmount + deposit);
    assert.equal(await contract.renter(), renter);
    assert.equal((await contract.contractState()).toString(), "1"); // Rented state
  });

  it("should release funds on OTP verification", async () => {
    await contract.rentItem(renter, OTP, { from: owner, value: rentAmount + deposit });

    const initialOwnerBalance = await web3.eth.getBalance(owner);
    const initialRenterBalance = await web3.eth.getBalance(renter);

    // Simulate OTP verification by renter
    const tx = await contract.confirmReturn(OTP, { from: renter });
    const gasUsed = tx.receipt.gasUsed;
    const gasPrice = await web3.eth.getGasPrice();
    const transactionCost = gasUsed * gasPrice;

    const finalOwnerBalance = await web3.eth.getBalance(owner);
    const finalRenterBalance = await web3.eth.getBalance(renter);

    assert.equal(
      Number(finalOwnerBalance) - Number(initialOwnerBalance),
      Number(rentAmount),
      "Owner should receive rentAmount"
    );
    assert.equal(
      Number(finalRenterBalance) - Number(initialRenterBalance),
      Number(deposit) - Number(transactionCost), // Account for gas costs
      "Renter should receive deposit minus gas costs"
    );
  });

  it("should handle late return and deduct penalty", async () => {
    await contract.rentItem(renter, OTP, { from: owner, value: rentAmount + deposit });

    // Simulate late return
    await contract.handleLateReturn({ from: owner });

    const contractBalance = await web3.eth.getBalance(contract.address);
    assert.equal(contractBalance.toString(), "0", "Contract balance should be 0 after penalty deduction");

    const remainingDeposit = await contract.deposit();
    assert.equal(remainingDeposit.toString(), "0", "Deposit should be 0 after penalty deduction");
  });
});