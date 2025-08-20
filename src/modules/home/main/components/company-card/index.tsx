import { Avatar } from "../avatar";
import clsx from "clsx";

interface CompanyCardProps {
  name: string;
  image?: string | null;
  onClick: () => void;
}

export function CompanyCard({ name, image, onClick }: CompanyCardProps) {
  return (
    <div
      onClick={() => onClick()}
      className={clsx(
        "flex h-28 gap-2 rounded-md p-4",
        "transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md",
      )}
    >
      <Avatar image={image} alt="icone da loja" />
      <div className="flex items-center">
        <div className="text-md line-clamp-1 font-medium text-gray-700">
          {name}
        </div>
      </div>
    </div>
  );
}
