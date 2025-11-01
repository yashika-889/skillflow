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

// --- 1. Hero Section (UPDATED) ---
function HeroSection() {
  // --- Particle Engine Initialization ---
  const particlesInit = useCallback(async (engine) => {
    // Initializes the tsParticles instance (engine)
    await loadSlim(engine); // Load the slim engine
  }, []);

  // --- Particle Configuration ---
  const particleOptions = {
    background: {}, // Background handled by Tailwind
    fpsLimit: 60,
    interactivity: { events: { onClick: { enable: false }, onHover: { enable: false }, resize: true } },
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 }, // Subtle links
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.5, straight: false }, // Slow random movement
      number: { density: { enable: true, area: 800 }, value: 30 }, // Fewer particles
      opacity: { value: 0.1 }, // Subtle particles
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* --- ADDED: Particles Component --- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute inset-0 z-0" // Behind content
      />

      {/* --- UPDATED: Animated Gradient Background --- */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/40 to-primary/30 animate-gradient-x z-0" // Added animation, ensure behind content
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* --- Content (Ensure z-index is higher) --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center p-6" // z-10 puts it above z-0
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Freelancing Without Limits
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 mt-6 max-w-2xl mx-auto">
          Get paid instantly. Keep 97.5%. Own your reputation.
        </p>

        {/* --- UPDATED: CTAs use Link with refined styling --- */}
        <div className="flex justify-center gap-6 mt-10">
          <Link
            href="/projects"
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all text-lg"
          >
            Find Work
          </Link>
          <Link
            href="/projects/new"
            className="px-8 py-3 bg-neutral-700/50 backdrop-blur-sm border border-neutral-600/50 text-white font-bold rounded-lg shadow-lg hover:bg-neutral-700 transition-all text-lg"
          >
            Hire Talent
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-6 mt-12 text-neutral-400">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/flow-logo.png"
              alt="Flow Logo"
              width={20}
              height={20}
              className="opacity-70"
              onError={(e) => { e.target.style.display = 'none'; }} // Hide if image doesn't exist
            />
            <span className="text-sm font-medium">Powered by Flow</span>
          </div>
          <div className="h-6 w-px bg-neutral-700" />
          <span className="text-sm font-medium">250K+ in Projects</span>
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

// --- 2. How It Works Section ---
function HowItWorksSection() {
  return (
    <AnimatedSection>
      <div id="how-it-works" className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <InfoCard
            icon={<Briefcase className="w-10 h-10 text-primary" />}
            title="1. Post or Find Projects"
            description="Clients post jobs with clear milestones. Freelancers find work that matches their skills."
          />
          <InfoCard
            icon={<ShieldCheck className="w-10 h-10 text-secondary" />}
            title="2. Escrow Protects Both Parties"
            description="Funds are locked in a smart contract. Clients only pay for work they approve."
          />
          <InfoCard
            icon={<Zap className="w-10 h-10 text-accent" />}
            title="3. Get Paid Instantly"
            description="Once a milestone is approved, the smart contract releases payment in seconds. No 30-day waits."
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

// Card for HowItWorks
function InfoCard({ icon, title, description }) {
  return (
    // Make sure card-glass is defined in globals.css
    <div className="card-glass p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-neutral-900/50 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-neutral-300">{description}</p>
    </div>
  );
}

// --- 3. Features Showcase ---
function FeaturesSection() {
  return (
    <div id="features" className="bg-neutral-900/50 py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        <FeatureRow
          icon={<Database className="w-10 h-10 text-primary" />}
          title="Automated Escrow"
          subtitle="No Payment Delays"
          description="Our smart contract holds client funds and automatically pays the freelancer as soon as milestones are approved. No delays, no mediators, just code."
          imageUrl="/images/feature-escrow.png"
        />
        <FeatureRow
          icon={<Award className="w-10 h-10 text-secondary" />}
          title="Verifiable Reputation You Own"
          subtitle="On-Chain NFT Badges"
          description="Every completed job mints an NFT badge directly to your wallet. This builds a permanent, verifiable, and portable reputation you can take anywhere."
          imageUrl="/images/feature-nft.png"

          reverse={true}
        />
        <FeatureRow
          icon={<Gavel className="w-10 h-10 text-accent" />}
          title="Fair Dispute Resolution"
          subtitle="Powered by Community DAO"
          description="Disagreements are rare, but they happen. Our DAO lets community jurors review evidence and vote on a fair outcome, all on-chain and transparently."
          imageUrl="/images/feature-dao.png"
        />
      </div>
    </div>
  );
}

// Row for FeaturesSection
function FeatureRow({ icon, title, subtitle, description, imageUrl, reverse = false }) {
  return (
    <AnimatedSection>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className={`p-8 bg-neutral-800/50 rounded-2xl ${reverse ? 'md:order-last' : ''}`}>
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
            {icon}
            <span className="text-sm font-medium text-primary">{subtitle}</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-lg text-neutral-300 mb-6">{description}</p>
          <a href="#" className="text-lg font-medium text-secondary hover:underline flex items-center gap-2">
            Learn More <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- 4. Social Proof ---
function SocialProofSection() {
  return (
    <AnimatedSection>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Built for Trust & Speed</h2>
        <p className="text-lg text-neutral-300 mb-16">
          Join thousands of freelancers and clients building the future of work.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-glass p-8">
            <span className="text-6xl font-bold text-primary">1.5s</span>
            <p className="text-neutral-400 mt-2">Average Payout Time</p>
          </div>
          <div className="card-glass p-8">
            <span className="text-6xl font-bold text-secondary">$250K+</span>
            <p className="text-neutral-400 mt-2">In Projects Completed</p>
          </div>
          <div className="card-glass p-8">
            <span className="text-6xl font-bold text-accent">97.5%</span>
            <p className="text-neutral-400 mt-2">Kept by Freelancer</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="card-glass p-10 max-w-3xl mx-auto">
            <Image
              src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Alice.flow"
              alt="Testimonial"
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <blockquote className="text-xl text-white italic mt-6">
              "SkillFlow is a game-changer. I received my payment in 2 seconds, not 2 weeks.
              I'm never going back to traditional platforms."
            </blockquote>
            <p className="text-neutral-400 font-medium mt-6">
              - Alice.flow, Senior Cadence Developer
            </p>
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