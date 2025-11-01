"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Placeholder Data
const conversations = [
  { id: 123, name: "Alice.flow", lastMessage: "Absolutely. I've built several...", time: "10:32 AM", unread: 0, online: true, project: "NFT Badges" },
  { id: 456, name: "DAO.corp", lastMessage: "Thanks, payment sent!", time: "Yesterday", unread: 2, online: false, project: "DAO Governance" },
  { id: 789, name: "Bob.eth", lastMessage: "Can you look at this bug?", time: "2 days ago", unread: 0, online: false, project: "DeFi Auditing" },
];

export default function ConversationList() {
  const [activeTab, setActiveTab] = useState("all");
  const activeChatId = 123; // Example active chat

  return (
    <div className="flex flex-col h-full bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50">
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="input-field !pl-10 !py-2"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex mt-4">
          <TabButton title="All" isActive={activeTab === "all"} onClick={() => setActiveTab("all")} />
          <TabButton title="Unread" isActive={activeTab === "unread"} onClick={() => setActiveTab("unread")} />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 space-y-1 p-2">
          {conversations.map((chat) => (
            <ConversationItem key={chat.id} chat={chat} isActive={chat.id === activeChatId} />
          ))}
        </nav>
      </div>
    </div>
  );
}

// --- Tabs ---
function TabButton({ title, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 text-sm font-medium rounded-md
        ${isActive ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-700/50"}
      `}
    >
      {title}
    </button>
  );
}

// --- Each Conversation ---
function ConversationItem({ chat, isActive }) {
  return (
    <Link href={`/messages/${chat.id}`} className={`flex items-center p-3 rounded-lg transition-colors ${isActive ? "bg-primary/20" : "hover:bg-gray-700/50"}`}>
      <div className="relative flex-shrink-0">
        <Image
          src="/icons/user-profile.png"
          alt={chat.name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        {chat.online && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-accent border-2 border-gray-800" />
        )}
      </div>

      <div className="flex-1 min-w-0 ml-4">
        <p className="text-sm font-medium text-white truncate">{chat.name}</p>
        <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
      </div>

      <div className="flex flex-col items-end text-xs text-gray-500 flex-shrink-0">
        <span>{chat.time}</span>
        {chat.unread > 0 && (
          <span className="mt-1 flex items-center justify-center w-5 h-5 bg-secondary text-white font-bold rounded-full">
            {chat.unread}
          </span>
        )}
      </div>
    </Link>
  );
}
