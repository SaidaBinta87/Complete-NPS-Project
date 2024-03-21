import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Uploads } from '../../../models/Uploads';
import { FileService } from '../services/FileService';
import { ExcelService } from '../services/ExcelService';

export class ExcelController {
 
      static async downloadTemplate(req: Request, res: Response): Promise<void> {
        try {
          // File path for the Test_Excel.xlsx file
          const filePath = path.join(process.cwd(), 'src', 'ExcelDownload', 'Test_Excel.xlsx');
    
          // Check if the file exists
          if (!fs.existsSync(filePath)) {
            throw new Error('Excel file not found');
          }
    
          // Set Content-Disposition header to prompt download
          res.setHeader('Content-Disposition', 'attachment; filename=Test_Excel.xlsx');
          res.sendFile(filePath);
        } catch (error) {
          console.error('Error downloading template:', error);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        }
      }
    
      
      static async uploadFilledData(req: Request, res: Response): Promise<void> {
        try {
          // Handle file upload
          if (!req.file) {
            throw new Error('No file uploaded');
          }
    
          // Generate a unique ID for the file
          const fileId = uuidv4();
          const userId = req.body.userId;
          // Move the uploaded file to the ExcelUpload folder
          const destinationPath = path.join(__dirname, '../../../ExcelUpload', `${fileId}.xlsx`);
          fs.renameSync(req.file.path, destinationPath);
    
          // Read recipients' data from the Excel file to get the user count
          const recipients = await ExcelService.readExcelFile(destinationPath);
          const userCount = recipients.length - 1; // Exclude the header row
    
          // Save file details to the database
          const surveyTitle = req.body.surveyTitle; // Assuming survey title is sent in the request body
          await FileService.saveFileDetails(fileId, req.file.originalname, destinationPath, surveyTitle, userCount, userId);
    
          res.json({ message: 'File uploaded successfully.', fileId: fileId });
        } catch (error) {
          console.error('Error uploading file:', error);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        }
      }



      static async getAllFileInfo(req: Request, res: Response): Promise<void> {
        try {
          const fileInfos = await FileService.getAllFileInfo();
          res.json(fileInfos);
        } catch (error) {
          console.error('Error fetching file information:', error);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        }
      }


      static async getFileInfoByUserId(req: Request, res: Response): Promise<void> {
        try {
          const userId = req.params.userId; // Retrieve userId from request parameters
          const fileInfo = await FileService.getFileInfoByUserId(userId);
          res.json(fileInfo);
        } catch (error) {
          console.error('Error fetching file info:', error);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        }
      }
}
