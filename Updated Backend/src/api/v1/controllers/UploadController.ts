import { Request, Response } from 'express';
import { UploadService } from '../services/UploadService';

export class UploadController {
  static async uploadAndProcess(req: Request, res: Response): Promise<void> {
    await UploadService.uploadAndProcess(req, res);
  }
}
