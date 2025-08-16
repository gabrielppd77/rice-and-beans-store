import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStoreData } from "../data/hooks/useGetStoreData";

import { Search, House, User, ShoppingCart } from "lucide-react";

import { Product } from "./components/product";
import { ProductSkeleton } from "./components/product-skeleton";

import { LinearProgress } from "../../components/linear-progress";

export function StoreMain() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { companyPath, productName } = useParams<{
    companyPath: string;
    productName: string;
  }>();
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetStoreData({
    params: { companyPath },
  });

  const products = useMemo(() => data?.products || [], [data]);

  const scrollToProduct = (index: number) => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const itemHeight = containerRef.current.clientHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        navigate(`/${companyPath}/${products[newIndex].name}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, companyPath, products]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (productName) {
      const index = products.findIndex((x) => x.name === productName);
      if (index >= 0) {
        scrollToProduct(index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <main className="animate-slideInLeft flex h-screen w-full flex-col">
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
                categoryName={product.categoryName}
                price={product.price}
              />
            ))
          )}
        </div>

        <div className="absolute top-0 right-0 left-0 flex flex-col">
          <div className="flex items-center justify-between p-3">
            <div
              className="flex items-center gap-2"
              onClick={() => scrollToProduct(0)}
            >
              <img
                src="/rice-and-beans-logo.svg"
                alt="logo rice and beans"
                className="size-8"
              />
              <h1 className="font-semibold">{data?.name || "Rice & Beans"}</h1>
            </div>

            <button
              onClick={() =>
                navigate(`/${companyPath}/${productName}/pesquisar-produto`)
              }
            >
              <Search />
            </button>
          </div>
          <LinearProgress active={isFetching} />
        </div>
      </div>

      <nav className="flex justify-between border-t-1 border-gray-600 px-4 py-3">
        <button>
          <User />
        </button>
        <button>
          <House />
        </button>
        <button>
          <ShoppingCart />
        </button>
      </nav>
    </main>
  );
}
