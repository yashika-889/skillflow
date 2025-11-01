# 🧠 SkillFlow: Decentralized Freelancer Marketplace

A powerful real-world decentralized gig economy solution. **SkillChain** is a platform where **freelancers** and **clients** connect directly, eliminating traditional middlemen like Fiverr or Upwork. Payments, reputation
, and disputes are handled transparently and securely via smart contracts on the **Flow EVM**.

## 🚀 Features

This project implements a decentralized platform for job listing, secure escrow, and verifiable skill certification.

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Marketplace** | 🏷️ **Job Listing & Viewing** | Clients list new job requirements; Freelancers view available jobs. |
| **Escrow** | 🔒 **Secure Payment Escrow** | Smart contracts lock the client's payment until the job is completed and verified. |
| **Payment** | 💰 **Instant Crypto Payments** | Client funds are released directly to the Freelancer's wallet upon approval. |
| **Reputation** | 🎓 **Skill Certificate NFTs** | NFTs (ERC-721) are minted upon verified work completion, serving as verifiable skill certificates and reputation builders. |
| **Dispute** | ⚖️ **DAO Dispute Resolution** | A decentralized autonomous organization (DAO) is used to vote and resolve disagreements between clients and freelancers. |
| **Wallet** | 🔗 **Connect MetaMask Wallet** | Connect the dApp to the Flow EVM network. |

---

## 🧩 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React.js (Vite / CRA)** | Dynamic and responsive user interface for job boards and profiles. |
| **Blockchain Interaction** | **Ethers.js** | Handling wallet connection, sending transactions, and calling smart contract functions. |
| **Smart Contracts** | **Solidity** | Core logic for Escrow, NFT minting, and DAO Governance. |
| **Network** | **Flow EVM (or compatible testnet)** | The fast, low-cost execution environment for the dApp. |
| **Wallet** | **MetaMask** | User wallet for transactions and identity. |
| **Data Storage (Off-Chain)** | **IPFS / Arweave** | (Optional) Decentralized storage for large data like NFT metadata or detailed job descriptions. |

---


## ⚙️ Setup Instructions

Follow these steps to get a local copy of **SkillFlow** up and running.

### 1️⃣ Clone the Repository

bash

git clone https://github.com/yashika-889/skillflow
cd skillflow

2️⃣ Install Dependencies
npm install

3️⃣ Update Contract Addresses
The application interacts with multiple smart contracts (Escrow, SkillNFT, DAO).
Update the deployed addresses in your main configuration file (usually in App.js or a dedicated config.js):
// config.js
const ESCROW_CONTRACT_ADDRESS = "0xYourEscrowContractAddressHere";
const NFT_CONTRACT_ADDRESS = "0xYourNFTContractAddressHere";
const DAO_CONTRACT_ADDRESS = "0xYourDAOContractAddressHere";

4️⃣ Start the App
npm run dev
Then open your browser to: 👉 http://localhost:3000/ (or the port displayed in your terminal)



📖 SkillChain User Flow
🔗 Connect Wallet
Click the “Connect Wallet” button to link your MetaMask wallet. Ensure you are connected to the Flow EVM network.

1. Client Workflow (Posting a Job)
Navigate to the "Post Job" page.

Enter the job details, price, and expected completion time.

Click "Create Job & Deposit Funds". This triggers the deposit() function on the Escrow Contract, locking the payment amount.

2. Freelancer Workflow (Completing a Job)
View available jobs on the "Job Board".

Apply for a job (Off-chain or simple on-chain registration).

Upon completion, the Freelancer submits a "Work Completed" notification.

The Client reviews the work and clicks "Approve & Release Funds". This calls the releaseFunds() function on the Escrow Contract.

3. Reputation and Rewards
Immediately after funds are released, the system calls a function on the SkillNFT Contract to mint an NFT to the Freelancer's address, verifying the completion of the job.

4. Dispute Resolution
If the Client or Freelancer is unhappy, they can click "Initiate Dispute" which signals the DAO Contract.

DAO token holders (Jurors) vote on the outcome.

The DAO decision is relayed back to the Escrow Contract to automatically release funds based on the consensus.

🪙 Example Environment
Parameter	Example
Network	Flow EVM Testnet
Wallet	MetaMask
Example Contract	0x8C8e1ca7E7775d49DEEEeC66ABaAc401Eeb1f684

📜 License
This project is licensed under the MIT License.
Feel free to modify and build upon it!



