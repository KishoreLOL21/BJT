'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';

const mockVideos = [
  {
    id: '1',
    title: 'How to Build a React App from Scratch',
    channel: 'WebDev Pro',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '15:32',
    views: '125K',
    publishedAt: '2024-01-15T10:00:00Z',
    description: 'Learn how to build a complete React application from scratch with modern tools and best practices.'
  },
  {
    id: '2',
    title: 'JavaScript ES6 Features You Need to Know',
    channel: 'Code Masters',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '22:15',
    views: '89K',
    publishedAt: '2024-01-14T14:30:00Z',
    description: 'Master the essential ES6 features that every JavaScript developer should know.'
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox - Which One to Use?',
    channel: 'Frontend Focus',
    thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '18:45',
    views: '67K',
    publishedAt: '2024-01-13T09:15:00Z',
    description: 'Compare CSS Grid and Flexbox to understand when to use each layout system.'
  },
  {
    id: '4',
    title: 'Node.js Backend Development Tutorial',
    channel: 'Server Side',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '35:20',
    views: '156K',
    publishedAt: '2024-01-12T16:45:00Z',
    description: 'Build a complete backend API with Node.js, Express, and MongoDB.'
  },
  {
    id: '5',
    title: 'TypeScript for Beginners',
    channel: 'Type Safe',
    thumbnail: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '28:10',
    views: '94K',
    publishedAt: '2024-01-11T11:20:00Z',
    description: 'Get started with TypeScript and learn why it\'s essential for modern JavaScript development.'
  },
  {
    id: '6',
    title: 'Database Design Best Practices',
    channel: 'Data Guru',
    thumbnail: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '42:33',
    views: '78K',
    publishedAt: '2024-01-10T13:00:00Z',
    description: 'Learn the fundamentals of database design and normalization.'
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [videos, setVideos] = useState(mockVideos);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    duration: { min: 0, max: 3600 },
    uploadDate: 'any',
    sortBy: 'relevance',
    quality: [],
    language: 'any',
    channelType: 'any',
    features: []
  });
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setVideos(mockVideos);
      }
    }, 300),
    []
  );

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredVideos = mockVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setVideos(filteredVideos);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    performSearch(searchQuery);
  };

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setHasMore(false);
  };

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Search Videos</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for videos, channels, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white/30 rounded-full"
            />
          </div>
          
          {/* Filter Toggle */}
          <div className="flex items-center gap-4 mt-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          {/* Search Filters */}
          <SearchFilters
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onFiltersChange={handleFiltersChange}
          />

          {/* Search Results */}
          <SearchResults
            videos={videos}
            isLoading={isLoading}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}