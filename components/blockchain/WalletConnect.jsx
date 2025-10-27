"use client";

import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import "@/lib/flow.js"; // Ensures FCL config is loaded

export default function WalletConnect() {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Subscribe to user changes from FCL
    const unsubscribe = fcl.currentUser.subscribe(setUser);
    
    // Check initial state after a short delay to allow FCL to initialize
    const timer = setTimeout(() => setIsLoading(false), 500); 

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const connectWallet = () => {
    fcl.logIn(); // Use logIn() which can present wallet options if needed
  };

  const disconnectWallet = () => {
    fcl.unauthenticate();
  };

  // --- Render Logic ---
  if (isLoading || user.loggedIn === null) {
    // Initial loading state or FCL not ready yet
    return (
      <button
        className="text-sm font-medium text-white bg-neutral-700/50 px-4 py-2 rounded-lg animate-pulse"
        disabled
      >
        Loading...
      </button>
    );
  }

  if (user.loggedIn) {
    // --- Logged In State ---
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono text-neutral-300 bg-neutral-900/50 px-3 py-1 rounded-lg">
          {user.addr.substring(0, 6)}...{user.addr.substring(user.addr.length - 4)}
        </span>
        <button
          onClick={disconnectWallet}
          className="text-sm font-medium text-white bg-error/80 hover:bg-error/100 px-4 py-2 rounded-lg"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // --- Logged Out State ---
  return (
    <button
      onClick={connectWallet}
      className="text-sm font-medium text-white bg-neutral-700/50 hover:bg-neutral-700 px-4 py-2 rounded-lg"
    >
      Connect Wallet
    </button>
  );
}