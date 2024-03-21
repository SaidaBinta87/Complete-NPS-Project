// services/SurveyResponseService.ts

import { SurveyResponseModel, SurveyResponse } from '../../../models/SurveyResponse';

export class SurveyResponseService {
    static async submitResponse(userId: string, surveyId: string, responses: Record<string, string>) {
        try {
            const surveyResponse: SurveyResponse = { userId, surveyId, responses };
            const savedResponse = await SurveyResponseModel.create(surveyResponse);
            return savedResponse;
        } catch (error) {
            console.error('Error saving survey response:', error);
            throw new Error('Error saving survey response');
        }
    }
}
