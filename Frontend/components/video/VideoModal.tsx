'use client';

import { X } from 'lucide-react';

export default function VideoModal({ videoId, onClose }: { videoId: string | null; onClose: () => void }) {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/60 p-2 rounded-full hover:bg-black/80 z-50"
        >
          <X className="w-5 h-5" />
        </button>
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
