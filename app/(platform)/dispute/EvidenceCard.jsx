import { Download, ShieldCheck, FileText, Image, Video } from "lucide-react";

// Helper to get file icon
const FileIcon = ({ type }) => {
  if (type === 'image') return <Image className="w-5 h-5 text-secondary" />;
  if (type === 'video') return <Video className="w-5 h-5 text-accent" />;
  if (type === 'pdf') return <FileText className="w-5 h-5 text-error" />;
  return <FileText className="w-5 h-5 text-gray-400" />;
};

export default function EvidenceCard({ party }) {
  return (
    <div className="card-glass">
      {/* Party Info */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          Party {party.role === 'Client' ? 'A' : 'B'} ({party.role})
        </h2>
        <span className="text-xs font-mono bg-gray-900/50 px-3 py-1 rounded-full">
          Anonymized
        </span>
      </div>

      {/* Statement */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Statement:</h3>
        <p className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
          {party.statement}
        </p>
      </div>

      {/* Evidence */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Evidence:</h3>
        <div className="space-y-3">
          {party.evidence.map(file => (
            <a
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileIcon type={file.type} />
                <span className="text-sm font-medium text-white">{file.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {file.verified && (
                  <ShieldCheck className="w-4 h-4 text-accent" title="On-Chain Verified" />
                )}
                <Download className="w-4 h-4 text-gray-500" />
              </div>
            </a>
          ))}
          {party.evidence.length === 0 && (
            <p className="text-sm text-gray-500 text-center p-3">
              No evidence provided.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}