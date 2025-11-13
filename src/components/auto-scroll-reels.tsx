"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { useVideoPlayer } from "@/contexts/video-player-context";

interface Reel {
  id: string;
  author: string;
  avatar: string;
  fallback: string;
  thumbnail: string;
  video: string;
  title?: string;
}

interface AutoScrollReelsProps {
  reels: Reel[];
}

export const AutoScrollReels = ({ reels }: AutoScrollReelsProps) => {
  const { openPlayer } = useVideoPlayer();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [visibleReelIndex, setVisibleReelIndex] = React.useState<number | null>(null);
  const scrollPositionRef = React.useRef(0);
  const [preloadedVideos, setPreloadedVideos] = React.useState<Set<number>>(new Set());
  const pauseTimerRef = React.useRef<NodeJS.Timeout>();

  // Duplicate reels for infinite loop effect
  const infiniteReels = [...reels, ...reels, ...reels];

  // Intersection Observer to detect when section is in view
  React.useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.01 } // Trigger when just 1% of section is visible
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    // Also set to true initially if already in view
    setTimeout(() => {
      if (currentSection) {
        const rect = currentSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          setIsInView(true);
        }
      }
    }, 100);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Check which reel is currently visible in viewport
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkVisibleReel = () => {
      const containerRect = container.getBoundingClientRect();
      const reelElements = container.querySelectorAll('[data-reel-index]');

      let mostVisibleIndex = null;
      let maxVisibility = 0;

      reelElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const index = parseInt(element.getAttribute('data-reel-index') || '0');

        // Calculate how much of the reel is visible in the container
        const visibleLeft = Math.max(rect.left, containerRect.left);
        const visibleRight = Math.min(rect.right, containerRect.right);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        const totalWidth = rect.width;
        const visibilityPercentage = visibleWidth / totalWidth;

        // Track the most visible reel (centered)
        if (visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage;
          mostVisibleIndex = index;
        }
      });

      // Only show video if reel is at least 80% visible (stricter for better single-reel focus)
      if (maxVisibility > 0.8 && mostVisibleIndex !== null) {
        setVisibleReelIndex(mostVisibleIndex);
      } else {
        setVisibleReelIndex(null);
      }
    };

    const scrollListener = () => {
      checkVisibleReel();
    };

    container.addEventListener('scroll', scrollListener);
    checkVisibleReel(); // Initial check

    return () => {
      container.removeEventListener('scroll', scrollListener);
    };
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container || !isInView) {
      return;
    }

    const scrollInterval = 30; // Scroll interval in milliseconds (higher = slower)
    const scrollAmount = 0.5; // Pixels to scroll per interval

    let intervalId: NodeJS.Timeout;

    const autoScroll = () => {
      if (!container || isPaused) {
        return;
      }

      // Calculate the width of one set of reels
      const singleSetWidth = container.scrollWidth / 3;

      // Increment scroll position
      container.scrollLeft += scrollAmount;

      // When reaching the end of the second set, reset to start of second set
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft = singleSetWidth;
      }

      // When going back before the second set, reset to end of second set
      if (container.scrollLeft < singleSetWidth) {
        container.scrollLeft = singleSetWidth * 2 - scrollAmount;
      }
    };

    // Start auto-scroll after a brief delay to ensure layout is ready
    const timeoutId = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
      intervalId = setInterval(autoScroll, scrollInterval);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isInView, isPaused]);

  const handlePause = () => {
    // Save current scroll position when pausing
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
    }
    setIsPaused(true);
  };

  const handleResume = () => {
    // Resume from saved position
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
    }
    setIsPaused(false);
  };

  return (
    <>
      <div ref={sectionRef} className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: 'auto' }}
        >
        {infiniteReels.map((reel, index) => {
          const isVisible = visibleReelIndex === index;
          const shouldShowVideo = isVisible; // Show video when this reel is in focus
          const shouldPreload = false; // Disable video preloading
          const videoId = reel.video.match(/shorts\/([a-zA-Z0-9_-]+)/)?.[1];

          return (
            <div
              key={`${reel.id}-${index}`}
              data-reel-index={index}
              className="group relative flex-shrink-0 aspect-[9/16] w-[calc(70%-0.5rem)] cursor-pointer rounded-xl bg-muted transition-all duration-300 hover:shadow-xl"
              onClick={() => {
                openPlayer(reels, index % reels.length); // Get actual reel index
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-black">
                {/* Always show thumbnail for instant display */}
                <Image
                  src={reel.thumbnail}
                  alt={reel.id}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    shouldShowVideo && videoId ? 'opacity-0' : 'opacity-100 group-hover:scale-110'
                  }`}
                  sizes="70vw"
                />

                {/* Show video on hover or when visible */}
                {shouldShowVideo && videoId && (
                  <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl">
                    <div className="absolute inset-0" style={{ transform: 'scale(1.2)' }}>
                      <iframe
                        key={`video-${index}`}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&color=white&autohide=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media"
                        style={{ border: 'none', pointerEvents: 'none', display: 'block' }}
                        title="Video preview"
                        loading="lazy"
                      />
                    </div>
                    {/* Overlay to hide YouTube branding */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)' }} />
                  </div>
                )}

                {/* Preload hidden iframes for smooth transitions */}
                {shouldPreload && !shouldShowVideo && videoId && (
                  <iframe
                    key={`preload-${index}`}
                    src={`https://www.youtube.com/embed/${videoId}?mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0`}
                    className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                    style={{ display: 'none' }}
                    title="Preload video"
                  />
                )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2 sm:p-3 space-y-1 sm:space-y-2">
                {/* Title */}
                {reel.title && (
                  <p className="text-sm font-semibold text-white drop-shadow-lg line-clamp-2">
                    {reel.title}
                  </p>
                )}
                {/* Author info */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={reel.avatar}
                      alt={reel.author}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white drop-shadow-lg">
                    {reel.author}
                  </span>
                </div>
              </div>
              {/* Play icon overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="rounded-full bg-white/90 p-3">
                  <PlayIcon className="h-6 w-6 text-black fill-black" />
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  </>
  );
};
