// analyticsService.ts
import {Survey} from '../../../models/Survey';
import {File} from '../../../models/File';
import { FileData } from '../../../models/Filedata';

export const getNpsData = async (): Promise<{ totalPromoters: number, totalPassives: number, totalDetractors: number }> => {
  try {
    const surveys = await Survey.find();

    let totalPromoters = 0;
    let totalPassives = 0;
    let totalDetractors = 0;

    surveys.forEach((survey) => {
      const rating = survey.rating;
      if (rating >= 9 && rating <= 10) {
        totalPromoters++;
      } else if (rating >= 7 && rating <= 8) {
        totalPassives++;
      } else if (rating >= 0 && rating <= 6) {
        totalDetractors++;
      }
    });

    return { totalPromoters, totalPassives, totalDetractors };
  } catch (error) {
    console.error('Error fetching NPS data:', error);
    throw new Error('Internal server error');
  }
};

export const getSurveyStatusData = async (): Promise<{ surveySentCount: number, surveyCompleteCount: number, surveyResentCount: number }> => {
  try {
    const surveySentCount = await FileData.countDocuments({ status: 'Survey Sent' });
    const surveyCompleteCount = await FileData.countDocuments({ status: 'Survey Completed' });
    const surveyResentCount = await FileData.countDocuments({ status: 'Survey Resent' });

    return { surveySentCount, surveyCompleteCount, surveyResentCount };
  } catch (error) {
    console.error('Error fetching survey status data:', error);
    throw new Error('Internal server error');
  }
};

export const getRecentFiles = async (userId: string): Promise<{ today: any[], yesterday: any[] }> => {
    try {
      console.log('Fetching recent files for userId:', userId);
    
      // Get the current date in UTC
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
    
      // Get yesterday's date in UTC
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setUTCHours(0, 0, 0, 0); // Set to beginning of the day in UTC
    
      console.log('Date range - Today:', today, 'Yesterday:', yesterday);
    
      // Modify the query to include userId
      const todayFiles = await File.find({ userId: userId, createdAt: { $gte: today, $lt: new Date() } });
      const yesterdayFiles = await File.find({ userId: userId, createdAt: { $gte: yesterday, $lt: today } });
    
      console.log('Today\'s files:', todayFiles);
      console.log('Yesterday\'s files:', yesterdayFiles);
    
      return { today: todayFiles, yesterday: yesterdayFiles };
    } catch (error) {
      console.error('Error fetching recent files:', error);
      throw new Error('Error fetching recent files');
    }
    
  
};
