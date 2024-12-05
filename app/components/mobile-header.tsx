import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink } from "react-router";

export default function MobileHeader() {
  const [theme, setTheme] = useState("system");

  function changeTheme(newTheme: string) {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    }
  }

  function applyTheme(theme: string) {
    if (typeof window === "undefined") return;

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark" ||
        (theme !== "light" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "system";
      setTheme(savedTheme);
      applyTheme(savedTheme);

      const handleStorageChange = () => {
        const storedTheme = localStorage.getItem("theme") || "system";
        setTheme(storedTheme);
        applyTheme(storedTheme);
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg p-2 text-gray-800 dark:text-white"
        >
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Navegação</DropdownMenuLabel>
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="inicio">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "font-bold" : undefined)}
            >
              Inicio
            </NavLink>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="obras">
            <NavLink
              to="/obras"
              className={({ isActive }) => (isActive ? "font-bold" : undefined)}
            >
              Obras
            </NavLink>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="listas">
            <NavLink
              to="/listas"
              className={({ isActive }) => (isActive ? "font-bold" : undefined)}
            >
              Listas
            </NavLink>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="perfil">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Account</AvatarFallback>
            </Avatar>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Aparência</DropdownMenuLabel>
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem
            onClick={() => changeTheme("light")}
            value="light"
          >
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => changeTheme("dark")}
            value="dark"
          >
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => changeTheme("system")}
            value="system"
          >
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
