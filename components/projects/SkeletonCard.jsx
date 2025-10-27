export default function SkeletonCard({ viewMode }) {
    if (viewMode === 'list') {
      return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 w-48 bg-gray-700 rounded"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
            <div className="h-10 w-24 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      );
    }
  
    // Grid View
    return (
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden animate-pulse">
        <div className="h-40 bg-gray-700"></div>
        <div className="p-5 space-y-3">
          <div className="h-5 w-3/4 bg-gray-700 rounded"></div>
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-gray-700 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-5 w-1/4 bg-gray-700 rounded"></div>
          <div className="flex justify-between border-t border-gray-700/50 pt-3">
            <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
          </div>
          <div className="h-10 w-full bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }