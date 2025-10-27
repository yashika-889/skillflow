import { MessageSquare } from "lucide-react";

export default function SelectMessage() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-800/90 backdrop-blur-lg border-l border-gray-700/50 text-gray-500">
      <MessageSquare className="w-24 h-24" />
      <h2 className="mt-4 text-xl font-semibold text-gray-400">Select a Conversation</h2>
      <p className="text-sm">Choose from your existing conversations to start chatting.</p>
    </div>
  );
}