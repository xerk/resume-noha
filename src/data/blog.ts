import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { calculateReadingTime } from '@/lib/utils';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  readingTime?: number;
  category?: string;
  
};

function getMDXFiles(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const mdxFiles: string[] = [];

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.mdx');
      if (fs.existsSync(indexPath)) {
        mdxFiles.push(entry.name);
      }
    }
  });

  return mdxFiles;
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

function extractMetaExport(content: string): Partial<Metadata> {
  const metaMatch = content.match(/export const meta = ({[\s\S]*?})/);
  if (metaMatch) {
    try {
      // Remove export const meta = and evaluate the object
      const metaString = metaMatch[1];
      // Safe eval of the object literal
      const meta = new Function(`return ${metaString}`)();
      return {
        title: meta.title,
        publishedAt: meta.publishedAt,
        summary: meta.summary,
        author: meta.author,
      };
    } catch (e) {
      console.error("Error parsing meta export:", e);
      return {};
    }
  }
  return {};
}

export async function getPost(slug: string) {
  const filePath = path.join("content", slug, "index.mdx");
  let source = fs.readFileSync(filePath, "utf-8");
  
  // Get frontmatter metadata
  const { content: rawContent, data: frontmatterData } = matter(source);
  
  // Get exported meta object
  const exportedMeta = extractMetaExport(source);
  
  // Combine metadata, giving priority to frontmatter
  const metadata: Metadata = {
    title: frontmatterData.title || exportedMeta.title || '',
    publishedAt: frontmatterData.publishedAt || exportedMeta.publishedAt || '',
    summary: frontmatterData.summary || exportedMeta.summary || '',
    author: frontmatterData.author || exportedMeta.author || '',
    ...frontmatterData,
  };

  const content = await markdownToHTML(rawContent);
  
  console.log(metadata);
  
  const post = {
    metadata: {
      ...metadata,
      readingTime: calculateReadingTime(content),
    },
    source: content,
    slug,
  };

  return post;
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
