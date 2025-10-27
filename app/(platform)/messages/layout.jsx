import ConversationList from "@/components/messages/ConversationList";

export default function MessagesLayout({ children }) {
  return (
    <div className="flex h-[calc(100vh-100px)]">
      {/* Fixed two-column layout: Conversation List Sidebar */}
      <div className="w-1/3 max-w-sm h-full">
        <ConversationList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full">
        {children}
      </div>
    </div>
  );
}