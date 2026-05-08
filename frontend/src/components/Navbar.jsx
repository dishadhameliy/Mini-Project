import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const categories = {
  'Natural Sciences': ['Biology', 'Chemistry', 'Physics', 'Earth Sciences', 'Astronomy'],
  'Formal Sciences': ['Mathematics', 'Logic', 'Statistics', 'Theoretical Computer Science'],
  'Medical & Health': ['Anatomy', 'Genetics', 'Immunology', 'Pharmacology', 'Neuroscience'],
  'Humanities': ['Literature', 'Philosophy', 'Religion', 'Art History', 'Linguistics'],
  'Social Sciences': ['Psychology', 'Sociology', 'Anthropology', 'Economics', 'Political Science', 'Geography'],
  'History': ['Prehistory', 'Ancient History', 'Medieval History', 'Modern History'],
  'Engineering & Tech': ['Civil Engineering', 'Mechanical Engineering', 'Artificial Intelligence', 'Cybersecurity', 'Robotics'],
  'Business & Law': ['Accounting', 'Finance', 'Management', 'Marketing', 'Jurisprudence'],
  'Applied Sciences': ['Agriculture', 'Architecture', 'Education', 'Environmental Studies']
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCategoryClick = (cat) => {
    navigate(`/blogs?category=${encodeURIComponent(cat)}`);
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top kb-navbar">
      <div className="container">
        <Link className="navbar-brand kb-brand" to="/">
          <span className="brand-icon">📚</span>
          <span className="brand-text">Knowledge<span className="brand-highlight">Blog</span></span>
        </Link>

        <button
          className="navbar-toggler kb-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
            </li>

            {/* Categories Mega Dropdown */}
            <li className="nav-item dropdown kb-mega-dropdown">
              <button
                className="nav-link kb-nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ background: 'none', border: 'none' }}
              >
                Categories
              </button>
              <div className="dropdown-menu kb-mega-menu">
                <div className="mega-menu-grid">
                  {Object.entries(categories).map(([group, items]) => (
                    <div key={group} className="mega-menu-column">
                      <h6 className="mega-menu-heading">{group}</h6>
                      {items.map(item => (
                        <button
                          key={item}
                          className="dropdown-item mega-menu-item"
                          onClick={() => handleCategoryClick(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link kb-nav-link" to="/upload" onClick={() => setIsOpen(false)}>
                  Upload
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link className="nav-link kb-nav-link" to="/saved" onClick={() => setIsOpen(false)}>
                  Saved
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/about" onClick={() => setIsOpen(false)}>About</Link>
            </li>

            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link kb-nav-link dropdown-toggle kb-user-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: 'none', border: 'none' }}
                >
                  <span className="user-avatar">{user.name?.charAt(0).toUpperCase()}</span>
                  <span className="user-name">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end kb-dropdown">
                  <li>
                    <Link className="dropdown-item kb-dropdown-item" to="/profile" onClick={() => setIsOpen(false)}>
                      👤 Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item kb-dropdown-item" to="/saved" onClick={() => setIsOpen(false)}>
                      🔖 Bookmarks
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" style={{ borderColor: 'var(--border-color)' }} /></li>
                  <li>
                    <button className="dropdown-item kb-dropdown-item logout-item" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary kb-login-btn" to="/auth" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
