import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './BlogDetail.css';

const API_URL = '/api';
const API_BASE = '';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
    if (user) checkBookmark();
  }, [id, user]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_URL}/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const checkBookmark = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookmark`);
      const bookmarkedIds = res.data.map(b => b._id);
      setIsBookmarked(bookmarkedIds.includes(id));
    } catch (error) {
      console.error('Error checking bookmarks:', error);
    }
  };

  const handleLike = async () => {
    if (!token) return navigate('/auth');
    try {
      const res = await axios.post(`${API_URL}/blogs/${id}/like`);
      setBlog(prev => ({ ...prev, likes: res.data.likes }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleBookmark = async () => {
    if (!token) return navigate('/auth');
    try {
      await axios.post(`${API_URL}/bookmark`, { blogId: id });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !token) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/comments`, {
        blogId: id,
        text: commentText
      });
      setComments([res.data, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_URL}/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeleteBlog = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      navigate('/blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const isLiked = blog?.likes?.includes(user?._id);
  const isAuthor = blog?.author?._id === user?._id;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="spinner-wrapper">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="page-wrapper">
      <div className="container blog-detail-page">
        {/* Blog Header */}
        <div className="blog-detail-header fade-in-up">
          <Link to="/blogs" className="back-link">← Back to Blogs</Link>
          <span className="blog-detail-category">{blog.category}</span>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <div className="blog-author-info">
              <span className="author-avatar-lg">
                {blog.author?.name?.charAt(0).toUpperCase()}
              </span>
              <div>
                <span className="author-name-lg">{blog.author?.name}</span>
                <span className="blog-date">{formatDate(blog.createdAt)}</span>
              </div>
            </div>
            <div className="blog-detail-actions">
              <button
                className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
              >
                {isLiked ? '❤️' : '🤍'} {blog.likes?.length || 0}
              </button>
              <button
                className={`action-btn bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                {isBookmarked ? '🔖' : '📑'} {isBookmarked ? 'Saved' : 'Save'}
              </button>
              {blog.pdf && (
                <a
                  href={`${API_BASE}${blog.pdf}`}
                  className="action-btn download-btn"
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  📥 PDF
                </a>
              )}
              {isAuthor && (
                <button className="action-btn delete-btn" onClick={handleDeleteBlog}>
                  🗑️ Delete
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Image */}
        {blog.image && (
          <div className="blog-detail-image-wrapper fade-in-up">
            <img src={`${API_BASE}${blog.image}`} alt={blog.title} className="blog-detail-image" />
          </div>
        )}

        {/* Blog Content */}
        <div className="blog-detail-content fade-in-up">
          {blog.content.split('\n').map((paragraph, idx) => (
            paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
          ))}
        </div>

        {/* Comments Section */}
        <div className="comments-section fade-in-up">
          <h3 className="comments-title">
            💬 Comments ({comments.length})
          </h3>

          {token ? (
            <form onSubmit={handleAddComment} className="comment-form">
              <div className="comment-input-wrapper">
                <span className="comment-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
                <textarea
                  className="form-control comment-input"
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="text-end mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!commentText.trim() || submitting}
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="comment-login-prompt">
              <p><Link to="/auth">Sign in</Link> to join the conversation</p>
            </div>
          )}

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment._id} className="comment-item">
                <span className="comment-avatar">
                  {comment.userId?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <div className="comment-body">
                  <div className="comment-header">
                    <span className="comment-author">{comment.userId?.name || 'Unknown'}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  {user?._id === comment.userId?._id && (
                    <button
                      className="comment-delete"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
