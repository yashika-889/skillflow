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
    <div className="flex flex-col h-full bg-neutral-800/50 backdrop-blur-lg border-r border-neutral-700/50">
      
      {/* Logo/Header */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-neutral-700/50">
        <Link href="/" className="text-2xl font-bold text-white flex items-center">
          <Briefcase className="w-7 h-7 text-primary mr-2" />
          SkillFlow
        </Link>
      </div>

      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        
        {/* Avatar & Name */}
        <div className="flex-shrink-0 flex flex-col items-center px-4">
          <Link href="/profile/me" className="flex flex-col items-center group">
            <Image
              className="h-20 w-20 rounded-full group-hover:ring-2 group-hover:ring-primary transition-all"
              src={avatarUrl}
              alt="User Avatar"
              width={80}
              height={80}
            />
            <span className="mt-3 text-sm font-medium text-white font-mono bg-neutral-900/50 px-3 py-1 rounded-lg group-hover:text-primary transition-all">
              {displayName}
            </span>
          </Link>
          <span className="mt-2">
            <FlowBalance />
          </span>
          <span className="text-sm text-neutral-400">
            ~ $0.00 USD
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-2 space-y-2"> {/* Removed 'flex-1' here to potentially fix layout issues */}
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  ${isActive ? 'bg-primary text-white' : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'}
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                `}
              >
                <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* "Create Project" Button */}
      <div className="p-4">
         <Link 
            href="/projects/new"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Project
         </Link>
      </div>
    </div>
  );
}