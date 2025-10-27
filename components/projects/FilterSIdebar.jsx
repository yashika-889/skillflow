"use client";

import { useState } from "react";
import { ChevronDown, Search, Star, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// --- Reusable Collapsible Section ---
function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-700/50 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-md font-semibold text-white">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Sidebar Component ---
export default function FilterSidebar() {
  const categories = ["Web Development", "Design", "Writing", "Marketing", "DAO", "Security"];
  const skills = ["Solidity", "React", "Cadence", "Figma", "UI/UX"];

  return (
    <div className="flex flex-col h-full text-white">
      <h2 className="text-2xl font-bold mb-4">Find the Perfect Match</h2>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search skills, keywords..."
          className="input-field !pl-10"
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Smart Filters */}
      <CollapsibleSection title="Smart Filters" defaultOpen={true}>
        <div className="space-y-3">
          <FilterToggle icon={<Zap className="w-4 h-4 text-primary" />} label="Recommended for You" />
          <FilterToggle icon={<Star className="w-4 h-4 text-yellow-400" />} label="Top Rated This Week" />
        </div>
      </CollapsibleSection>

      {/* Category */}
      <CollapsibleSection title="Category" defaultOpen={true}>
        <div className="space-y-2">
          {categories.map(cat => <FilterCheckbox key={cat} label={cat} />)}
        </div>
      </CollapsibleSection>

      {/* Skills */}
      <CollapsibleSection title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <button key={skill} className="text-xs font-medium bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-colors">
              {skill}
            </button>
          ))}
        </div>
      </CollapsibleSection>
      
      {/* Budget Range */}
      <CollapsibleSection title="Budget">
        <div className="flex items-center gap-3">
          <input type="number" placeholder="Min" className="input-field" />
          <span className="text-gray-500">-</span>
          <input type="number" placeholder="Max" className="input-field" />
        </div>
      </CollapsibleSection>

      {/* Reputation */}
      <CollapsibleSection title="Reputation">
        <div className="flex space-x-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button key={rating} className="flex items-center gap-1 text-sm bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-colors">
              <Star className="w-4 h-4 text-yellow-400" /> {rating}+
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Availability */}
      <CollapsibleSection title="Other">
        <FilterToggle label="Available Now" />
      </CollapsibleSection>
      
      {/* Clear Button */}
      <div className="mt-6">
        <button className="w-full text-sm font-medium text-gray-400 hover:text-white py-2 rounded-lg border border-gray-700/50 hover:border-gray-600">
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

// --- Sidebar Sub-Components ---
function FilterCheckbox({ label }) {
  return (
    <label className="flex items-center space-x-3">
      <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-primary focus:ring-primary" />
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
}

function FilterToggle({ label, icon = null }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="flex items-center gap-2 text-sm text-gray-300">
        {icon}
        {label}
      </span>
      <div className="relative">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-primary transition-colors peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </div>
    </label>
  );
}