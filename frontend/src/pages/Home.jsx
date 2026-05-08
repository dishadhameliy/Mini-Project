import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';
import './Home.css';

const API_URL = '/api';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      setBlogs(res.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Parallax */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className="container hero-content">
          <div className="hero-badge">🌟 Welcome to Knowledge Blog</div>
          <h1 className="hero-title">
            Explore. Learn.<br />
            <span className="hero-title-highlight">Share Knowledge.</span>
          </h1>
          <p className="hero-subtitle">
            A collaborative platform where curious minds come together to share insights,
            research, and ideas across every field of study.
          </p>
          <div className="hero-actions">
            <Link to="/blogs" className="btn btn-primary btn-lg hero-btn-primary">
              Explore Blogs →
            </Link>
            <Link to="/auth" className="btn btn-outline-light btn-lg hero-btn-secondary">
              Join Community
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-icon">📝</span>
              <span className="stat-label">Open Platform</span>
            </div>
            <div className="hero-stat">
              <span className="stat-icon">🎓</span>
              <span className="stat-label">9+ Disciplines</span>
            </div>
            <div className="hero-stat">
              <span className="stat-icon">💡</span>
              <span className="stat-label">Free Forever</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="latest-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">
              Fresh insights and discoveries from our community of writers
            </p>
          </div>

          {loading ? (
            <div className="spinner-wrapper">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="row g-4 stagger-children">
                {blogs.map(blog => (
                  <div key={blog._id} className="col-lg-4 col-md-6">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-5">
                <Link to="/blogs" className="btn btn-outline-primary btn-lg view-all-btn">
                  View All Blogs →
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state text-center">
              <div className="empty-icon">📭</div>
              <h4>No blogs yet</h4>
              <p>Be the first to share your knowledge!</p>
              <Link to="/upload" className="btn btn-primary">Write a Blog</Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why KnowledgeBlog?</h2>
            <p className="section-subtitle">Everything you need to share and discover knowledge</p>
          </div>
          <div className="row g-4 stagger-children">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon">✍️</div>
                <h5>Write & Publish</h5>
                <p>Create beautiful blog posts with image and PDF attachments. Share your research and insights easily.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon">🗂️</div>
                <h5>Organized Categories</h5>
                <p>Browse blogs across 40+ categories spanning sciences, humanities, engineering, and more.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h5>Engage & Connect</h5>
                <p>Like, comment, and bookmark your favorite articles. Build a personalized reading list.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
