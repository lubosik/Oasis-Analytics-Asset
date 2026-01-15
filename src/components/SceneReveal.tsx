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
  const [isScrolling, setIsScrolling] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // CRITICAL: When scene becomes active, immediately set viewport to true and disable scrolling flag
  useEffect(() => {
    if (isActive) {
      setIsInViewport(true);
      setIsScrolling(false);
    }
  }, [isActive]);

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
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        checkViewport();
      }, 150);
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

  // Calculate opacity - ABSOLUTE SIMPLICITY: active = 1, inactive = 0 (arrow keys) or 0.3 (scroll)
  // CRITICAL: isActive check MUST be first and return 1 immediately
  // Also: if scene just became active, give it a grace period during scroll animation
  let opacity: number;
  if (isActive) {
    // Active scene: ALWAYS clear, no exceptions, no conditions, even during scroll
    opacity = 1;
  } else if (wasNavigatedByKeyboard && presenterMode && !isActive) {
    // Inactive scene + arrow key navigation: blank out (but only if truly inactive)
    opacity = 0;
  } else if (!isInViewport && !isActive) {
    // Inactive scene + scrolled past: blank out
    opacity = 0;
  } else {
    // Inactive scene + normal scrolling: dim
    opacity = 0.3;
  }

  return (
    <motion.div
      ref={elementRef}
      className={className}
      data-scene-index={sceneIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: opacity,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        willChange: isActive ? "opacity, transform" : "auto",
        pointerEvents: isActive ? "auto" : "none",
        // Ensure element is always in DOM - never remove it
        display: "block",
        visibility: "visible",
      }}
    >
      {children}
    </motion.div>
  );
}

