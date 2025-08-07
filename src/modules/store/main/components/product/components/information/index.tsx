import { motion, AnimatePresence } from "framer-motion";

interface InformationProps {
  title: string;
  description: string;
  category: string;
  isOpen: boolean;
  toggleOpen: () => void;
  clampedRef: React.RefObject<HTMLParagraphElement | null>;
  fullRef: React.RefObject<HTMLParagraphElement | null>;
}

export function Information({
  title,
  description,
  category,
  isOpen,
  toggleOpen,
  clampedRef,
  fullRef,
}: InformationProps) {
  const lineClamp = "line-clamp-2";

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold">{title}</h3>

      <button className="rounded-xl bg-white/20 px-2 py-1.5 text-sm hover:brightness-95">
        {category}
      </button>

      <div className="mt-1 text-sm text-white/80" onClick={() => toggleOpen()}>
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
