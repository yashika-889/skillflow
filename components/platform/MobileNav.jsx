"use client";

import { Home, Briefcase, MessageSquare, User, Plus } from "lucide-react";

const mobileNavItems = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Projects", icon: Briefcase, href: "/projects" },
  // The "Create" button is special
  { name: "Messages", icon: MessageSquare, href: "/messages", badge: 3 },
  { name: "Profile", icon: User, href: "/profile" }, // Profile is often separate from Settings on mobile
];

export default function MobileNav() {
  const pathname = "/dashboard"; // Hardcoded for example

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-gray-800/80 backdrop-blur-lg border-t border-gray-700/50 flex justify-around items-center z-50">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <a
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full 
              ${isActive ? 'text-primary' : 'text-gray-400'}
            `}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-secondary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.name}</span>
          </a>
        );
      })}
      
      {/* FAB Button (Mobile) - Positioned separately */}
      <a 
        href="/projects/new"
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40"
      >
        <Plus className="w-8 h-8 text-white" />
      </a>
    </div>
  );
}