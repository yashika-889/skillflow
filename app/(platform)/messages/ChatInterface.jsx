"use client";

import { useState } from "react";
import { Send, Paperclip, Code, DollarSign, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Helper function to format code blocks
const formatMessage = (text) => {
  const codeRegex = /`([^`]+)`/g;
  return text.replace(codeRegex, '<code class="px-1 py-0.5 bg-gray-900 rounded-md font-mono text-sm">$1</code>');
};

export default function ChatInterface({ conversation }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    // --- SIMULATED REAL-TIME LOGIC ---
    // In a real app, you'd send this message via WebSocket
    console.log("Sending message:", newMessage);
    // You'd also update the local state to show the message instantly
    setNewMessage("");
    // --- END SIMULATION ---
  };

  return (
    <div className="flex flex-col h-full bg-gray-800/90 backdrop-blur-lg border-l border-gray-700/50">
      {/* --- Chat Header --- */}
      <div className="flex items-center p-4 border-b border-gray-700/50 flex-shrink-0">
        <Image
          src={conversation.otherUser.avatar}
          alt={conversation.otherUser.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <h2 className="text-md font-bold text-white">{conversation.otherUser.name}</h2>
          <p className="text-xs text-accent">{conversation.otherUser.status}</p>
        </div>
        {/* Project Link */}
        <Link href={`/projects/${conversation.project.id}`}>
          <a className="ml-auto text-xs text-gray-400 hover:text-white bg-gray-700/50 px-3 py-1.5 rounded-lg">
            Project: {conversation.project.title}
          </a>
        </Link>
      </div>

      {/* --- Message Thread --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* --- Input Area --- */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-700/50 flex-shrink-0">
        <div className="relative flex items-center">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Type your message..."
            className="input-field !pr-24 !py-3"
            rows={1}
            style={{ resize: 'none' }}
          />
          <div className="absolute right-3 flex items-center gap-3">
            <button type="button" className="text-gray-500 hover:text-white">
              <Paperclip className="w-5 h-5" />
            </button>
            <button 
              type="button" 
              className="text-gray-500 hover:text-white"
              title="Send Offer"
            >
              <DollarSign className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="text-primary hover:text-primary/80"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// --- Sub-Components for Chat ---

// Message Bubble
function MessageBubble({ message }) {
  const isMe = message.sender === 'me';
  
  // System Message
  if (message.type === 'system') {
    return (
      <div className="text-center text-xs text-gray-400 font-medium">
        {message.text}
      </div>
    );
  }
  
  // Offer Card
  if (message.type === 'offer') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-xs p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <p className="text-sm text-gray-400">
            {isMe ? "You sent an offer:" : "You received an offer:"}
          </p>
          <p className="text-md font-semibold text-white my-1">{message.offer.description}</p>
          <p className="text-lg font-bold text-accent">
            {message.offer.amount} {message.offer.currency}
          </p>
          {!isMe && (
            <div className="flex gap-2 mt-3">
              <button className="text-sm w-full bg-accent/20 text-accent hover:bg-accent/30 py-1.5 rounded-md">Decline</button>
              <button className="text-sm w-full bg-accent text-gray-900 font-medium hover:bg-accent/90 py-1.5 rounded-md">Accept Offer</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Standard Text Message
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-sm lg:max-w-md p-3 rounded-2xl
          ${isMe ? 'bg-primary text-white rounded-br-lg' : 'bg-gray-700 text-white rounded-bl-lg'}
        `}
      >
        <p 
          className="text-sm" 
          dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }} 
        />
        <span className="text-xs text-gray-400 mt-1 block text-right">
          {message.time}
        </span>
      </div>
    </div>
  );
}