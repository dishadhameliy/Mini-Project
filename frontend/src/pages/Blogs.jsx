import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import './Blogs.css';

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

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      const res = await axios.get(`${API_URL}/blogs`, { params });
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="container blogs-page">
        <div className="blogs-header">
          <h1 className="section-title">Explore Blogs</h1>
          <p className="section-subtitle">Discover articles across every field of knowledge</p>
        </div>

        <div className="blogs-filters">
          <SearchBar value={search} onChange={setSearch} />
          <select
            className="form-select category-filter"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="active-filter">
            <span>Filtered by: <strong>{selectedCategory}</strong></span>
            <button className="clear-filter" onClick={() => handleCategoryChange('')}>✕ Clear</button>
          </div>
        )}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="row g-4 stagger-children">
            {filteredBlogs.map(blog => (
              <div key={blog._id} className="col-lg-4 col-md-6">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state text-center">
            <div className="empty-icon">🔍</div>
            <h4>No blogs found</h4>
            <p>{search ? 'Try a different search term' : 'No blogs in this category yet'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
