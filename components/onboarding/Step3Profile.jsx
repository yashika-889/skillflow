"use client";

import { useState } from "react";
import { User } from "lucide-react";

// This component now receives `onNext` and `onBack` from its parent
export default function Step3Profile({ onNext, onBack, isFreelancer }) {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd pass the data up
    // e.g., updateProfileData({ displayName, bio })
    console.log("Saving profile:", { displayName, bio });
    onNext(); // This now calls the parent's function
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Create Your Profile
      </h1>
      
      <div className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-neutral-700 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-neutral-500" />
          </div>
          <div>
            <button type="button" className="text-sm font-medium text-primary hover:underline">
              Upload Avatar
            </button>
            <p className="text-xs text-neutral-400 mt-1">Or use an NFT from your wallet.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            Display Name
          </label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input-field"
            placeholder="Your Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input-field"
            placeholder="Tell us about yourself..."
            rows={3}
            maxLength={150}
          />
          <p className="text-xs text-neutral-400 text-right mt-1">
            {bio.length} / 150
          </p>
        </div>

        {/* More fields could be added here if isFreelancer is true */}
      </div>

      <div className="flex justify-between items-center mt-10">
        <button type="button" onClick={onBack} className="text-neutral-400 hover:text-white">
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all"
        >
          {/* This button is now smart */}
          {isFreelancer ? "Next" : "Finish"}
        </button>
      </div>
    </form>
  );
}