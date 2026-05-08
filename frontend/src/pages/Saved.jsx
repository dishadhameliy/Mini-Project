import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import './Saved.css';

const API_URL = '/api';

const Saved = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    fetchBookmarks();
  }, [token]);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookmark`);
      setBookmarks(res.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container saved-page">
        <div className="saved-header">
          <h1 className="section-title">🔖 Saved Articles</h1>
          <p className="section-subtitle">Your personal reading list</p>
        </div>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : bookmarks.length > 0 ? (
          <div className="row g-4 stagger-children">
            {bookmarks.map(blog => (
              <div key={blog._id} className="col-lg-4 col-md-6">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state text-center">
            <div className="empty-icon">🔖</div>
            <h4>No saved articles</h4>
            <p>Browse blogs and bookmark the ones you love!</p>
            <Link to="/blogs" className="btn btn-primary">Explore Blogs</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
