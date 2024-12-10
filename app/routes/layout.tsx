import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import {
  Check,
  ChevronsUpDown,
  Home,
  Search,
  Settings,
  Bookmark,
  BookOpen,
  Users,
  User,
  List,
  Megaphone,
  CircleAlert,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Link, NavLink, Outlet } from "react-router";

const mangas = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "D",
    label: "D",
  },
  {
    value: "E",
    label: "E",
  },
];
const hoverContentRoutes = [
  {
    title: "My Profile",
    route: "#",
    icon: User,
  },
  {
    title: "My Follows",
    route: "#",
    icon: Bookmark,
  },
  {
    title: "My Lists",
    route: "#",
    icon: List,
  },
  {
    title: "My Groups",
    route: "#",
    icon: Users,
  },
  {
    title: "My Reports",
    route: "#",
    icon: Megaphone,
  },
  {
    title: "Announcements",
    route: "#",
    icon: CircleAlert,
  },
];
const hoverFooterRoutes = [
  {
    title: "Settings",
    route: "#",
    icon: Settings,
  },
  {
    title: "Sign Out",
    route: "#",
    icon: LogOut,
  },
];
const sidebarContentRoutes = [
  {
    title: "Follows",
    icon: Bookmark,
    content: [
      { title: "Updates", route: "#" },
      { title: "Library", route: "#" },
      { title: "MDLists", route: "#" },
      { title: "My Groups", route: "#" },
      { title: "Reading History", route: "#" },
    ],
  },
  {
    title: "Titles",
    icon: BookOpen,
    content: [
      { title: "Advanced Search", route: "obras" },
      { title: "Recently Added", route: "#" },
      { title: "Latest Updates", route: "#" },
      { title: "Random", route: "#" },
    ],
  },
  {
    title: "Community",
    icon: Users,
    content: [
      { title: "Forums", route: "#" },
      { title: "Groups", route: "#" },
      { title: "Users", route: "#" },
    ],
  },
];

function HoverContent() {
  return (
    <Card>
      <Link to="#">
        <CardHeader>
          <Avatar className="cursor-context-menu">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Account</AvatarFallback>
          </Avatar>
          <CardTitle>My Name</CardTitle>
          <CardDescription>User</CardDescription>
        </CardHeader>
      </Link>
      <CardContent>
        <Separator />
        <nav>
          {hoverContentRoutes.map((content) => (
            <NavLink
              to={content.route}
              key={content.route}
              className="flex flex-row"
            >
              <content.icon className="icon-class" aria-label={content.title} />
              <span>{content.title}</span>
            </NavLink>
          ))}
        </nav>
        <Separator />
      </CardContent>
      <CardFooter>
        <nav>
          {hoverFooterRoutes.map((content) => (
            <NavLink
              to={content.route}
              key={content.route}
              className="flex flex-row"
            >
              <content.icon className="icon-class" aria-label={content.title} />
              <span>{content.title}</span>
            </NavLink>
          ))}
          <DropdownMenu></DropdownMenu>
        </nav>
      </CardFooter>
    </Card>
  );
}

function Header() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <header className="flex max-h-20 w-full justify-end overflow-hidden p-4">
      <div className="flex flex-row gap-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] max-w-full justify-between"
            >
              {value
                ? mangas.find((manga) => manga.value === value)?.label
                : "Search..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search mangas..." />
              <CommandList>
                <CommandEmpty>No mangas found.</CommandEmpty>
                <CommandGroup>
                  {mangas.map((manga) => (
                    <CommandItem
                      key={manga.value}
                      value={manga.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {manga.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === manga.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="cursor-context-menu">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Account</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 max-w-full overflow-hidden">
            <HoverContent />
          </HoverCardContent>
        </HoverCard>
      </div>
    </header>
  );
}

function AppSidebar() {
  return (
    <Sidebar className="border-none shadow-md">
      <SidebarContent className="text-gray-900 dark:text-gray-100">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  to={"/"}
                  className="flex items-center px-4 py-2 space-x-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 dark:hover:bg-opacity-50"
                >
                  <Home className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium cursor-pointer">Home</span>
                </Link>
              </SidebarMenuItem>
              {sidebarContentRoutes.map((sidebarContent) => (
                <SidebarMenuItem key={sidebarContent.title}>
                  <div className="flex items-center px-4 py-2 space-x-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 dark:hover:bg-opacity-50">
                    <sidebarContent.icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium cursor-pointer">
                      {sidebarContent.title}
                    </span>
                  </div>
                  {sidebarContent.content && (
                    <div className="pl-8">
                      {sidebarContent.content.map((content) => (
                        <Link
                          key={content.route}
                          to={`${content.route}`}
                          className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 dark:hover:bg-opacity-50"
                        >
                          <span>{content.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function layout() {
  return (
    <div className="flex h-screen w-screen overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <div className="min-w-0 flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
