import { Router } from 'express';
import RatingController from '../controllers/RatingController';

const router = Router();

// Post a rating
router.post('/post-rating', RatingController.postRating);

// Post feedback
router.post('/post-feedback/:id', RatingController.postFeedback);

export { router as RatingRoute };