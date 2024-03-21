import { Router } from 'express';
import { SurveyController } from '../controllers/DSurveyController';

const router = Router();

// Survey routes
router.post('/surveys', SurveyController.createSurvey);
router.get('/surveys/:id', SurveyController.getSurvey);
router.put('/surveys/:id', SurveyController.updateSurvey);
router.delete('/surveys/:id', SurveyController.deleteSurvey);

export { router as DSurveyRouter };
