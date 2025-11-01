"use client";

import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  Trophy, 
  Settings,
  Plus,
  Wallet // Added for the Payments link
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import "@/lib/flow.js";

import FlowBalance from "@/components/flow/FlowBalance";

// Navigation items
const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Projects", icon: Briefcase, href: "/projects" },
  { name: "Messages", icon: MessageSquare, href: "/messages", badge: 3 },
  { name: "Reputation", icon: Trophy, href: "/profile/me" },
  
  // The integrated Payments link
  { name: "Payments", icon: Wallet, href: "/payments" }, 
  
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // Get the real user from FCL
  const [user, setUser] = useState({ loggedIn: false, addr: null });
  useEffect(() => {
    return fcl.currentUser.subscribe(setUser);
  }, []);

  // Create dynamic avatar from wallet address
  const avatarUrl = user.addr
    ? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.addr}`
    : "https://api.dicebear.com/7.x/pixel-art/svg?seed=default-user";
  
  // Create a display name (short address)
  const displayName = user.addr
    ? `${user.addr.substring(0, 6)}...${user.addr.substring(user.addr.length - 4)}`
    : "Not Connected";

return (
  <div className="flex flex-col h-full w-64 bg-[#0b0f19] border-r border-neutral-800">
    
    {/* Logo/Header */}
    <div className="flex items-center gap-2 px-6 py-5 border-b border-neutral-800">
      <Briefcase className="w-6 h-6 text-indigo-400" />
      <Link href="/" className="text-xl font-semibold text-white tracking-wide">
        SkillFlow
      </Link>
    </div>

    {/* User section */}
    <div className="flex flex-col items-center mt-6">
      <Image
        className="h-16 w-16 rounded-full ring-2 ring-indigo-500/40 shadow-lg"
        src={avatarUrl}
        alt="User Avatar"
        width={64}
        height={64}
      />
      <span className="mt-3 text-sm font-medium text-white font-mono bg-neutral-900/70 px-3 py-1 rounded-md">
        {displayName}
      </span>
      <div className="mt-2 text-xs text-neutral-400">
        <FlowBalance />
      </div>
      <span className="text-xs text-neutral-500">~ $0.00 USD</span>
    </div>

    {/* Navigation */}
    <nav className="mt-8 flex-1 space-y-1 px-3">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive
                ? 'bg-indigo-600/90 text-white shadow-sm'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}
            `}
          >
            <item.icon className="mr-3 h-5 w-5 opacity-80" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>

    {/* CTA */}
    <div className="px-4 py-5 border-t border-neutral-800">
      <Link
        href="/projects/new"
        className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
      >
        <Plus className="w-5 h-5" />
        Create Project
      </Link>
    </div>
  </div>
);

}