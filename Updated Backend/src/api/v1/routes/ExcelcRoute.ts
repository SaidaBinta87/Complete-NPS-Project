import express from 'express';
import { ExcelcController } from '../controllers/ExcelcController';

const router = express.Router();

// Route to download the Excel template
router.get('/download', ExcelcController.downloadTemplate);

// Route to upload filled data Excel file(Don't use this)
router.post('/upload', ExcelcController.uploadFilledData);

export { router as ExcelcRouter };
