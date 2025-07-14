'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter, RotateCcw } from 'lucide-react';

interface FilterOptions {
  duration: {
    min: number;
    max: number;
  };
  uploadDate: string;
  sortBy: string;
  quality: string[];
  language: string;
  channelType: string;
  features: string[];
}

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export default function SearchFilters({ isOpen, onClose, onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    duration: { min: 0, max: 3600 },
    uploadDate: 'any',
    sortBy: 'relevance',
    quality: [],
    language: 'any',
    channelType: 'any',
    features: []
  });

  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const uploadDateOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'hour', label: 'Last hour' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
    { value: 'year', label: 'This year' }
  ];

  const sortByOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'upload_date', label: 'Upload date' },
    { value: 'view_count', label: 'View count' },
    { value: 'rating', label: 'Rating' }
  ];

  const qualityOptions = [
    { value: 'hd', label: 'HD' },
    { value: '4k', label: '4K' },
    { value: 'hdr', label: 'HDR' },
    { value: '360', label: '360°' }
  ];

  const languageOptions = [
    { value: 'any', label: 'Any language' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' }
  ];

  const channelTypeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'verified', label: 'Verified' },
    { value: 'partner', label: 'Partner' }
  ];

  const featureOptions = [
    { value: 'live', label: 'Live' },
    { value: 'subtitles', label: 'Subtitles/CC' },
    { value: 'creative_commons', label: 'Creative Commons' },
    { value: 'purchased', label: 'Purchased' }
  ];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleQualityChange = (quality: string, checked: boolean) => {
    const newQualities = checked
      ? [...filters.quality, quality]
      : filters.quality.filter(q => q !== quality);
    
    setFilters(prev => ({ ...prev, quality: newQualities }));
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const newFeatures = checked
      ? [...filters.features, feature]
      : filters.features.filter(f => f !== feature);
    
    setFilters(prev => ({ ...prev, features: newFeatures }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
    
    // Create applied filters list for UI
    const applied = [];
    if (filters.uploadDate !== 'any') {
      applied.push(uploadDateOptions.find(opt => opt.value === filters.uploadDate)?.label || '');
    }
    if (filters.sortBy !== 'relevance') {
      applied.push(`Sort: ${sortByOptions.find(opt => opt.value === filters.sortBy)?.label || ''}`);
    }
    if (filters.quality.length > 0) {
      applied.push(`Quality: ${filters.quality.join(', ')}`);
    }
    if (filters.language !== 'any') {
      applied.push(`Language: ${languageOptions.find(opt => opt.value === filters.language)?.label || ''}`);
    }
    if (filters.features.length > 0) {
      applied.push(`Features: ${filters.features.join(', ')}`);
    }
    
    setAppliedFilters(applied);
    onClose();
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      duration: { min: 0, max: 3600 },
      uploadDate: 'any',
      sortBy: 'relevance',
      quality: [],
      language: 'any',
      channelType: 'any',
      features: []
    };
    setFilters(defaultFilters);
    setAppliedFilters([]);
    onFiltersChange(defaultFilters);
  };

  const removeAppliedFilter = (filterToRemove: string) => {
    setAppliedFilters(prev => prev.filter(filter => filter !== filterToRemove));
  };

  if (!isOpen) {
    return (
      <div className="mb-4">
        {appliedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {appliedFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeAppliedFilter(filter)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="mb-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Advanced Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Duration Filter */}
          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="px-3">
              <Slider
                value={[filters.duration.min, filters.duration.max]}
                onValueChange={([min, max]) => setFilters(prev => ({ ...prev, duration: { min, max } }))}
                max={3600}
                min={0}
                step={60}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatDuration(filters.duration.min)}</span>
                <span>{formatDuration(filters.duration.max)}</span>
              </div>
            </div>
          </div>

          {/* Upload Date */}
          <div className="space-y-2">
            <Label>Upload Date</Label>
            <Select value={filters.uploadDate} onValueChange={(value) => setFilters(prev => ({ ...prev, uploadDate: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {uploadDateOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortByOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quality */}
          <div className="space-y-2">
            <Label>Quality</Label>
            <div className="space-y-2">
              {qualityOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={filters.quality.includes(option.value)}
                    onCheckedChange={(checked) => handleQualityChange(option.value, checked as boolean)}
                  />
                  <Label htmlFor={option.value} className="text-sm">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={filters.language} onValueChange={(value) => setFilters(prev => ({ ...prev, language: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {featureOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={filters.features.includes(option.value)}
                    onCheckedChange={(checked) => handleFeatureChange(option.value, checked as boolean)}
                  />
                  <Label htmlFor={option.value} className="text-sm">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={handleResetFilters} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} className="bg-purple-600 hover:bg-purple-700">
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}