import express from 'express';
import { SurveyController } from '../controllers/SurveyController';

const router = express.Router();

//router.post('/process', SurveyController.processSurvey);
router.get('/process/:fileId', SurveyController.processSurvey);
router.get('/userdata/:fileId', SurveyController.getUserDataAndMarkSurveySent);
router.get('/filedata/:fileId', SurveyController.getFileDataByFileId);
router.post('/resend-survey/:uniqueId', SurveyController.resendSurveyToUser);
router.post('/search/:fileId', SurveyController.searchFileData);

export { router as SurveyRouter };
