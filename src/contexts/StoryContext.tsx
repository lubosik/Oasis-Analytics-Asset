import { createContext, useContext, type ReactNode, useState } from "react";

export type ViewMode = "general" | "private";

interface StoryContextValue {
  proofMode: boolean;
  setProofMode: (enabled: boolean) => void;
  viewMode: ViewMode;
}

const StoryContext = createContext<StoryContextValue | undefined>(undefined);

export function StoryProvider({
  children,
  initialProofMode = false,
  initialViewMode = "general",
}: {
  children: ReactNode;
  initialProofMode?: boolean;
  initialViewMode?: ViewMode;
}) {
  const [proofMode, setProofMode] = useState(initialProofMode);

  return (
    <StoryContext.Provider value={{ proofMode, setProofMode, viewMode: initialViewMode }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStoryContext() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStoryContext must be used within a StoryProvider");
  }
  return context;
}

