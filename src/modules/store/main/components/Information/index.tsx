import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InformationProps {
  title: string;
  description: string;
}

export function Information({ title, description }: InformationProps) {
  const [showAll, setShowAll] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const clampedRef = useRef<HTMLParagraphElement>(null);
  const fullRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (clampedRef.current && fullRef.current) {
      const clampedHeight = clampedRef.current.offsetHeight;
      const fullHeight = fullRef.current.offsetHeight;
      setIsTruncated(fullHeight > clampedHeight);
    }
  }, [description]);

  const lineClamp = "line-clamp-2";

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>

      <div
        className="text-sm text-white/80"
        onClick={() => {
          if (isTruncated) setShowAll((prev) => !prev);
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={showAll ? "expanded" : "clamped"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={showAll ? "" : lineClamp}>{description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none invisible absolute h-auto">
          <p ref={clampedRef} className={lineClamp}>
            {description}
          </p>
          <p ref={fullRef}>{description}</p>
        </div>
      </div>
    </div>
  );
}
