"use client";

import { Boxes, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { BoxesCore } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { FaPlay } from "react-icons/fa";
import { useState, useEffect } from "react"; 

export default function Home() {
  const router = useRouter();
  const [showFirstLine, setShowFirstLine] = useState(true);
  const [showSecondLine, setShowSecondLine] = useState(false);

  const words = [
    {
      text: "Discover",
      className: "text-white dark:text-white",
    },
    {
      text: "Amazing",
      className: "text-white dark:text-white",
    },
    {
      text: "YouTube",
      className: "text-black-1000 dark:text-black-1000",
    },
    {
      text: "Content",
      className: "text-white dark:text-white",
    },
  ];

  const words_second = [
    {
      text: "all",
      className: "text-white-500 dark:text-white-500",
    },
    {
      text: "in",
      className: "text-white-500 dark:text-white-500",
    },
    {
      text: "one",
      className: "text-white-500 dark:text-white-500",
    },
    {
      text: "Go!",
      className: "text-white-500 dark:text-white-500",
    },
    {
      text: "Compiled",
      className: "text-white-500 dark:text-white-500",
    },
    {
      text: "for",
      className: "text-white-500 dark:text-white-500",
    },
    {
      text: "Ease!!",
      className: "text-white-500 dark:text-white-500",
    },
  ];

  useEffect(() => {
    // After first line completes, show second line
    const timer = setTimeout(() => {
      setShowSecondLine(true);
    }, words.length * 200 + 1000); // Adjust timing based on your needs
    
    return () => clearTimeout(timer);
  }, []);

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
                onClick={() => router.push("/sign-in")}
              >
                Sign Up
              </Button>
              <Button
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="relative overflow-hidden">
        <BoxesCore className="z--2"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className={cn("md:text-5xl text-xl text-white relative z-20")}>
              <TypewriterEffectSmooth words={words} />
              {showSecondLine && (
                <span className={cn("md:text-5xl text-xl text-white relative z-20 block mt-4")}>
                  <TypewriterEffectSmooth words={words_second} />
                </span>
              )}
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Search, filter, and organize YouTube videos with powerful tools.
              Create playlists, save favorites, and discover content that
              matters to you.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-14">
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