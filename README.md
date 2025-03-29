
# **Blockchain-Based Peer-to-Peer Rental Marketplace**

## **Project Overview**
This project is a **blockchain-based rental marketplace** where users can **rent physical goods and services** using blockchain technology to ensure secure, transparent, and efficient transactions. We leverage **smart contracts** to handle rental agreements, payments, security deposits, and penalties.

## **Key Features**

### 1. **Secure Smart Contract-Based Transactions**
- Users can create rental agreements using **smart contracts** that automatically execute based on the rental terms (payment, penalties, refunds).
  
### 2. **Escrow System for Deposits**
- Security deposits are held in escrow until the item is returned and verified, ensuring fairness and preventing fraud.

### 3. **OTP-Based Rental Verification**
- **One-Time Passwords (OTP)** are used for verifying the pickup and return of rental items, ensuring that the item exchange process is secured.

### 4. **Multi-Payment Options (Fiat & Crypto)**
- Users can choose between **fiat payments (UPI/Stripe)** or **crypto payments (Aptos)** for their rentals.
- **Crypto payments** are processed via **Aptos blockchain**, while **fiat payments** are facilitated through **Stripe** or **UPI**.

### 5. **Gamification and Reward System**
- Users can earn **reward points** for completing rentals, returning items on time, and completing educational tasks.
- **Community challenges** encourage users to interact with the platform and complete tasks for additional rewards.

### 6. **Educational Content (Future Scope)**
- Future plans include adding **educational content** on topics like **blockchain technology**, **sustainability**, and **responsible renting**.

## **Technical Stack**

- **Frontend**: React.js / Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Blockchain Layer**: **Aptos** (Smart Contracts on Aptos)
- **Database**: MongoDB
- **Payment Gateway**: Stripe (Fiat Payments), MetaMask (Crypto Payments)
- **OTP Verification**: Twilio, Firebase OTP
- **Storage**: Pinata (for storing educational content and other assets)
- **Wallet Integration**: Petra Wallet (for Aptos blockchain interaction)

## **Setup Instructions**

### 1. **Clone the repository**

```bash
git clone https://github.com/your-repository-url.git
cd your-project-directory
```

### 2. **Install Dependencies**

Run the following commands to install the required dependencies:

For **frontend**:

```bash
cd frontend
npm install
```

For **backend**:

```bash
cd backend
npm install
```

### 3. **Configure the Blockchain Environment**

- Set up your **Aptos wallet** (Petra wallet) and configure it to interact with the **Aptos testnet**.
- Deploy **smart contracts** on **Aptos** by following the instructions for **Aptos Move**.

### 4. **Start the Development Servers**

For **frontend**:

```bash
cd frontend
npm start
```

For **backend**:

```bash
cd backend
npm start
```

### 5. **Test the Platform**

You can test the platform locally by interacting with the **frontend** and **backend**. Ensure that the smart contract is working correctly with **Aptos** and that payments (both fiat and crypto) are processed correctly.

## **Blockchain Smart Contract Logic**

The **smart contracts** are built using **Aptos Move** and handle:
- **Rental Agreement Creation**: Creates a contract that specifies terms like rental amount, deposit, and due date.
- **Escrow System**: The deposit is locked in escrow until the rental item is returned.
- **Refunds and Penalties**: Based on the condition of the item (e.g., late return or damage), penalties are applied, and refunds are calculated accordingly.

## **Future Enhancements**

1. **NFT-Based Ownership and Rental Rights**: Use **NFTs** to represent ownership of rental items and manage rental rights.
2. **Insurance System**: Implement insurance for rental items, where users can purchase and claim insurance for damage.
3. **EduChain Integration**: We plan to integrate **EduChain’s Learn-to-Earn** mechanism for rewarding users with points for completing educational tasks related to blockchain and sustainability.
4. **Advanced Gamification**: Further enhance the platform's gamification aspect with leaderboards, badges, and achievements for users.

## **Contributing**

Feel free to fork this repository, submit issues, and contribute to the project. We welcome contributions from the community!

### **How to Contribute**:
1. Fork the repo.
2. Create a new branch.
3. Make your changes.
4. Create a pull request.

## **License**

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

