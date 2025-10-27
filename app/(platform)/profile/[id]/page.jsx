"use client";

import {
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SkillNFTCard from "@/components/profile/SkillNFTCard";
import ReputationChart from "@/components/profile/ReputationChart";
import ReviewCard from "@/components/profile/ReviewCard";
import PortfolioCard from "@/components/profile/PortfolioCard";

// --- Placeholder Data ---
const userProfile = {
  name: "Alice.flow",
  username: "@alice",
  avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Alice.flow",
  cover: "https://picsum.photos/seed/cover/1200/300",
  rating: 4.9,
  reviewCount: 124,
  isVerified: true,
  stats: [
    { name: "Projects Completed", value: 60 },
    { name: "Success Rate", value: "98%" },
    { name: "Avg. Response Time", value: "2 hours" },
  ],
  skills: [
    { id: 1, name: "Solidity Expert", issuer: "SkillFlow DAO", date: "2025-03-15", rarity: "Legendary", icon: Award, onChainUrl: "#" },
    { id: 2, name: "Cadence Advanced", issuer: "Flow Foundation", date: "2024-11-20", rarity: "Rare", icon: BadgeCheck, onChainUrl: "#" },
    { id: 3, name: "React Pro", issuer: "Community Verified", date: "2024-09-01", rarity: "Common", icon: CheckCircle, onChainUrl: "#" },
  ],
  reputation: {
    score: 950,
    breakdown: [
      { name: "Quality", value: 350, color: "#6366F1" }, // Primary
      { name: "Communication", value: 250, color: "#3B82F6" }, // Secondary
      { name: "Timeliness", value: 200, color: "#10B981" }, // Accent
      { name: "Budget", value: 200, color: "#F59E0B" }, // Yellow
    ]
  },
  portfolio: [
    { id: 1, title: "DeFi Auditing Tool", category: "Smart Contracts", image: "https://picsum.photos/seed/p1/400/300" },
    { id: 2, title: "Flow NFT Marketplace UI", category: "UI/UX Design", image: "https://picsum.photos/seed/p2/400/300" },
    { id: 3, title: "DAO Governance Portal", category: "Web App", image: "https://picsum.photos/seed/p3/400/300" },
  ],
  reviews: [
    { id: 1, client: { name: "Bob.eth", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Bob" }, rating: 5, date: "2 weeks ago", project: "DeFi Auditing Tool", text: "Alice is a true professional. Her audit was thorough..." },
    { id: 2, client: { name: "DAO.corp", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=DAO" }, rating: 5, date: "1 month ago", project: "DAO Governance Portal", text: "Excellent communication and delivered ahead of schedule." },
  ]
};
// --- End Placeholder Data ---

export default function ProfilePage({ params }) {
  // params.id will be "me" or a wallet address
  // We'll just use the placeholder data for this example
  const [activeTab, setActiveTab] = useState("portfolio"); 

  return (
    <div className="pb-24">
      {/* --- 1. Hero Section --- */}
      <div className="card-glass !p-0 overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 md:h-64 relative">
          <Image src={userProfile.cover} alt="Cover" layout="fill" objectFit="cover" />
        </div>
        
        {/* Profile Details */}
        <div className="p-6 relative">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <Image
              src={userProfile.avatar}
              alt="Avatar"
              width={128}
              height={128}
              className="rounded-full border-4 border-neutral-800 shadow-lg"
            />
          </div>
          
          {/* Hire Button */}
          <div className="flex justify-end gap-3 -mt-4">
            <button className="h-12 px-6 bg-neutral-700/80 hover:bg-neutral-700 text-white font-medium rounded-lg transition-all flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Send Message
            </button>
            <button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Hire {userProfile.name}
            </button>
          </div>

          {/* Name & Stats */}
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              {userProfile.name}
              {userProfile.isVerified && <BadgeCheck className="w-7 h-7 text-secondary" fill="currentColor" />}
            </h1>
            <p className="text-md text-neutral-400 font-mono">{userProfile.username}</p>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-5 h-5" fill="currentColor" />
                <span className="text-lg font-bold text-white">{userProfile.rating}</span>
              </div>
              <span className="text-neutral-400">({userProfile.reviewCount} reviews)</span>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-neutral-700/50 pt-6">
            {userProfile.stats.map(stat => (
              <div key={stat.name} className="bg-neutral-900/50 p-3 rounded-lg">
                <p className="text-sm text-neutral-400">{stat.name}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* --- Main Content Grid --- */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column (Skills & Reputation) --- */}
        <div className="lg:col-span-1 space-y-8">
          {/* Verified Skills */}
          <div className="card-glass">
            <h2 className="text-xl font-bold text-white mb-4">Verified Skills & Credentials</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              {userProfile.skills.map(skill => (
                <SkillNFTCard key={skill.id} skill={skill} />
              ))}
              <div className="flex flex-col items-center justify-center p-4 aspect-square border-2 border-dashed border-neutral-700/50 rounded-2xl text-neutral-500">
                <Award className="w-8 h-8" />
                <p className="text-xs text-center mt-2">Earn more badges</p>
              </div>
            </div>
          </div>

          {/* Reputation Breakdown */}
          <div className="card-glass">
            <h2 className="text-xl font-bold text-white mb-4">Reputation Score</h2>
            <ReputationChart score={userProfile.reputation.score} data={userProfile.reputation.breakdown} />
            <button className="mt-4 text-sm text-secondary hover:underline w-full flex items-center justify-center gap-1">
              View Full Reputation NFT <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- Right Column (Portfolio & Reviews) --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tab Switcher */}
          <div className="flex space-x-1 bg-neutral-800/80 backdrop-blur-lg border border-neutral-700/50 p-1 rounded-lg">
            <TabButton title="Portfolio" isActive={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
            <TabButton title="Reviews" isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
          </div>

          {/* Content */}
          <div>
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProfile.portfolio.map(item => <PortfolioCard key={item.id} item={item} />)}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {userProfile.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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