import { Router } from 'express';
import {
  followUnfollowUser,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from '../controllers/userController.js';

import { protect } from '../middleware/auth/protect.js';

const router = Router();

//public route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

//private route
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

//follow unfollow
router.post('/followUnfollow', protect, followUnfollowUser);

export default router;
