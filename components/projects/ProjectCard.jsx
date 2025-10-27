import { Star, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // <-- Make sure Link is imported
import { motion } from "framer-motion";

export default function ProjectCard({ project, viewMode }) {
  // --- Placeholder data (you'll get this from your project object) ---
  const client = {
    avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=Client${project.id}`,
    name: `Client ${project.id}`
  };
  const postedDate = "3 days ago"; // Placeholder
  // ---

  if (viewMode === 'list') {
    // A simplified list view
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center card-glass hover:border-primary transition-colors duration-200"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {/* --- Client Info & Post Date --- */}
          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
            <Image src={client.avatar} alt={client.name} width={16} height={16} className="rounded-full" />
            <span>by {client.name}</span>
            <span>·</span>
            <span>Posted {postedDate}</span>
          </div>
          {/* --- */}
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-sm text-yellow-400"><Star className="w-4 h-4 mr-1"/> {project.rating}</span>
            <span className="text-neutral-400 text-sm">({project.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.skills.slice(0, 3).map(skill => (
              <span key={skill} className="text-xs bg-primary/20 text-primary font-medium px-2 py-0.5 rounded-full">{skill}</span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">{project.price}</p>
          {/* --- UPDATED: Use Link --- */}
          <Link
            href={`/projects/${project.id}`} // Link to the dynamic project page
            className="mt-2 inline-block text-sm bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-4 rounded-lg" // Added inline-block
          >
            View Project
          </Link>
        </div>
      </motion.div>
    );
  }

  // Grid View (default)
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.15), 0 4px 6px -4px rgba(99, 102, 241, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card-glass !p-0 overflow-hidden transition-shadow duration-200 flex flex-col"
    >
      {/* --- Image Container --- */}
      <div className="relative h-40 group shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="transition-transform duration-300 group-hover:scale-105 object-cover"
        />
        {/* --- Badge Positioning --- */}
        {project.verified && (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 text-xs bg-accent/80 backdrop-blur-sm text-neutral-900 font-bold px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        )}
        {/* Optional: Add an overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>

        {/* --- Client Info & Post Date --- */}
        <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
          <Image src={client.avatar} alt={client.name} width={16} height={16} className="rounded-full" />
          <span>by {client.name}</span>
          <span>·</span>
          <span>{postedDate}</span>
        </div>
        {/* --- */}

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
           {project.skills.slice(0, 3).map(skill => (
             <span key={skill} className="text-xs bg-primary/20 text-primary font-medium px-2 py-0.5 rounded-full">{skill}</span>
           ))}
         </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3 text-sm">
           <span className="flex items-center text-yellow-400"><Star className="w-4 h-4 mr-1"/> {project.rating}</span>
           <span className="text-neutral-400">({project.reviews} reviews)</span>
         </div>

        {/* Price */}
        <p className="text-xl font-bold text-white mt-3">{project.price}</p>

        {/* Use flex-grow to push CTA to bottom */}
        <div className="flex-grow"></div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-neutral-300 mt-3 pt-3 border-t border-neutral-700/50">
           <span>{project.success} Success</span>
           <span>{project.completed} Projects</span>
           <span className="flex items-center gap-1">
             <Zap className="w-4 h-4 text-accent" /> {project.nftBadges} Badges
           </span>
         </div>

        {/* CTA */}
        <Link
          href={`/projects/${project.id}`} // Link to the dynamic project page
          className="mt-4 block w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2.5 px-4 rounded-lg transition-all text-center" // Added block and text-center
        >
          View Project
        </Link>
      </div>
    </motion.div>
  );
}