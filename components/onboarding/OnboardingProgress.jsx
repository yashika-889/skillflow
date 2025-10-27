"use client";
import { motion } from "framer-motion";

export default function OnboardingProgress({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center space-x-3">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <motion.div
            key={step}
            animate={{
              scale: isActive ? 1.25 : 1,
              backgroundColor: isCompleted
                ? "#10B981" // accent
                : isActive
                ? "#6366F1" // primary
                : "#475569", // neutral-600
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-3 h-3 rounded-full"
          />
        );
      })}
    </div>
  );
}