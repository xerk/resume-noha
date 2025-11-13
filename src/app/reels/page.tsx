import { ReelsGrid } from "@/components/reels-grid";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "Reels",
  description: "My video reels and highlights",
};

export default function ReelsPage() {
  // Filter projects to get only reels
  const reels = DATA.projects
    .filter((project) => project.type && project.type === "reel")
    .map((project) => ({
      id: project.title,
      title: project.title,
      description: project.description,
      videoUrl: project.video?.url || "",
      thumbnail: project.video?.thumbnail || project.image || "",
      author: DATA.name,
    }));

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="reels">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="flex flex-col space-y-4">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </BlurFade>

            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none"
              yOffset={8}
              text="Reels"
            />

            <BlurFadeText
              delay={BLUR_FADE_DELAY * 3}
              className="text-muted-foreground md:text-lg max-w-2xl"
              text="Watch my video highlights and project demonstrations"
            />
          </div>

          {/* Reels Grid */}
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            {reels.length > 0 ? (
              <ReelsGrid reels={reels} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No reels available yet. Check back soon!
                </p>
              </div>
            )}
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
