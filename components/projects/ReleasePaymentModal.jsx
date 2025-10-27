"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

// Example props:
// milestone = { title: "Milestone 1: Design Mockups", amount: 100, currency: "FLOW" }
// freelancerName = "Alice (0xAlice.flow)"

export default function ReleasePaymentModal({ isOpen, onClose, milestone, freelancerName }) {
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success'
  const [error, setError] = useState(null);

  // --- SIMULATED WEB3 LOGIC ---
  const handleRelease = () => {
    setError(null);
    setStatus("loading");
    
    // Simulate wallet confirmation + transaction
    console.log(`Releasing ${milestone.amount} ${milestone.currency}...`);
    setTimeout(() => {
      // Simulate success
      console.log("Payment released!");
      setStatus("success");
      
      // Auto-close after 3s
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    }, 2500);
    // --- END SIMULATION ---
  };
  
  const handleClose = () => {
    onClose();
    // Reset state after modal closes
    setTimeout(() => {
      setStatus("idle");
      setError(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl p-8"
        >
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-white text-center mb-2">Release Payment?</h2>
                <p className="text-center text-gray-300 mb-4">
                  You are about to release <span className="font-bold text-accent">{milestone.amount} {milestone.currency}</span> to <span className="font-bold text-white">{freelancerName}</span> for:
                </p>
                <p className="text-center font-medium text-white p-3 bg-gray-900/50 rounded-lg">
                  {milestone.title}
                </p>
                
                {/* Irreversible Warning */}
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                  <p className="text-sm text-yellow-300">
                    <span className="font-bold">This action is irreversible.</span> Funds will be sent immediately and cannot be recovered.
                  </p>
                </div>
                
                {error && (
                  <p className="mt-4 text-sm text-center text-error p-2 bg-error/10 rounded-md">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleRelease}
                  className="w-full bg-accent hover:bg-accent/90 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition-all mt-6"
                >
                  Approve & Pay
                </button>
              </motion.div>
            )}
            
            {(status === 'loading' || status === 'success') && (
              <motion.div
                key="status"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center h-48 flex flex-col justify-center items-center"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <h2 className="text-xl font-bold text-white mt-4">Sending Payment...</h2>
                    <p className="text-gray-300">Confirm in your wallet.</p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-12 h-12 text-accent" />
                    <h2 className="text-xl font-bold text-white mt-4">Payment Released! 💸</h2>
                    <p className="text-gray-300">Funds are on their way.</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}