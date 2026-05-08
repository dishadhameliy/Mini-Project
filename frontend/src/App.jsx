import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Upload from './pages/Upload';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Saved from './pages/Saved';
import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
