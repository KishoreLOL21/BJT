"use client";
import React, { useState, ReactNode } from "react";
import { Search, Filter, User, Play } from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type UserInfo = {
  user_id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
};

type LayoutProps = {
  children: ReactNode;
};

const Logo = () => (
  <a
    href="#"
    className="relative z-20 flex flex-col items-center py-1 text-sm font-normal text-black"
  >
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
      <Play className="w-5 h-5 text-purple-600" />
    </div>
    <span className="text-xs font-semibold text-white mt-1">EduCurate</span>
  </a>
);

const LogoIcon = () => (
  <a
    href="#"
    className="relative z-20 flex items-center py-1 text-sm font-normal text-black"
  >
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
      <Play className="w-5 h-5 text-purple-600" />
    </div>
  </a>
);

const Layout = ({ children }: LayoutProps) => {
  const [userInfo] = useState<UserInfo | null>(null);
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div className={cn(
            "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
            "h-[100vh] flex bg-gradient-to-tr from-orange-400 via-pink-500 to-pink-600"
          )}>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
