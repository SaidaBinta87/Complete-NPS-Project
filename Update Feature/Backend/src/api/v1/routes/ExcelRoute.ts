import express from 'express';
import { ExcelController } from '../controllers/ExcelController';
import { upload } from '../../../middlewear/uploadMiddleware';

const router = express.Router();

// Route for downloading the template(Don't use this for now)
router.get('/template', ExcelController.downloadTemplate);

// Route for uploading filled data
router.post('/upload', upload.single('file'), ExcelController.uploadFilledData);
router.get('/fileInfo', ExcelController.getAllFileInfo);
router.get('/fileInfo/:userId', ExcelController.getFileInfoByUserId);

//export default router;

export { router as ExcelRouter };
