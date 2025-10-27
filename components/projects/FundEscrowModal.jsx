"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle, Shield, Info, ArrowRight } from "lucide-react";

// Placeholder data - In a real app, this would be passed as props
const project = {
  title: "Build SkillFlow NFT Badges",
  freelancerName: "Alice (0xAlice.flow)",
  amount: 500,
  currency: "FLOW",
  platformFee: 12.50,
  gasFee: 0.001,
  userBalance: 1250.00
};

export default function FundEscrowModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Review, 2: Confirm, 3: Processing, 4: Success
  const [error, setError] = useState(null);

  const totalAmount = project.amount + project.platformFee;
  const hasSufficientFunds = project.userBalance >= totalAmount;

  // --- SIMULATED WEB3 LOGIC ---
  const handleFund = () => {
    setError(null);
    setStep(2); // Move to "Confirm in wallet"

    // Simulate wallet interaction
    setTimeout(() => {
      // Simulate user confirming wallet
      console.log("Wallet confirmed...");
      setStep(3); // Move to "Processing"

      // Simulate blockchain transaction
      setTimeout(() => {
        // Simulate random success or failure
        if (Math.random() > 0.1) {
          // Success
          console.log("Transaction successful!");
          setStep(4); // Move to "Success"
        } else {
          // Failure
          console.log("Transaction failed.");
          setError("Transaction failed. Please try again.");
          setStep(1); // Go back to review step
        }
      }, 3000); // 3-second transaction time
    }, 2500); // 2.5-second wallet confirmation time
  };
  // --- END SIMULATION ---

  const handleClose = () => {
    onClose();
    // Reset to step 1 for next time
    setTimeout(() => {
      setStep(1);
      setError(null);
    }, 300); // Delay reset until after modal closes
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Animated Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && <Step1Review key="step1" project={project} total={totalAmount} hasFunds={hasSufficientFunds} onFund={handleFund} error={error} />}
              {step === 2 && <Step2Confirm key="step2" />}
              {step === 3 && <Step3Processing key="step3" />}
              {step === 4 && <Step4Success key="step4" onDone={handleClose} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// --- MODAL STEPS ---

// Step 1: Review Details
function Step1Review({ project, total, hasFunds, onFund, error }) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2 className="text-2xl font-bold text-white text-center mb-4">Fund Project Escrow</h2>
      
      {/* Summary Card */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 space-y-3">
        <p className="text-sm text-gray-300 truncate">Project: <span className="text-white font-medium">{project.title}</span></p>
        <p className="text-sm text-gray-300">Freelancer: <span className="text-white font-medium">{project.freelancerName}</span></p>
        
        <div className="border-t border-gray-700/50 pt-3">
          <p className="text-gray-400 text-sm">Total to Deposit:</p>
          <p className="text-3xl font-bold text-accent">{total.toFixed(2)} {project.currency}</p>
        </div>
        
        {/* Breakdown */}
        <div className="space-y-1">
          <BreakdownRow label="Project Cost" value={`${project.amount.toFixed(2)} ${project.currency}`} />
          <BreakdownRow label="Platform Fee (2.5%)" value={`${project.platformFee.toFixed(2)} ${project.currency}`} />
          <BreakdownRow label="Estimated Gas" value={`~${project.gasFee} ${project.currency}`} />
        </div>
        
        {/* Escrow Details */}
        <button onClick={() => setShowDetails(!showDetails)} className="text-xs text-secondary hover:underline flex items-center">
          Where's my money going? <Info className="w-3 h-3 ml-1" />
        </button>
        {showDetails && (
          <p className="text-xs text-gray-400 p-2 bg-gray-800/50 rounded-md">
            Your funds are locked in a secure smart contract. They are only released to the freelancer when you approve the work.
          </p>
        )}
      </div>

      {/* Wallet Balance Check */}
      <div className={`mt-4 text-sm text-center ${hasFunds ? 'text-gray-400' : 'text-error'}`}>
        Your Balance: {project.userBalance.toFixed(2)} {project.currency}
        {!hasFunds && <p className="font-medium">Insufficient funds to cover deposit.</p>}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="mt-4 text-sm text-center text-error p-2 bg-error/10 rounded-md">
          {error}
        </p>
      )}

      {/* CTA Button */}
      <button
        onClick={onFund}
        disabled={!hasFunds}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        Confirm & Fund <Shield className="w-5 h-5 ml-2" />
      </button>
    </motion.div>
  );
}

// Step 2: Confirm in Wallet
function Step2Confirm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="text-center h-80 flex flex-col justify-center items-center"
    >
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Pulsing rings */}
        <div className="absolute w-full h-full bg-primary/20 rounded-full animate-ping"></div>
        <img src="/icons/flow-logo.png" alt="Wallet" className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold text-white mt-6 mb-2">Approve Transaction</h2>
      <p className="text-gray-300">Please confirm the transaction in your wallet app.</p>
    </motion.div>
  );
}

// Step 3: Processing
function Step3Processing() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="text-center h-80 flex flex-col justify-center items-center"
    >
      <Loader2 className="w-16 h-16 text-primary animate-spin" />
      <h2 className="text-2xl font-bold text-white mt-6 mb-2">Securing Funds...</h2>
      <p className="text-gray-300">Your transaction is being processed on the Flow blockchain.</p>
      <p className="text-gray-400 text-sm mt-2">This may take 5-10 seconds.</p>
    </motion.div>
  );
}

// Step 4: Success
function Step4Success({ onDone }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="text-center h-80 flex flex-col justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        className="w-20 h-20 bg-accent rounded-full flex items-center justify-center"
      >
        <CheckCircle className="w-12 h-12 text-gray-900" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white mt-6 mb-2">Escrow Funded! ✅</h2>
      <p className="text-gray-300 mb-4">Funds are locked and the freelancer can now begin work.</p>
      <a href="#" className="text-sm text-secondary hover:underline mb-6">
        View Transaction
      </a>
      <button
        onClick={onDone}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all"
      >
        Done
      </button>
    </motion.div>
  );
}

// Helper component
function BreakdownRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}