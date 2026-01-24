"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Award,
  Gavel
} from "lucide-react";
import Image from "next/image";

// --- 1. Hero Section (UPDATED - Retro Horror Theme) ---
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* --- Background Image --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing-bg-v2.jpg"
          alt="Retro Horror Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to ensure text pop against the red/teal background */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* --- Content --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center p-6 max-w-5xl mx-auto mt-10"
      >
        {/* Main Headline - Stranger Things Vibe */}
        <h1
          className="text-6xl md:text-8xl font-serif font-bold text-[#EE5D52] leading-none tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          style={{ textShadow: '0 0 20px rgba(238, 93, 82, 0.3)' }}
        >
          Freelancing Without Limits
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mt-8 max-w-3xl mx-auto font-medium drop-shadow-md">
          Get paid instantly. Keep 97.5%. Own your reputation.
        </p>

        {/* --- Buttons (Dark Blue & Grey) --- */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <Link
            href="/projects"
            className="px-10 py-4 bg-[#1B2432] hover:bg-[#263142] text-white font-bold rounded shadow-xl border border-blue-900/30 transition-all transform hover:scale-105"
          >
            Find Work
          </Link>
          <Link
            href="/projects/new"
            className="px-10 py-4 bg-[#6B7280] hover:bg-[#7D8491] text-white font-bold rounded shadow-xl border border-gray-500/30 transition-all transform hover:scale-105"
          >
            Hire Talent
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-6 mt-16 text-gray-300/80 mix-blend-screen">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-wider uppercase">Powered by Flow</span>
          </div>
          <div className="h-4 w-px bg-gray-500" />
          <span className="text-sm font-semibold tracking-wider uppercase">250K+ in Projects</span>
        </div>
      </motion.div>
    </section>
  );
}

// --- Helper for scroll animations ---
// (No changes needed in AnimatedSection, HowItWorksSection, InfoCard, FeaturesSection, FeatureRow, SocialProofSection)
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-24"
    >
      {children}
    </motion.section>
  );
}

