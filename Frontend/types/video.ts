export interface video {
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
  statistics?: {
    viewCount: string;
  };
  contentDetails?: {
    duration: string;
  };
}

export interface DisplayVideo {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  description?: string;
}