/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // 1. Brand Identity Colors
        colors: {
          primary: '#6366F1',     // Deep Purple
          secondary: '#3B82F6',   // Electric Blue
          accent: '#10B981',      // Mint Green
          error: '#EF4444',      // Coral Red
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748B', // Neutral Base
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
        },
        
        // 2. Typography
        fontFamily: {
            sans: ['var(--font-inter)', 'sans-serif'],
            mono: ['var(--font-jetbrains-mono)', 'monospace'],
        },
        
        // 3. Border Radius (from Visual Language)
        borderRadius: {
          'lg': '8px',
          'xl': '12px',
          '2xl': '16px',
        },
  
        // 4. Hero Gradient Animation (from Landing Page)
        animation: {
          'gradient-x': 'gradient-x 15s ease infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
          },
        },
        
        // 5. Glassmorphism (Optional helper for backdrop blur)
        backdropBlur: {
          'lg': '16px',
        },
      },
    },
    plugins: [
      // Add plugins here if you need them, e.g., for forms
      // require('@tailwindcss/forms'),
    ],
  };