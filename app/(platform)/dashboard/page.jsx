"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, DollarSign, ListChecks, Star, Zap } from "lucide-react";

// Placeholder data
const stats = [
  { name: "Active Projects", value: 3, trend: "+1" },
  { name: "Total Earnings", value: "24.5K", unit: "USD", trend: "+12%" },
  { name: "Reputation Score", value: "4.9", unit: <Star className="w-4 h-4 text-yellow-400" /> },
  { name: "Pending Payments", value: "1,200", unit: "USD" },
];

const projects = [
  { id: 1, title: "Build SkillFlow NFT Badges", otherParty: "Client X", progress: 75, status: "In Progress", action: "Submit Work" },
  { id: 2, title: "DAO Dispute Resolution UI", otherParty: "Client Y", progress: 20, status: "In Progress", action: "Submit Work" },
  { id: 3, title: "Marketing Site v2", otherParty: "Client Z", progress: 100, status: "In Review", action: "View" },
];

const activities = [
  { id: 1, text: "Payment received for 'DAO UI'", amount: "100 FLOW", time: "2 hours ago" },
  { id: 2, text: "New proposal from 'Client X'", time: "5 hours ago" },
  { id: 3, text: "Milestone 2 approved for 'NFT Badges'", time: "1 day ago" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("freelancer");

  return (
    <div className="space-y-8 pb-16 md:pb-0"> {/* Add padding for mobile nav */}
      
      {/* --- Top Stats Bar --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-5 shadow-lg">
            <p className="text-sm font-medium text-gray-400">{stat.name}</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              {stat.unit && <span className="text-sm text-gray-300">{stat.unit}</span>}
            </div>
            {stat.trend && (
              <div className="flex items-center text-xs text-accent mt-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>{stat.trend} from last month</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Active Projects (Main Column) --- */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white">Active Projects</h2>
          
          {/* Tab Switcher */}
          <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg max-w-xs">
            <button
              onClick={() => setActiveTab("freelancer")}
              className={`w-full py-2 rounded-md text-sm font-medium ${activeTab === 'freelancer' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              As Freelancer
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className={`w-full py-2 rounded-md text-sm font-medium ${activeTab === 'client' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              As Client
            </button>
          </div>

          {/* Project Cards */}
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

        {/* --- Sidebar Column --- */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            <QuickActionCard
              icon={<Zap className="w-6 h-6 text-secondary" />}
              title="Browse New Projects"
              subtitle="AI Match Score: 85%"
            />
            <QuickActionCard
              icon={<Copy className="w-6 h-6 text-accent" />}
              title="Refer & Earn 5%
"
              subtitle="Copy your referral link"
            />
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-gray-700 rounded-full p-2">
                    <DollarSign className="w-4 h-4 text-accent" />
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
    </div>
  );
}

// --- Sub-Components for the Dashboard Page ---

function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    if (status === "In Progress") return "bg-secondary/20 text-secondary";
    if (status === "In Review") return "bg-yellow-500/20 text-yellow-400";
    return "bg-gray-600/20 text-gray-300";
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-5 hover:border-primary transition-all shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white truncate w-60 md:w-full">{project.title}</h3>
          <p className="text-sm text-gray-400">with {project.otherParty}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
        </div>
      </div>
      <div className="mt-5 text-right">
        <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg text-sm">
          {project.action}
        </button>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, subtitle }) {
  return (
    <button className="w-full flex items-center p-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl hover:border-secondary transition-all text-left">
      <div className="p-3 bg-gray-700/50 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <p className="text-md font-semibold text-white">{title}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="text-center p-10 bg-gray-800/50 border-2 border-dashed border-gray-700/50 rounded-2xl">
      <ListChecks className="w-12 h-12 mx-auto text-gray-500" />
      <h3 className="mt-2 text-lg font-semibold text-white">No active projects</h3>
      <p className="mt-1 text-sm text-gray-400">Projects you post as a client will appear here.</p>
      <button className="mt-4 bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-lg">
        Post Your First Project
      </button>
    </div>
  );
}