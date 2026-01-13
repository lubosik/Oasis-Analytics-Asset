import { SCENES, TOTAL_SCENES } from "@/story/scenes";
import { StoryNavigation } from "@/components/StoryNavigation";
import { SceneLayout } from "@/components/SceneLayout";
import { useStoryNavigation } from "@/hooks/useStoryNavigation";
import { StoryProvider } from "@/contexts/StoryContext";

function App() {
  const {
    currentSceneIndex,
    presenterMode,
    setPresenterMode,
    scrollToScene,
    registerSceneRef,
  } = useStoryNavigation();

  return (
    <StoryProvider proofMode={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* OASIS Branding Header */}
        <div className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-1.5 sm:py-2 px-2 sm:px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[10px] sm:text-xs md:text-sm font-medium">
              OASIS'S Analytics • Past 14 Months
            </p>
          </div>
        </div>
        
        <StoryNavigation
          currentSceneIndex={currentSceneIndex}
          totalScenes={TOTAL_SCENES}
          onSceneChange={scrollToScene}
          presenterMode={presenterMode}
          onPresenterModeChange={setPresenterMode}
        />

        <main>
          {SCENES.map((scene, index) => {
            const SceneComponent = scene.component;
            return (
              <SceneLayout
                key={scene.id}
                ref={(el: HTMLElement | null) => registerSceneRef(index, el)}
                sceneIndex={index}
                currentSceneIndex={currentSceneIndex}
              >
                <SceneComponent />
              </SceneLayout>
            );
          })}
        </main>
      </div>
    </StoryProvider>
  );
}

export default App;
