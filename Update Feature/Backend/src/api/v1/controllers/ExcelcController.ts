import { Request, Response } from 'express';
import { ExcelService } from '../services/ExcelcService';
import multer from 'multer';

// Multer middleware configuration for file upload
const upload = multer({ dest: 'src/ExcelUpload/' });

export class ExcelcController {
  static async downloadTemplate(req: Request, res: Response): Promise<void> {
    try {
      const fileName = 'Test_Excel.xlsx'; // Change the file name if needed
      const filePath = await ExcelService.getDownloadFilePath(fileName);
      res.download(filePath, fileName);
    } catch (error) {
      console.error('Error downloading template:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  static async uploadFilledData(req: Request, res: Response): Promise<void> {
    try {
      // Use Multer middleware to handle file upload
      upload.single('file')(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
          console.error('Error uploading file:', err);
          res.status(500).json({ error: 'An unexpected error occurred during file upload.' });
          return;
        } else if (err) {
          console.error('Error uploading file:', err);
          res.status(500).json({ error: 'An unexpected error occurred during file upload.' });
          return;
        }

        if (!req.file) {
          throw new Error('No file uploaded');
        }
        const filePath = req.file.path;
        // Process the uploaded file using ExcelService if needed
        res.json({ message: 'File uploaded successfully.', data: req.file });
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}
