// app/payments/page.jsx (Final Code)
"use client"; 

import { useState, useCallback, useEffect } from "react";
import { formatEther } from "ethers";
import { 
    connectWallet, 
    loadAllProjects, 
    listProject, 
    getPaymentsByClient 
} from "@/lib/contractService"; // ⬅️ This requires lib/contractService.js to be correctly copied

export default function PaymentsPage() {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");
    const [contract, setContract] = useState(null); 
    const [items, setItems] = useState([]); 
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    
    // Helper to reload the project list
    const loadProjects = useCallback(async (currentContract) => {
        if (!currentContract) return;
        try {
            const itemList = await loadAllProjects(currentContract);
            setItems(itemList);
        } catch (err) {
            console.error("Failed to load projects:", err);
        }
    }, []);

    // 1. Wallet Connection Logic
    const handleConnectWallet = async () => {
        try {
            const { userAddress, balanceWei, marketContract } = await connectWallet();
            setAccount(userAddress);
            setBalance(formatEther(balanceWei));
            setContract(marketContract);
            await loadProjects(marketContract); 
        } catch (err) {
            console.error("Wallet connection failed:", err);
            alert("Connection failed. Make sure MetaMask is installed.");
        }
    };

    // 2. List Project Logic
    const handleListProject = async () => {
        if (!contract) return alert("Connect wallet first");
        if (!name || !price) return alert("Enter project name and price");

        try {
            await listProject(contract, name, price);
            alert("Project listed successfully!");
            await loadProjects(contract); 
            setName("");
            setPrice("");
        } catch (err) {
            console.error("Failed to list project:", err);
            alert("Failed to list project. Check console.");
        }
    };
    
    // 3. Get Payments by Client Logic
    const handleGetPaymentsByClient = async () => {
        if (!contract) return alert("Connect wallet first");
        if (!clientAddress) return alert("Enter client address");
        try {
            const ownedItems = await getPaymentsByClient(contract, clientAddress);
            setItems(ownedItems); 
        } catch (err) {
            console.error("Failed to get payments by client:", err);
            alert("Error fetching payments. Check console.");
        }
    };

    // 4. Render UI
    return (
        <main className="flex-1 p-8 bg-neutral-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">PayMents</h1>
            
            {/* 1. Connect Wallet */}
            <div className="p-6 bg-neutral-800 rounded-xl mb-6">
                <h2 className="text-xl font-semibold mb-4">MetaMask Wallet Status</h2>
                {!account ? (
                    <button onClick={handleConnectWallet} className="bg-primary hover:bg-primary/90 py-2 px-4 rounded-lg">
                        Connect Wallet
                    </button>
                ) : (
                    <p>Connected: <span className="font-mono">{account}</span></p>
                )}
            </div>
            
            <hr className="border-neutral-700 my-8" />

            {/* 2. List Project */}
            <div className="p-6 bg-neutral-800 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">List Project</h3>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 rounded-lg bg-neutral-700 mr-2" />
                <input placeholder="Price in FLOW/ETH" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 rounded-lg bg-neutral-700 mr-2" />
                <button onClick={handleListProject} disabled={!contract} className="bg-secondary hover:bg-secondary/90 py-2 px-4 rounded-lg disabled:opacity-50">
                    List Project
                </button>
            </div>

            <hr className="border-neutral-700 my-8" />

            {/* 3. All Projects */}
            <div className="p-6 bg-neutral-800 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">All Projects</h3>
                {items.length === 0 ? (<p className="text-neutral-400">No projects available</p>) : (
                    items.map((item) => (
                        <div key={item.Id} className="border border-neutral-700 p-3 rounded-lg my-2">
                            <p>Name: {item.name}</p>
                            <p>Price: {formatEther(item.price)} FLOW</p>
                        </div>
                    ))
                )}
            </div>

            <hr className="border-neutral-700 my-8" />

            {/* 4. Get Payment by Client */}
            <div className="p-6 bg-neutral-800 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Get Payment by Client</h3>
                <input placeholder="Client address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="p-2 rounded-lg bg-neutral-700 mr-2" />
                <button onClick={handleGetPaymentsByClient} disabled={!contract} className="bg-primary hover:bg-primary/90 py-2 px-4 rounded-lg disabled:opacity-50">
                    Get Payment
                </button>
            </div>
        </main>
    );
}