import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { FileService } from './FileService';
import { SurveyService } from './SurveyService';
import { ExcelService } from './ExcelService';

export class UploadService {
    static async uploadAndProcess(req: Request, res: Response): Promise<void> {
        try {
            // Handle file upload
            const userId = req.body.userId;
            console.log(userId);
            if (!req.file) {
                throw new Error('No file uploaded');
            }
    
            // Generate a unique ID for the file
            const fileId = uuidv4();
    
            // Move the uploaded file to the ExcelUpload folder
            const destinationPath = path.join(__dirname, '../../../ExcelUpload', `${fileId}.xlsx`);
            fs.renameSync(req.file.path, destinationPath);
    
            // Read recipients' data from the Excel file to get the user count
            const recipients = await ExcelService.readExcelFile(destinationPath);
            const userCount = recipients.length - 1; // Exclude the header row
    
            // Save file details to the database including userId
            const surveyTitle = req.body.surveyTitle; // Assuming survey title is sent in the request body
            await FileService.saveFileDetails(fileId, req.file.originalname, destinationPath, surveyTitle, userCount, userId);
    
            // Process survey
            await SurveyService.generateUniqueLinksAndSave(fileId, req.body.emailSubject, req.body.emailText);
    
            // Send response with fileId and userCount
            res.json({ message: 'File uploaded and survey processed successfully.', fileId: fileId, userCount: userCount });
        } catch (error) {
            console.error('Error uploading file and processing survey:', error);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
}
