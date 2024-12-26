'use client'

import { Button } from "@/components/ui/button"
import { PlayIcon, PauseIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import BlurFade from "@/components/magicui/blur-fade";
const BLUR_FADE_DELAY = 0.04;

export function AudioPlayerButton() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio only on client side
    const audioElement = new Audio('/audios/noho-welcome.mp4');
    audioElement.addEventListener('ended', () => setIsPlaying(false));
    setAudio(audioElement);

    return () => {
      audioElement.removeEventListener('ended', () => setIsPlaying(false));
      audioElement.pause();
    };
  }, []);

  const handleTogglePlay = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  }

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 2}>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 sm:h-12 sm:w-12 xl:h-14 xl:w-14 relative group"
            onClick={handleTogglePlay}
          >
            {isPlaying ? (
              <PauseIcon className="h-4 w-4 sm:h-6 sm:w-6 xl:h-8 xl:w-8 relative z-10 animate-pulse text-primary" />
            ) : (
              <PlayIcon className="h-4 w-4 sm:h-6 sm:w-6 xl:h-8 xl:w-8 relative z-10 animate-pulse text-primary" />
            )}
            <span className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-emerald-500/30 dark:bg-emerald-400/30 group-hover:bg-emerald-500/40 dark:group-hover:bg-emerald-400/40 animate-heartbeat blur-sm" />
            <span className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20 group-hover:bg-emerald-500/30 dark:group-hover:bg-emerald-400/30 animate-heartbeat" />
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          className="animate-float backdrop-blur-sm bg-background/80 border-2 border-emerald-500/20 dark:border-emerald-400/20"
          sideOffset={5}
        >
          <span className="relative">
            <span className="absolute inset-0 blur-sm bg-gradient-to-r from-emerald-500/30 to-primary/30 dark:from-emerald-400/30 dark:to-primary/30 animate-pulse" />
            <span className="relative text-lg sm:text-xl xl:text-2xl font-bold bg-gradient-to-r from-emerald-500 to-primary dark:from-emerald-400 dark:to-primary bg-clip-text text-transparent">
              {isPlaying ? 'Pause' : 'Play me please'}
            </span>
          </span>
        </TooltipContent>
      </Tooltip>
    </BlurFade>
  )
} 