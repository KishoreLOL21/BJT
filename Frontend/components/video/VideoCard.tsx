import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
    duration: string;
    views: string;
    publishedAt: string;
    description?: string;
    onClick?: () => void;
  };
  onAddToPlaylist?: (videoId: string) => void;
  onToggleFavorite?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
  onClick?: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h2 className="text-md font-semibold truncate">{video.title}</h2>
        <p className="text-sm text-gray-500">{video.channel}</p>
        <p className="text-xs text-gray-400">
          {video.views} views • {video.publishedAt}
        </p>
      </CardContent>
    </Card>
  );
}
