import { Router } from 'express';
import { createSubscriptionEmail } from '../controllers/emailController.js';
import { protect } from '../middleware/auth/protect.js';

const router = Router();

router.post('/create', protect, createSubscriptionEmail);

export default router;
