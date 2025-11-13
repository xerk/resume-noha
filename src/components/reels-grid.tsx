"use client";

import * as React from "react";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import { useVideoPlayer } from "@/contexts/video-player-context";
import { DATA } from "@/data/resume";

interface Reel {
  id: string;
  title?: string;
  description?: string;
  videoUrl: string;
  thumbnail: string;
  author: string;
}

interface ReelsGridProps {
  reels: Reel[];
}

export const ReelsGrid = ({ reels }: ReelsGridProps) => {
  const { openPlayer } = useVideoPlayer();

  // Transform reels to match expected format
  const transformedReels = reels.map(reel => ({
    id: reel.id,
    title: reel.title,
    author: reel.author,
    avatar: DATA.avatarUrl,
    fallback: reel.author.substring(0, 2).toUpperCase(),
    thumbnail: reel.thumbnail,
    video: reel.videoUrl
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {reels.map((reel, index) => {
        const videoId = reel.videoUrl.match(/shorts\/([a-zA-Z0-9_-]+)/)?.[1];

        return (
          <div
            key={reel.id}
            className="group relative aspect-[9/16] cursor-pointer rounded-xl bg-muted transition-all duration-300 hover:shadow-xl overflow-hidden"
            onClick={() => openPlayer(transformedReels, index)}
          >
            {/* Thumbnail */}
            <Image
              src={reel.thumbnail}
              alt={reel.title || reel.id}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
              {reel.title && (
                <p className="text-sm font-semibold text-white drop-shadow-lg line-clamp-2">
                  {reel.title}
                </p>
              )}
              <p className="text-xs text-white/80 drop-shadow-lg">
                {reel.author}
              </p>
            </div>

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="rounded-full bg-white/90 p-4">
                <PlayIcon className="h-8 w-8 text-black fill-black" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
