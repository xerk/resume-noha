import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlurFade from "@/components/magicui/blur-fade";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="max-w-[650px] mx-auto px-6 py-12 relative">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      <BlurFade delay={0.1}>
        <div className="relative">
          {post.metadata.category && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-teal-500 
              bg-teal-500/10 rounded-full mb-4 animate-fade-in">
              {post.metadata.category}
            </span>
          )}

          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent 
            dark:bg-gradient-to-r dark:from-white dark:to-gray-500/80 leading-tight mb-4
            bg-gradient-to-r from-gray-800 to-gray-500/80
            animate-fade-in">
            {post.metadata.title}
          </h1>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img
                src={DATA.avatarUrl}
                alt={DATA.name}
                className="w-10 h-10 rounded-full border object-cover border-zinc-200 dark:border-zinc-800"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {DATA.name}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {DATA.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <Suspense fallback={<div className="h-5 w-32 bg-zinc-800 dark:bg-zinc-200 animate-pulse rounded" />}>
                <time className="font-mono" dateTime={post.metadata.publishedAt}>
                  {formatDate(post.metadata.publishedAt)}
                </time>
              </Suspense>
              
              {post.metadata.readingTime && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span>{post.metadata.readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <article className="prose dark:prose-invert max-w-none
          prose-headings:scroll-mt-20 prose-headings:font-semibold
          
          /* Links */
          prose-a:text-teal-600 dark:prose-a:text-teal-500
          prose-a:no-underline 
          hover:prose-a:text-teal-700 dark:hover:prose-a:text-teal-400
          
          /* Images */
          prose-img:rounded-xl 
          prose-img:shadow-md
          prose-img:border 
          prose-img:border-zinc-200 dark:prose-img:border-zinc-800
          
          /* Code blocks */
          prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900
          prose-pre:border prose-pre:border-zinc-800 dark:prose-pre:border-zinc-800
          prose-pre:shadow-sm
          prose-pre:rounded-xl
          [&_pre]:!p-4
          [&_pre]:overflow-x-auto
          [&_pre]:scrollbar-thin
          [&_pre]:scrollbar-track-zinc-800
          [&_pre]:scrollbar-thumb-zinc-700
          [&_pre]:scrollbar-thumb-rounded
          /* Code block line numbers */
          [&_.line-number]:border-r
          [&_.line-number]:border-zinc-800
          [&_.line-number]:pr-4
          [&_.line-number]:text-zinc-500
          
          /* Inline code */
          prose-code:text-zinc-800 dark:prose-code:text-zinc-200
          prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
          prose-code:text-sm
          prose-code:before:content-[''] prose-code:after:content-['']
          
          /* Blockquotes */
          prose-blockquote:border-l-teal-600 dark:prose-blockquote:border-l-teal-500
          prose-blockquote:bg-zinc-50/50 dark:prose-blockquote:bg-zinc-900/50
          prose-blockquote:px-4 prose-blockquote:py-1
          prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300
          
          /* Text elements */
          prose-p:text-zinc-700 dark:prose-p:text-zinc-300
          prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
          prose-strong:text-zinc-900 dark:prose-strong:text-zinc-200
          prose-ul:text-zinc-700 dark:prose-ul:text-zinc-300
          prose-li:text-zinc-700 dark:prose-li:text-zinc-300
          
          /* List markers */
          prose-li:marker:text-zinc-400 dark:prose-li:marker:text-zinc-600
          
          /* Tables */
          prose-table:border-zinc-200 dark:prose-table:border-zinc-800
          prose-th:text-zinc-900 dark:prose-th:text-zinc-100
          prose-td:text-zinc-700 dark:prose-td:text-zinc-300
          
          /* Horizontal rules */
          prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800
          
          relative">
          <div className="relative" dangerouslySetInnerHTML={{ __html: post.source }} />
        </article>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <a href="/blog" 
            className="group inline-flex items-center text-sm text-zinc-400 hover:text-teal-400 
              transition-colors duration-200">
            <svg 
              className="mr-2 w-4 h-4 transition-transform duration-200 
                transform group-hover:-translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to blog
          </a>
        </div>
      </BlurFade>
    </section>
  );
}
