import { Star } from "lucide-react";
import Image from "next/image";

export default function ReviewCard({ review }) {
  return (
    <div className="card-glass">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Image
            src={review.client.avatar}
            alt={review.client.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-white">{review.client.name}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          <span className="text-sm font-bold text-white">{review.rating}</span>
        </div>
      </div>
      <p className="text-sm text-gray-300 mt-4">{review.text}</p>
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <p className="text-xs text-gray-400">
          For Project: <a href="#" className="text-secondary hover:underline">{review.project}</a>
        </p>
      </div>
    </div>
  );
}