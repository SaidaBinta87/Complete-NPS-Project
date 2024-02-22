import { Request, Response } from 'express';
import { SurveyService } from '../services/SurveyService';
import { ParsedQs } from 'qs';


interface QueryParameters {
  [key: string]: string | string[] | undefined;
}

export class SurveyController {
  static async processSurvey(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params; // Extract fileId from URL parameters
      const { emailSubject, emailText } = req.body; // Extract email subject and text from request body
      const result = await SurveyService.generateUniqueLinksAndSave(fileId, emailSubject, emailText);
      res.json({ message: result });
    } catch (error) {
      console.error('Error processing survey:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }



  static async getUserDataAndMarkSurveySent(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params; // Extract fileId from URL parameters
      const userData = await SurveyService.getUserDataFromFile(fileId);
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }


  static async getFileDataByFileId(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params; // Extract fileId from URL parameters
      const fileData = await SurveyService.getFileDataByFileId(fileId);
      res.json(fileData);
    } catch (error) {
      console.error('Error fetching file data:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }


  // static async getFileDataByFileId(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { fileId } = req.params; // Extract fileId from URL parameters
  //     const queryParameters = req.query ; // Extract query parameters and cast them to QueryParameters type
  
  //     let fileData;
  //     if (Object.keys(queryParameters).length === 0) {
  //       // No query parameters provided, fetch all data for the fileId
  //       fileData = await SurveyService.getFileDataByFileId(fileId);
  //     } else {
  //       // Query parameters provided, fetch specific data matching the query
  //       fileData = await SurveyService.getFileDataByFileIdWithQuery(fileId, queryParameters);
  //     }
  
  //     res.json(fileData);
  //   } catch (error) {
  //     console.error('Error fetching file data:', error);
  //     res.status(500).json({ error: 'An unexpected error occurred.' });
  //   }
  // }
  


  static async resendSurveyToUser(req: Request, res: Response): Promise<void> {
    try {
      const { uniqueId } = req.params;
      await SurveyService.resendSurveyToUser(uniqueId);
      res.json({ message: 'Survey resent successfully to the user.' });
    } catch (error) {
      console.error('Error resending survey to user:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

//////new search//////////

static async searchFileData(req: Request, res: Response): Promise<void> {
  try {
    const { fileId } = req.params; // Extract fileId from URL parameters
    const { searchText } = req.body; // Extract searchText from request body

    const searchData = await SurveyService.searchFileData(fileId, searchText);

    res.json(searchData);
  } catch (error) {
    console.error('Error searching file data:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
}
