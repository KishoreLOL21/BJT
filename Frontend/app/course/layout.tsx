"use client"
import React, { useState, ReactNode } from "react";
import { Search, Filter, User, Play } from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

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
    <div className="flex min-h-screen bg-gradient-to-tr from-orange-400 via-pink-500 to-pink-600">
      {/* Sidebar fixed on left */}
      <div className="fixed left-0 top-0 h-full w-[80px] z-30">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="bg-gradient-to-b from-black via-violet-800 to-blue-800 text-white flex-col items-center pt-6 justify-between gap-10">
            <div className="flex flex-1 flex-col items-center overflow-x-hidden overflow-y-auto">
              {/* show Logo full / icon depending on open */}
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-6">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={{
                      ...link,
                      icon: React.cloneElement(link.icon, {
                        className: "h-6 w-6 text-white",
                      }),
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <SidebarLink
                link={{
                  label: userInfo
                    ? `${userInfo.firstName} ${userInfo.lastName}`
                    : "User",
                  href: "#",
                  icon: <User className="h-7 w-7 text-white" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      <main className="flex-1 ml-[80px] p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
