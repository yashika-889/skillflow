'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const requestData = activeTab === 'login'
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Auth failed');

      if (data.success) {
        // --- THE FIX ---
        // We extract the name from the MongoDB response and save it to Local Storage.
        // The Sidebar and Dashboard are programmed to look for this specific key.
        const nameToStore = data.user?.name || formData.name || 'User';
        localStorage.setItem('skillflow_user_name', nameToStore);
        
        router.refresh(); 
        router.push(data.onboardingComplete ? '/dashboard' : '/onboarding');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/login-bg.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-neutral-900/80 mix-blend-multiply" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl px-4 relative z-10"
      >
        <Card className="p-10 backdrop-blur-xl bg-black/40 border border-amber-500/30 shadow-2xl">
          <div className="flex space-x-6 mb-8 border-b border-white/10 pb-1">
            {['login', 'signup'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-medium pb-2 relative ${activeTab === tab ? 'text-amber-400' : 'text-gray-500'}`}
              >
                {tab === 'login' ? 'Sign In' : 'Sign Up'}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />}
              </button>
            ))}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">{error}</div>}

            <div className="space-y-4">
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 outline-none focus:ring-1 focus:ring-amber-500/50"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]" disabled={isLoading}>
              {isLoading ? 'Processing...' : activeTab === 'login' ? 'Enter Portal' : 'Create Account'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}