"use client";

import { useState, useEffect } from "react"; // Add useEffect
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti"; // Import Confetti

// Import the step components
import Step1Welcome from "@/components/onboarding/Step1Welcome";
import Step2Wallet from "@/components/onboarding/Step2Wallet";
import Step3Profile from "@/components/onboarding/Step3Profile";
import Step4Verification from "@/components/onboarding/Step4Verification";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";

const STEPS = 4;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [isComplete, setIsComplete] = useState(false); // <-- Add this back
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 }); // For Confetti
  const router = useRouter();

  // --- Add this useEffect for Confetti ---
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount
  // --- End of useEffect ---

  const nextStep = () => setStep((prev) => (prev < STEPS ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  // --- UPDATED: This function now sets the completion state ---
  const onCompleteOnboarding = () => {
    console.log("Onboarding complete! Saving profile...");
    // Instead of redirecting immediately, set the state
    setIsComplete(true);
  };

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  // --- ADD THIS BACK: Render the completion screen ---
  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
        {/* Only render Confetti if windowSize is available */}
        {windowSize.width > 0 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300}/>}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-neutral-800 p-8 rounded-2xl shadow-2xl card-glass" // Use card-glass
        >
          <h1 className="text-4xl font-bold mb-4">You're all set! 🎉</h1>
          <p className="text-lg text-neutral-300 mb-6">
            Welcome to SkillFlow. You're ready to start your journey.
          </p>
          <button
            onClick={() => router.push('/dashboard')} // Redirect on click
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all"
          >
            Browse Projects
          </button>
        </motion.div>
      </div>
    );
  }
  // --- END OF COMPLETION SCREEN ---

  // --- The rest of the component remains the same ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      <div className="w-full max-w-lg">
        <OnboardingProgress currentStep={step} totalSteps={STEPS} />
        
        <div className="card-glass p-6 sm:p-10 mt-6"> {/* Use card-glass */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {step === 1 && (
                <Step1Welcome 
                  onNext={nextStep} 
                  setUserType={setUserType} 
                />
              )}
              {step === 2 && (
                <Step2Wallet 
                  onNext={nextStep} 
                  onBack={prevStep} 
                />
              )}
              {step === 3 && (
                <Step3Profile
                  onNext={userType === 'freelancer' ? nextStep : onCompleteOnboarding}
                  onBack={prevStep}
                  isFreelancer={userType === 'freelancer'}
                />
              )}
              {step === 4 && userType === 'freelancer' && (
                <Step4Verification 
                  onComplete={onCompleteOnboarding} 
                  onBack={prevStep} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  );
}