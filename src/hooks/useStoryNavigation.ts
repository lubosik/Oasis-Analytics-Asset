import { useEffect, useRef, useState, useCallback } from "react";
import { TOTAL_SCENES } from "@/story/scenes";

export function useStoryNavigation() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [proofMode, setProofMode] = useState(false);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll to a specific scene - ensure it's fully in frame accounting for headers
  const scrollToScene = useCallback((index: number) => {
    const sceneElement = sceneRefs.current[index];
    if (sceneElement) {
      // Account for sticky headers (OASIS header ~41px + navigation ~57px = ~98px)
      // Add a bit more padding to ensure full visibility
      const headerOffset = 110;
      const elementPosition = sceneElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
    setCurrentSceneIndex(index);
  }, []);

  // Keyboard navigation for Presenter mode
  useEffect(() => {
    if (!presenterMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currentSceneIndex < TOTAL_SCENES - 1) {
          scrollToScene(currentSceneIndex + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (currentSceneIndex > 0) {
          scrollToScene(currentSceneIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presenterMode, currentSceneIndex, scrollToScene]);

  // IntersectionObserver for Link mode (normal scrolling)
  useEffect(() => {
    if (presenterMode) return; // Only use observer in Link mode

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the scene that's most visible in the viewport
        let maxIntersection = 0;
        let mostVisibleIndex = currentSceneIndex;
        let currentSceneRatio = 0;

        entries.forEach((entry) => {
          const intersectionRatio = entry.intersectionRatio;
          const index = sceneRefs.current.indexOf(entry.target as HTMLElement);
          
          // Track current scene's visibility
          if (index === currentSceneIndex) {
            currentSceneRatio = intersectionRatio;
          }
          
          // Require at least 50% visibility to consider switching
          if (entry.isIntersecting && intersectionRatio > 0.5 && intersectionRatio > maxIntersection) {
            maxIntersection = intersectionRatio;
            if (index !== -1) {
              mostVisibleIndex = index;
            }
          }
        });

        // Only switch if:
        // 1. We found a different scene
        // 2. The new scene has at least 50% visibility
        // 3. The new scene is significantly more visible than the current one (at least 20% more)
        //    OR the current scene has less than 30% visibility (user has scrolled away)
        const shouldSwitch = 
          mostVisibleIndex !== currentSceneIndex && 
          maxIntersection > 0.5 &&
          (maxIntersection > currentSceneRatio + 0.2 || currentSceneRatio < 0.3);

        if (shouldSwitch) {
          // Clear any pending timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          // Debounce the scene change to prevent flashing
          timeoutId = setTimeout(() => {
            setCurrentSceneIndex(mostVisibleIndex);
          }, 200); // 200ms delay to stabilize during scroll
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // More granular thresholds
        rootMargin: "-10% 0px -10% 0px", // Less aggressive margin - consider scene active when in middle 80% of viewport
      }
    );

    sceneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      sceneRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [presenterMode, currentSceneIndex]);

  // Register scene ref
  const registerSceneRef = useCallback((index: number, element: HTMLElement | null) => {
    sceneRefs.current[index] = element;
  }, []);

  return {
    currentSceneIndex,
    presenterMode,
    setPresenterMode,
    scrollToScene,
    registerSceneRef,
  };
}

