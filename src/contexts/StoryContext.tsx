import { createContext, useContext, type ReactNode } from "react";

interface StoryContextValue {
  proofMode: boolean;
}

const StoryContext = createContext<StoryContextValue | undefined>(undefined);

export function StoryProvider({
  children,
  proofMode,
}: {
  children: ReactNode;
  proofMode: boolean;
}) {
  return (
    <StoryContext.Provider value={{ proofMode }}>
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

