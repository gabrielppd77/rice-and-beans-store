import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

import { StoreMain } from "../../../store/main";

const routes = createBrowserRouter([
  {
    path: ":companyPath",
    element: <StoreMain />,
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
