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

  // Check if scene is in viewport (only for inactive scenes in normal scrolling mode)
  useEffect(() => {
    // Skip all checks for active scenes - they're always visible
    if (isActive) {
      setIsInViewport(true);
      return;
    }

    // Skip viewport check in presenter mode
    if (presenterMode) {
      return;
    }

    const checkViewport = () => {
      // Double-check: skip if scene became active
      if (isActive) {
        setIsInViewport(true);
        return;
      }

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const buffer = 100;
        const isPast = rect.bottom < -buffer || rect.top > viewportHeight + buffer;
        setIsInViewport(!isPast);
      }
    };

    const initialTimeout = setTimeout(checkViewport, 200);
    
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

  // Calculate opacity - SIMPLE LOGIC: active scenes always 1, inactive depends on mode
  const opacity = isActive 
    ? 1  // Active scenes ALWAYS visible - no exceptions
    : (wasNavigatedByKeyboard && presenterMode)
      ? 0  // Arrow key navigation: blank out inactive scenes
      : (!isInViewport)
        ? 0  // Completely scrolled past: blank out
        : 0.3;  // Normal scrolling: dim inactive scenes

  return (
    <motion.div
      ref={elementRef}
      className={className}
      data-scene-index={sceneIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: opacity, // Direct calculation - no function calls that could cause issues
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

