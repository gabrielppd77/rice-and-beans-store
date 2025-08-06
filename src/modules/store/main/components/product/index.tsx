import { useEffect, useState, useRef } from "react";

import { Bookmark, MessageCircle, Share } from "lucide-react";

import { Information } from "./components/information";

interface ProductProps {
  currentIndex: number;
  id: string;
  name: string;
  description?: string | null;
  urlImage?: string | null;
}

export function Product({
  currentIndex,
  id,
  name,
  description,
  urlImage,
}: ProductProps) {
  const [isOpenInformation, setOpenInformation] = useState(false);

  const [isOverflowing, setOverflowing] = useState(false);

  const clampedRef = useRef<HTMLParagraphElement>(null);
  const fullRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setOpenInformation(false);
  }, [currentIndex]);

  useEffect(() => {
    if (clampedRef.current && fullRef.current) {
      const clampedHeight = clampedRef.current.offsetHeight;
      const fullHeight = fullRef.current.offsetHeight;
      setOverflowing(fullHeight > clampedHeight);
    }
  }, [description]);

  function handleToggleInformation() {
    if (isOverflowing) setOpenInformation((prev) => !prev);
  }

  return (
    <div
      key={id}
      className="relative flex h-full w-full snap-start snap-always items-center justify-center"
    >
      {/* Imagem de fundo */}
      <img
        src={urlImage || "placeholder.svg"} //todo: fix when not have image
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay escuro para melhor legibilidade */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={() => {
          if (isOpenInformation) handleToggleInformation();
        }}
      />

      {/* Conteúdo sobreposto */}
      <div className="absolute right-0 bottom-0 left-0 p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <Information
              title={name}
              description={description || ""}
              isOpen={isOpenInformation}
              toggleOpen={() => handleToggleInformation()}
              clampedRef={clampedRef}
              fullRef={fullRef}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col gap-4">
            <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <MessageCircle className="h-6 w-full text-white" />
            </button>

            <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Share className="h-6 w-full text-white" />
            </button>

            <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Bookmark className="h-6 w-full text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
