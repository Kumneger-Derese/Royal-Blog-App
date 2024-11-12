import mongoose, { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    content: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    blogId: { type: String },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model('Comment', commentSchema);
export default CommentModel;
