import clsx from "clsx";
import type { GetStoreProductResponse } from "../../../../store/data/types/GetStoreProductResponse";

interface CategoryData {
  category: string;
  quantity: number;
}

interface DrawerContentProps {
  products: GetStoreProductResponse[];
  categoryCurrent: string;
  onChangeCategory: (category: string | null) => void;
}

export function DrawerContent({
  products,
  categoryCurrent,
  onChangeCategory,
}: DrawerContentProps) {
  const categories: CategoryData[] = Object.values(
    products.reduce<Record<string, CategoryData>>((acc, product) => {
      if (!acc[product.categoryName]) {
        acc[product.categoryName] = {
          category: product.categoryName,
          quantity: 0,
        };
      }
      acc[product.categoryName].quantity++;
      return acc;
    }, {}),
  );

  return (
    <div className="p-4 py-2">
      <h1 className="mb-4 font-medium">Categorias</h1>
      <ul className="flex flex-col gap-2">
        {categories.map((d) => (
          <li
            key={d.category}
            className={clsx(
              "flex justify-between",
              d.category === categoryCurrent
                ? "font-bold text-black"
                : "text-gray-600",
            )}
            onClick={() =>
              onChangeCategory(
                d.category === categoryCurrent ? null : d.category,
              )
            }
          >
            <span>{d.category}</span>
            <span>{d.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
