import { useParams } from "react-router-dom";
import { useGetStoreData } from "../data/hooks/useGetStoreData";

export function StoreMain() {
  const paramsPage = useParams<{ companyPath: string }>();
  const { data, isLoading, isFetching } = useGetStoreData({
    params: { companyPath: paramsPage.companyPath },
  });

  return (
    <main>
      HEre: {data && JSON.stringify(data)}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </main>
  );
}
