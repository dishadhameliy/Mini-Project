const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const blogData = {
      title,
      content,
      category,
      author: req.user._id
    };

    // Handle file uploads
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        blogData.image = `/uploads/${req.files.image[0].filename}`;
      }
      if (req.files.pdf && req.files.pdf[0]) {
        blogData.pdf = `/uploads/${req.files.pdf[0].filename}`;
      }
    }

    const blog = await Blog.create(blogData);
    const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

    res.status(201).json(populatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const { title, content, category } = req.body;
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;

    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        blog.image = `/uploads/${req.files.image[0].filename}`;
      }
      if (req.files.pdf && req.files.pdf[0]) {
        blog.pdf = `/uploads/${req.files.pdf[0].filename}`;
      }
    }

    await blog.save();
    const updatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    // Delete associated comments
    await Comment.deleteMany({ blogId: blog._id });

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle like on a blog
// @route   POST /api/blogs/:id/like
exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const userId = req.user._id;
    const likeIndex = blog.likes.indexOf(userId);

    if (likeIndex === -1) {
      // Like the blog
      blog.likes.push(userId);
    } else {
      // Unlike the blog
      blog.likes.splice(likeIndex, 1);
    }

    await blog.save();

    res.json({ likes: blog.likes, likesCount: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
