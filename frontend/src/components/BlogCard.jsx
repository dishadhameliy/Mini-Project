import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const API_BASE = '';

const BlogCard = ({ blog }) => {
  const imageUrl = blog.image ? `${API_BASE}${blog.image}` : null;

  const getExcerpt = (content, maxLen = 120) => {
    if (!content) return '';
    return content.length > maxLen ? content.substring(0, maxLen) + '...' : content;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="blog-card-wrapper">
      <Link to={`/blogs/${blog._id}`} className="blog-card-link">
        <div className="blog-card">
          <div className="blog-card-image-wrapper">
            {imageUrl ? (
              <img src={imageUrl} alt={blog.title} className="blog-card-image" />
            ) : (
              <div className="blog-card-image-placeholder">
                <span>📝</span>
              </div>
            )}
            <div className="blog-card-category-badge">{blog.category}</div>
          </div>

          <div className="blog-card-body">
            <h5 className="blog-card-title">{blog.title}</h5>
            <p className="blog-card-excerpt">{getExcerpt(blog.content)}</p>

            <div className="blog-card-footer">
              <div className="blog-card-author">
                <span className="author-avatar">
                  {blog.author?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="author-name">{blog.author?.name || 'Unknown'}</span>
              </div>
              <div className="blog-card-meta">
                <span className="meta-likes">❤️ {blog.likes?.length || 0}</span>
                <span className="meta-date">{formatDate(blog.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
