import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SceneRevealProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  presenterMode?: boolean;
}

/**
 * SceneReveal wrapper that fades/slides content in when the scene becomes active.
 * Only blanks out scenes when in presenter mode (keyboard navigation).
 * When scrolling normally, scenes stay visible but dimmed.
 */
export function SceneReveal({
  children,
  isActive,
  className = "",
  presenterMode = false,
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
              // Only blank out (opacity 0) when in presenter mode (keyboard navigation)
              // When scrolling normally, dim scenes (opacity 0.3) so they don't suddenly disappear
              opacity: presenterMode ? 0 : 0.3,
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

