"use client";
import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center"
    >
      <div className="w-full max-w-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          className="w-full h-auto"
        >
          {/* Background */}
          <rect width="800" height="600" fill="#EEF2FF" rx="20" />

          {/* Desk */}
          <rect x="100" y="450" width="600" height="20" fill="#C7D2FE" />
          <rect x="200" y="300" width="400" height="150" rx="10" fill="#A5B4FC" />

          {/* Laptop */}
          <rect x="320" y="220" width="160" height="100" rx="8" fill="#6366F1" />
          <rect x="330" y="230" width="140" height="70" rx="4" fill="#E0E7FF" />
          <circle cx="400" cy="265" r="4" fill="#6366F1" />

          {/* Student */}
          <circle cx="250" cy="200" r="40" fill="#6366F1" />
          <rect x="230" y="240" width="40" height="80" rx="6" fill="#A5B4FC" />
          <rect x="230" y="320" width="20" height="60" fill="#4F46E5" />
          <rect x="250" y="320" width="20" height="60" fill="#4F46E5" />

          {/* Books */}
          <rect x="500" y="400" width="80" height="20" fill="#4F46E5" />
          <rect x="500" y="380" width="60" height="15" fill="#6366F1" />
          <rect x="500" y="360" width="50" height="12" fill="#818CF8" />

          {/* Text */}
          <text
            x="400"
            y="550"
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#4F46E5"
          >
            Ace Your Govt Exam Preparation
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
