import { Star, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({ project, viewMode }) {
  if (viewMode === 'list') {
    // A simplified list view
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="flex items-center bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 transition-all"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-sm text-yellow-400"><Star className="w-4 h-4 mr-1"/> {project.rating}</span>
            <span className="text-gray-400 text-sm">({project.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.skills.slice(0, 3).map(skill => (
              <span key={skill} className="text-xs bg-primary/20 text-primary font-medium px-2 py-0.5 rounded-full">{skill}</span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">{project.price}</p>
          <button className="mt-2 text-sm bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-4 rounded-lg">
            View Project
          </button>
        </div>
      </motion.div>
    );
  }

  // Grid View (default)
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.2), 0 4px 6px -4px rgba(99, 102, 241, 0.1)" }}
      className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg"
    >
      {/* 40% Image - Placeholder */}
      <div className="relative h-40 bg-gradient-to-r from-primary/30 to-secondary/30">
        <Image src={`https://picsum.photos/seed/${project.id}/400/300`} alt="Project Image" layout="fill" objectFit="cover" />
        {project.verified && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-xs bg-accent/80 backdrop-blur-sm text-gray-900 font-bold px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        )}
      </div>

      {/* 60% Details */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.skills.slice(0, 3).map(skill => (
            <span key={skill} className="text-xs bg-primary/20 text-primary font-medium px-2 py-0.5 rounded-full">{skill}</span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3 text-sm">
          <span className="flex items-center text-yellow-400"><Star className="w-4 h-4 mr-1"/> {project.rating}</span>
          <span className="text-gray-400">({project.reviews} reviews)</span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-white mt-3">{project.price}</p>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-300 mt-3 pt-3 border-t border-gray-700/50">
          <span>{project.success} Success</span>
          <span>{project.completed} Projects</span>
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-accent" /> {project.nftBadges} Badges
          </span>
        </div>
        
        {/* CTA */}
        <button className="mt-4 w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2.5 px-4 rounded-lg transition-all">
          View Project
        </button>
      </div>
    </motion.div>
  );
}