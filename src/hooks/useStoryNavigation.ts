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

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the scene that's most visible in the viewport
        let maxIntersection = 0;
        let mostVisibleIndex = currentSceneIndex;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersection) {
            maxIntersection = entry.intersectionRatio;
            const index = sceneRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              mostVisibleIndex = index;
            }
          }
        });

        if (mostVisibleIndex !== currentSceneIndex) {
          setCurrentSceneIndex(mostVisibleIndex);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-20% 0px -20% 0px", // Consider scene "active" when it's in the middle 60% of viewport
      }
    );

    sceneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
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

