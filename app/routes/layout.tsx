import MobileHeader from "~/components/mobile-header";
import DefaultHeader from "~/components/default-header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";


export default function Layout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);
  
  return (
    <div className="min-h-screen bg-cream text-gray-800 dark:bg-neutral-900 dark:text-gray-100">
      <header className="bg-cream p-4 shadow dark:bg-neutral-900">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://vulcannovel.com.br/wp-content/uploads/2023/07/capa_vulcan_o_unico_fazendeiro_da_torre.png"
              className="h-8 w-8"
              alt="Logo"
            />
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
              Quantum Mangás.
            </h1>
          </div>

          {isMobile ? (
            <MobileHeader/>
            ) : (
            <DefaultHeader/>
            )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
