"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Search, Filter, Heart, Plus, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Play } from "lucide-react";

import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type UserInfo = {
  user_id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
};

type FilterOptions = {
  duration: { min: number; max: number };
  uploadDate: string;
  sortBy: string;
  quality: string[];
  language: string;
  channelType: string;
  features: string[];
};

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("q") || ""
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = 1;
        const response = await axios.get<UserInfo>(
          `http://localhost:8000/user-info/${userId}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

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

  const featuredMetrics = [
    {
      label: "Videos Discovered",
      value: "2.5M+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Active Users",
      value: "150K+",
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Playlists Created",
      value: "45K+",
      color: "from-orange-500 to-amber-500",
    },
    {
      label: "Hours Watched",
      value: "1.2M+",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const trendingCategories = [
    "Music",
    "Gaming",
    "Education",
    "Technology",
    "Entertainment",
    "Sports",
    "News",
    "Comedy",
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[100vh]"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="bg-gradient-to-b from-black via-violet-800 to-blue-800 text-white justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    icon: React.cloneElement(link.icon, {
                      className: "h-5 w-5 shrink-0 text-white",
                    }),
                  }}
                />
              ))}
            </div>
          </div>
          <div>
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

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto p-6 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <h1 className="text-4xl font-bold text-white mb-6">
          {userLoading
            ? "Loading..."
            : userInfo
            ? `Hello, ${userInfo.firstName} ${userInfo.lastName}!`
            : "Welcome!"}
        </h1>

        <div className="flex mb-10">
          <Button
            onClick={() => {
              router.push("/course");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3"
          >
            Start Learning
          </Button>
        </div>

        {/* Stats Section */}
        <CardContainer className="inter-var w-full">
          <CardBody className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden group/card w-full h-auto">
            <CardItem translateZ="50" className="text-center pb-8 pt-8 px-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Platform Statistics
              </h2>
              <p className="text-gray-600">See how our community is growing</p>
            </CardItem>
            <CardItem translateZ="40" className="px-6 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredMetrics.map((metric, index) => (
                  <CardItem
                    key={index}
                    translateZ={20 + index * 5}
                    className="text-center"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${metric.color} opacity-20`}
                      ></div>
                      <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center group-hover/card:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-gray-800">
                          {metric.value}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {metric.label}
                    </h3>
                    <div
                      className={`h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${metric.color} group-hover/card:scale-x-125 transition-transform`}
                    ></div>
                  </CardItem>
                ))}
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>

        {/* Categories */}
        <div className="my-16">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                Trending Categories
              </CardTitle>
              <p className="text-gray-600">
                Explore popular content categories
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {trendingCategories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-6 py-3 text-base bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 hover:from-purple-200 hover:to-pink-200 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pb-10">
          {[
            {
              icon: Heart,
              title: "Save Favorites",
              description:
                "Keep track of your favorite videos and never lose them again.",
            },
            {
              icon: Plus,
              title: "Create Playlists",
              description:
                "Organize videos into custom playlists for easy access.",
            },
            {
              icon: Share2,
              title: "Share & Discover",
              description:
                "Share your discoveries with friends and find new content.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <Play className="w-5 h-5 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-white">EduCurate</h1>
      </div>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
        <Play className="w-5 h-5 text-purple-600" />
      </div>{" "}
    </a>
  );
};
