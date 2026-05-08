const Comment = require('../models/Comment');

// @desc    Add a comment
// @route   POST /api/comments
exports.addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;

    const comment = await Comment.create({
      blogId,
      userId: req.user._id,
      text
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('userId', 'name email');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for a blog
// @route   GET /api/comments/:blogId
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check ownership
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
