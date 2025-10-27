"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  HardHat, 
  ShieldCheck, 
  User,
  AlertTriangle
} from "lucide-react";

// We are now USING the modals we built earlier
import FundEscrowModal from "@/components/projects/FundEscrowModal";
import ReleasePaymentModal from "@/components/projects/ReleasePaymentModal";
// This is a NEW component we will create next
import MilestoneCard from "@/components/projects/MilestoneCard";


// --- Placeholder Data ---
// In a real app, you'd fetch this from your DB based on `params.id`
const project = {
  id: "123",
  title: "Build SkillFlow NFT Badges",
  status: "In Progress", // 'Funding', 'In Progress', 'In Review', 'Completed'
  budget: 500,
  currency: "FLOW",
  description: "We need a new set of on-chain NFT badges for our platform. This will involve creating the Cadence smart contract, minting logic, and a simple UI for users to view their badges. \n\nMust be compatible with the Flow NFT standard.",
  client: {
    name: "Client X",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=ClientX",
    isVerified: true,
  },
  freelancer: {
    name: "Alice.flow",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Alice.flow",
    isVerified: true,
  },
  files: [
    { name: "Design-Mockups.fig", size: "12.4 MB" },
    { name: "Technical-Spec.pdf", size: "1.2 MB" },
  ],
  milestones: [
    { id: "m1", title: "Smart Contract Development", status: "Complete", amount: 200 },
    { id: "m2", title: "UI Integration", status: "In Review", amount: 200 },
    { id: "m3", title: "Deployment & Testing", status: "Pending", amount: 100 },
  ]
};

// Simulate the current user's role
const userRole = "client"; // 'client', 'freelancer', or 'visitor'
// --- End Placeholder Data ---


export default function ProjectDetailsPage({ params }) {
  // params.id would be "123"
  
  const [activeTab, setActiveTab] = useState("milestones");
  
  // --- Modal State ---
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // This function is passed down to <MilestoneCard>
  const handleOpenReleaseModal = (milestone) => {
    setSelectedMilestone(milestone);
    setIsReleaseModalOpen(true);
  };
  
  const getStatusBadge = () => {
    switch (project.status) {
      case 'Funding':
        return <span className="badge-warning"><AlertTriangle className="w-4 h-4" /> Awaiting Funds</span>;
      case 'In Progress':
        return <span className="badge-secondary"><Clock className="w-4 h-4" /> In Progress</span>;
      case 'In Review':
        return <span className="badge-warning"><HardHat className="w-4 h-4" /> In Review</span>;
      case 'Completed':
        return <span className="badge-accent"><CheckCircle className="w-4 h-4" /> Completed</span>;
      default:
        return <span className="badge-neutral">{project.status}</span>;
    }
  };

  return (
    <>
      {/* --- Main Page Content --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column (Main Content) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Project Header */}
          <div className="card-glass">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">{project.title}</h1>
              {getStatusBadge()}
            </div>
            <p className="text-lg text-neutral-300 mt-4 whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex space-x-1 bg-neutral-800/80 backdrop-blur-lg border border-neutral-700/50 p-1 rounded-lg">
            <TabButton title="Milestones" isActive={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} />
            <TabButton title="Files" isActive={activeTab === 'files'} onClick={() => setActiveTab('files')} />
            <TabButton title="Description" isActive={activeTab === 'description'} onClick={() => setActiveTab('description')} />
          </div>

          {/* Tab Content */}
          <div className="card-glass">
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Project Milestones</h2>
                {project.milestones.map(milestone => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    userRole={userRole}
                    onApprove={() => handleOpenReleaseModal(milestone)}
                  />
                ))}
              </div>
            )}
            
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Full Description</h2>
                <p className="text-neutral-300 whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}
            
            {activeTab === 'files' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Attached Files</h2>
                <div className="space-y-3">
                  {project.files.map(file => (
                    <a href="#" key={file.name} className="flex items-center p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700">
                      <FileText className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-sm font-medium text-white">{file.name}</span>
                      <span className="text-sm text-neutral-500 ml-auto">{file.size}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Column (Action Sidebar) --- */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Action Card */}
          <div className="card-glass p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              {project.budget} {project.currency}
            </h2>
            <p className="text-center text-neutral-400 text-sm">Total Project Budget</p>
            
            {/* --- THIS IS THE KEY ACTION BUTTON --- */}
            {userRole === 'client' && project.status === 'Funding' && (
              <button 
                onClick={() => setIsFundModalOpen(true)}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg"
              >
                Fund Project Escrow
              </button>
            )}
            {userRole === 'freelancer' && project.status === 'In Progress' && (
              <button className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-lg">
                Submit Final Work
              </button>
            )}
            {userRole === 'client' && project.status === 'In Review' && (
              <button 
                onClick={() => handleOpenReleaseModal({ title: "Final Payment", amount: project.budget })}
                className="w-full mt-6 bg-accent hover:bg-accent/90 text-neutral-900 font-bold py-3 rounded-lg"
              >
                Approve Final Payment
              </button>
            )}
          </div>
          
          {/* Client Card */}
          <PartyCard title="Client" user={project.client} />
          
          {/* Freelancer Card */}
          <PartyCard title="Freelancer" user={project.freelancer} />

        </div>
      </div>

      {/* --- Modals (Invisible until triggered) --- */}
      <FundEscrowModal
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
        // In a real app, you'd pass the real project data here
      />
      
      <ReleasePaymentModal
        isOpen={isReleaseModalOpen}
        onClose={() => setIsReleaseModalOpen(false)}
        milestone={selectedMilestone}
        freelancerName={project.freelancer.name}
      />
      
      {/* Add this to globals.css */}
      {/* @layer components {
        .badge-warning {
          @apply flex items-center gap-1.5 text-xs font-medium bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full;
        }
        .badge-secondary {
          @apply flex items-center gap-1.5 text-xs font-medium bg-secondary/20 text-secondary px-3 py-1 rounded-full;
        }
        .badge-accent {
          @apply flex items-center gap-1.5 text-xs font-medium bg-accent/20 text-accent px-3 py-1 rounded-full;
        }
        .badge-neutral {
          @apply flex items-center gap-1.5 text-xs font-medium bg-neutral-600/20 text-neutral-300 px-3 py-1 rounded-full;
        }
      }
      */}
    </>
  );
}


// --- Sub-Components for this Page ---

function TabButton({ title, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 rounded-md text-sm font-medium transition-all
        ${isActive ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-700/50'}
      `}
    >
      {title}
    </button>
  );
}

function PartyCard({ title, user }) {
  return (
    <div className="card-glass p-5">
      <h3 className="text-sm font-semibold text-neutral-400 mb-3">{title}</h3>
      <Link href={`/profile/${user.name}`} className="flex items-center gap-3 group">
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-md font-bold text-white group-hover:underline">{user.name}</p>
          {user.isVerified && (
            <span className="flex items-center gap-1 text-xs text-secondary">
              <ShieldCheck className="w-3 h-3" /> Verified User
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}