import { Request, Response } from 'express';
import { NpsService } from '../services/NpsService';

export class NpsController {
  public static async calculateNps(req: Request, res: Response): Promise<void> {
    try {
      const uniqueIds = req.body.uniqueIds; // Extract unique IDs from request body
      const npsData = await NpsService.calculateNpsData(uniqueIds);
      res.json(npsData);
    } catch (error) {
      console.error('Error calculating NPS:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }


  ///////////////////////catagories


//   public static async getNpsCategories(req: Request, res: Response): Promise<void> {
//     try {
//       const npsCategories = await NpsService.getNpsCategories();
//       res.json(npsCategories);
//     } catch (error) {
//       console.error('Error fetching NPS categories:', error);
//       res.status(500).json({ error: 'An unexpected error occurred.' });
//     }
//   }


  public static async getNpsCategories(req: Request, res: Response): Promise<void> {
    try {
      const fileId = req.params.fileId;
      const npsCategories = await NpsService.getNpsCategories(fileId);
      res.status(200).json(npsCategories);
    } catch (error) {
      console.error('Error fetching NPS categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
