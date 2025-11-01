import { Star, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FreelancerCard({ freelancer, viewMode }) {
  // You can also create a list view for this
  
  // Grid View
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.2), 0 4px 6px -4px rgba(99, 102, 241, 0.1)" }}
      className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Avatar */}
      <div className="relative h-40 bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
        <Image 
          src="/icons/user-profile.png" 
          alt="Freelancer Avatar" 
          width={100} 
          height={100}
          className="rounded-full border-4 border-gray-700/50"
        />
        {freelancer.risingStar && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-xs bg-yellow-400/80 backdrop-blur-sm text-gray-900 font-bold px-2 py-0.5 rounded-full">
            <Zap className="w-3 h-3" /> Rising Star
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white truncate">{freelancer.name}</h3>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {freelancer.skills.slice(0, 3).map(skill => (
            <span key={skill} className="text-xs bg-primary/20 text-primary font-medium px-2 py-0.5 rounded-full">{skill}</span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3 text-sm">
          <span className="flex items-center text-yellow-400"><Star className="w-4 h-4 mr-1"/> {freelancer.rating}</span>
          <span className="text-gray-400">({freelancer.reviews} reviews)</span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-white mt-3">{freelancer.price}</p>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-300 mt-3 pt-3 border-t border-gray-700/50">
          <span>{freelancer.success} Success</span>
          <span>{freelancer.completed} Projects</span>
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-accent" /> {freelancer.nftBadges} Badges
          </span>
        </div>
        
        {/* CTA */}
        <button className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-4 rounded-lg transition-all">
          Hire Freelancer
        </button>
      </div>
    </motion.div>
  );
}