// --- 2. How It Works Section (UPDATED) ---
function HowItWorksSection() {
  return (
    <AnimatedSection>
      <div id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 bg-[#0B1015]">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-[#EE5D52] drop-shadow-[0_2px_4px_rgba(238,93,82,0.4)]">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <InfoCard
            icon={<Briefcase className="w-10 h-10 text-[#EE5D52]" />}
            title="1. Post or Find Projects"
            description="Clients post jobs with clear milestones. Freelancers find work that matches their skills."
          />
          <InfoCard
            icon={<ShieldCheck className="w-10 h-10 text-[#38B2AC]" />}
            title="2. Escrow Protects Both Parties"
            description="Funds are locked in a smart contract. Clients only pay for work they approve."
          />
          <InfoCard
            icon={<Zap className="w-10 h-10 text-yellow-500" />}
            title="3. Get Paid Instantly"
            description="Once a milestone is approved, the smart contract releases payment in seconds. No 30-day waits."
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

// Card for HowItWorks (UPDATED to Retro Horror)
function InfoCard({ icon, title, description }) {
  return (
    <div className="card-retro text-center transform hover:-translate-y-2 transition-transform duration-300">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-black/50 border border-[#EE5D52]/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(238,93,82,0.1)]">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-100 mb-4 font-serif">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </div>
  );
}

// --- 3. Features Showcase (UPDATED) ---
function FeaturesSection() {
  return (
    <div id="features" className="bg-black py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 space-y-32 relative z-10">
        <FeatureRow
          icon={<Database className="w-10 h-10 text-[#EE5D52]" />}
          title="Automated Escrow"
          subtitle="No Payment Delays"
          description="Our smart contract holds client funds and automatically pays the freelancer as soon as milestones are approved. No delays, no mediators, just code."
          imageUrl="/images/feature-escrow.png"
          accentColor="text-[#EE5D52]"
        />
        <FeatureRow
          icon={<Award className="w-10 h-10 text-teal-400" />}
          title="Verifiable Reputation You Own"
          subtitle="On-Chain NFT Badges"
          description="Every completed job mints an NFT badge directly to your wallet. This builds a permanent, verifiable, and portable reputation you can take anywhere."
          imageUrl="/images/feature-nft.png"
          reverse={true}
          accentColor="text-teal-400"
        />
        <FeatureRow
          icon={<Gavel className="w-10 h-10 text-yellow-500" />}
          title="Fair Dispute Resolution"
          subtitle="Powered by Community DAO"
          description="Disagreements are rare, but they happen. Our DAO lets community jurors review evidence and vote on a fair outcome, all on-chain and transparently."
          imageUrl="/images/feature-dao.png"
          accentColor="text-yellow-500"
        />
      </div>
    </div>
  );
}

// Row for FeaturesSection (UPDATED)
function FeatureRow({ icon, title, subtitle, description, imageUrl, reverse = false, accentColor = "text-primary" }) {
  return (
    <AnimatedSection>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className={`p-4 bg-black/80 border border-gray-800 rounded-2xl shadow-2xl relative group ${reverse ? 'md:order-last' : ''}`}>
          {/* Image Frame Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#EE5D52]/20 to-teal-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-700"></div>

          <div className="relative overflow-hidden rounded-lg">
            {/* Fallback for missing images to maintain layout */}
            <div className="bg-gray-900 w-full h-[300px] flex items-center justify-center text-gray-700 font-mono text-sm">
              <Image
                src={imageUrl}
                alt={title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full"
                onError={(e) => { e.target.parentElement.innerHTML = '<div class="p-10 text-center">Image Placeholder</div>'; }}
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            {icon}
            <span className={`text-sm font-bold tracking-wide uppercase ${accentColor}`}>{subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 mb-6">{title}</h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">{description}</p>
          <a href="#" className={`text-lg font-bold hover:underline flex items-center gap-2 ${accentColor}`}>
            Learn More <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- 4. Social Proof (UPDATED) ---
function SocialProofSection() {
  return (
    <AnimatedSection>
      <div className="bg-[#0B1015] py-24 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Built for Trust & Speed</h2>
          <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
            Join thousands of freelancers and clients building the future of work in the shadows of the old system.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 border border-[#EE5D52]/20 p-8 rounded-xl backdrop-blur-sm">
              <span className="text-6xl font-serif font-bold text-[#EE5D52] drop-shadow-[0_0_10px_rgba(238,93,82,0.3)]">1.5s</span>
              <p className="text-gray-500 mt-2 font-medium">Average Payout Time</p>
            </div>
            <div className="bg-black/40 border border-teal-500/20 p-8 rounded-xl backdrop-blur-sm">
              <span className="text-6xl font-serif font-bold text-teal-400 drop-shadow-[0_0_10px_rgba(56,178,172,0.3)]">$250K+</span>
              <p className="text-gray-500 mt-2 font-medium">In Projects Completed</p>
            </div>
            <div className="bg-black/40 border border-yellow-500/20 p-8 rounded-xl backdrop-blur-sm">
              <span className="text-6xl font-serif font-bold text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">97.5%</span>
              <p className="text-gray-500 mt-2 font-medium">Kept by Freelancer</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <div className="card-retro max-w-3xl mx-auto text-center border-teal-500/20 shadow-[0_0_15px_rgba(56,178,172,0.1)] hover:border-teal-500/40">
              <div className="mx-auto w-20 h-20 rounded-full bg-gray-800 overflow-hidden mb-6 border-2 border-teal-500/50">
                <Image
                  src="/icons/user-profile.png"
                  alt="Testimonial"
                  width={80}
                  height={80}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <blockquote className="text-2xl text-gray-200 font-serif italic mb-6 leading-relaxed">
                "SkillFlow is a game-changer. I received my payment in 2 seconds, not 2 weeks.
                I'm never going back to traditional platforms."
              </blockquote>
              <p className="text-[#EE5D52] font-bold uppercase tracking-widest text-sm">
                - Alice.flow, Senior Cadence Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


// --- Main Page Component ---
export default function MarketingPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SocialProofSection />
    </main>
  );
}

// Make sure globals.css has the .card-glass definition
/*
@layer components {
  .card-glass {
    @apply bg-neutral-800/50 backdrop-blur-lg border border-neutral-700/50 rounded-2xl shadow-lg;
  }
}
*/