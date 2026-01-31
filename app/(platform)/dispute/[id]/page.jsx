// This is a client component for interactivity
"use client";

import { useState } from "react";
import { Gavel, Scale, Clock, ShieldCheck, Download, AlertTriangle } from "lucide-react";

// Import the sub-components we'll create next
// Import the sub-components
import EvidenceCard from "../EvidenceCard";
import JurorVotingCard from "../JurorVotingCard";
import CaseResultCard from "../CaseResultCard";

// --- Placeholder Data ---
// In a real app, you'd fetch this based on params.id
const disputeCase = {
  id: "D-1234",
  status: "Under Review", // 'Under Review', 'Resolved'
  projectTitle: "Build SkillFlow NFT Badges",
  endsIn: "2 days 14 hours",
  partyA: {
    role: "Client",
    statement: "The freelancer delivered work that does not match the agreed-upon requirements. The UI is completely different from the Figma files, and half the features are missing.",
    evidence: [
      { id: 1, type: "image", name: "Figma-vs-Actual.png", url: "#", verified: true },
      { id: 2, type: "pdf", name: "Original-Scope.pdf", url: "#", verified: true },
      { id: 3, type: "text", name: "Message-Log.txt", url: "#", verified: true },
    ]
  },
  partyB: {
    role: "Freelancer",
    statement: "The client changed the scope mid-project via chat and refused to create a new milestone. The delivered work matches the *new* requirements. The client is trying to get free work.",
    evidence: [
      { id: 1, type: "image", name: "Chat-Screenshots.png", url: "#", verified: true },
      { id: 2, type: "video", name: "New-Features-Demo.mp4", url: "#", verified: true },
    ]
  },
  result: null // Will be populated if 'Resolved'
  // result: {
  //   winner: "Party B (Freelancer)",
  //   voteBreakdown: "7 jurors for B, 2 for A",
  //   outcome: "450 FLOW released to Freelancer. 50 FLOW returned to Client.",
  //   rewards: "Each juror earned 12 FLOW.",
  //   txHash: "0x123...abc"
  // }
};

// Simulate the current user's role
const userRole = "juror"; // 'party_a', 'party_b', 'juror', 'visitor'
// --- End Placeholder Data ---


export default function DisputePage({ params }) {
  // params.id would be "D-1234"
  const [caseData, setCaseData] = useState(disputeCase);

  const getStatusColor = (status) => {
    if (status === "Under Review") return "bg-yellow-500/20 text-yellow-400";
    if (status === "Resolved") return "bg-accent/20 text-accent";
    return "bg-gray-600/20 text-gray-300";
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">

      {/* --- Case Header --- */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(caseData.status)}`}>
                {caseData.status}
              </span>
              <span className="text-sm text-gray-400">Case ID: {caseData.id}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">
              Dispute: {caseData.projectTitle}
            </h1>
          </div>
          <div className="text-left md:text-right mt-4 md:mt-0">
            <p className="text-sm text-gray-400">Voting Ends In:</p>
            <p className="text-2xl font-bold text-secondary">{caseData.endsIn}</p>
          </div>
        </div>
      </div>

      {/* --- Main Content: Case Overview --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EvidenceCard party={caseData.partyA} />
        <EvidenceCard party={caseData.partyB} />
      </div>

      {/* --- Action/Result Section --- */}
      <div className="mt-8">
        {caseData.status === 'Resolved' ? (
          <CaseResultCard result={caseData.result} />
        ) : (
          userRole === 'juror' && <JurorVotingCard />
        )}

        {userRole !== 'juror' && caseData.status !== 'Resolved' && (
          <div className="card-glass text-center">
            <h3 className="text-xl font-bold text-white">Your Case is Under Review</h3>
            <p className="text-gray-300 mt-2">
              DAO jurors have been selected and are now reviewing the evidence.
              You will be notified as soon as a verdict is reached.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" /> This process is anonymous and fair.
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// Add this to globals.css (we used it in the Profile page, but good to ensure it's defined)
/*
@layer components {
  .card-glass {
    @apply bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-lg p-6;
  }
}
*/