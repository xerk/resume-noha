"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Reel Context
interface ReelContextValue {
  currentReel: number;
  setCurrentReel: (index: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const ReelContext = React.createContext<ReelContextValue | undefined>(
  undefined
);

const useReel = () => {
  const context = React.useContext(ReelContext);
  if (!context) {
    throw new Error("useReel must be used within Reel");
  }
  return context;
};

// Reel Root Component
interface ReelProps {
  children: React.ReactNode;
  className?: string;
}

export const Reel = ({ children, className }: ReelProps) => {
  const [currentReel, setCurrentReel] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(true);

  return (
    <ReelContext.Provider
      value={{
        currentReel,
        setCurrentReel,
        isOpen,
        setIsOpen,
        isMuted,
        setIsMuted,
        isPlaying,
        setIsPlaying,
      }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </ReelContext.Provider>
  );
};

// Reel Grid Container (Desktop)
interface ReelGridProps {
  children: React.ReactNode;
  className?: string;
}

export const ReelGrid = ({ children, className }: ReelGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

// Individual Reel Card Component
interface ReelCardProps {
  children?: React.ReactNode;
  className?: string;
  index?: number;
  thumbnail?: string;
  title?: string;
}

export const ReelCard = ({
  children,
  className,
  index = 0,
  thumbnail,
  title,
}: ReelCardProps) => {
  const { setCurrentReel, setIsOpen } = useReel();

  const handleClick = () => {
    setCurrentReel(index);
    setIsOpen(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        "group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl bg-muted",
        className
      )}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title || "Reel thumbnail"}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      {children}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-sm font-medium text-white line-clamp-2">{title}</p>
        </div>
      )}
      {/* Play icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="rounded-full bg-white/90 p-3">
          <Play className="h-6 w-6 text-black fill-black" />
        </div>
      </div>
    </motion.div>
  );
};

// Full Screen Reel Player
interface ReelPlayerProps {
  reels: Array<{
    id: number | string;
    title?: string;
    description?: string;
    videoUrl: string;
    thumbnail?: string;
    author?: string;
  }>;
}

export const ReelPlayer = ({ reels }: ReelPlayerProps) => {
  const {
    currentReel,
    setCurrentReel,
    isOpen,
    setIsOpen,
    isMuted,
    setIsMuted,
    isPlaying,
    setIsPlaying,
  } = useReel();

  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [showControls, setShowControls] = React.useState(true);
  const controlsTimeout = React.useRef<NodeJS.Timeout>();

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowUp" && currentReel > 0) {
        setCurrentReel(currentReel - 1);
      } else if (e.key === "ArrowDown" && currentReel < reels.length - 1) {
        setCurrentReel(currentReel + 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.key === "m" || e.key === "M") {
        setIsMuted(!isMuted);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    currentReel,
    reels.length,
    setCurrentReel,
    setIsOpen,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
  ]);

  // Handle touch gestures for mobile swipe
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe up - next reel
      if (currentReel < reels.length - 1) {
        setCurrentReel(currentReel + 1);
      }
    }
    if (touchStart - touchEnd < -75) {
      // Swipe down - previous reel
      if (currentReel > 0) {
        setCurrentReel(currentReel - 1);
      }
    }
  };

  // Auto-hide controls after 3 seconds
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Toggle play/pause on video click
  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  const reel = reels[currentReel];

  // Extract YouTube Shorts ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    const videoId = shortMatch?.[1] || watchMatch?.[1];

    if (videoId) {
      const muteParam = isMuted ? 1 : 0;
      const autoplayParam = isPlaying ? 1 : 0;
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${muteParam}&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Top controls - visible on hover/tap */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            className="absolute top-16 left-0 right-0 z-20 px-4"
          >
            <div className="flex items-center justify-center gap-1 max-w-md mx-auto">
              {reels.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-all",
                    index === currentReel
                      ? "bg-white"
                      : index < currentReel
                      ? "bg-white/70"
                      : "bg-white/30"
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Video iframe */}
          <div className="relative w-full h-full max-w-md mx-auto">
            <iframe
              ref={iframeRef}
              key={currentReel} // Force reload on reel change
              src={getYouTubeEmbedUrl(reel.videoUrl)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onClick={handleVideoClick}
            />
          </div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-6"
          >
            <div className="max-w-md mx-auto">
              {reel.title && (
                <h3 className="text-white font-semibold text-lg mb-1">
                  {reel.title}
                </h3>
              )}
              {reel.description && (
                <p className="text-white/80 text-sm line-clamp-2">
                  {reel.description}
                </p>
              )}
              {reel.author && (
                <p className="text-white/60 text-xs mt-2">{reel.author}</p>
              )}
            </div>
          </motion.div>

          {/* Navigation hints (invisible touch areas) */}
          <div
            className="absolute inset-y-0 left-0 w-1/4 cursor-pointer"
            onClick={() => currentReel > 0 && setCurrentReel(currentReel - 1)}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/4 cursor-pointer"
            onClick={() =>
              currentReel < reels.length - 1 && setCurrentReel(currentReel + 1)
            }
          />

          {/* Center play/pause button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showControls && !isPlaying ? 1 : 0, scale: showControls && !isPlaying ? 1 : 0.8 }}
            onClick={handleVideoClick}
            className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 flex items-center justify-center z-10"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-black" />
            ) : (
              <Play className="h-8 w-8 text-black ml-1" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
