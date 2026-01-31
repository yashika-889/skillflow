"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

// Import existing components
import FilterSidebar from "@/components/projects/FilterSidebar";
import ProjectCard from "@/components/projects/ProjectCard";
import SkeletonCard from "@/components/projects/SkeletonCard";
import FreelancerCard from "@/components/projects/FreelancerCard";

// --- Placeholder Data ---
const projects = [
  { id: 1, title: "Smart Contract Audit for DeFi", skills: ["Solidity", "Security", "Audit"], rating: 4.9, reviews: 78, price: "Fixed: $5,000", success: "98%", completed: 32, nftBadges: 3, verified: true, image: "https://picsum.photos/seed/project1/400/300" },
  { id: 2, title: "Web3 Landing Page (Glassmorphism)", skills: ["React", "Next.js", "Framer Motion"], rating: 5.0, reviews: 112, price: "$75/hr", success: "100%", completed: 51, nftBadges: 5, verified: true, image: "https://picsum.photos/seed/project2/400/300" },
  { id: 3, title: "Develop DAO Voting Mechanism", skills: ["Cadence", "Flow", "DAO"], rating: 4.8, reviews: 45, price: "Fixed: $3,500", success: "95%", completed: 20, nftBadges: 2, verified: false, image: "https://picsum.photos/seed/project3/400/300" },
  { id: 4, title: "NFT Rarity Trait Generator", skills: ["JavaScript", "IPFS", "Metadata"], rating: 4.7, reviews: 90, price: "$60/hr", success: "97%", completed: 40, nftBadges: 1, verified: true, image: "https://picsum.photos/seed/project4/400/300" },
];

const freelancers = [
  { id: 1, name: "Alice (0xAlice.flow)", skills: ["Solidity", "Cadence", "Rust"], rating: 5.0, reviews: 124, price: "$120/hr", success: "100%", completed: 60, nftBadges: 6, verified: true, risingStar: true },
  { id: 2, name: "Bob.eth", skills: ["React", "UI/UX", "Figma"], rating: 4.9, reviews: 88, price: "$90/hr", success: "98%", completed: 45, nftBadges: 4, verified: true },
];

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState("projects");
  const [viewMode, setViewMode] = useState("grid");
  const [userName, setUserName] = useState("User");

  // Sync with your MongoDB login name
  useEffect(() => {
    const savedName = localStorage.getItem('skillflow_user_name');
    if (savedName) setUserName(savedName);
  }, []);

  return (
    <div className="flex">
      {/* --- 1. Desktop Filter Sidebar --- */}
      <div className="hidden md:block w-1/4 max-w-xs pr-8">
        <FilterSidebar />
      </div>

      {/* --- 2. Main Content (Results) --- */}
      <div className="flex-1 min-w-0">
        
        {/* --- Header: Tabs & Controls --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-bold text-white">Browse {activeTab === 'projects' ? 'Projects' : 'Freelancers'}</h1>
            <p className="text-sm text-gray-400">Discover top opportunities in the ecosystem.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("freelancers")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'freelancers' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Freelancers
              </button>
            </div>

            {/* View Controls */}
            <div className="hidden md:flex items-center bg-gray-800/50 rounded-lg p-1 border border-white/5">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Results Grid --- */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {activeTab === 'projects' 
            ? projects.map(project => <ProjectCard key={project.id} project={project} viewMode={viewMode} />)
            : freelancers.map(freelancer => <FreelancerCard key={freelancer.id} freelancer={freelancer} viewMode={viewMode} />)
          }
        </div>

        {/* --- Infinite Scroll Placeholder --- */}
        <div className="h-20 w-full flex items-center justify-center mt-10">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        </div>
      </div>
    </div>
  );
}