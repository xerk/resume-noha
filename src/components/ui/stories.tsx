"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

// Stories Context
interface StoriesContextValue {
  currentStory: number;
  setCurrentStory: (index: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const StoriesContext = React.createContext<StoriesContextValue | undefined>(
  undefined
);

const useStories = () => {
  const context = React.useContext(StoriesContext);
  if (!context) {
    throw new Error("useStories must be used within Stories");
  }
  return context;
};

// Stories Root Component
interface StoriesProps {
  children: React.ReactNode;
  className?: string;
}

export const Stories = ({ children, className }: StoriesProps) => {
  const [currentStory, setCurrentStory] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  return (
    <StoriesContext.Provider
      value={{
        currentStory,
        setCurrentStory,
        isOpen,
        setIsOpen,
        isMuted,
        setIsMuted,
      }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </StoriesContext.Provider>
  );
};

// Stories Content (Horizontal Scroll Container)
interface StoriesContentProps {
  children: React.ReactNode;
  className?: string;
}

export const StoriesContent = ({ children, className }: StoriesContentProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
        className
      )}
    >
      {children}
    </div>
  );
};

// Individual Story Component
interface StoryProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const Story = ({ children, className, index = 0 }: StoryProps) => {
  const { setCurrentStory, setIsOpen } = useStories();

  const handleClick = () => {
    setCurrentStory(index);
    setIsOpen(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        "relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-muted",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Story Video Component
interface StoryVideoProps {
  src: string;
  className?: string;
}

export const StoryVideo = ({ src, className }: StoryVideoProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      src={src}
      className={cn("h-full w-full object-cover", className)}
      muted
      playsInline
      loop
      autoPlay
    />
  );
};

// Story Overlay
interface StoryOverlayProps {
  className?: string;
}

export const StoryOverlay = ({ className }: StoryOverlayProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
        className
      )}
    />
  );
};

// Story Author Section
interface StoryAuthorProps {
  children: React.ReactNode;
  className?: string;
}

export const StoryAuthor = ({ children, className }: StoryAuthorProps) => {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-3",
        className
      )}
    >
      {children}
    </div>
  );
};

// Story Author Image
interface StoryAuthorImageProps {
  src: string;
  fallback: string;
  name: string;
  className?: string;
}

export const StoryAuthorImage = ({
  src,
  fallback,
  name,
  className,
}: StoryAuthorImageProps) => {
  return (
    <Avatar className={cn("h-8 w-8 border-2 border-white", className)}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

// Story Author Name
interface StoryAuthorNameProps {
  children: React.ReactNode;
  className?: string;
}

export const StoryAuthorName = ({
  children,
  className,
}: StoryAuthorNameProps) => {
  return (
    <span
      className={cn("text-sm font-medium text-white drop-shadow-lg", className)}
    >
      {children}
    </span>
  );
};

// Full Screen Story Viewer
interface StoriesViewerProps {
  stories: Array<{
    id: number | string;
    author: string;
    avatar: string;
    fallback: string;
    video: string;
  }>;
}

export const StoriesViewer = ({ stories }: StoriesViewerProps) => {
  const { currentStory, setCurrentStory, isOpen, setIsOpen, isMuted, setIsMuted } =
    useStories();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowLeft" && currentStory > 0) {
        setCurrentStory(currentStory - 1);
      } else if (e.key === "ArrowRight" && currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStory, stories.length, setCurrentStory, setIsOpen]);

  // Handle touch gestures for mobile
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe up - next story
      if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
      }
    }
    if (touchStart - touchEnd < -50) {
      // Swipe down - previous story
      if (currentStory > 0) {
        setCurrentStory(currentStory - 1);
      }
    }
  };

  // Auto-play video when story changes
  React.useEffect(() => {
    if (videoRef.current && isOpen) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [currentStory, isOpen]);

  if (!isOpen) return null;

  const story = stories[currentStory];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative h-full w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 left-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>

          {/* Progress indicators */}
          <div className="absolute top-16 left-0 right-0 z-20 flex gap-1 px-4">
            {stories.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-all",
                  index === currentStory
                    ? "bg-white"
                    : index < currentStory
                    ? "bg-white/70"
                    : "bg-white/30"
                )}
              />
            ))}
          </div>

          {/* Video */}
          <video
            ref={videoRef}
            src={story.video}
            className="h-full w-full object-contain"
            muted={isMuted}
            playsInline
            loop
            autoPlay
          />

          {/* Author info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={story.avatar} alt={story.author} />
                <AvatarFallback>{story.fallback}</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">{story.author}</span>
            </div>
          </div>

          {/* Navigation hints */}
          <div className="absolute inset-y-0 left-0 w-1/3" onClick={() => currentStory > 0 && setCurrentStory(currentStory - 1)} />
          <div className="absolute inset-y-0 right-0 w-1/3" onClick={() => currentStory < stories.length - 1 && setCurrentStory(currentStory + 1)} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
