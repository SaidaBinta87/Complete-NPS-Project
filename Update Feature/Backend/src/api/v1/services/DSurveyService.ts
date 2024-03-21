import { CustomSurveyModel, CustomSurveyDocument, CustomSurvey } from '../../../models/DSurvey';

export class SurveyService {
  static async createSurvey(title: string, questions: CustomSurvey['questions'], thankYouMessage?: string): Promise<CustomSurveyDocument> {
    try {
      const survey = await CustomSurveyModel.create({ title, questions, thankYouMessage });
      return survey;
    } catch (error) {
      console.error('Error creating survey:', error);
      throw new Error('Error creating survey');
    }
  }

  static async getSurveyById(surveyId: string): Promise<CustomSurveyDocument | null> {
    try {
      const survey = await CustomSurveyModel.findById(surveyId);
      return survey;
    } catch (error) {
      console.error('Error fetching survey:', error);
      throw new Error('Error fetching survey');
    }
  }

  static async updateSurvey(surveyId: string, title: string, questions: any[], thankYouMessage?: string): Promise<CustomSurveyDocument | null> {
    try {
      const survey = await CustomSurveyModel.findByIdAndUpdate(surveyId, { title, questions, thankYouMessage }, { new: true });
      return survey;
    } catch (error) {
      console.error('Error updating survey:', error);
      throw new Error('Error updating survey');
    }
  }

  static async deleteSurvey(surveyId: string): Promise<void> {
    try {
      await CustomSurveyModel.findByIdAndDelete(surveyId);
    } catch (error) {
      console.error('Error deleting survey:', error);
      throw new Error('Error deleting survey');
    }
  }


  
}
