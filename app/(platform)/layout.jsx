import Sidebar from "@/components/platform/Sidebar";

export default function PlatformLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      {/* --- Desktop Sidebar --- */}
      <div className="flex w-60 flex-col fixed inset-y-0">
        <Sidebar />
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col pl-60">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}