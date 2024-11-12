import mongoose, { model, Schema } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    file: { type: String, required: true },
    fileId: { type: String, required: true },
    likes: [{ type: ObjectId, ref: 'User' }],
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = model('Blog', blogSchema);
export default BlogModel;
