import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="page-wrapper">
      <div className="auth-page">
        <div className="auth-container fade-in-up">
          {/* Left decoration panel */}
          <div className="auth-decoration">
            <div className="auth-deco-content">
              <span className="auth-deco-icon">📚</span>
              <h2>Welcome to KnowledgeBlog</h2>
              <p>Join a thriving community of learners and educators sharing insights across every field of study.</p>
              <div className="auth-deco-features">
                <div className="deco-feature">✍️ Write & Publish Articles</div>
                <div className="deco-feature">💬 Engage with Community</div>
                <div className="deco-feature">🔖 Bookmark Favorites</div>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="auth-form-panel">
            <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="auth-subtitle">
              {isLogin ? 'Sign in to continue your journey' : 'Start sharing your knowledge today'}
            </p>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label auth-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label auth-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label auth-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <p className="auth-toggle-text">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button className="auth-toggle-btn" onClick={toggleMode}>
                {isLogin ? ' Sign Up' : ' Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
