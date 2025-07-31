interface PositionIndicatorProps {
  list: any[];
  currentIndex: number;
}

export function PositionIndicator({
  list,
  currentIndex,
}: PositionIndicatorProps) {
  return (
    <div className="absolute top-1/2 left-4 flex -translate-y-1/2 transform flex-col gap-2">
      {list.map((_, index) => (
        <div
          key={index}
          className={`h-8 w-1 rounded-full transition-all duration-300 ${
            index === currentIndex ? "bg-white" : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
}
