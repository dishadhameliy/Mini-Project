import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import './Profile.css';

const API_URL = '/api';

const Profile = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('myBlogs');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [blogsRes, bookmarksRes] = await Promise.all([
        axios.get(`${API_URL}/blogs`),
        axios.get(`${API_URL}/bookmark`)
      ]);
      const userBlogs = blogsRes.data.filter(blog => blog.author?._id === user?._id);
      setMyBlogs(userBlogs);
      setBookmarkedBlogs(bookmarksRes.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <div className="container profile-page">
        {/* Profile Header */}
        <div className="profile-header fade-in-up">
          <div className="profile-avatar-large">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-number">{myBlogs.length}</span>
                <span className="stat-text">Blogs</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">{bookmarkedBlogs.length}</span>
                <span className="stat-text">Bookmarks</span>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-primary logout-btn-profile" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="profile-tabs fade-in-up">
          <button
            className={`profile-tab ${activeTab === 'myBlogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('myBlogs')}
          >
            📝 My Blogs ({myBlogs.length})
          </button>
          <button
            className={`profile-tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            🔖 Bookmarks ({bookmarkedBlogs.length})
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="profile-content">
            {activeTab === 'myBlogs' ? (
              myBlogs.length > 0 ? (
                <div className="row g-4 stagger-children">
                  {myBlogs.map(blog => (
                    <div key={blog._id} className="col-lg-4 col-md-6">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state text-center">
                  <div className="empty-icon">📝</div>
                  <h4>No blogs yet</h4>
                  <p>Start sharing your knowledge!</p>
                  <Link to="/upload" className="btn btn-primary">Write Your First Blog</Link>
                </div>
              )
            ) : (
              bookmarkedBlogs.length > 0 ? (
                <div className="row g-4 stagger-children">
                  {bookmarkedBlogs.map(blog => (
                    <div key={blog._id} className="col-lg-4 col-md-6">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state text-center">
                  <div className="empty-icon">🔖</div>
                  <h4>No bookmarks</h4>
                  <p>Save articles you love for later!</p>
                  <Link to="/blogs" className="btn btn-primary">Explore Blogs</Link>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
