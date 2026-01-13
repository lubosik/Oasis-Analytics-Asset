import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StoryNavigationProps {
  currentSceneIndex: number;
  totalScenes: number;
  onSceneChange: (index: number) => void;
  presenterMode: boolean;
  onPresenterModeChange: (enabled: boolean) => void;
}

export function StoryNavigation({
  currentSceneIndex,
  totalScenes,
  onSceneChange,
  presenterMode,
  onPresenterModeChange,
}: StoryNavigationProps) {
  const handlePrevious = () => {
    if (currentSceneIndex > 0) {
      onSceneChange(currentSceneIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSceneIndex < totalScenes - 1) {
      onSceneChange(currentSceneIndex + 1);
    }
  };

  return (
    <nav className="sticky top-[41px] z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between px-2 md:px-4 py-2 md:py-3 max-w-7xl mx-auto gap-2 md:gap-0">
        {/* Mobile: Top row with progress and nav */}
        <div className="flex items-center justify-between md:hidden w-full">
          <div className="text-xs font-medium text-gray-700">
            {currentSceneIndex + 1}/{totalScenes}
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentSceneIndex === 0}
              aria-label="Previous scene"
              className="h-8 px-2"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentSceneIndex === totalScenes - 1}
              aria-label="Next scene"
              className="h-8 px-2"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Desktop: Left - Progress indicator and dots */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm font-medium text-gray-700">
            Scene {currentSceneIndex + 1} of {totalScenes}
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalScenes }).map((_, index) => (
              <button
                key={index}
                onClick={() => onSceneChange(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSceneIndex
                    ? "bg-gray-900 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to scene ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Dots row */}
        <div className="flex md:hidden items-center justify-center gap-1">
          {Array.from({ length: totalScenes }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSceneChange(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === currentSceneIndex
                  ? "bg-gray-900 w-6"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to scene ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop: Center - Navigation buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentSceneIndex === 0}
            aria-label="Previous scene"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentSceneIndex === totalScenes - 1}
            aria-label="Next scene"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Right: Presenter mode toggle */}
        <div className="flex items-center justify-end md:justify-start gap-2 md:gap-3">
          {!presenterMode && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500">
              <span>Turn on Presenter to use arrow keys</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-xs md:text-sm text-gray-700 hidden sm:inline">Presenter</span>
            <Switch
              checked={presenterMode}
              onCheckedChange={onPresenterModeChange}
              aria-label="Toggle presenter mode"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

