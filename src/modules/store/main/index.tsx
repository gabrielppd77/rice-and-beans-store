import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetStoreData } from "../data/hooks/useGetStoreData";

import {
  MessageCircle,
  Share,
  Bookmark,
  Search,
  House,
  User,
} from "lucide-react";

import { PositionIndicator } from "./components/PositionIndicator";
import { NavControls } from "./components/NavControls";

export function StoreMain() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const paramsPage = useParams<{ companyPath: string }>();
  const { data, isLoading, isFetching } = useGetStoreData({
    params: { companyPath: paramsPage.companyPath },
  });

  const products = data?.products || [];

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const itemHeight = containerRef.current.clientHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <main className="flex h-screen w-full flex-col bg-black">
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="scrollbar-hide h-full w-full snap-y snap-mandatory overflow-y-auto"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="relative flex h-full w-full snap-start snap-always items-center justify-center"
            >
              {/* Imagem de fundo */}
              <img
                src={product.urlImage || "placeholder.svg"} //todo: fix when not have image
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay escuro para melhor legibilidade */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Conteúdo sobreposto */}
              <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                <div className="flex items-end justify-between">
                  {/* Informações da imagem */}
                  <div className="flex-1 pr-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span>999 curtidas</span>
                      <span>{product.description} comentários</span>
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex flex-col gap-4">
                    <button
                      // variant="ghost"
                      // size="icon"
                      className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <MessageCircle className="h-6 w-6 text-white" />
                    </button>

                    <button
                      // variant="ghost"
                      // size="icon"
                      className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Share className="h-6 w-6 text-white" />
                    </button>

                    <button
                      // variant="ghost"
                      // size="icon"
                      className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Bookmark className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-0 right-0 left-0 flex flex-col">
          <div className="flex items-center justify-between px-2 py-2">
            <div
              className="flex items-center gap-2"
              onClick={() => scrollToImage(0)}
            >
              <img
                src="rice-and-beans-logo.svg"
                alt="logo rice and beans"
                className="size-8"
              />
              <h1 className="font-semibold text-white">{data?.name}</h1>
            </div>

            <Search className="text-white" />
          </div>
        </div>

        <PositionIndicator
          currentIndex={currentIndex}
          list={products}
          // todo: improve list prop, have to received the length of list
        />

        <NavControls
          currentIndex={currentIndex}
          listLength={products.length}
          scrollToImage={scrollToImage}
          //todo: improve name of props
        />
      </div>

      <div className="flex h-16 flex-col">
        <nav className="flex justify-between border-t-1 border-gray-600 px-2 py-2">
          <div className="flex flex-col items-center text-white">
            <House />
            <p className="text-xs">Início</p>
          </div>
          <button className="h-7 w-12 rounded-md bg-white text-xl font-bold text-gray-600">
            +
          </button>
          <div className="flex flex-col items-center text-white">
            <User />
            <p className="text-xs">Perfil</p>
          </div>
        </nav>
      </div>
    </main>
  );
}
