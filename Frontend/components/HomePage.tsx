"use client";

import { Play } from "lucide-react";
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

export default function Home() {
  const router = useRouter();

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
          </div>
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
