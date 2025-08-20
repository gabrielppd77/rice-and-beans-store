import { useGetStores } from "../data/hooks/useGetStoreData";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/container";
import { LinearProgress } from "../../components/linear-progress";

import { Navbar } from "./components/nav-bar";
import { CompanyCard } from "./components/company-card";
import { CompanyCardSkeleton } from "./components/company-card-skeleton";
import { Footer } from "./components/footer";

export function HomeMain() {
  const { data: _d, isLoading, isFetching } = useGetStores();
  const navigate = useNavigate();

  const data = _d || [];

  return (
    <main>
      <Navbar />

      <div className="h-appbar mb-2" />

      <LinearProgress active={isFetching} />

      <Container className="flex h-screen flex-col justify-between">
        <div>
          <h2 className="mb-2 text-lg font-medium text-gray-700">Lojas</h2>

          <div className="mb-2 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CompanyCardSkeleton key={index} />
                ))
              : data.map((d) => (
                  <CompanyCard
                    key={d.companyId}
                    name={d.companyName}
                    image={d.companyUrlImage}
                    onClick={() => navigate(d.companyPath)}
                  />
                ))}
          </div>
        </div>

        <Footer />
      </Container>
    </main>
  );
}
