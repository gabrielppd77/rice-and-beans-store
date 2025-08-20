import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import { HomeMain } from "../../../home/main";
import { StoreMain } from "../../../store/main";
import { SearchCategory } from "../../../categories/search-category";
import { SearchProduct } from "../../../products/search-product";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain />,
  },
  {
    path: ":companyPath/:productName?",
    element: <StoreMain />,
  },
  {
    path: ":companyPath/:productName?/pesquisar-categoria",
    element: <SearchCategory />,
  },
  {
    path: ":companyPath/:productName?/pesquisar-produto",
    element: <SearchProduct />,
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
