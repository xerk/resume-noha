import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section className="max-w-[1000px] mx-auto px-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="relative overflow-hidden rounded-lg mb-16">
          {/* Dot Pattern Background */}
          <div className="absolute inset-0 z-0">
            <DotPattern
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,black,transparent)]",
                "dark:[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                "fill-zinc-900 dark:fill-white"
              )}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/90 to-zinc-100/70 
            dark:from-zinc-900/90 dark:to-zinc-900/70 z-10" />

          {/* Content */}
          <div className="relative z-20 px-8 py-12">
            <h1 className="text-4xl font-bold mb-3 tracking-tight bg-clip-text text-transparent 
              bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800
              dark:from-white dark:via-white dark:to-white/70">
              Writing on software design
            </h1>
            <p className="text-zinc-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
              All of my long-form thoughts on programming, leadership, and product design.
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="relative md:border-l md:border-zinc-200/40 dark:md:border-zinc-700/40 md:pl-6 
        before:absolute before:left-0 before:top-0 before:h-full before:w-px 
        before:bg-gradient-to-b before:from-teal-500 before:via-zinc-200/40 before:to-zinc-200/40 
        dark:before:via-zinc-700/40 dark:before:to-zinc-700/40 
        before:hidden md:before:block">
        <div className="flex max-w-3xl flex-col space-y-16">
          {sortedPosts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY + id * 0.05} key={post.slug}>
              <article className="md:grid md:grid-cols-4 md:items-baseline group">
                <div className="md:col-span-3 relative flex flex-col items-start">
                  {/* Enhanced Hover Background Effect */}
                  <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 
                    bg-gradient-to-br from-zinc-100/50 to-zinc-100/30
                    dark:from-zinc-800/50 dark:to-zinc-800/30
                    opacity-0 transition-all duration-300 ease-out
                    group-hover:scale-100 group-hover:opacity-100 
                    sm:-inset-x-6 sm:rounded-2xl
                    backdrop-blur-sm" />
                  
                  {/* Title with Enhanced Hover */}
                  <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    <Link href={`/blog/${post.slug}`} className="group/link">
                      <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 
                        sm:rounded-2xl" />
                      <span className="relative z-10 inline-flex items-center gap-2
                        transition-transform duration-300 ease-out group-hover/link:translate-x-2">
                        {post.metadata.title}
                        <svg className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300
                          group-hover/link:opacity-100 group-hover/link:translate-x-0"
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </h2>

                  {/* Mobile Date with Enhanced Design */}
                  <time 
                    className="md:hidden relative z-10 order-first mb-3 flex items-center 
                      text-sm text-zinc-500 pl-3.5 font-mono" 
                    dateTime={post.metadata.publishedAt}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center" 
                      aria-hidden="true">
                      <span className="h-4 w-0.5 rounded-full bg-gradient-to-b 
                        from-teal-500 to-zinc-300 dark:to-zinc-500" />
                    </span>
                    {post.metadata.publishedAt}
                  </time>

                  {/* Enhanced Summary */}
                  {post.metadata.summary && (
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 
                      leading-relaxed transition-colors duration-300 
                      group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                      {post.metadata.summary}
                    </p>
                  )}

                  {/* Enhanced Read Article Link */}
                  <div 
                    aria-hidden="true" 
                    className="relative z-10 mt-4 flex items-center text-sm font-medium 
                      text-teal-600 dark:text-teal-500 transition-all duration-300
                      group-hover:text-teal-700 dark:group-hover:text-teal-400"
                  >
                    <span className="relative overflow-hidden inline-flex items-center gap-1">
                      <span className="transition-transform duration-300 group-hover:-translate-y-5">
                        Read article
                      </span>
                      <span className="absolute transition-transform duration-300 translate-y-8 
                        group-hover:translate-y-3">
                        Read more →
                      </span>
                    </span>
                  </div>
                </div>

                {/* Enhanced Desktop Date */}
                <time 
                  className="mt-1 hidden md:block relative z-10 order-first mb-3 
                    flex items-center text-sm text-zinc-500 font-mono
                    transition-colors duration-300 group-hover:text-zinc-700 
                    dark:group-hover:text-zinc-400" 
                  dateTime={post.metadata.publishedAt}
                >
                  {post.metadata.publishedAt}
                </time>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
