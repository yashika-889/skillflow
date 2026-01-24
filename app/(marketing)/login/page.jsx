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
      // Validate passwords match for signup
      if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      console.log('Starting authentication process...');
      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/signup';
      console.log('Sending request to:', endpoint);

      const requestData = activeTab === 'login'
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };

      console.log('Request data:', { ...requestData, password: '***' });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        console.error('Authentication failed:', data);
        throw new Error(data.message || `${activeTab === 'login' ? 'Login' : 'Signup'} failed`);
      }

      console.log('Authentication successful, preparing redirect...');
      // Handle redirections differently for login and signup
      if (activeTab === 'login') {
        // For login, go to dashboard if onboarding is complete, otherwise to onboarding
        if (data.success) {
          router.refresh(); // Refresh to update auth state
          router.push(data.onboardingComplete ? '/dashboard' : '/onboarding');
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } else {
        // For signup, always go to onboarding
        if (data.success) {
          router.refresh(); // Refresh to update auth state
          router.push('/onboarding');
        } else {
          throw new Error(data.message || 'Signup failed');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Purple/Black Overlay for readability */}
        <div className="absolute inset-0 bg-neutral-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-neutral-900/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md px-4 relative z-10"
      >
        <Card className="flex-1 p-8 backdrop-blur-xl bg-black/40 border border-amber-500/30 shadow-2xl shadow-black/50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-6 mb-8 border-b border-white/10 pb-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`text-lg font-medium transition-all duration-300 pb-2 relative ${activeTab === 'login'
                  ? 'text-amber-400'
                  : 'text-gray-500 hover:text-amber-200/70'
                  }`}
              >
                Sign In
                {activeTab === 'login' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`text-lg font-medium transition-all duration-300 pb-2 relative ${activeTab === 'signup'
                  ? 'text-amber-400'
                  : 'text-gray-500 hover:text-amber-200/70'
                  }`}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  />
                )}
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join the Realm'}
              </h2>
              <p className="text-gray-400 text-sm">
                {activeTab === 'login'
                  ? 'Enter your credentials to access your workspace.'
                  : 'Start your journey with SkillFlow today.'}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                {activeTab === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-inner"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-inner"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-inner"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                {activeTab === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-semibold text-amber-500/80 mb-1 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-amber-500/20 text-amber-50 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-inner"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-amber-900/50 bg-black/50 text-amber-600 focus:ring-amber-500/40"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-amber-500 hover:text-amber-400 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold tracking-wide rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] border border-amber-400/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-amber-200" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  activeTab === 'login' ? 'Enter Portal' : 'Create Account'
                )}
              </Button>
            </form>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}