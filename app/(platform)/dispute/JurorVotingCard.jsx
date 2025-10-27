"use client";

import { useState } from "react";
import { Gavel, AlertTriangle, Loader2 } from "lucide-react";

export default function JurorVotingCard() {
  const [status, setStatus] = useState("idle"); // 'idle', 'staking', 'staked', 'voting', 'voted'
  const [vote, setVote] = useState(null); // 'A', 'B', 'split'
  const [reasoning, setReasoning] = useState("");

  // --- SIMULATED WEB3 LOGIC ---
  const handleStake = () => {
    setStatus("staking");
    console.log("Staking 100 FLOW...");
    setTimeout(() => {
      console.log("Stake successful!");
      setStatus("staked");
    }, 2000);
  };
  
  const handleVote = (e) => {
    e.preventDefault();
    if (!vote) return;
    setStatus("voting");
    console.log("Submitting vote:", { vote, reasoning });
    setTimeout(() => {
      console.log("Vote cast successfully!");
      setStatus("voted");
    }, 2500);
  };
  // --- END SIMULATION ---

  if (status === "voted") {
    return (
      <div className="card-glass text-center">
        <h3 className="text-xl font-bold text-accent">Vote Cast Successfully!</h3>
        <p className="text-gray-300 mt-2">
          Thank you for your participation. Your vote is encrypted and will be revealed
          when the voting period ends.
        </p>
      </div>
    );
  }

  if (status !== 'staked') {
    return (
      <div className="card-glass text-center">
        <Gavel className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white">You are a Juror</h3>
        <p className="text-gray-300 mt-2">
          Stake <span className="font-bold text-white">100 FLOW</span> to participate and earn rewards.
          Your stake is returned after you vote.
        </p>
        <button
          onClick={handleStake}
          disabled={status === 'staking'}
          className="mt-6 w-full max-w-xs bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center"
        >
          {status === 'staking' ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            'Stake 100 FLOW to Vote'
          )}
        </button>
      </div>
    );
  }

  // --- Staked / Voting Form ---
  return (
    <form onSubmit={handleVote} className="card-glass">
      <h3 className="text-xl font-bold text-white text-center mb-4">Cast Your Vote</h3>
      
      {/* Vote Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <VoteOption
          label="Rule for Party A (Client)"
          isActive={vote === 'A'}
          onClick={() => setVote('A')}
        />
        <VoteOption
          label="Rule for Party B (Freelancer)"
          isActive={vote === 'B'}
          onClick={() => setVote('B')}
        />
        <VoteOption
          label="Split Decision"
          isActive={vote === 'split'}
          onClick={() => setVote('split')}
        />
      </div>
      
      {/* Reasoning */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Reasoning (Required)
        </label>
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          className="input-field min-h-[100px]"
          placeholder="Explain your decision based on the evidence..."
          required
          minLength={100}
        />
        <p className="text-xs text-gray-400 mt-1">{reasoning.length} / 100 characters minimum</p>
      </div>

      {/* Warning */}
      <div className="mt-4 p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg flex items-start">
        <AlertTriangle className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
        <p className="text-sm text-gray-300">
          Your vote is anonymous and will be encrypted. You must provide clear reasoning to receive your reward.
        </p>
      </div>
      
      <button
        type="submit"
        disabled={status === 'voting' || !vote || reasoning.length < 100}
        className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center"
      >
        {status === 'voting' ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          'Cast Final Vote'
        )}
      </button>
    </form>
  );
}

// Sub-component for voting buttons
function VoteOption({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-5 text-center rounded-xl border-2 transition-all h-full
        ${isActive ? 'bg-primary/10 border-primary' : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'}
      `}
    >
      <p className="text-md font-semibold text-white">{label}</p>
    </button>
  );
}