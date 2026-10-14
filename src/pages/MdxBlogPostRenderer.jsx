import React, { useState } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import mdxComponents from '../components/blog/MdxComponents';
import './BlogPostPage.css';
import '../components/blog/MdxComponents.css';

export const MdxBlogPostRenderer = ({ post }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`${post.title} — Loomshine Luxury Garment Care Gurugram`);
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard?.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const emergencyWhatsAppUrl = `https://wa.me/919205366606?text=${encodeURIComponent(
    `Hi Loomshine Gurugram, I am reading "${post.title}" and need an urgent doorstep pickup.`
  )}`;

  const PostContent = post.Component;

  return (
    <article className="loom-blog-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* Schema.org Meta */}
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="datePublished" content={post.publishedDate} />
      <meta itemProp="dateModified" content={post.modifiedDate || post.publishedDate} />
      <meta itemProp="image" content={post.featuredImage || ''} />
      <meta itemProp="inLanguage" content="en-IN" />
      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
        <meta itemProp="name" content="Loomshine Dry Cleaning & Laundry" />
        <meta itemProp="url" content="https://loomshinedrycleaners.com/" />
        <link itemProp="logo" href="https://loomshinedrycleaners.com/logoloom.png" />
      </div>

      {/* Hero Header */}
      <header className="loom-blog-hero">
        <Container>
          <nav className="loom-blog-breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="#home" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="breadcrumb-separator">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="#/blog" itemProp="item"><span itemProp="name">Garment Care Guides</span></a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="breadcrumb-separator">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                <span itemProp="name">{post.category || 'Advisory'}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="loom-blog-hero__badge">
            <span className="badge-tag">{post.category ? post.category.toUpperCase() : 'GARMENT INTELLIGENCE'}</span>
            <span className="badge-geo">GURUGRAM VALET ADVISORY</span>
          </div>

          <h1 className="loom-blog-hero__title" itemProp="name">
            {post.title}
          </h1>

          {post.metaDescription && (
            <p className="loom-blog-hero__subtitle" itemProp="description">
              {post.metaDescription}
            </p>
          )}

          <div className="loom-blog-hero__meta" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="meta-author-avatar">
              <span>LS</span>
            </div>
            <div className="meta-author-info">
              <span className="meta-author-name" itemProp="name">{post.author?.name || 'Loomshine Specialists'}</span>
              <span className="meta-author-sub">{post.author?.location || 'Central Arcade Market, MG Road, Gurugram'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-pill">
              <span className="meta-icon">⏱</span>
              <span>{post.readingTime || '4 min read'}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">📍</span>
              <span>30-Min Doorstep Valet</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Layout Container */}
      <div className="loom-blog-body-wrapper">
        <Container>
          <div className="loom-blog-layout">
            {/* Main MDX Content */}
            <main className="loom-blog-content loom-mdx-content" itemProp="articleBody">
              {PostContent ? (
                <PostContent components={mdxComponents} />
              ) : (
                <p>Post content could not be loaded.</p>
              )}

              {/* Social Share Bar */}
              <div className="loom-blog-share" style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
                <span className="share-label" style={{ fontWeight: 600, color: '#071A33', marginRight: '1rem' }}>
                  Share this care protocol:
                </span>
                <div style={{ display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="share-btn share-btn--whatsapp"
                    onClick={() => handleShare('whatsapp')}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: '4px', border: '1px solid #25D366', background: '#F0FDF4', color: '#166534', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    💬 WhatsApp
                  </button>
                  <button
                    type="button"
                    className="share-btn share-btn--twitter"
                    onClick={() => handleShare('twitter')}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#071A33', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    𝕏 Share
                  </button>
                  <button
                    type="button"
                    className="share-btn share-btn--copy"
                    onClick={() => handleShare('copy')}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#071A33', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    {copiedLink ? '✓ Copied!' : '🔗 Copy Link'}
                  </button>
                </div>
              </div>
            </main>

            {/* Sticky Sidebar */}
            <aside className="loom-blog-sidebar">
              {/* Quick Valet Dispatch Widget */}
              <div className="sidebar-card sidebar-card--action">
                <span className="sidebar-card__tag">30-MIN VALET PICKUP</span>
                <h4 className="sidebar-card__title">Stains Won&apos;t Wait</h4>
                <p className="sidebar-card__desc">
                  Have an emergency wine spill, delicate lehenga, or washed wool blazer in Gurugram? Our valet arrives in 30 minutes.
                </p>
                <Button
                  href="#book-pickup"
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Book Instant Pickup
                </Button>
                <a
                  href="tel:+919205366606"
                  className="sidebar-call-link"
                >
                  📞 Call +91 9205366606
                </a>
              </div>

              {/* Studio Info Card */}
              <div className="sidebar-card sidebar-card--studio">
                <h4 className="sidebar-card__title">Loomshine Studio</h4>
                <p className="studio-address">
                  <strong>Shop No. 262, First Floor</strong><br />
                  Central Arcade Market, MG Road<br />
                  Gurugram, Haryana 122002
                </p>
                <p className="studio-hours">
                  Open 7 Days: 9:00 AM – 8:00 PM
                </p>
                <a
                  href="https://maps.google.com/maps?q=Central%20Arcade%20Market%2C%20MG%20Road%2C%20Gurugram%2C%20Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-map-btn"
                >
                  Get Studio Directions ↗
                </a>
              </div>

              {/* Related Services Links */}
              <div className="sidebar-card">
                <h4 className="sidebar-card__title">Related Garment Care</h4>
                <ul className="sidebar-services-list">
                  <li><a href="#/services/dry-cleaning">Organic Dry Cleaning →</a></li>
                  <li><a href="#/services/steam-pressing">Vacuum Steam Pressing →</a></li>
                  <li><a href="#/services/shoe-and-leather">Shoe &amp; Leather Bag Care →</a></li>
                  <li><a href="#/pricing">View Itemized Rate Card →</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </article>
  );
};

export default MdxBlogPostRenderer;
