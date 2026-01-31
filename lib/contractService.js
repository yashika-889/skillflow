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
    
    // Get provider from the current contract instance
    const provider = marketContract.runner.provider;
    const readOnlyContract = new Contract(contractAddress, MarketPlaceABI, provider);

    try {
        const count = await readOnlyContract.itemCount();
        const itemList = [];
        // Loop through items based on the contract's itemCount
        for (let i = 1; i <= count; i++) {
            const item = await readOnlyContract.items(i);
            // Ensure we return a clean object for React state
            itemList.push({
                Id: item.id || i,
                name: item.name,
                price: item.price,
                owner: item.owner
            });
        }
        return itemList;
    } catch (error) {
        console.error("Error loading projects from contract:", error);
        return [];
    }
};

// --- 3. List Project (Write Transaction) ---
export const listProject = async (contract, name, price) => {
    if (!contract) throw new Error("Contract not initialized.");
    
    const priceWei = parseEther(price); 
    
    // Using ListItems as defined in your contract structure
    const tx = await contract.ListItems(name, priceWei, { gasLimit: 500000 });
    return tx.wait(); 
};

// --- 4. Get Payments by Client (Read-Only) ---
export const getPaymentsByClient = async (contract, clientAddress) => {
    if (!contract) return [];
    
    try {
        // getItemByOwner returns an array of IDs associated with the address
        const ids = await contract.getItemByOwner(clientAddress);
        const ownedItems = [];
        
        for (let id of ids) {
            const item = await contract.items(id);
            ownedItems.push({
                Id: item.id || id,
                name: item.name,
                price: item.price,
                owner: item.owner
            });
        }
        return ownedItems;
    } catch (error) {
        console.error("Error fetching client payments:", error);
        return [];
    }
};