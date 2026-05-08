const User = require('../models/User');
const Blog = require('../models/Blog');

// @desc    Toggle bookmark on a blog
// @route   POST /api/bookmark
exports.toggleBookmark = async (req, res) => {
  try {
    const { blogId } = req.body;
    const user = await User.findById(req.user._id);

    const bookmarkIndex = user.bookmarks.indexOf(blogId);

    if (bookmarkIndex === -1) {
      // Add bookmark
      user.bookmarks.push(blogId);
    } else {
      // Remove bookmark
      user.bookmarks.splice(bookmarkIndex, 1);
    }

    await user.save();

    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookmarked blogs
// @route   GET /api/bookmark
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'bookmarks',
        populate: {
          path: 'author',
          select: 'name email'
        }
      });

    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
