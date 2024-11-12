import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  followingBlog,
  getAllBlogs,
  getBlogsByUser,
  getOneBlog,
  getPaginatedBlogs,
  likeUnLikeBlog,
  searchBlogs,
  updateBlog,
} from '../controllers/blogController.js';

import upload from '../utils/upload.js';
import { protect } from '../middleware/auth/protect.js';

const router = Router();

// route middleware
router.use(protect);

// read route
router.get('/getBlogs', getAllBlogs);
router.get('/getBlogsByUser/:id', getBlogsByUser);
router.get('/getPaginatedBlogs', getPaginatedBlogs);
router.get('/getBlog/:id', getOneBlog);

// mutation route
router.post('/create', upload.single('image'), createBlog);
router.put('/update/:id', upload.single('image'), updateBlog);
router.delete('/delete/:id', deleteBlog);

// likeUnlike route
router.put('/likeUnlike/:blogId', likeUnLikeBlog);

// search route
router.post('/search', searchBlogs);

// following BlogList route
router.get('/followingBlog', followingBlog);

export default router;
