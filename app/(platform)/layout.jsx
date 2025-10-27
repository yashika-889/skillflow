import Sidebar from "@/components/platform/Sidebar";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function PlatformLayout({ children }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token');

  if (!authToken) {
    redirect('/login');
  }

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