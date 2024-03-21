import { Router } from 'express';

import {NpsController}  from '../controllers/NpsController';

const router = Router();

// Post a rating
router.post('/calculate', NpsController.calculateNps);

//router.get('/categories', NpsController.getNpsCategories);

router.get('/categories/:fileId',NpsController.getNpsCategories);

// Post feedback


export { router as NpsRoute };