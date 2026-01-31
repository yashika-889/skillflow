"use client";
import { BadgeCheck, FileUp, Sparkles } from "lucide-react";

export default function Step4Verification({ onComplete, onBack }) {

  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        Verify Your Skills
      </h1>
      <p className="text-md text-neutral-300 text-center mb-8">
        Build trust with clients by verifying your expertise. (Optional)
      </p>

      <div className="space-y-4">
        <button className="action-card">
          <BadgeCheck className="w-8 h-8 text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-white">Import Credentials</h3>
            <p className="text-neutral-400">Check your wallet for skill NFTs.</p>
          </div>
        </button>

        <button className="action-card">
          <FileUp className="w-8 h-8 text-secondary" />
          <div>
            <h3 className="text-lg font-semibold text-white">Upload Certificate</h3>
            <p className="text-neutral-400">Upload a PDF/image to mint as a skill NFT.</p>
          </div>
        </button>

        <button className="action-card group border-accent/50 hover:border-accent">
          <Sparkles className="w-8 h-8 text-accent group-hover:animate-pulse" />
          <div>
            <h3 className="text-lg font-semibold text-white">Claim Free Badge</h3>
            <p className="text-neutral-400">Mint your free &quot;Early Adopter&quot; NFT!</p>
          </div>
        </button>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button type="button" onClick={onBack} className="text-neutral-400 hover:text-white">
          Back
        </button>
        <button
          type="button"
          onClick={onComplete} // This calls the final function
          className="px-6 py-2.5 bg-accent text-neutral-900 font-bold rounded-lg shadow-lg hover:bg-accent/90 transition-all"
        >
          Finish Onboarding
        </button>
      </div>
    </div>
  );
}