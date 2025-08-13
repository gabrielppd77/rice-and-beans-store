import { useRef, useState } from "react";

import clsx from "clsx";

interface DrawerProps {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  content: React.ReactNode;
}

export function Drawer({ isOpen, onChange, content }: DrawerProps) {
  const [isShowMore, setShowMore] = useState(false);

  const startY = useRef(0);
  const deltaY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    deltaY.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    deltaY.current = e.touches[0].clientY - startY.current;
  };

  const handleTouchEnd = () => {
    if (deltaY.current > 50) {
      if (isShowMore) {
        setShowMore(false);
      } else {
        onChange(false);
      }
    } else if (deltaY.current < -50) {
      setShowMore(true);
    }

    deltaY.current = 0;
  };

  return (
    <div className="text-black">
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 transition-opacity duration-300",
          isOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        onClick={() => onChange(false)}
      />

      <div
        className={clsx(
          "fixed bottom-0 flex min-h-64 w-full transform flex-col rounded-md bg-white shadow-lg transition-all duration-300",
          isOpen ? "translate-y-0" : "translate-y-full",
          isShowMore ? "h-[90%]" : "h-2/3",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-center justify-center p-2"
          onClick={() => onChange(false)}
        >
          <div className="h-1 w-8 rounded-lg bg-gray-300" />
        </div>

        <div className="flex-1">{content}</div>
      </div>
    </div>
  );
}
