"use client";

import { useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

// Import the components we'll create next
import FilterSidebar from "@/components/projects/FilterSidebar";
import ProjectCard from "@/components/projects/ProjectCard";
import SkeletonCard from "@/components/projects/SkeletonCard";
import FreelancerCard from "@/components/projects/FreelancerCard";

// --- Placeholder Data ---
const projects = [
  { id: 1, title: "Smart Contract Audit for DeFi", skills: ["Solidity", "Security", "Audit"], rating: 4.9, reviews: 78, price: "Fixed: $5,000", success: "98%", completed: 32, nftBadges: 3, verified: true },
  { id: 2, title: "Web3 Landing Page (Glassmorphism)", skills: ["React", "Next.js", "Framer Motion"], rating: 5.0, reviews: 112, price: "$75/hr", success: "100%", completed: 51, nftBadges: 5, verified: true },
  { id: 3, title: "Develop DAO Voting Mechanism", skills: ["Cadence", "Flow", "DAO"], rating: 4.8, reviews: 45, price: "Fixed: $3,500", success: "95%", completed: 20, nftBadges: 2, verified: false },
  { id: 4, title: "NFT Rarity Trait Generator", skills: ["JavaScript", "IPFS", "Metadata"], rating: 4.7, reviews: 90, price: "$60/hr", success: "97%", completed: 40, nftBadges: 1, verified: true },
];

const freelancers = [
  { id: 1, name: "Alice (0xAlice.flow)", skills: ["Solidity", "Cadence", "Rust"], rating: 5.0, reviews: 124, price: "$120/hr", success: "100%", completed: 60, nftBadges: 6, verified: true, risingStar: true },
  { id: 2, name: "Bob.eth", skills: ["React", "UI/UX", "Figma"], rating: 4.9, reviews: 88, price: "$90/hr", success: "98%", completed: 45, nftBadges: 4, verified: true },
];
// --- End Placeholder Data ---

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState("projects"); // 'projects' or 'freelancers'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate fetching more data
    setTimeout(() => {
      // In a real app, you'd append new items to the 'projects' array
      console.log("Loading more...");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex">
      {/* --- 1. Desktop Filter Sidebar --- */}
      <div className="hidden md:block w-1/4 max-w-xs pr-8">
        <FilterSidebar />
      </div>

      {/* --- 2. Main Content (Results) --- */}
      <div className="flex-1 min-w-0">
        
        {/* --- Header: Tabs & Controls --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg w-full md:w-auto">
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full md:w-auto px-6 py-2 rounded-md text-sm font-medium ${activeTab === 'projects' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              Find Projects
            </button>
            <button
              onClick={() => setActiveTab("freelancers")}
              className={`w-full md:w-auto px-6 py-2 rounded-md text-sm font-medium ${activeTab === 'freelancers' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              Find Freelancers
            </button>
          </div>
          
          {/* Sort & View Controls */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select className="input-field !py-2 !px-3 text-sm flex-1">
              <option>Sort by: Best Match</option>
              <option>Sort by: Highest Rated</option>
              <option>Sort by: Lowest Price</option>
              <option>Sort by: Fastest Delivery</option>
            </select>
            <div className="hidden md:flex items-center bg-gray-800/50 rounded-lg">
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-500'}`}>
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-500'}`}>
                <List className="w-5 h-5" />
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
          
          {/* Loading Skeletons */}
          {isLoading && (
            <>
              <SkeletonCard viewMode={viewMode} />
              <SkeletonCard viewMode={viewMode} />
              <SkeletonCard viewMode={viewMode} />
            </>
          )}
        </div>

        {/* --- Load More Button (Simulates Infinite Scroll) --- */}
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}