import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Your global stylesheet

// Setup the fonts from your design system
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // We'll use this variable
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono', // We'll use this variable
  display: 'swap',
});

// This is your site's metadata
export const metadata = {
  title: 'SkillFlow - Freelancing Without Limits',
  description: 'Get paid instantly. Keep 97.5%. Own your reputation.',
};

// This is the Root Layout
export default function RootLayout({ children }) {
  return (
    // 1. <html> tag is required
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      
      {/* 2. <body> tag is required */}
      <body className="font-sans">
        {/* 'children' will be your (marketing) layout and page */}
        {children}
      </body>
    </html>
  );
}