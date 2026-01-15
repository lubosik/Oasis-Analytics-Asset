import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SceneRevealProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

/**
 * SceneReveal wrapper that fades/slides content in when the scene becomes active.
 * Simple approach: active scenes are clear (opacity 1), inactive scenes are dimmed (opacity 0.3).
 * Scenes are spaced with min-h-svh so previous scenes aren't visible.
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
      animate={{
        opacity: isActive ? 1 : 0.3, // Active scenes clear, inactive scenes dimmed
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        willChange: isActive ? "opacity, transform" : "auto",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {children}
    </motion.div>
  );
}

