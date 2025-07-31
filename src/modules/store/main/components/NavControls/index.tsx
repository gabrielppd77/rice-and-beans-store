import { ChevronDown, ChevronUp } from "lucide-react";

interface NavControlsProps {
  currentIndex: number;
  listLength: number;
  scrollToImage: (index: number) => void;
}

export function NavControls({
  currentIndex,
  listLength,
  scrollToImage,
}: NavControlsProps) {
  return (
    <div className="absolute top-1/2 right-4 flex -translate-y-1/2 transform flex-col gap-2">
      <button
        className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        onClick={() => scrollToImage(Math.max(0, currentIndex - 1))}
        disabled={currentIndex === 0}
      >
        <ChevronUp className="h-5 w-5 text-white" />
      </button>

      <button
        className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        onClick={() =>
          scrollToImage(Math.min(listLength - 1, currentIndex + 1))
        }
        disabled={currentIndex === listLength - 1}
      >
        <ChevronDown className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
