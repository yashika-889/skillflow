"use client";

import { useState } from "react";
import { CheckCircle, Loader2, XCircle, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Use Next.js Image for optimization

export default function Step2Wallet({ onNext, onBack }) {
  const [loading, setLoading] = useState(null); // 'flow', 'dapper', 'metamask'
  const [error, setError] = useState(null);

  const handleConnect = (wallet) => {
    setLoading(wallet);
    setError(null);

    // --- SIMULATED WEB3 LOGIC ---
    // In a real app, you would call your FCL or wagmi functions here
    // e.g., await fcl.authenticate();
    
    console.log(`Attempting to connect with ${wallet}...`);
    
    setTimeout(() => {
      // Simulate a random success or failure
      if (Math.random() > 0.1) {
        // Success
        console.log("Connection successful!");
        setLoading(null);
        onNext();
      } else {
        // Failure
        console.log("Connection failed.");
        setLoading(null);
        setError("Connection refused. Please try again.");
      }
    }, 2000);
    // --- END SIMULATION ---
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        Connect Your Wallet
      </h1>
      <p className="text-md text-gray-300 text-center mb-8">
        Your wallet is your key to the decentralized web.
      </p>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center p-3 mb-4 bg-error/20 text-error border border-error/50 rounded-lg"
          >
            <XCircle className="w-5 h-5 mr-2" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <WalletCard
          name="Flow Wallet"
          icon="/icons/flow-logo.png"
          tag="Recommended"
          isLoading={loading === "flow"}
          onClick={() => handleConnect("flow")}
        />
        <WalletCard
          name="Dapper Wallet"
          icon="/icons/dapper-logo.png"
          isLoading={loading === "dapper"}
          onClick={() => handleConnect("dapper")}
        />
        <WalletCard
          name="MetaMask"
          icon="/icons/metamask-logo.png"
          tag="EVM"
          isLoading={loading === "metamask"}
          onClick={() => handleConnect("metamask")}
        />
      </div>

      <div className="text-center mt-6">
        <span className="text-gray-400">Don't have a wallet? </span>
        <a href="#" className="font-medium text-primary hover:underline">
          Create One
        </a>
      </div>

      <button onClick={onBack} className="mt-8 text-gray-400 hover:text-white">
        Back
      </button>
    </div>
  );
}

// Sub-component for Wallet Cards
function WalletCard({ name, icon, tag, isLoading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center w-full p-5 bg-gray-700/50 rounded-xl border border-gray-600/50 hover:bg-gray-700 hover:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Image src={icon} alt={`${name} logo`} width={48} height={48} className="mr-4" />
      <div className="flex-1 text-left">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        {tag && (
          <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded-full">
            {tag}
          </span>
        )}
      </div>
      {isLoading && <Loader2 className="w-6 h-6 text-white animate-spin" />}
    </button>
  );
}