import { Request, Response } from 'express';
import { SurveyService } from '../services/DSurveyService';

export class SurveyController {
  static async createSurvey(req: Request, res: Response) {
    try {
      const { title, questions, thankYouMessage } = req.body;
      const survey = await SurveyService.createSurvey(title, questions, thankYouMessage);
      res.status(201).json(survey);
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getSurvey(req: Request, res: Response) {
    try {
      const surveyId = req.params.id;
      const survey = await SurveyService.getSurveyById(surveyId);
      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }
      res.json(survey);
    } catch (error) {
      console.error('Error fetching survey:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateSurvey(req: Request, res: Response) {
    try {
      const surveyId = req.params.id;
      const { title, questions, thankYouMessage } = req.body;
      const updatedSurvey = await SurveyService.updateSurvey(surveyId, title, questions, thankYouMessage);
      if (!updatedSurvey) {
        return res.status(404).json({ message: 'Survey not found' });
      }
      res.json(updatedSurvey);
    } catch (error) {
      console.error('Error updating survey:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteSurvey(req: Request, res: Response) {
    try {
      const surveyId = req.params.id;
      await SurveyService.deleteSurvey(surveyId);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting survey:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
