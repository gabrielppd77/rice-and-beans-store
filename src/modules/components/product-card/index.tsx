import { Image } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductCardProps {
  name: string;
  urlImage?: string | null;
}

export function ProductCard({ name, urlImage }: ProductCardProps) {
  const { companyPath } = useParams<{
    companyPath: string;
  }>();
  const navigate = useNavigate();

  return (
    <div
      className="flex h-44 w-full items-center justify-center"
      onClick={() => navigate(`/${companyPath}/${name}`)}
    >
      {urlImage ? (
        <img alt={name} src={urlImage} className="h-44 w-full rounded-sm" />
      ) : (
        <Image className="h-44 w-full rounded-sm" />
      )}
    </div>
  );
}
