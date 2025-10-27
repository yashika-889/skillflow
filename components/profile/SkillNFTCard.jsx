import { ExternalLink } from "lucide-react";

export default function SkillNFTCard({ skill }) {
  const getBorderColor = (rarity) => {
    if (rarity === "Legendary") return "border-yellow-400";
    if (rarity === "Rare") return "border-primary";
    return "border-neutral-600";
  };

  return (
    <div className="flip-card aspect-square">
      <div className={`flip-card-inner relative w-full h-full text-center ${getBorderColor(skill.rarity)}`}>
        {/* --- Front of Card --- */}
        <div className="flip-card-front absolute w-full h-full bg-neutral-700/60 backdrop-blur-sm rounded-2xl border-2 flex flex-col items-center justify-center p-2">
          <skill.icon className={`w-10 h-10 ${skill.rarity === 'Legendary' ? 'text-yellow-400' : 'text-primary'}`} />
          <p className="mt-2 text-sm font-bold text-white leading-tight">{skill.name}</p>
          <span className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${skill.rarity === 'Legendary' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-primary/20 text-primary'}`}>
            {skill.rarity}
          </span>
        </div>
        
        {/* --- Back of Card --- */}
        <div className={`flip-card-back absolute w-full h-full bg-neutral-800/90 backdrop-blur-lg rounded-2xl border-2 ${getBorderColor(skill.rarity)} flex flex-col justify-center p-2`}>
          <p className="text-xs text-neutral-400">Issued by:</p>
          <p className="text-sm font-semibold text-white mb-2">{skill.issuer}</p>
          <p className="text-xs text-neutral-400">Date:</p>
          <p className="text-sm font-semibold text-white mb-3">{skill.date}</p>
          <a
            href={skill.onChainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-secondary hover:underline flex items-center justify-center gap-1"
          >
            View on Chain <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}