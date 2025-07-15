"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, Heart, Plus, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchFilters from "@/components/search/SearchFilters";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import VideoModal from "@/components/video/VideoModal";
import SearchResults from "./SearchResults";

type Video = {
  id: {
    videoId: string;
  };
  snippet: {
    description: string;
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
    };
  };
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  };
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
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("q") || ""
  );
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterOptions>({
    duration: { min: 0, max: 3600 },
    uploadDate: "any",
    sortBy: "relevance",
    quality: [],
    language: "any",
    channelType: "any",
    features: [],
  });
  const [hasMore, setHasMore] = useState(true);
  const [monthsAgo, setMonthsAgo] = useState(6);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/videos?query=${encodeURIComponent(
          searchQuery
        )}&published_within=${monthsAgo}`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    performSearch();
  };

  const handleLoadMore = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasMore(false);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Search Videos</h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for videos, channels, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/95 border-0 focus:ring-2 focus:ring-white/30 rounded-full w-full"
              />
            </div>
            <Button
              onClick={performSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3"
            >
              Search
            </Button>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          <SearchFilters
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onFiltersChange={handleFiltersChange}
            filters={filters}
          />

          {/* {isLoading ? (
            <div className="text-center text-gray-600 py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video) => {
                const { id, snippet, statistics, contentDetails } = video;
                const duration = parseISODuration(
                  contentDetails?.duration || ""
                );
                const views = Number(
                  statistics?.viewCount || 0
                ).toLocaleString();
                const publishedTime = getRelativeTime(snippet?.publishedAt);

                return (
                  <Card
                    key={video.id.videoId}
                    className="cursor-pointer hover:shadow-xl transition-all duration-200"
                    onClick={() => setSelectedVideoId(video.id.videoId)}
                  >
                    <img
                      src={snippet?.thumbnails?.high?.url}
                      alt={snippet?.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h2 className="text-md font-semibold truncate">
                        {snippet?.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {snippet?.channelTitle}
                      </p>
                      <p className="text-xs text-gray-400">
                        {views} views • {publishedTime} • {duration}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )} */}

          <SearchResults
            videos={videos.map((video) => ({
              id: video.id.videoId,
              title: video.snippet.title,
              channel: video.snippet.channelTitle,
              thumbnail: video.snippet.thumbnails.high.url,
              duration: "N/A", 
              views: "N/A", 
              publishedAt: video.snippet.publishedAt,
              description: video.snippet?.description ?? "",
            }))}
            isLoading={isLoading}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onLoadMore={() => {}}
            hasMore={hasMore}
            onVideoClick={(videoId) => setSelectedVideoId(videoId)}
          />

          <VideoModal
            videoId={selectedVideoId}
            onClose={() => setSelectedVideoId(null)}
          />
        </div>
      </div>

      <VideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
    </div>
  );
}
