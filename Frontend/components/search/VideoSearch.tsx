"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter } from "lucide-react";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";

type Video = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: { url: string };
    };
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

  const handleLoadMore = async () => {
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-400 via-pink-500 to-pink-600 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Videos</h1>

      {/* Search Input & Filter Button */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex bg-white rounded-full shadow-md overflow-hidden">
          <span className="flex items-center pl-3 text-gray-500">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="integration"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 text-gray-800 focus:outline-none w-64"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md"
        >
          Search
        </button>

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2"
        >
          <Filter size={18} />
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

      {/* Embedded Player Modal */}
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
  );
}
