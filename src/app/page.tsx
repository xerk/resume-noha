"use client";

import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PlayIcon, ChevronRight } from "lucide-react";
import { DownloadButton } from "@/components/magicui/download-button";
import { AudioPlayerButton } from "@/components/audio-player-button";
import { AutoScrollReels } from "@/components/auto-scroll-reels";
import { useVideoPlayer } from "@/contexts/video-player-context";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const { openPlayer } = useVideoPlayer();

  // Filter reels from projects to show as stories on homepage
  const reelPreviews = DATA.projects
    .filter((project) => project.type && project.type === "reel")
    .map((project) => ({
      id: project.title,
      title: project.title,
      author: DATA.name,
      avatar: DATA.avatarUrl,
      fallback: DATA.initials,
      thumbnail: project.video?.thumbnail || project.image || "",
      video: project.video?.url || "",
    }));

  // Handle avatar click to open random reel
  const handleAvatarClick = () => {
    if (reelPreviews.length > 0) {
      const randomIndex = Math.floor(Math.random() * reelPreviews.length);
      openPlayer(reelPreviews, randomIndex);
    }
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                />
               <AudioPlayerButton />
              </div>
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div
                onClick={handleAvatarClick}
                className="relative cursor-pointer group"
              >
                {/* Story-style gradient ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px] animate-pulse group-hover:animate-none">
                  <div className="w-full h-full rounded-full bg-background" />
                </div>
                {/* Avatar */}
                <Avatar className="size-28 border-4 border-background relative z-10">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
                {/* Play icon overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="rounded-full bg-black/50 p-2">
                    <PlayIcon className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>

        {DATA.resumeUrl && <div className="flex justify-center pt-4">
          <BlurFade delay={BLUR_FADE_DELAY * 6 + DATA.work.length * 0.05}>
            <DownloadButton href={DATA.resumeUrl} blank={true}>
              Download Resume
            </DownloadButton>
          </BlurFade>
        </div>}

      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Test YouTube Embed for Mobile */}
          <BlurFade delay={BLUR_FADE_DELAY * 11.3}>
            <div className="max-w-[800px] mx-auto space-y-4 px-6">
              <h3 className="text-lg font-semibold text-center">Mobile Video Test</h3>
              <div className="relative w-full aspect-[9/16] max-w-[300px] mx-auto bg-black rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/zQ746TFTk40?autoplay=1&mute=1&controls=1&loop=1&playlist=zQ746TFTk40&playsinline=1"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  style={{ border: 'none', display: 'block' }}
                  title="Test Video"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                If this video doesn&apos;t autoplay on mobile, it&apos;s a YouTube/browser limitation
              </p>
            </div>
          </BlurFade>

          {/* Reels Preview Section - Show all reels with auto-scroll */}
          {reelPreviews.length > 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
              <div className="max-w-[800px] mx-auto space-y-4 px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Reels</h3>
                  <Link
                    href="/reels"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <AutoScrollReels reels={reelPreviews} />
              </div>
            </BlurFade>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.filter(project => project.active && ((project as any).type === undefined || (project as any).type === "project")).map((project, id) => (
              <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project?.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video?.url}
                    links={project.links}
                  />
                </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {DATA.hackathons.length > 0 && (
        <section id="hackathons">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          {/* <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade> */}
        </div>
        </section>
      )}
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
              {DATA.resumeUrl && <div className="pt-4">
                <DownloadButton href={DATA.resumeUrl} blank={true}>
                  Download Resume
                </DownloadButton>
              </div>}
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
