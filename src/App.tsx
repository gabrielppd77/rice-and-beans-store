import QueryClientProvider from "./modules/react-query/providers/QueryClientProvider";
import RouterProvider from "./modules/routing/providers/RouterProvider";

export function App() {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
}
