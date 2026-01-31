"use client"; 

import { useState, useCallback, useEffect } from "react";
import { formatEther } from "ethers";
import { 
    connectWallet, 
    loadAllProjects, 
    listProject, 
    getPaymentsByClient 
} from "@/lib/contractService"; 

export default function PaymentsPage() {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");
    const [contract, setContract] = useState(null); 
    const [items, setItems] = useState([]); 
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    
    const loadProjects = useCallback(async (currentContract) => {
        if (!currentContract) return;
        try {
            const itemList = await loadAllProjects(currentContract);
            setItems(itemList);
        } catch (err) {
            console.error("Failed to load projects:", err);
        }
    }, []);

    const handleConnectWallet = async () => {
        try {
            const { userAddress, balanceWei, marketContract } = await connectWallet();
            setAccount(userAddress);
            setBalance(formatEther(balanceWei));
            setContract(marketContract);
            await loadProjects(marketContract); 
        } catch (err) {
            console.error("Wallet connection failed:", err);
            alert("Connection failed. Ensure MetaMask is on Flow EVM.");
        }
    };

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

    return (
        <main className="flex-1 p-8 bg-neutral-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">PayMents</h1>
            
            <div className="p-6 bg-neutral-800 border border-amber-500/20 rounded-xl mb-6">
                <h2 className="text-xl font-semibold mb-4">MetaMask Wallet Status</h2>
                
                {/* Steps are now permanent and outside the conditional block */}
                <div className="bg-black/30 p-4 rounded-lg border border-white/5 mb-6">
                    <p className="text-amber-400 font-medium mb-3 text-sm uppercase tracking-wider">How to connect:</p>
                    <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 bg-amber-600/20 text-amber-500 rounded-full text-xs">1</span>
                            Download and add the MetaMask extension to your browser.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 bg-amber-600/20 text-amber-500 rounded-full text-xs">2</span>
                            Sign in or create a new secure wallet.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 bg-amber-600/20 text-amber-500 rounded-full text-xs">3</span>
                            Switch your network to Flow EVM.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 bg-amber-600/20 text-amber-500 rounded-full text-xs">4</span>
                            Click "Connect Wallet" to link your account.
                        </li>
                    </ul>
                </div>

                {!account ? (
                    <button onClick={handleConnectWallet} className="bg-amber-600 hover:bg-amber-500 py-2 px-6 rounded-lg transition-all font-medium">
                        Connect Wallet
                    </button>
                ) : (
                    <div className="flex justify-between items-center p-3 bg-amber-600/10 rounded-lg border border-amber-600/20">
                        <p>Connected: <span className="font-mono text-amber-400">{account}</span></p>
                        <p className="text-sm text-neutral-400">Balance: {balance} FLOW</p>
                    </div>
                )}
            </div>
            
            <div className="p-6 bg-neutral-800 border border-white/5 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">List Project</h3>
                <div className="flex gap-4">
                    <input placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 p-3 rounded-lg bg-neutral-700 outline-none focus:ring-1 focus:ring-amber-500" />
                    <input placeholder="Price (FLOW)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-40 p-3 rounded-lg bg-neutral-700 outline-none focus:ring-1 focus:ring-amber-500" />
                    <button onClick={handleListProject} disabled={!contract} className="bg-indigo-600 hover:bg-indigo-500 py-3 px-6 rounded-lg disabled:opacity-50">
                        List Project
                    </button>
                </div>
            </div>

            <div className="p-6 bg-neutral-800 border border-white/5 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Project Registry</h3>
                {items.length === 0 ? (
                    <p className="text-neutral-500 italic">No projects found on chain.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item) => (
                            <div key={item.Id} className="border border-neutral-700 p-4 rounded-lg bg-neutral-900/50">
                                <p className="text-amber-400 font-bold">{item.name}</p>
                                <p className="text-sm text-neutral-400 mt-1">Cost: {formatEther(item.price)} FLOW</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}