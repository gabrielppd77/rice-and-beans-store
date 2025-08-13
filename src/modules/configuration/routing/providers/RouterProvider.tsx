import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import { StoreMain } from "../../../store/main";
import { CategoryMain } from "../../../category/main";

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
    element: <CategoryMain />,
  },
  {
    path: ":companyPath/:productName/pesquisar-categoria/:categoryName",
    element: <CategoryMain />,
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
