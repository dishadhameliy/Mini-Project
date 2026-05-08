import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Upload.css';

const API_URL = '/api';

const allCategories = [
  'Biology', 'Chemistry', 'Physics', 'Earth Sciences', 'Astronomy',
  'Mathematics', 'Logic', 'Statistics', 'Theoretical Computer Science',
  'Anatomy', 'Genetics', 'Immunology', 'Pharmacology', 'Neuroscience',
  'Literature', 'Philosophy', 'Religion', 'Art History', 'Linguistics',
  'Psychology', 'Sociology', 'Anthropology', 'Economics', 'Political Science', 'Geography',
  'Prehistory', 'Ancient History', 'Medieval History', 'Modern History',
  'Civil Engineering', 'Mechanical Engineering', 'Artificial Intelligence', 'Cybersecurity', 'Robotics',
  'Accounting', 'Finance', 'Management', 'Marketing', 'Jurisprudence',
  'Agriculture', 'Architecture', 'Education', 'Environmental Studies'
];

const Upload = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!token) {
    navigate('/auth');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) setPdf(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.content || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (image) data.append('image', image);
      if (pdf) data.append('pdf', pdf);

      await axios.post(`${API_URL}/blogs`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container upload-page">
        <div className="upload-card fade-in-up">
          <div className="upload-header">
            <h1 className="section-title">Create Blog</h1>
            <p className="section-subtitle">Share your knowledge with the community</p>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label upload-label">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter an engaging title..."
              />
            </div>

            <div className="mb-4">
              <label className="form-label upload-label">Category *</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label upload-label">Content *</label>
              <textarea
                className="form-control"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                rows={12}
              />
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label upload-label">Cover Image</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="imageUpload" className="file-upload-label">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                      <div className="file-upload-placeholder">
                        <span className="upload-icon">🖼️</span>
                        <span>Click to upload image</span>
                        <span className="file-hint">JPG, PNG, GIF (max 10MB)</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label upload-label">PDF Attachment</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="pdfUpload"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="file-input"
                  />
                  <label htmlFor="pdfUpload" className="file-upload-label">
                    <div className="file-upload-placeholder">
                      <span className="upload-icon">📄</span>
                      <span>{pdf ? pdf.name : 'Click to upload PDF'}</span>
                      <span className="file-hint">PDF files only (max 10MB)</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 publish-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Publishing...
                </>
              ) : (
                '🚀 Publish Blog'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
