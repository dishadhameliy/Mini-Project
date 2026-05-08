import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="kb-footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <span className="brand-icon">📚</span>
              <span className="brand-text">Knowledge<span className="brand-highlight">Blog</span></span>
            </div>
            <p className="footer-desc">
              A collaborative blogging platform for learners and educators. Share knowledge, 
              discover insights, and grow together across every field of study.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Popular Categories</h6>
            <ul className="footer-links">
              <li><Link to="/blogs?category=Artificial Intelligence">Artificial Intelligence</Link></li>
              <li><Link to="/blogs?category=Mathematics">Mathematics</Link></li>
              <li><Link to="/blogs?category=Physics">Physics</Link></li>
              <li><Link to="/blogs?category=Psychology">Psychology</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Stay Connected</h6>
            <p className="footer-contact-text">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <p className="footer-email">📧 contact@knowledgeblog.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} KnowledgeBlog. All rights reserved.</p>
          <p className="footer-tagline">Built with ❤️ for learners everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
