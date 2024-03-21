// controllers/SurveyResponseController.ts

import { Request, Response } from 'express';
import { SurveyResponseService } from '../services/SurveyResponseService';

export class SurveyResponseController {
    static async submitResponse(req: Request, res: Response) {
        try {
            const { userId, surveyId, responses } = req.body;
            const savedResponse = await SurveyResponseService.submitResponse(userId, surveyId, responses);
            res.status(201).json(savedResponse);
        } catch (error) {
            console.error('Error submitting survey response:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
