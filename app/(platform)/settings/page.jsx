"use client";

import { useState } from "react";
import Link from "next/link"; // <-- ADD THIS LINE
import { Bell, Fingerprint, LogOut, ShieldCheck, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto pb-24">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="space-y-10">
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsRow label="Profile" description="Edit your name, bio, and avatar">
            <Link href="/profile/me" className="text-sm font-medium text-primary hover:underline">
              Go to Profile
            </Link>
          </SettingsRow>
          <SettingsRow label="Wallet Address" description="Your primary wallet for payments">
            <span className="text-sm font-mono text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded-md">
              0x1234...5678
            </span>
          </SettingsRow>
        </SettingsSection>
        
        {/* Security Section */}
        <SettingsSection title="Security & Notifications">
          <SettingsRow label="Push Notifications" description="Get alerts for messages and project updates">
            <SettingsToggle initialChecked={true} />
          </SettingsRow>
          <SettingsRow label="Two-Factor Authentication" description="Add an extra layer of security">
            <button className="text-sm font-medium bg-secondary/20 text-secondary hover:bg-secondary/30 px-3 py-1 rounded-lg">
              Enable
            </button>
          </SettingsRow>
        </SettingsSection>
        
        {/* Actions Section */}
        <SettingsSection title="Actions">
          <SettingsRow label="Log Out" description="You will be required to reconnect your wallet">
            <button className="text-sm font-medium bg-error/20 text-error hover:bg-error/30 px-3 py-1 rounded-lg">
              Log Out
            </button>
          </SettingsRow>
        </SettingsSection>
      </div>
    </div>
  );
}

// --- Sub-Components for Settings Page ---

function SettingsSection({ title, children }) {
  return (
    <div className="card-glass !p-0">
      <h2 className="text-xl font-bold text-white p-6 border-b border-neutral-700/50">
        {title}
      </h2>
      <div className="space-y-4 p-6">
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ label, description, children }) {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
      <div>
        <h3 className="text-md font-medium text-white">{label}</h3>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}

function SettingsToggle({ initialChecked = false }) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleClick = () => {
    console.log(`Setting toggle to ${!isChecked}`);
    setIsChecked(!isChecked);
  };

  return (
    <button
      onClick={handleClick}
      role="switch"
      aria-checked={isChecked}
      className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
        ${isChecked ? 'bg-primary' : 'bg-neutral-600'}
      `}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out
          ${isChecked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}