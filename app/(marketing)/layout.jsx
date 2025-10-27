"use client";

import { Briefcase, Github, Send, Twitter } from "lucide-react";
import Link from "next/link";
import WalletConnect from "@/components/blockchain/WalletConnect";

// --- Header ---
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/50 backdrop-blur-lg border-b border-neutral-700/50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white flex items-center">
          <Briefcase className="w-7 h-7 text-primary mr-2" />
          SkillFlow
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-neutral-300 hover:text-white">Features</Link>
          <Link href="#how-it-works" className="text-sm text-neutral-300 hover:text-white">How It Works</Link>
          <Link href="/projects" className="text-sm text-neutral-300 hover:text-white">Browse Projects</Link>
        </div>
        
        {/* CTAs */}
        <div className="flex items-center gap-4">
          <WalletConnect />
          <Link 
            href="/onboarding" 
            className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-700/50 text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-16">
        {/* Column 1: Brand & Socials */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">SkillFlow</h3>
          <p className="text-sm mb-4">Freelancing without limits. Powered by the Flow Blockchain.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        
        {/* Column 2: Links */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-200 mb-4">Platform</h4>
          <ul className="space-y-2">
            <li><Link href="#how-it-works" className="text-sm hover:underline">How It Works</Link></li>
            <li><Link href="#" className="text-sm hover:underline">Security</Link></li>
            <li><Link href="#" className="text-sm hover:underline">Docs</Link></li>
          </ul>
        </div>
        
        {/* Column 3: Company */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-200 mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-sm hover:underline">About</Link></li>
            <li><Link href="#" className="text-sm hover:underline">Blog</Link></li>
            <li><Link href="#" className="text-sm hover:underline">Careers</Link></li>
          </ul>
        </div>
        
        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-200 mb-4">Get $10 in FLOW</h4>
          <p className="text-sm mb-3">Sign up for our newsletter and get a bonus on your first project.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="input-field !py-2 !rounded-r-none" 
            />
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-r-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      <div className="bg-neutral-900/50 py-4">
        <p className="text-center text-xs">© {new Date().getFullYear()} SkillFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}

// --- Layout ---
export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}