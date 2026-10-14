import React, { useMemo } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { getUnifiedBlogPosts } from '../utils/mdxBlogLoader';
import './BlogListingPage.css';

export const BlogListingPage = ({ onNavigate }) => {
  const posts = useMemo(() => getUnifiedBlogPosts(), []);
  const featuredPost = posts[0];

  const handlePostClick = (e, slug) => {
    e.preventDefault();
    const target = `#/blog/${slug}`;
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="loom-blog-listing-page">
      {/* Header Banner */}
      <section className="loom-blog-listing-hero">
        <Container>
          <div className="loom-blog-listing-header">
            <span className="listing-eyebrow">THE LOOMSHINE JOURNAL &amp; GARMENT CARE ADVISORY</span>
            <h1 className="listing-title">Fabric Intelligence &amp; Care Guides</h1>
            <p className="listing-subtitle">
              Master dry cleaning insights, emergency fabric first-aid, and luxury textile preservation protocols curated by Gurugram&apos;s organic garment care specialists.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Grid */}
      <section className="loom-blog-listing-content">
        <Container>
          {posts.map((post, idx) => {
            const badgeText = post.episode ? `${post.episode.toUpperCase()}` : (idx === 0 ? 'LATEST ADVISORY' : 'EMERGENCY FIRST-AID');
            return (
              <div key={post.id} className="featured-post-card">
                <div className="featured-post-image-col">
                  <img
                    src={post.featuredImage || post.images?.hero?.src || post.images?.damageChecklist?.src}
                    alt={post.title}
                    className="featured-post-img"
                  />
                  <span className="featured-badge">
                    {badgeText}
                  </span>
                </div>
                <div className="featured-post-body-col">
                  <div className="post-meta-top">
                    <span className="post-cat-badge">{post.category}</span>
                    <span className="post-read-time">⏱ {post.readingTime}</span>
                  </div>
                  <h2 className="featured-post-title">
                    <a
                      href={`#/blog/${post.slug}`}
                      onClick={(e) => handlePostClick(e, post.slug)}
                    >
                      {post.title}
                    </a>
                  </h2>
                  <p className="featured-post-excerpt">
                    {post.metaDescription}
                  </p>
                  <div className="featured-post-footer">
                    <div className="author-brief">
                      <strong>By {post.author.name}</strong>
                      <span>{post.author.location}</span>
                    </div>
                    <Button
                      href={`#/blog/${post.slug}`}
                      variant="primary"
                      size="md"
                      onClick={(e) => handlePostClick(e, post.slug)}
                    >
                      Read Full Guide →
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Value Highlights */}
          <div className="blog-topics-grid">
            <div className="topic-card">
              <span className="topic-icon">🌿</span>
              <h3 className="topic-title">100% Organic Bio-Solvents</h3>
              <p className="topic-desc">
                Learn why PERC-free hydrocarbon dry cleaning protects delicate embroidery, zari, and delicate luxury wools without chemical odors.
              </p>
            </div>
            <div className="topic-card">
              <span className="topic-icon">⚡</span>
              <h3 className="topic-title">30-Min Doorstep Express Pickup</h3>
              <p className="topic-desc">
                Serving Golf Course Road, DLF Phase 1–5, Cyber City, and Sohna Road with rapid GPS-dispatched emergency stain valets.
              </p>
            </div>
            <div className="topic-card">
              <span className="topic-icon">💨</span>
              <h3 className="topic-title">German Steam Reshaping</h3>
              <p className="topic-desc">
                Discover how vacuum tensioning and calibrated steam table finishing restore jacket chest canvas and crisp lapel roll without shine marks.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BlogListingPage;
