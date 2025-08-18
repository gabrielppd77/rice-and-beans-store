import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { paramQueryFieldCategory } from "../../../../../../categories/search-category";

interface InformationProps {
  title: string;
  description: string;
  categoryName: string;
  isOpen: boolean;
  toggleOpen: () => void;
  clampedRef: React.RefObject<HTMLParagraphElement | null>;
  fullRef: React.RefObject<HTMLParagraphElement | null>;
}

export function Information({
  title,
  description,
  categoryName,
  isOpen,
  toggleOpen,
  clampedRef,
  fullRef,
}: InformationProps) {
  const { companyPath } = useParams<{ companyPath: string }>();

  const lineClamp = "line-clamp-2";

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold select-none">{title}</h3>

      <div>
        <Link
          className="rounded-xl bg-white/20 px-2 py-1.5 text-sm hover:brightness-95"
          to={`/${companyPath}/${title}/pesquisar-categoria?${paramQueryFieldCategory}=${categoryName}`}
        >
          {categoryName}
        </Link>
      </div>

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
