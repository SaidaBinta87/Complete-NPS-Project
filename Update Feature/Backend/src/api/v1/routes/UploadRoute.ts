import express from 'express';
import { UploadController } from '../controllers/UploadController';
import { upload } from '../../../middlewear/uploadMiddleware'; // Import multer middleware

const router = express.Router();

// POST route to upload and process the file
router.post('/uploadAndProcess', upload.single('file'), UploadController.uploadAndProcess);

export { router as UploadRouter };
