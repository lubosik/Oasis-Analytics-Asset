import { type ReactNode, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface SceneRevealProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  presenterMode?: boolean;
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
  sceneIndex = 0,
  currentSceneIndex = 0,
}: SceneRevealProps) {
  const [isInViewport, setIsInViewport] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  // Check if scene is in viewport (only for normal scrolling mode)
  useEffect(() => {
    if (presenterMode) {
      // In presenter mode, don't check viewport - just use presenter mode logic
      setIsInViewport(true);
      return;
    }

    const checkViewport = () => {
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

    // Initial check
    checkViewport();
    
    // Check on scroll with debounce
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkViewport);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkViewport);
      clearTimeout(timeoutId);
    };
  }, [presenterMode, sceneIndex]);

  // Determine opacity based on state
  const getOpacity = () => {
    if (isActive) {
      return 1; // Active scene is always clear
    }
    
    if (presenterMode) {
      // In presenter mode (arrow keys), blank out inactive scenes
      // But only if they're not adjacent (to prevent flickering during scroll animation)
      const distance = Math.abs(sceneIndex - currentSceneIndex);
      if (distance > 1) {
        return 0; // Far from current scene - blank out
      }
      // Adjacent scenes: dim them instead of blanking to prevent flicker during scroll
      return 0.3;
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
        opacity: getOpacity(),
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

