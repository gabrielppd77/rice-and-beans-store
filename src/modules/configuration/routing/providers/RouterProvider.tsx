import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import { StoreMain } from "../../../store/main";
import { SearchCategory } from "../../../categories/search-category";

const routes = createBrowserRouter([
  {
    path: ":companyPath",
    element: <StoreMain />,
  },
  {
    path: ":companyPath/:productName",
    element: <StoreMain />,
  },
  {
    path: ":companyPath/:productName/pesquisar-categoria",
    element: <SearchCategory />,
  },
  {
    path: ":companyPath/:productName/pesquisar-categoria/:categoryName",
    element: <SearchCategory />,
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
