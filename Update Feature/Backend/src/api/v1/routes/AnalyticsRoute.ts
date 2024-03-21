// routes.ts

import express from 'express';
import * as analyticsController from '../controllers/AnalyticsController';

const router = express.Router();

router.get('/analytics/nps', analyticsController.getNpsData);
router.get('/analytics/survey-status', analyticsController.getSurveyStatusData);
router.get('/analytics/recent-files/:userId', analyticsController.getRecentFiles);

export default router;
