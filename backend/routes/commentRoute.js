import { Router } from 'express';
import { protect } from '../middleware/auth/protect.js';
import {
  createComment,
  deleteComment,
  getCommentsByBlogId,
  updateComment,
} from '../controllers/commentController.js';

const router = Router();

router.use(protect);

router.get('/getCommentsByBlogId/:id', getCommentsByBlogId);
router.post('/createComment', createComment);
router.put('/updateComment/:id', updateComment);
router.delete('/deleteComment/:id', deleteComment);

export default router;
