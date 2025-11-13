"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useVideoPlayer } from "@/contexts/video-player-context";

// Declare YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const FullScreenVideoPlayer = () => {
  const { isPlayerOpen, currentReelIndex, reels, closePlayer, setCurrentReelIndex } = useVideoPlayer();
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  const playerContainerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const playersRef = React.useRef<{ [key: number]: any }>({});
  const [apiReady, setApiReady] = React.useState(false);

  // Handle mounting for client-side rendering
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Load YouTube IFrame API
  React.useEffect(() => {
    if (!mounted) return;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Set callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };
  }, [mounted]);

  // Calculate and update viewport height (handles mobile address bar)
  React.useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateHeight(); // Initial calculation
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  // Show tutorial on first open and scroll to current reel
  React.useEffect(() => {
    if (isPlayerOpen) {
      // Check localStorage if tutorial was already shown
      const tutorialShown = localStorage.getItem('reels-tutorial-shown');

      if (!tutorialShown) {
        setShowTutorial(true);
        const timer = setTimeout(() => {
          setShowTutorial(false);
          // Mark tutorial as shown in localStorage
          localStorage.setItem('reels-tutorial-shown', 'true');
        }, 3000);

        return () => clearTimeout(timer);
      }

      // Scroll to the selected reel immediately
      setTimeout(() => {
        if (playerContainerRef.current && viewportHeight > 0) {
          const container = playerContainerRef.current;
          const targetScroll = currentReelIndex * viewportHeight;
          container.scrollTop = targetScroll;
        }
      }, 100);
    }
  }, [isPlayerOpen, currentReelIndex, viewportHeight]);

  // Scroll to specific reel
  const scrollToReel = React.useCallback((index: number) => {
    if (playerContainerRef.current && viewportHeight > 0) {
      const container = playerContainerRef.current;
      const targetScroll = index * viewportHeight;
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [viewportHeight]);

  // Handle keyboard navigation in player
  React.useEffect(() => {
    if (!isPlayerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePlayer();
      } else if (e.key === "ArrowUp" && currentReelIndex > 0) {
        scrollToReel(currentReelIndex - 1);
      } else if (e.key === "ArrowDown" && currentReelIndex < reels.length - 1) {
        scrollToReel(currentReelIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlayerOpen, currentReelIndex, reels.length, closePlayer, scrollToReel]);

  // Update current index based on scroll position
  React.useEffect(() => {
    if (!isPlayerOpen || !playerContainerRef.current || viewportHeight === 0) return;

    const container = playerContainerRef.current;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const newIndex = Math.round(scrollTop / viewportHeight);
      if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < reels.length) {
        setCurrentReelIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isPlayerOpen, currentReelIndex, reels.length, viewportHeight, setCurrentReelIndex]);

  // Handle mute/unmute via YouTube API (without reloading iframe)
  React.useEffect(() => {
    if (!isPlayerOpen || !apiReady) return;

    // Use YouTube API to mute/unmute without reloading
    Object.keys(playersRef.current).forEach((key) => {
      const player = playersRef.current[parseInt(key)];
      if (player && player.mute && player.unMute) {
        if (isMuted) {
          player.mute();
        } else {
          player.unMute();
        }
      }
    });
  }, [isMuted, isPlayerOpen, apiReady]);

  if (!mounted || !isPlayerOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black animate-fadeIn"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {/* Close Button */}
      <button
        onClick={closePlayer}
        className="absolute top-4 left-4 z-[10000] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Sound Toggle Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-[10000] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </button>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div
          className="absolute inset-0 z-[10001] flex items-center justify-center bg-black/40 pointer-events-none"
          style={{ animation: 'fadeOut 0.5s ease-out 2.5s forwards' }}
        >
          <div className="flex flex-col items-center gap-4 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
            <p className="text-white text-lg font-semibold drop-shadow-lg">Scroll down for next</p>
          </div>
        </div>
      )}

      {/* Scrollable Video Container */}
      <div
        ref={playerContainerRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
          width: '100vw',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          margin: 0,
          padding: 0
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {reels.map((reel, index) => {
          const videoId = reel.video?.match(/shorts\/([a-zA-Z0-9_-]+)/)?.[1];

          return (
            <div
              key={index}
              style={{
                height: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
                minHeight: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
                maxHeight: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
                width: '100vw',
                scrollSnapAlign: 'start',
                position: 'relative',
                flexShrink: 0,
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Video iframe with YouTube API */}
              <div
                id={`player-${index}`}
                className="absolute inset-0 w-full h-full"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                ref={(el) => {
                  if (el && apiReady && window.YT && !playersRef.current[index]) {
                    const playerHeight = viewportHeight > 0 ? viewportHeight : window.innerHeight;
                    playersRef.current[index] = new window.YT.Player(`player-${index}`, {
                      height: playerHeight,
                      width: '100%',
                      videoId: videoId,
                      playerVars: {
                        autoplay: index === currentReelIndex ? 1 : 0,
                        mute: 1,
                        playsinline: 1,
                        enablejsapi: 1,
                        controls: 0,
                        disablekb: 1,
                        loop: 1,
                        playlist: videoId,
                        rel: 0,
                        modestbranding: 1,
                        iv_load_policy: 3,
                        fs: 0,
                        showinfo: 0,
                      },
                      events: {
                        onReady: (event: any) => {
                          if (index === currentReelIndex) {
                            event.target.mute();
                            event.target.playVideo();
                          }
                        },
                      },
                    });
                  }
                }}
              />

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-[10000] bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pb-8 pointer-events-none">
                <div className="space-y-2">
                  {reel.title && (
                    <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                      {reel.title}
                    </h3>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={reel.avatar}
                        alt={reel.author}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="text-white font-medium drop-shadow-lg">
                      {reel.author}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top gradient to hide any YouTube branding */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-[9999]" />
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
};
