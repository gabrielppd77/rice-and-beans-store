import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetStoreData } from "../../store/data/hooks/useGetStoreData";

import { ChevronDown, ChevronLeft, Image, Search } from "lucide-react";
import { LinearProgress } from "../../components/linear-progress";
import { Drawer } from "../../components/drawer";

import { DrawerContent } from "./components/drawer-content";

export function CategoryMain() {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const { companyPath, productName, categoryName } = useParams<{
    companyPath: string;
    productName: string;
    categoryName: string;
  }>();
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetStoreData({
    params: { companyPath },
  });

  const products = data?.products || [];

  const productsFiltred = categoryName
    ? products.filter((x) => x.categoryName === categoryName)
    : products;

  return (
    <main className="animate-slideInRight flex h-screen w-full flex-col">
      <div>
        <div className="flex items-center justify-between gap-4 p-3">
          <button onClick={() => navigate(`/${companyPath}/${productName}`)}>
            <ChevronLeft />
          </button>

          {isLoading ? (
            <div className="flex-1 animate-pulse rounded-sm bg-white/20 py-1.5 pr-2 pl-3">
              <p>Carregando...</p>
            </div>
          ) : (
            <div className="flex-1">
              <button
                className="grid w-full grid-cols-1 rounded-sm bg-white/10 py-1.5 pr-2 pl-3"
                onClick={() => setOpenDrawer(true)}
              >
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  <span className="block truncate">
                    {categoryName || "Selecione"}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end"
                />
              </button>
            </div>
          )}

          <button
            onClick={() =>
              navigate(`/${companyPath}/${productName}/pesquisar-categoria`)
            }
          >
            <Search />
          </button>
        </div>
      </div>

      <LinearProgress active={isFetching} />

      <div className="scrollbar-hide mt-1 flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-1">
          {isLoading ? (
            <div className="flex h-44 w-full animate-pulse items-center justify-center">
              <Image className="h-44 w-full rounded-sm" />
            </div>
          ) : (
            productsFiltred.map((x) => (
              <div
                key={x.id}
                className="flex h-44 w-full items-center justify-center"
                onClick={() => navigate(`/${companyPath}/${x.name}`)}
              >
                {x.urlImage ? (
                  <img
                    alt={x.name}
                    src={x.urlImage}
                    className="h-44 w-full rounded-sm"
                  />
                ) : (
                  <Image className="h-44 w-full rounded-sm" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Drawer
        isOpen={isOpenDrawer}
        onChange={setOpenDrawer}
        content={
          <DrawerContent
            products={products}
            categoryCurrent={categoryName || ""}
            onChangeCategory={(d) => {
              navigate(
                `/${companyPath}/${productName}/pesquisar-categoria${d ? "/" + d : ""}`,
              );
              setOpenDrawer(false);
            }}
          />
        }
      />
    </main>
  );
}
