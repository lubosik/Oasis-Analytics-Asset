import { type ReactNode, forwardRef } from "react";
import { SceneReveal } from "./SceneReveal";

interface SceneLayoutProps {
  children: ReactNode;
  className?: string;
  sceneIndex: number;
  currentSceneIndex: number;
  presenterMode?: boolean;
}

export const SceneLayout = forwardRef<HTMLElement, SceneLayoutProps>(
  ({ children, className = "", sceneIndex, currentSceneIndex, presenterMode = false }, ref) => {
    const isActive = sceneIndex === currentSceneIndex;

    return (
      <section
        ref={ref}
        className={`min-h-svh w-full flex flex-col ${className}`}
      >
        <div className="flex-1 flex items-center justify-center px-2 sm:px-4 py-8 sm:py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto">
            <SceneReveal isActive={isActive} presenterMode={presenterMode}>{children}</SceneReveal>
          </div>
        </div>
      </section>
    );
  }
);

SceneLayout.displayName = "SceneLayout";

