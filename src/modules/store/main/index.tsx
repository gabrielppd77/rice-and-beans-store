import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetStoreData } from "../data/hooks/useGetStoreData";

import { Search, House, User } from "lucide-react";

import { Product } from "./components/product";

export function StoreMain() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const paramsPage = useParams<{ companyPath: string }>();
  // const { data, isLoading, isFetching } = useGetStoreData({
  //   params: { companyPath: paramsPage.companyPath },
  // });

  const data = {
    id: "103cebde-5be8-4292-b5b5-17e2a042e2ac",
    name: "Loja do Tadeu",
    description:
      "Descrição de uma pizzaria muito boa com varias variações de pizza e com um preço super acessivel e com uma diversidade de comidas diferentes e bebidasDescrição de uma pizzaria muito boa com varias variações de pizza e com um preço super acessivel e com uma diversidade de comidas diferentes e bebidasDescrição de uma pizzaria muito boa com varias variações de pizza e com um preço super acessivel e com uma diversidade de comidas diferentes e bebidasDescrição de uma pizzaria muito boa com varias var",
    urlImage:
      "http://localhost:9000/dev-rice-and-beans/company/5df21ecb-2ad1-4dd8-a53f-b013ca8dbbb9.jpeg",
    products: [
      {
        id: "c491acac-20e5-4df2-a585-a9b0423fe288",
        name: "X Salada",
        description: "Hamburguer com muita saladinhas",
        urlImage:
          "http://localhost:9000/dev-rice-and-beans/product/4beffda7-f1a6-4076-ba8c-7d930e8f6683.webp",
        price: 17,
        categoryName: "Hamburguer",
      },
      {
        id: "a1a37e6c-b559-43e1-9023-f3b71d8eb7fa",
        name: "X Bacon",
        description: "Hamburguer com muito bacon",
        urlImage:
          "http://localhost:9000/dev-rice-and-beans/product/f913ac70-1494-4078-be38-d27a019e85dd.webp",
        price: 22,
        categoryName: "Hamburguer",
      },
      {
        id: "a130cc5f-a255-4b81-9d1e-3d16d4583e6b",
        name: "Calabresa",
        description:
          "A pizza de calabresa é um sabor clássico e popular, conhecido pela combinação marcante de linguiça calabresa, queijo, cebola e, muitas vezes, azeitonas. A base é uma massa de pizza tradicional, coberta com molho de tomate, queijo mussarela, rodelas de calabresa e cebola em fatias, finalizada com orégano e azeitonas. A calabresa, com seu sabor defumado e levemente picante, contrasta com a suavidade do queijo e a leveza da massa, criando uma experiência gastronômica saborosa e reconfortante.A pizz",
        urlImage:
          "http://localhost:9000/dev-rice-and-beans/product/03d8acb9-6242-4223-9c69-66d5c3bff364.webp",
        price: 45,
        categoryName: "Pizza",
      },
      {
        id: "a0324d4f-26f7-4cb1-bb66-09ffb2854361",
        name: "Mussarela",
        description: "Pizza de mussarelas",
        urlImage:
          "http://localhost:9000/dev-rice-and-beans/product/9ab9347c-452a-41c3-96c8-9424ae7f9d55.jpeg",
        price: 44,
        categoryName: "Pizza",
      },
      {
        id: "9ddcb9a4-805b-4486-97a8-2ae52bb84024",
        name: "X TUDO",
        description:
          'Um "X-Tudo" é um sanduíche brasileiro, conhecido por sua combinação abundante de ingredientes. Geralmente inclui hambúrguer, queijo, presunto, ovo, bacon, alface, tomate e outros acompanhamentos, tudo dentro de um pão de hambúrguer. O termo "X" refere-se ao queijo, enquanto "Tudo" indica a grande quantidade de ingredientes. ',
        urlImage:
          "http://localhost:9000/dev-rice-and-beans/product/2206ff36-3fc8-4336-9ad0-86bcc520e1a4.webp",
        price: 25,
        categoryName: "Hamburguer",
      },
      {
        id: "32c7961c-4ede-4670-9823-e69545c88549",
        name: "Produto Empty",
        description: null,
        urlImage: null,
        price: 999.99,
        categoryName: "Bebidas",
      },
    ],
  };

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
          {products.map((product) => (
            <Product
              currentIndex={currentIndex}
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              urlImage={product.urlImage}
            />
          ))}
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
              <h1 className="font-semibold text-white">{data?.name}</h1>
            </div>

            <Search className="text-white" />
          </div>
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
