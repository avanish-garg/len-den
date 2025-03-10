// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalAgreement {
    address public owner;
    address public renter;
    uint public deposit;
    uint public rentAmount;
    uint public rentalDuration;

    enum State {Created, Rented, Completed, Canceled}
    State public contractState;

    constructor(uint _rentAmount, uint _deposit) {
        owner = msg.sender;
        rentAmount = _rentAmount;
        deposit = _deposit;
        contractState = State.Created;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this.");
        _;
    }

    modifier onlyRenter() {
        require(msg.sender == renter, "Only the renter can execute this.");
        _;
    }

    modifier inState(State expectedState) {
        require(contractState == expectedState, "Invalid contract state.");
        _;
    }

    function rentItem(address _renter) public payable onlyOwner inState(State.Created) {
        require(msg.value == deposit + rentAmount, "Deposit + rent amount must be provided.");
        renter = _renter;
        contractState = State.Rented;
    }

    function confirmReturn() public onlyRenter inState(State.Rented) {
        payable(owner).transfer(rentAmount);  // Transfer rent to owner
        payable(renter).transfer(deposit);  // Return deposit to renter
        contractState = State.Completed;
    }

    function cancelRental() public onlyOwner inState(State.Created) {
        contractState = State.Canceled;
    }
}
