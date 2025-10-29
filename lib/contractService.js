// lib/contractService.js 
// This exports all the logic needed to interact with your EVM contract.

import { BrowserProvider, Contract, parseEther } from "ethers";
import MarketPlaceABI from "./MarketPlace.json"; 

// Your deployed contract address
const contractAddress = "0x8C8e1ca7E7775d49DEEEeC66ABaAc401Eeb1f684";

// --- 1. Wallet Connection & Setup ---
export const connectWallet = async () => {
    if (!window.ethereum) throw new Error("MetaMask not installed!");
    
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const userAddress = accounts[0];
    const balanceWei = await provider.getBalance(userAddress);
    const signer = await provider.getSigner();
    
    // Contract instance for sending transactions
    const marketContract = new Contract(contractAddress, MarketPlaceABI, signer);

    return { 
        userAddress, 
        balanceWei, 
        marketContract 
    };
};

// --- 2. Load all Projects (Read-Only) ---
export const loadAllProjects = async (marketContract) => {
    if (!marketContract) return [];
    
    const provider = marketContract.runner.provider;
    const readOnlyContract = new Contract(contractAddress, MarketPlaceABI, provider);

    const count = await readOnlyContract.itemCount();
    const itemList = [];
    for (let i = 1; i <= count; i++) {
        const item = await readOnlyContract.items(i);
        itemList.push(item);
    }
    return itemList;
};

// --- 3. List Project (Write Transaction) ---
export const listProject = async (contract, name, price) => {
    if (!contract) throw new Error("Contract not initialized.");
    
    const priceWei = parseEther(price); 
    
    const tx = await contract.ListItems(name, priceWei, { gasLimit: 500000 });
    return tx.wait(); 
};

// --- 4. Get Payments by Client (Read-Only) ---
export const getPaymentsByClient = async (contract, clientAddress) => {
    if (!contract) return [];
    
    const ids = await contract.getItemByOwner(clientAddress);
    const ownedItems = [];
    
    for (let id of ids) {
        const item = await contract.items(id);
        ownedItems.push(item);
    }
    return ownedItems;
};