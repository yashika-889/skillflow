"use client";

import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import "@/lib/flow.js"; // This imports and runs your FCL config

// This is a Cadence script that asks the blockchain for a user's FLOW balance
const GET_FLOW_BALANCE_SCRIPT = `
  import FungibleToken from 0x9a0766d93b6608b7
  import FlowToken from 0x7e60df042a9c0868

  pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    
    let vaultRef = account.getCapability(/public/flowTokenBalance)
      .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
      ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
  }
`;

export default function FlowBalance() {
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState({ loggedIn: false });

  // Subscribe to user state (to know when they log in)
  useEffect(() => {
    return fcl.currentUser.subscribe(setUser);
  }, []);

  // Fetch balance when user logs in
  useEffect(() => {
    if (user.loggedIn && user.addr) {
      const fetchBalance = async () => {
        try {
          // Send the Cadence script to the blockchain
          const balance = await fcl.query({
            cadence: GET_FLOW_BALANCE_SCRIPT,
            args: (arg, t) => [arg(user.addr, t.Address)],
          });
          setBalance(balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(0);
        }
      };
      fetchBalance();
    } else {
      setBalance(null); // Clear balance on logout
    }
  }, [user]); // Rerun this effect anytime the user object changes

  // This is the loading state, shown in the sidebar
  if (balance === null) {
    return <span className="text-xl font-bold text-accent">... FLOW</span>;
  }

  // This is the final state
  return (
    <span className="text-xl font-bold text-accent">
      {Number(balance).toFixed(2)} FLOW
    </span>
  );
}