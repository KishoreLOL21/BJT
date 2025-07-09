'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Plus, Play, Clock, Eye } from 'lucide-react';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
    duration: string;
    views: string;
    publishedAt: string;
    description: string;
  };
  onAddToPlaylist?: (videoId: string) => void;
  onToggleFavorite?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
}

export default function VideoCard({ video, onAddToPlaylist, onToggleFavorite, onShare }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    onToggleFavorite?.(video.id);
  };

  const formatDuration = (duration: string) => {
    // Convert duration to readable format
    return duration;
  };

  const formatViews = (views: string) => {
    // Format view count (e.g., 1.2M, 500K)
    return views;
  };

  const timeAgo = (publishedAt: string) => {
    // Calculate time ago
    return '2 days ago';
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white border-0 shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail || 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Duration Badge */}
        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1">
          <Clock className="w-3 h-3 mr-1" />
          {formatDuration(video.duration)}
        </Badge>

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="lg"
            className="bg-white/90 text-black hover:bg-white rounded-full w-16 h-16 p-0"
          >
            <Play className="w-8 h-8 ml-1" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 text-black hover:bg-white w-8 h-8 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 text-black hover:bg-white w-8 h-8 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onAddToPlaylist?.(video.id);
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 text-black hover:bg-white w-8 h-8 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.(video.id);
            }}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {video.channel.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-purple-600 transition-colors">
              {video.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-2 hover:text-gray-900 cursor-pointer">
              {video.channel}
            </p>
            
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {formatViews(video.views)}
              </div>
              <span>•</span>
              <span>{timeAgo(video.publishedAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}