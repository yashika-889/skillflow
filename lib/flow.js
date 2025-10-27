import { config } from "@onflow/fcl";

// Configure FCL (Flow Client Library)
if (typeof window !== "undefined") {
  config({
  // --- App Info ---
  "app.title": "SkillFlow",
  // You'll want to host an icon at this path
  // "app.icon": "https://yoursite.com/images/logo.png", 
  
  // --- Connection ---
  // Flow Testnet Access Node
  "accessNode.api": "https://rest-testnet.onflow.org", 
  
  // --- Wallet Discovery ---
  // This tells FCL where to find the list of wallets (Flow Wallet, Dapper, etc.)
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", 
  
  // --- Required User Info ---
  // Tell FCL what info to request from the user's wallet
  "fcl.accountProof.resolver": async () => {
    // This is a complex topic, but for now, this basic resolver works for Testnet
    // It helps verify the user's account
    return {
      appIdentifier: "SkillFlow-v1.0",
      nonce: "7f5a7beca02823b9762ac590768b926d5ab54506", // This can be any static nonce for testnet
    };
  },
  });
}