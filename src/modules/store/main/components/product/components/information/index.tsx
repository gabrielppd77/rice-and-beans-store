import { motion, AnimatePresence } from "framer-motion";

import clsx from "clsx";

interface InformationProps {
  title: string;
  description: string;
  isOpen: boolean;
  toggleOpen: () => void;
  clampedRef: React.RefObject<HTMLParagraphElement | null>;
  fullRef: React.RefObject<HTMLParagraphElement | null>;
}

export function Information({
  title,
  description,
  isOpen,
  toggleOpen,
  clampedRef,
  fullRef,
}: InformationProps) {
  const lineClamp = "line-clamp-2";

  return (
    <div className="text-white">
      <div
        className={clsx(
          "pointer-events-none fixed inset-0 z-10 bg-black/20 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <h3 className="mb-1 text-lg font-semibold">{title}</h3>

      <div
        className={clsx("text-sm", isOpen ? "text-white/100" : "text-white/80")}
        onClick={() => toggleOpen()}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={isOpen ? "expanded" : "clamped"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={isOpen ? "" : lineClamp}>{description}</p>
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
