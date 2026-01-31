"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, DollarSign, ListChecks, Star, Zap } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";

// Placeholder data (kept from your original)
const stats = [
  { name: "Active Projects", value: 3, trend: "+1" },
  { name: "Total Earnings", value: "24.5K", unit: "USD", trend: "+12%" },
  { name: "Reputation Score", value: "4.9", unit: <Star className="w-4 h-4 text-yellow-400" /> },
  { name: "Pending Payments", value: "1,200", unit: "USD" },
];

const projects = [
  {
    id: 1,
    title: "Build SkillFlow NFT Badges",
    otherParty: "Client X",
    progress: 75,
    status: "In Progress",
    action: "Submit Work",
    image: "/images/project-placeholder.jpg",
    verified: true,
    skills: ["Web3", "NFT", "Solidity"],
    rating: 4.8,
    reviews: 12,
    price: "$2,500",
    success: "92%",
    completed: 24,
    nftBadges: 3
  },
  {
    id: 2,
    title: "DAO Dispute Resolution UI",
    otherParty: "Client Y",
    progress: 20,
    status: "In Progress",
    action: "Submit Work",
    image: "/images/project-placeholder.jpg",
    verified: true,
    skills: ["React", "UI Design", "Web3"],
    rating: 4.9,
    reviews: 8,
    price: "$3,000",
    success: "95%",
    completed: 18,
    nftBadges: 2
  },
  {
    id: 3,
    title: "Marketing Site v2",
    otherParty: "Client Z",
    progress: 100,
    status: "In Review",
    action: "View",
    image: "/images/project-placeholder.jpg",
    verified: false,
    skills: ["Next.js", "Tailwind", "Marketing"],
    rating: 4.7,
    reviews: 15,
    price: "$1,800",
    success: "88%",
    completed: 31,
    nftBadges: 1
  },
];

const activities = [
  { id: 1, text: "Payment received for 'DAO UI'", amount: "100 FLOW", time: "2 hours ago" },
  { id: 2, text: "New proposal from 'Client X'", time: "5 hours ago" },
  { id: 3, text: "Milestone 2 approved for 'NFT Badges'", time: "1 day ago" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("freelancer");

  // NEW: State to hold the MongoDB user's name
  const [userName, setUserName] = useState("User");

  // NEW: Effect to pull the name from storage after login
  useEffect(() => {
    const savedName = localStorage.getItem('skillflow_user_name');
    if (savedName) setUserName(savedName);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-16 md:pb-0"
    >
      {/* Welcome Section - NOW UPDATED */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {userName}!</h1>
        <p className="text-gray-400">Here&apos;s what&apos;s happening with your projects today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-400">{stat.name}</p>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                {stat.value}
              </span>
              {stat.unit && <span className="text-sm text-gray-300">{stat.unit}</span>}
            </div>
            {stat.trend && (
              <div className="flex items-center text-xs text-green-400 mt-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>{stat.trend} from last month</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white">Active Projects</h2>

          <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg max-w-xs">
            <button
              onClick={() => setActiveTab("freelancer")}
              className={`w-full py-2 rounded-md text-sm font-medium ${activeTab === 'freelancer' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700/50'
                }`}
            >
              As Freelancer
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className={`w-full py-2 rounded-md text-sm font-medium ${activeTab === 'client' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700/50'
                }`}
            >
              As Client
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'freelancer' ? (
              projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            <QuickActionCard
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Browse New Projects"
              subtitle="AI Match Score: 85%"
            />
            <QuickActionCard
              icon={<Copy className="w-6 h-6 text-indigo-400" />}
              title="Refer & Earn 5%"
              subtitle="Copy your referral link"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-gray-700 rounded-full p-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function QuickActionCard({ icon, title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-lg p-4 flex items-start gap-3">
      <div className="bg-gray-800 rounded-md p-2">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center bg-gray-900/40 border border-gray-700/50 rounded-lg p-6">
      <p className="text-sm text-gray-300">No projects found in this view.</p>
      <p className="text-xs text-gray-500 mt-2">Switch tabs or create a new project to get started.</p>
    </div>
  );
}