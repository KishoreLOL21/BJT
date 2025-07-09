// YouTube Data API v3 integration
// This file contains the API layer for YouTube integration

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface SearchOptions {
  query: string;
  maxResults?: number;
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'viewCount';
  publishedAfter?: string;
  publishedBefore?: string;
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoDefinition?: 'any' | 'high' | 'standard';
  videoCaption?: 'any' | 'closedCaption' | 'none';
  pageToken?: string;
}

class YouTubeAPI {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchVideos(options: SearchOptions): Promise<YouTubeSearchResponse> {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      q: options.query,
      maxResults: (options.maxResults || 12).toString(),
      order: options.order || 'relevance',
      key: this.apiKey,
    });

    if (options.publishedAfter) {
      params.append('publishedAfter', options.publishedAfter);
    }

    if (options.publishedBefore) {
      params.append('publishedBefore', options.publishedBefore);
    }

    if (options.videoDuration && options.videoDuration !== 'any') {
      params.append('videoDuration', options.videoDuration);
    }

    if (options.videoDefinition && options.videoDefinition !== 'any') {
      params.append('videoDefinition', options.videoDefinition);
    }

    if (options.videoCaption && options.videoCaption !== 'any') {
      params.append('videoCaption', options.videoCaption);
    }

    if (options.pageToken) {
      params.append('pageToken', options.pageToken);
    }

    try {
      const response = await fetch(`${this.baseUrl}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Get video statistics and content details
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailsResponse = await this.getVideoDetails(videoIds);
      
      // Merge search results with video details
      const enrichedItems = data.items.map((item: any) => {
        const details = detailsResponse.items.find((detail: any) => detail.id === item.id.videoId);
        return {
          ...item,
          statistics: details?.statistics || {},
          contentDetails: details?.contentDetails || {}
        };
      });

      return {
        items: enrichedItems,
        nextPageToken: data.nextPageToken,
        pageInfo: data.pageInfo
      };
    } catch (error) {
      console.error('YouTube API search error:', error);
      throw error;
    }
  }

  async getVideoDetails(videoIds: string): Promise<any> {
    const params = new URLSearchParams({
      part: 'statistics,contentDetails',
      id: videoIds,
      key: this.apiKey,
    });

    try {
      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('YouTube API details error:', error);
      throw error;
    }
  }

  async getChannelInfo(channelId: string): Promise<any> {
    const params = new URLSearchParams({
      part: 'snippet,statistics',
      id: channelId,
      key: this.apiKey,
    });

    try {
      const response = await fetch(`${this.baseUrl}/channels?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('YouTube API channel error:', error);
      throw error;
    }
  }

  // Helper method to format duration from YouTube API format (PT4M13S) to readable format
  static formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]?.slice(0, -1) || '0');
    const minutes = parseInt(match[2]?.slice(0, -1) || '0');
    const seconds = parseInt(match[3]?.slice(0, -1) || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  // Helper method to format view count
  static formatViewCount(viewCount: string): string {
    const num = parseInt(viewCount);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  }

  // Helper method to format upload date
  static formatUploadDate(publishedAt: string): string {
    const date = new Date(publishedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
    }
  }
}

export default YouTubeAPI;
export type { SearchOptions, YouTubeVideo, YouTubeSearchResponse };