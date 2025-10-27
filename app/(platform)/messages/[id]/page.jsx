import ChatInterface from "@/components/messages/ChatInterface";

// --- Placeholder Data ---
// In a real app, you'd fetch this based on params.id
const conversation = {
  id: "123",
  otherUser: {
    name: "Alice.flow",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Alice.flow",
    status: "Active now"
  },
  project: {
    title: "Build SkillFlow NFT Badges",
    id: "P-456"
  },
  messages: [
    { id: 'm1', sender: 'other', text: "Hey! I saw your proposal for the NFT badge project. Looks great.", time: "10:30 AM" },
    { id: 'm2', sender: 'me', text: "Thanks, Alice! Happy to answer any questions you have.", time: "10:31 AM" },
    { id: 'm3', sender: 'other', text: "Just one - can you confirm you're familiar with Cadence 1.0?", time: "10:31 AM" },
    { id: 'm4', sender: 'me', text: "Absolutely. I've built several projects on Flow with Cadence 1.0. Here's one: `https://github.com/example`", time: "10:32 AM" },
    // This is a special system message
    { id: 'm5', type: 'system', text: "Milestone 1 approved ✅ (100 FLOW 💸)", time: "10:35 AM" },
    // This is a special offer card
    { id: 'm6', type: 'offer', sender: 'other', offer: { description: "Final Milestone: Deploy Contracts", amount: 250, currency: "FLOW" }, time: "10:40 AM" }
  ]
};
// --- End Placeholder Data ---

export default function ChatPage({ params }) {
  // params.id would be "123"
  // We'll pass the fetched conversation data to the interface
  return (
    <ChatInterface conversation={conversation} />
  );
}