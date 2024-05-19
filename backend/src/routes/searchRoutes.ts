import { Router } from 'express';
import { searchCommunities, searchPosts } from '../controllers/searchControllers';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/searchCommunities', protect, searchCommunities);
router.get('/searchPosts', protect, searchPosts);

export default router;
