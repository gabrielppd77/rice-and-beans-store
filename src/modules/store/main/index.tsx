import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetStoreData } from "../data/hooks/useGetStoreData";

import { Search, House, User } from "lucide-react";

import { Product } from "./components/product";
import { ProductSkeleton } from "./components/product-skeleton";

import { LinearProgress } from "../../components/linear-progress";

export function StoreMain() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const paramsPage = useParams<{ companyPath: string }>();
  const { data, isLoading, isFetching } = useGetStoreData({
    params: { companyPath: paramsPage.companyPath },
  });

  const products = data?.products || [];

  const scrollToProduct = (index: number) => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const itemHeight = containerRef.current.clientHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      setCurrentIndex(newIndex);
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
          {isLoading ? (
            <ProductSkeleton />
          ) : (
            products.map((product) => (
              <Product
                currentIndex={currentIndex}
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                urlImage={product.urlImage}
              />
            ))
          )}
        </div>

        {/* Appbar */}
        <div className="absolute top-0 right-0 left-0 flex flex-col">
          <div className="flex items-center justify-between px-2 py-2">
            <div
              className="flex items-center gap-2"
              onClick={() => scrollToProduct(0)}
            >
              <img
                src="rice-and-beans-logo.svg"
                alt="logo rice and beans"
                className="size-8"
              />
              <h1 className="font-semibold text-white">
                {data?.name || "Rice & Beans"}
              </h1>
            </div>

            <Search className="text-white" />
          </div>
          <LinearProgress active={isFetching} />
        </div>
      </div>

      {/* AppControls */}
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
