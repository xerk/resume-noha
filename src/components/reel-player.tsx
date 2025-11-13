"use client";

import * as React from "react";
import { Reel, ReelGrid, ReelCard, ReelPlayer as ReelPlayerUI } from "./ui/reel";

interface ReelData {
  id: number | string;
  title?: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  author?: string;
}

interface ReelPlayerProps {
  reels: ReelData[];
  className?: string;
}

export const ReelPlayer = ({ reels, className }: ReelPlayerProps) => {
  return (
    <Reel className={className}>
      {/* Desktop Grid View */}
      <ReelGrid>
        {reels.map((reel, index) => (
          <ReelCard
            key={reel.id}
            index={index}
            thumbnail={reel.thumbnail}
            title={reel.title}
          >
            {/* Empty children - thumbnail and title are shown via props */}
          </ReelCard>
        ))}
      </ReelGrid>

      {/* Full-screen Player */}
      <ReelPlayerUI reels={reels} />
    </Reel>
  );
};
