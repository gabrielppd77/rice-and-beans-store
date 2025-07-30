import {
  RouterProvider as RouterProviderMain,
  createBrowserRouter,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </>
    ),
  },
]);

export default function RouterProvider() {
  return <RouterProviderMain router={routes} />;
}
