"use client";
import { CheckCircle, Clock, HardHat } from "lucide-react";

// Helper
const getStatus = (status) => {
  switch (status) {
    case 'Complete':
      return <span className="badge-accent"><CheckCircle className="w-4 h-4" /> Paid</span>;
    case 'In Review':
      return <span className="badge-warning"><HardHat className="w-4 h-4" /> In Review</span>;
    case 'Pending':
      return <span className="badge-neutral"><Clock className="w-4 h-4" /> Pending</span>;
    default:
      return <span className="badge-neutral">{status}</span>;
  }
};

export default function MilestoneCard({ milestone, userRole, onApprove }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-neutral-900/50 border border-neutral-700/50 rounded-lg">
      <div className="mb-3 md:mb-0">
        <h3 className="text-md font-semibold text-white">{milestone.title}</h3>
        <p className="text-lg font-bold text-accent">
          {milestone.amount} FLOW
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {getStatus(milestone.status)}
        
        {/* --- Action Buttons --- */}
        {userRole === 'freelancer' && milestone.status === 'Pending' && (
          <button className="text-sm font-medium text-white bg-secondary hover:bg-secondary/90 px-4 py-2 rounded-lg">
            Submit Work
          </button>
        )}
        
        {userRole === 'client' && milestone.status === 'In Review' && (
          <button 
            onClick={onApprove}
            className="text-sm font-medium text-neutral-900 bg-accent hover:bg-accent/90 px-4 py-2 rounded-lg"
          >
            Review & Pay
          </button>
        )}
      </div>
    </div>
  );
}