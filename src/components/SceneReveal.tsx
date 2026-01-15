import { type ReactNode, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface SceneRevealProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  presenterMode?: boolean;
  wasNavigatedByKeyboard?: boolean;
  sceneIndex?: number;
  currentSceneIndex?: number;
}

/**
 * SceneReveal wrapper that fades/slides content in when the scene becomes active.
 * - Normal scrolling: dims inactive scenes (opacity 0.3), clear active scene (opacity 1)
 * - Arrow key navigation: blanks out inactive scenes (opacity 0), clear active scene (opacity 1)
 * - Scenes that are completely scrolled past can blank out
 */
export function SceneReveal({
  children,
  isActive,
  className = "",
  presenterMode = false,
  wasNavigatedByKeyboard = false,
  sceneIndex = 0,
  currentSceneIndex = 0,
}: SceneRevealProps) {
  const [isInViewport, setIsInViewport] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  // CRITICAL: Always ensure active scenes are considered in viewport
  // This must run separately and immediately when isActive changes
  useEffect(() => {
    if (isActive) {
      setIsInViewport(true);
    }
  }, [isActive]);

  // Check if scene is in viewport (only for normal scrolling mode, only for inactive scenes)
  useEffect(() => {
    // If scene is active, always consider it in viewport - skip all checks
    if (isActive) {
      setIsInViewport(true);
      return;
    }

    // Skip viewport check in presenter mode - handled by wasNavigatedByKeyboard
    if (presenterMode) {
      setIsInViewport(true);
      return;
    }

    const checkViewport = () => {
      // Don't check viewport for active scenes
      if (isActive) {
        setIsInViewport(true);
        return;
      }

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Scene is considered "scrolled past" if it's completely above or below viewport
        // Add some buffer to prevent flickering
        const buffer = 100;
        const isPast = rect.bottom < -buffer || rect.top > viewportHeight + buffer;
        setIsInViewport(!isPast);
      }
    };

    // Initial check with delay to allow scroll animation to complete
    const initialTimeout = setTimeout(checkViewport, 200);
    
    // Check on scroll with debounce
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkViewport);
    
    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkViewport);
      clearTimeout(timeoutId);
    };
  }, [presenterMode, sceneIndex, isActive]);

  // Determine opacity based on state
  // CRITICAL: Active scenes MUST always return 1, no exceptions, no conditions
  const getOpacity = (): number => {
    // ABSOLUTE PRIORITY #1: Active scene is ALWAYS visible at full opacity
    // This check happens FIRST and returns immediately - no other logic can override this
    if (isActive) {
      return 1;
    }
    
    // Only process inactive scenes below this point - active scenes never reach here
    
    // If navigated by keyboard (arrow keys), blank out inactive scenes
    if (wasNavigatedByKeyboard && presenterMode) {
      return 0; // Blank out when using arrow keys (only inactive scenes)
    }
    
    // Normal scrolling: dim inactive scenes, but blank out if completely scrolled past
    if (!isInViewport) {
      return 0; // Completely scrolled past - can blank out
    }
    
    return 0.3; // Dim but visible (out of spotlight)
  };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      data-scene-index={sceneIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isActive ? 1 : getOpacity(), // Force active scenes to 1, bypass getOpacity for them
        y: 0,
      }}
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

