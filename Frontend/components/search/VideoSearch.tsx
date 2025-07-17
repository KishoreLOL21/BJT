"use client";
import React, { useState } from "react";
import axios from "axios";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import { Search, Filter, User, Play } from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
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

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
    description: string;
  };
};

export default function VideoSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

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

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/search?q=${query}`);
      setVideos(res.data.items);
      setHasMore(false);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (filters: any) => {
    setAppliedFilters(filters);
  };

  const [userInfo] = useState<UserInfo | null>(null);
  const [open, setOpen] = useState(false);

  const handleLoadMore = async () => {};

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-orange-400 via-pink-500 to-pink-600">
      <main className="flex-1 ml-[80px] flex flex-col items-center w-full px-2 sm:px-0">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 mt-10 text-white text-center">
            Search Videos
          </h1>
          {/* Search Input/Buttons: Modern layout */}
          <div className="flex flex-row gap-6 mb-8 justify-center w-full">
            <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-[320px] max-w-full">
              <Search className="text-gray-400 mr-2" size={24} />
              <input
                type="text"
                placeholder="integration"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-gray-800 w-full text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold text-lg px-8 py-2 rounded-full shadow"
            >
              Search
            </button>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="bg-pink-600 hover:bg-pink-700 transition-colors text-white font-semibold text-lg px-8 py-2 rounded-full shadow flex items-center gap-2"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
          {/* Filters Panel */}
          <SearchFilters
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onFiltersChange={handleFiltersChange}
            filters={appliedFilters}
          />
          {/* Search Results */}
          <div className="w-full">
            <SearchResults
              videos={videos.map((v) => ({
                id: v.id.videoId,
                title: v.snippet.title,
                channel: v.snippet.channelTitle,
                thumbnail: v.snippet.thumbnails.medium.url,
                duration: "N/A",
                views: "N/A",
                publishedAt: v.snippet.publishedAt,
                description: v.snippet.description ?? "",
              }))}
              isLoading={isLoading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              onVideoClick={setSelectedVideoId}
            />
          </div>
          {/* Player Modal */}
          {selectedVideoId && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
              <div className="relative w-[90%] md:w-[70%] h-[70%] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
                <button
                  onClick={() => setSelectedVideoId(null)}
                  className="absolute top-2 right-2 text-white text-3xl font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

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
