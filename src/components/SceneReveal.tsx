import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SceneRevealProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

/**
 * SceneReveal wrapper that fades/slides content in when the scene becomes active.
 * Keeps animations subtle and premium; no gimmicks.
 */
export function SceneReveal({
  children,
  isActive,
  className = "",
}: SceneRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isActive
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0, // Blank out previous scenes when navigating
              y: 0, // Don't move when inactive to prevent layout shifts
            }
      }
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
      }}
      style={{
        // Prevent layout shifts
        willChange: isActive ? "opacity, transform" : "auto",
        pointerEvents: isActive ? "auto" : "none", // Prevent interaction with inactive scenes
      }}
    >
      {children}
    </motion.div>
  );
}

