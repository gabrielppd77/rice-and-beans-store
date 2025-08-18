import { useEffect, useState } from "react";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { useGetStoreData } from "../../store/data/hooks/useGetStoreData";

import { ChevronLeft, Image } from "lucide-react";

import { LinearProgress } from "../../components/linear-progress";
import { ProductCard } from "../../components/product-card";
import { SearchField } from "./components/search-field";

import type { GetStoreProductResponse } from "../../store/data/types/GetStoreProductResponse";

interface CategoryWithProductData {
  category: string;
  products: GetStoreProductResponse[];
}

const paramQueryFieldProduct = "query";

export function SearchProduct() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryProduct = searchParams.get(paramQueryFieldProduct);

  const { companyPath, productName } = useParams<{
    companyPath: string;
    productName: string;
  }>();

  const { data, isLoading, isFetching } = useGetStoreData({
    params: { companyPath },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({ [paramQueryFieldProduct]: query });
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const products = data?.products || [];

  const productsFiltred = queryProduct
    ? products.filter((x) =>
        x.name.toLowerCase().includes(queryProduct.toLowerCase()),
      )
    : products;

  const categoryWithProducts: CategoryWithProductData[] = Object.values(
    productsFiltred.reduce<Record<string, CategoryWithProductData>>(
      (acc, product) => {
        if (!acc[product.categoryName]) {
          acc[product.categoryName] = {
            category: product.categoryName,
            products: [],
          };
        }
        acc[product.categoryName].products.push(product);
        return acc;
      },
      {},
    ),
  );

  return (
    <main className="flex h-screen w-full flex-col">
      <header className="flex items-center justify-between gap-4 p-3">
        <Link className="absolute" to={`/${companyPath}/${productName}`}>
          <ChevronLeft />
        </Link>

        {isLoading ? (
          <div className="mx-10 flex-1 animate-pulse rounded-sm bg-white/20 py-1.5 pr-2 pl-3">
            <p>Carregando...</p>
          </div>
        ) : (
          <div className="mx-10 grid w-full grid-cols-1 rounded-sm bg-white/10">
            <SearchField value={query} onChange={setQuery} />
          </div>
        )}
      </header>
      <LinearProgress active={isFetching} />

      {isLoading ? (
        <div className="animate-pulse">
          <h1 className="mx-4 mb-3 w-2/3 min-w-12 rounded-sm bg-white/20 text-lg font-medium">
            <div className="invisible">empty</div>
          </h1>
          <div className="grid grid-cols-3 gap-1">
            <Image className="h-44 w-full rounded-sm" />
          </div>
        </div>
      ) : productsFiltred.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 p-8">
          <img
            src="/searching.svg"
            className="size-52"
            alt="Icone de procura"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-center text-lg">Qual o pedido de hoje?</h1>
            <h2 className="text-center">
              Digite alguma palavra relacionada ao produto que você procura
            </h2>
          </div>
        </div>
      ) : (
        <div className="scrollbar-hide flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-1">
          {categoryWithProducts.map((d) => (
            <div key={d.category} className="flex flex-col">
              <h1 className="mb-3 text-lg font-medium select-none">
                {d.category}
              </h1>
              <span className="-mx-4 grid grid-cols-3 gap-1">
                {d.products.map((x) => (
                  <ProductCard key={x.id} name={x.name} urlImage={x.urlImage} />
                ))}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
