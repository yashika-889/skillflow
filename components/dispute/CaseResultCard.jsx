import { CheckCircle, ExternalLink, Award } from "lucide-react";

// Dummy result if one wasn't passed (for preview)
const defaultResult = {
  winner: "Party B (Freelancer)",
  voteBreakdown: "7 jurors for B, 2 for A",
  outcome: "450 FLOW released to Freelancer. 50 FLOW returned to Client.",
  rewards: "Each juror earned 12 FLOW.",
  txHash: "0x123...abc"
};

export default function CaseResultCard({ result = defaultResult }) {
  return (
    <div className="card-glass border-accent/50">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Case Resolved</h2>
        <p className="text-xl font-semibold text-accent mb-4">
          Verdict: {result.winner}
        </p>
      </div>
      
      <div className="mt-6 space-y-4">
        <ResultRow label="Vote Breakdown" value={result.voteBreakdown} />
        <ResultRow label="Fund Distribution" value={result.outcome} />
        <ResultRow label="Juror Rewards" value={result.rewards} />
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
        <a
          href={`https://flowscan.org/transaction/${result.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-secondary hover:underline flex items-center justify-center gap-2"
        >
          View Smart Contract Execution <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// Helper component
function ResultRow({ label, value }) {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center">
      <span className="text-sm font-semibold text-gray-400">{label}</span>
      <span className="text-md font-medium text-white">{value}</span>
    </div>
  );
}