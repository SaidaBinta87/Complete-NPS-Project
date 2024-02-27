import { Survey, ISurvey } from '../../../models/Survey';
import { FileData, IFileData } from '../../../models/Filedata';

export class NpsService {
  public static async calculateNpsData(uniqueIds: string[]): Promise<any> {
    try {
      // Assuming 'id' is the field representing unique identifiers in the Survey model
      const surveyData = await Survey.find({ id: { $in: uniqueIds } }).exec();
      
      // Ensure that surveyData contains the necessary fields (e.g., 'rating')
      console.log('Survey Data:', surveyData);

      const promoters = surveyData.filter((survey) => survey.rating >= 9).length;
      const passives = surveyData.filter((survey) => survey.rating >= 7 && survey.rating <= 8).length;
      const detractors = surveyData.filter((survey) => survey.rating >= 0 && survey.rating <= 6).length;

      const totalRespondents = surveyData.length;
      const npsScore = ((promoters - detractors) / totalRespondents) * 100;

      const promoterRespondents = surveyData.filter((survey) => survey.rating >= 9);
      const passiveRespondents = surveyData.filter((survey) => survey.rating >= 7 && survey.rating <= 8);
      const detractorRespondents = surveyData.filter((survey) => survey.rating >= 0 && survey.rating <= 6);

      return {
        npsScore: npsScore,
        totalPromoters: promoters,
        totalPassives: passives,
        totalDetractors: detractors,
        promoterRespondents: promoterRespondents,
        passiveRespondents: passiveRespondents,
        detractorRespondents: detractorRespondents,
      };
    } catch (error) {
      console.error('Error calculating NPS:', error);
      throw error;
    }
  }


  ////////////////////catagories


  public static async getNpsCategories(fileId: string): Promise<any> {
    try {
      // Find all FileData documents with the specified fileId
      const fileDataList = await FileData.find({ fileId: fileId }).exec();
  
      if (!fileDataList || fileDataList.length === 0) {
        throw new Error('File data not found for the specified fileId');
      }
  
      const npsCategories = {
        promoters: [] as { name: string; email: string; rating: number; feedback: string }[],
        passives: [] as { name: string; email: string; rating: number; feedback: string }[],
        detractors: [] as { name: string; email: string; rating: number; feedback: string }[],
      };
  
      // Iterate through each FileData document
      for (const fileData of fileDataList) {
        // Find all surveys related to the current FileData document
        const surveys = await Survey.find({ id: fileData.uniqueId }).exec();
  
        // Iterate through each survey and categorize accordingly
        for (const survey of surveys) {
          const { name, email } = fileData;
          const { rating, feedback } = survey;
              
          const entry = { name, email, rating, feedback };
  
          if (rating >= 9) {
            npsCategories.promoters.push(entry);
          } else if (rating >= 7 && rating <= 8) {
            npsCategories.passives.push(entry);
          } else {
            npsCategories.detractors.push(entry);
          }
        }
      }
  
      return npsCategories;
    } catch (error) {
      console.error('Error fetching NPS categories:', error);
      throw new Error('Error fetching NPS categories');
    }
  }
  
  
  
}
