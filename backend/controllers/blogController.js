import BlogModel from '../models/blogModel.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'node:fs';

//Todo: GET | /api/blogs/getAllBlogs

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select({ title: 1, content: 1 })
      .populate('author', '_id name email followers following');

    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: 'Error in getting the Blogs.', error });
  }
};

//Todo: GET | /api/blogs/getBlogsByUser
const getBlogsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await BlogModel.find({ author: id }).populate(
      'author',
      '_id name email followers following'
    );
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: 'Error in getting the Blogs.', error });
  }
};

//Todo: GET | /api/blogs/getPaginatedBlogs?page=${pageNumber}

const getPaginatedBlogs = async (req, res) => {
  const { page } = req.query || 1;

  try {
    const LIMIT = 9;
    const SKIP = (Number(page) - 1) * LIMIT;
    const totalDocs = await BlogModel.find().countDocuments({});

    const blogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(SKIP)
      .populate('author', '_id name email followers following');

    res.status(200).json({
      blogs,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalDocs / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error in getting all blogs', error });
  }
};

//Todo: GET | /api/blogs/getBlog/:id

const getOneBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById({ _id: id }).populate(
      'author',
      '_id name email followers following'
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error in getting one blog', error });
  }
};

//Todo: POST | /api/blogs/create

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const author = req.user;

  const path = req.file.path;
  const result = await cloudinary.uploader.upload(path);

  try {
    const blog = await BlogModel.create({
      title,
      content,
      author,
      file: result?.secure_url,
      fileId: result?.public_id,
    });

    fs.unlinkSync(path);

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error in Creating blog', error });
  }
};

//Todo: PUT | /api/blogs/update

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const path = req.file.path;

    const oldBlog = await BlogModel.findById({ _id: id });

    if (req.file) {
      // if the request have file then delete old file
      await cloudinary.uploader.destroy(oldBlog.fileId);
    }

    //upload new image
    const result = await cloudinary.uploader.upload(path);

    //updated data
    const blogData = {
      title: title || oldBlog.title,
      content: content || oldBlog.content,
      file: result?.secure_url || oldBlog.file,
      fileId: result?.public_id || oldBlog.fileId,
    };

    const blog = await BlogModel.findByIdAndUpdate({ _id: id }, blogData, {
      new: true,
    });

    res.status(200).json(blog);
    fs.unlinkSync(path);
  } catch (error) {
    res.status(500).json({ message: 'Error in updating blog.', error });
  }
};

//Todo: DELETE | /api/blogs/delete

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const oldBlog = await BlogModel.findById({ _id: id });

    //delete image
    await cloudinary.uploader.destroy(oldBlog.fileId);

    //delete blog
    await oldBlog.deleteOne();

    res.status(200).json({ message: 'Blog deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error in Deleting blog', error });
  }
};

//Todo: PUT | /api/blogs/likeUnLike

const likeUnLikeBlog = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user._id;

  try {
    const blog = await BlogModel.findById({ _id: blogId });

    if (blog.likes.includes(userId)) {
      blog.likes.pull(userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json('Error :', error.message);
  }
};

//Todo: POST | /api/blogs/search

const searchBlogs = async (req, res) => {
  try {
    const { query } = req.body;
    const pattern = new RegExp('^' + query, 'igm');

    const search = await BlogModel.find({ title: { $regex: pattern } }).select(
      '_id title'
    );
    res.status(200).json(search);
  } catch (error) {
    res.status(500).json({ message: 'Error in searching blog', error });
  }
};

//Todo: GET | /api/blogs/followingBlog

const followingBlog = async (req, res) => {
  const followingList = req.user.following;

  try {
    const followingBlogList = await BlogModel.find({
      author: { $in: followingList },
    }).populate('author', '_id name');

    res.status(200).json(followingBlogList);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error in fetching following blog', error });
  }
};

export {
  getAllBlogs,
  getPaginatedBlogs,
  getOneBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeUnLikeBlog,
  searchBlogs,
  getBlogsByUser,
  followingBlog,
};
