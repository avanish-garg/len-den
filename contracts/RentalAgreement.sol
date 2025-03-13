// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalAgreement {
    address public owner;
    address public renter;
    uint public deposit;
    uint public rentAmount;
    string public OTP; // Store OTP for verification

    enum State { Created, Rented, Completed, Canceled }
    State public contractState;

    // Events
    event ItemRented(address indexed renter, uint rentAmount, uint deposit);
    event FundsReleased(address indexed owner, address indexed renter, uint rentAmount, uint deposit);
    event LateReturnHandled(address indexed renter, uint penalty);

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

    // Function to rent the item, setting deposit and rental fees
    function rentItem(address _renter, string memory _OTP) public payable onlyOwner inState(State.Created) {
        require(msg.value == deposit + rentAmount, "Deposit + rent amount must be provided.");
        renter = _renter;
        OTP = _OTP; // Set OTP for verification
        contractState = State.Rented;
        emit ItemRented(renter, rentAmount, deposit);
    }

    // Function to confirm item return and release payments
    function confirmReturn(string memory _OTPInput) public onlyRenter inState(State.Rented) {
        require(keccak256(abi.encodePacked(_OTPInput)) == keccak256(abi.encodePacked(OTP)), "Invalid OTP");
        payable(owner).transfer(rentAmount); // Transfer rent to owner
        payable(renter).transfer(deposit); // Return deposit to renter
        contractState = State.Completed;
        emit FundsReleased(owner, renter, rentAmount, deposit);
    }

    // Function to cancel rental agreement before it is rented
    function cancelRental() public onlyOwner inState(State.Created) {
        contractState = State.Canceled;
    }

    // Function to handle the situation if the item is returned late
    function handleLateReturn() public onlyOwner inState(State.Rented) {
        uint penalty = deposit / 10; // Example penalty (10% of deposit)
        payable(owner).transfer(penalty); // Transfer penalty to owner
        deposit -= penalty; // Reduce deposit amount accordingly
        payable(renter).transfer(deposit); // Return remaining deposit to renter
        contractState = State.Completed;
        emit LateReturnHandled(renter, penalty);
    }
}