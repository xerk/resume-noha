import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export function calculateReadingTime(content: string): number {
  // Strip HTML tags and MDX syntax
  const cleanText = content.replace(/<[^>]*>|```[\s\S]*?```|`[^`]*`|\[.*?\]|\(.*?\)/g, '');
  
  // Count words
  const words = cleanText.trim().split(/\s+/).length;
  
  // Average reading speed (words per minute)
  const WPM = 225;
  
  // Additional time for code blocks
  const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
  const codeBlockTime = codeBlocks * 1; // Add 1 minute per code block
  
  // Calculate base reading time
  const baseTime = Math.ceil(words / WPM);
  
  // Total reading time including code blocks
  const totalTime = baseTime + codeBlockTime;
  
  // Return minimum of 1 minute
  return Math.max(1, totalTime);
}
