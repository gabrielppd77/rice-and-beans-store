import clsx from "clsx";
import { Link } from "react-router-dom";

function PageTitle() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="rice-and-beans-logo.svg"
        className="h-12"
        alt="rice and beans Logo"
      />
      <span className="text-base font-medium whitespace-nowrap text-gray-800 sm:text-lg md:text-xl">
        Rice & Beans
      </span>
    </Link>
  );
}

export function Navbar() {
  return (
    <nav
      className={clsx(
        "h-appbar fixed top-0 right-0 left-0 z-10",
        "flex items-center justify-between border-b bg-black px-2 md:px-4",
      )}
    >
      <PageTitle />

      <button
        onClick={() =>
          window.open(import.meta.env.VITE_URL_REDIRECT_REGISTER, "_blank")
        }
        className={clsx(
          "bg-red-500 text-white hover:bg-red-700",
          "rounded-full px-4 py-2 text-xs font-medium sm:text-base",
          "duration-300 hover:scale-105",
        )}
      >
        Cadastre sua Loja
      </button>
    </nav>
  );
}
