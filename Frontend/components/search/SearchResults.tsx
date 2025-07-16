"use client";

import { useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid, List, Loader2 } from "lucide-react";

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  description: string;
}

interface SearchResultsProps {
  videos: Video[];
  isLoading: boolean;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onLoadMore: () => void;
  hasMore: boolean;
  onVideoClick: (videoId: string) => void;
}

export default function SearchResults({
  videos,
  isLoading,
  viewMode,
  onViewModeChange,
  onLoadMore,
  hasMore,
  onVideoClick,
}: SearchResultsProps) {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  const handleAddToPlaylist = (videoId: string) => {
    console.log("Add to playlist:", videoId);
  };

  const handleToggleFavorite = (videoId: string) => {
    console.log("Toggle favorite:", videoId);
  };

  const handleShare = (videoId: string) => {
    console.log("Share video:", videoId);
  };

  if (isLoading && videos.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!isLoading && videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Grid className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No videos found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-gray-600">{videos.length} videos found</p>
      </div>

      {/* Results Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onAddToPlaylist={handleAddToPlaylist}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
            onClick={() => onVideoClick(video.id)} 
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Videos"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
