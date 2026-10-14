import { BLOG_POSTS as STATIC_BLOG_POSTS } from '../data/blogPosts';

/**
 * Automatically imports all .mdx blog posts from /src/content/blogs/ using Vite's glob import
 */
const mdxModules = import.meta.glob('/src/content/blogs/*.mdx', { eager: true });

/**
 * Normalizes an MDX post entry from glob import
 */
function parseMdxPost(path, module) {
  const filename = path.split('/').pop().replace(/\.mdx$/, '');
  const frontmatter = module.frontmatter || {};
  const slug = frontmatter.slug || filename;

  return {
    id: frontmatter.id || slug,
    slug: slug,
    title: frontmatter.title || 'Untitled Advisory',
    seoTitle: frontmatter.seoTitle || frontmatter.title,
    metaDescription: frontmatter.metaDescription || frontmatter.excerpt || '',
    keywords: frontmatter.keywords || '',
    canonicalUrl: frontmatter.canonicalUrl || `https://loomshinedrycleaners.com/#/blog/${slug}`,
    publishedDate: frontmatter.publishedDate || '2026-10-14',
    modifiedDate: frontmatter.modifiedDate || frontmatter.publishedDate || '2026-10-14',
    episode: frontmatter.episode || null,
    readingTime: frontmatter.readingTime || '5 min read',
    category: frontmatter.category || 'Fabric Care',
    featuredImage: frontmatter.featuredImage || '/blog/pg-white-chaniya-choli-rescue/navratri-ep2-white-chaniya-choli-hero.jpg',
    author: frontmatter.author || {
      name: 'Loomshine Master Fabricators',
      role: 'Textile Care & Restoration Specialists',
      location: 'Central Arcade Market, MG Road, Gurugram'
    },
    promoCode: frontmatter.promoCode || 'FESTIVEFRESH',
    images: frontmatter.images || {
      hero: {
        src: frontmatter.featuredImage || '/blog/pg-white-chaniya-choli-rescue/navratri-ep2-white-chaniya-choli-hero.jpg',
        alt: frontmatter.title || 'Loomshine Garment Care'
      }
    },
    // The compiled MDX component
    Component: module.default,
    isMdx: true
  };
}

/**
 * Returns all MDX blog posts
 */
export function getAllMdxPosts() {
  return Object.entries(mdxModules).map(([path, module]) => parseMdxPost(path, module));
}

/**
 * Finds an MDX post by slug
 */
export function getMdxPostBySlug(slug) {
  if (!slug) return null;
  const posts = getAllMdxPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Merges MDX posts with legacy static blog posts, ensuring no duplicate slugs
 */
export function getUnifiedBlogPosts() {
  const mdxPosts = getAllMdxPosts();
  const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));

  // Add static posts that aren't already represented as MDX
  const filteredStatic = STATIC_BLOG_POSTS.filter((p) => !mdxSlugs.has(p.slug));

  const all = [...mdxPosts, ...filteredStatic];

  // Sort descending by publishedDate (newest first)
  return all.sort((a, b) => {
    const dateA = new Date(a.publishedDate || '2026-01-01').getTime();
    const dateB = new Date(b.publishedDate || '2026-01-01').getTime();
    return dateB - dateA;
  });
}

export default {
  getAllMdxPosts,
  getMdxPostBySlug,
  getUnifiedBlogPosts
};
