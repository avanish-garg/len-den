
const RentalAgreement = artifacts.require("RentalAgreement");

module.exports = function (deployer) {
  deployer.deploy(RentalAgreement, web3.utils.toWei("1", "ether"), web3.utils.toWei("0.5", "ether"));
};
