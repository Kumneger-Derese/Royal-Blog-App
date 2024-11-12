import CommentModel from '../models/commentModel.js';

//Todo: GET comment by BlogId | api/comments/getComments

const getCommentsByBlogId = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await CommentModel.find({ blogId: id })
      .populate('postedBy', '_id name')
      .sort({ createdAt: -1 });

    res.status(200).json(comment);
  } catch (error) {
    res.status(404);
  }
};

//Todo: POST  | api/comments/createComment

const createComment = async (req, res) => {
  const { blogId, content } = req.body;
  const postedBy = req.user._id;

  try {
    const comment = await CommentModel.create({ content, postedBy, blogId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await CommentModel.findByIdAndUpdate(
      { _id: id },
      { content }
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findByIdAndDelete({ _id: id });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCommentsByBlogId, createComment, updateComment, deleteComment };
