"use client";

import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import "@/lib/flow.js"; 

export default function WalletConnect() {
  const [user, setUser] = useState({ loggedIn: false, addr: null });

  useEffect(() => {
    const unsubscribe = fcl.currentUser.subscribe(setUser);
    return () => unsubscribe();
  }, []);

  const disconnectWallet = () => {
    fcl.unauthenticate();
  };

  // --- Render Logic ---
  
  // 1. If not logged in to a wallet, return NOTHING. 
  // This removes the "Loading..." and the "Connect Wallet" buttons entirely.
  if (!user.loggedIn) {
    return null;
  }

  // 2. Only show something if the user has actually connected a wallet elsewhere
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-mono text-neutral-300 bg-neutral-900/50 px-3 py-1 rounded-lg border border-white/5">
        {user.addr.substring(0, 6)}...{user.addr.substring(user.addr.length - 4)}
      </span>
      <button
        onClick={disconnectWallet}
        className="text-sm font-medium text-white bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-lg transition-all"
      >
        Disconnect
      </button>
    </div>
  );
}