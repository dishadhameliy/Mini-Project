import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="container about-page">
        {/* About Hero */}
        <div className="about-hero fade-in-up">
          <div className="about-hero-badge">About Us</div>
          <h1 className="about-title">
            Empowering Knowledge<br />
            <span className="title-highlight">One Blog at a Time</span>
          </h1>
          <p className="about-intro">
            KnowledgeBlog is a free, open platform designed for learners, educators, 
            researchers, and anyone passionate about sharing knowledge. We believe that 
            everyone has something valuable to teach and something exciting to learn.
          </p>
        </div>

        {/* Mission */}
        <div className="about-section fade-in-up">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 className="about-section-title">Our Mission</h2>
              <p className="about-text">
                We aim to democratize knowledge sharing by providing a simple, beautiful, 
                and accessible platform where ideas flow freely across disciplines. Whether 
                you're studying biology, exploring philosophy, or innovating in AI — 
                KnowledgeBlog is your space to share and discover.
              </p>
              <p className="about-text">
                Our platform spans 40+ categories across 9 major disciplines, from Natural 
                Sciences to Business & Law, ensuring that every field of human knowledge 
                has a home here.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="about-stats-grid">
                <div className="about-stat-card">
                  <span className="about-stat-icon">🌍</span>
                  <span className="about-stat-number">9+</span>
                  <span className="about-stat-label">Disciplines</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-icon">📂</span>
                  <span className="about-stat-number">40+</span>
                  <span className="about-stat-label">Categories</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-icon">✍️</span>
                  <span className="about-stat-number">∞</span>
                  <span className="about-stat-label">Possibilities</span>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-icon">💰</span>
                  <span className="about-stat-number">$0</span>
                  <span className="about-stat-label">Always Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="about-section fade-in-up">
          <h2 className="about-section-title text-center">What You Can Do</h2>
          <div className="row g-4 mt-2">
            <div className="col-md-4">
              <div className="about-feature">
                <div className="about-feature-icon">📝</div>
                <h5>Write Blogs</h5>
                <p>Create and publish articles with rich content, images, and PDF attachments.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feature">
                <div className="about-feature-icon">🔍</div>
                <h5>Search & Filter</h5>
                <p>Easily find articles by searching keywords or filtering by specific categories.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feature">
                <div className="about-feature-icon">❤️</div>
                <h5>Like & Comment</h5>
                <p>Engage with content by liking articles and joining discussions in the comments.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feature">
                <div className="about-feature-icon">🔖</div>
                <h5>Bookmark</h5>
                <p>Save your favorite articles to read later from your personal reading list.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feature">
                <div className="about-feature-icon">📥</div>
                <h5>Download PDFs</h5>
                <p>Access and download attached research papers, notes, and study materials.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feature">
                <div className="about-feature-icon">👤</div>
                <h5>Profile & Dashboard</h5>
                <p>Manage your articles, track your contributions, and view your bookmarks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta fade-in-up">
          <h2>Ready to start sharing?</h2>
          <p>Join KnowledgeBlog today and become part of a growing community of knowledge enthusiasts.</p>
          <div className="about-cta-actions">
            <Link to="/auth" className="btn btn-primary btn-lg">Get Started →</Link>
            <Link to="/blogs" className="btn btn-outline-primary btn-lg">Browse Blogs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
