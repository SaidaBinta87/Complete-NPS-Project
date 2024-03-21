// routes/surveyResponseRoutes.ts

import { Router } from 'express';
import { SurveyResponseController } from '../controllers/SurveyResponseController';

const router = Router();

// Survey response route
router.post('/survey-responses', SurveyResponseController.submitResponse);

export { router as surveyResponseRouter };
