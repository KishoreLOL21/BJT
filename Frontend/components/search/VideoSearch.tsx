"use client";

import React, { useState } from "react";
import axios from "axios";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import { Search, Filter, Play, User } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

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

type SidebarTopic = {
  label: string;
  query: string;
  href: string;
  icon: React.ReactNode;
};

export default function VideoSearch() {
  // Sidebar open state for expand/collapse on hover or toggle
  const [open, setOpen] = useState(false);

  // Main states
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  // Syllabus and sidebar topics
  const [files, setFiles] = useState<File[]>([]);
  const [parsedSyllabus, setParsedSyllabus] = useState<string | null>(null);
  const [uploadingMode, setUploadingMode] = useState(false);
  const [sidebarTopics, setSidebarTopics] = useState<SidebarTopic[]>([]);

  // Replace with your actual user info state or prop
  const userInfo = { firstName: "John", lastName: "Doe" };

  // Search handler: searches with current query or parsed syllabus
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchQuery = files.length ? parsedSyllabus || query : query;
      if (!searchQuery || searchQuery.trim() === "") {
        setVideos([]);
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      const res = await axios.get(`http://localhost:8000/search?q=${encodeURIComponent(searchQuery)}`);
      setVideos(res.data.items || []);
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

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setParsedSyllabus(null);
    setSidebarTopics([]);
  };

  const handleDoneUploading = async () => {
    if (files.length === 0) return;
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await axios.post("http://localhost:8000/upload-syllabus", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const moduleStructure = res.data.module_structure;
      setParsedSyllabus(moduleStructure);
      const topics = parseSyllabusToSidebarLinks(moduleStructure);
      setSidebarTopics(topics);
      setUploadingMode(false);
      setQuery(""); // Clear the query to avoid confusion
      setVideos([]); // Clear previous videos until user clicks a topic or searches
    } catch (err) {
      console.error("Failed to upload syllabus:", err);
    }
  };

  // Empty placeholder for loading more if needed later
  const handleLoadMore = async () => {};

  // Parse syllabus function to extract topic-wise sidebar links
  function parseSyllabusToSidebarLinks(syllabus: string): SidebarTopic[] {
    if (!syllabus) return [];
    return syllabus
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^Topic\s*-\s*\d+\s*:/i.test(l))
      .map((line) => {
        const topicText = line.replace(/^Topic\s*-\s*\d+\s*:/i, "").trim();
        const slug = topicText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return {
          label: line,
          query: topicText,
          href: `#${slug}`,
          icon: <Play className="h-5 w-5 shrink-0 text-white" />,
        };
      });
  }

  // Default sidebar links in case no syllabus uploaded
  const defaultLinks: SidebarTopic[] = [
    {
      label: "Search All Topics",
      query: "",
      href: "#",
      icon: <Search className="h-5 w-5 shrink-0 text-white" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-orange-400 via-pink-500 to-pink-600">
      {/* Sidebar anchored left fixed with hover expand behavior */}
      <div
        className="fixed top-0 left-0 h-full z-50"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="bg-gradient-to-b from-black via-violet-800 to-blue-800 text-white justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mt-8 flex flex-col gap-2">
                {(sidebarTopics.length > 0 ? sidebarTopics : defaultLinks).map((topic, idx) => {
                  const handleSidebarLinkClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    setQuery(topic.query);
                    handleSearch();
                  };
                  return (
                    <div key={idx} onClick={handleSidebarLinkClick} style={{ cursor: "pointer" }}>
                      <SidebarLink
                        link={{
                          label: topic.label,
                          href: topic.href,
                          icon: React.cloneElement(topic.icon as React.ReactElement, {
                            className: "h-5 w-5 shrink-0 text-white",
                          }),
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : "User",
                  href: "#",
                  icon: <User className="h-7 w-7 text-white" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-[80px] flex flex-col items-center w-full px-2 sm:px-0">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 mt-10 text-white text-center">
            Start Learning with EduCurate, our Course Planner
          </h1>

          {/* Upload Mode */}
          {uploadingMode ? (
            <>
              <div className="flex flex-col items-center gap-4 mt-4">
                <FileUpload onChange={handleFileUpload} />
                {files.length > 0 && (
                  <button
                    onClick={handleDoneUploading}
                    className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold text-lg px-6 py-2 rounded-full shadow"
                  >
                    Done Uploading
                  </button>
                )}
              </div>

              {/* Show parsed syllabus */}
              {parsedSyllabus && (
                <div className="mt-6 bg-white text-gray-800 rounded-xl shadow-md p-6 w-full max-w-4xl whitespace-pre-wrap">
                  <h2 className="text-xl font-bold mb-2 text-center text-blue-700">Parsed Syllabus</h2>
                  <pre className="text-sm">{parsedSyllabus}</pre>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Search bar */}
              <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-[320px] max-w-full">
                <Search className="text-gray-400 mr-2" size={24} />
                <input
                  type="text"
                  placeholder="Search for any topic"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent outline-none text-gray-800 w-full text-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-row items-center justify-center w-full max-w-2xl gap-4 mt-6 flex-wrap">
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
                <button
                  onClick={() => setUploadingMode(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white font-semibold text-lg px-6 py-2 rounded-full shadow"
                >
                  Upload Syllabus
                </button>
              </div>

              {/* Filters Panel */}
              <SearchFilters isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} onFiltersChange={handleFiltersChange} filters={appliedFilters} />

              {/* Search Results */}
              <div className="w-full mt-6">
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
            </>
          )}

          {/* Video Modal */}
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
                />
                <button onClick={() => setSelectedVideoId(null)} className="absolute top-2 right-2 text-white text-3xl font-bold">
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
