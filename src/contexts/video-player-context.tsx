"use client";

import * as React from "react";

interface VideoPlayerContextType {
  isPlayerOpen: boolean;
  currentReelIndex: number;
  reels: any[];
  openPlayer: (reels: any[], index: number) => void;
  closePlayer: () => void;
  setCurrentReelIndex: (index: number) => void;
}

const VideoPlayerContext = React.createContext<VideoPlayerContextType | undefined>(undefined);

export function VideoPlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);
  const [currentReelIndex, setCurrentReelIndex] = React.useState(0);
  const [reels, setReels] = React.useState<any[]>([]);

  const openPlayer = React.useCallback((reels: any[], index: number) => {
    setReels(reels);
    setCurrentReelIndex(index);
    setIsPlayerOpen(true);
  }, []);

  const closePlayer = React.useCallback(() => {
    setIsPlayerOpen(false);
  }, []);

  return (
    <VideoPlayerContext.Provider
      value={{
        isPlayerOpen,
        currentReelIndex,
        reels,
        openPlayer,
        closePlayer,
        setCurrentReelIndex,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayer() {
  const context = React.useContext(VideoPlayerContext);
  if (context === undefined) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider");
  }
  return context;
}
