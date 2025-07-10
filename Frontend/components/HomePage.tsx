"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Play,
  Heart,
  Share2,
  Plus,
  Router,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

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

  const features = [
    {
      icon: Heart,
      title: "Save Favorites",
      description:
        "Keep track of your favorite videos and never lose them again.",
      colors: [
        [236, 72, 153],
        [232, 121, 249],
      ],
    },
    {
      icon: Plus,
      title: "Create Playlists",
      description: "Organize videos into custom playlists for easy access.",
      colors: [[125, 211, 252]],
    },
    {
      icon: Share2,
      title: "Share & Discover",
      description: "Share your discoveries with friends and find new content.",
      colors: [
        [110, 231, 183],
        [16, 185, 129],
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      {/* Navigation */}
      <div className="w-full bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-white">EduCurate</h1>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-white/80">
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4">
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        Our Story
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        Team
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        Careers
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-white/80">
                    Contact Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4">
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        Support
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        Business
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        Press
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:text-white/80 hover:bg-white/10"
                onClick = {() => router.push("/sign-in")}
              >
                Sign Up
              </Button>
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                YouTube Content
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Search, filter, and organize YouTube videos with powerful tools.
              Create playlists, save favorites, and discover content that
              matters to you.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for videos, channels, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white/30 rounded-full"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CardContainer className="inter-var w-full">
          <CardBody className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden group/card w-full h-auto">
            {/* Card Header */}
            <CardItem translateZ="50" className="text-center pb-8 pt-8 px-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Platform Statistics
              </h2>
              <p className="text-gray-600">See how our community is growing</p>
            </CardItem>

            {/* Card Content - Metrics Grid */}
            <CardItem translateZ="40" className="px-6 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredMetrics.map((metric, index) => (
                  <CardItem
                    key={index}
                    translateZ={20 + index * 5} // Staggered depth effect
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
      </div>

      {/* Trending Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Trending Categories
            </CardTitle>
            <p className="text-gray-600">Explore popular content categories</p>
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

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Footer */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-white">EduCurate</h3>
            </div>
            <p className="text-white/80 mb-8">
              Discover, organize, and enjoy YouTube content like never before.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <a href="#" className="hover:text-white transition-colors">
                API
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
