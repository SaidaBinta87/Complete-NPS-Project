import { Request, Response } from "express";
import RatingService from "../services/RatingService";
import { Survey } from '../../../models/Survey';
import { FileData } from '../../../models/Filedata';


class RatingController {
  public static async postRating(req: Request, res: Response): Promise<void> {
    try {
      const { rating } = req.body;
      if (typeof rating !== "number" || rating < 0 || rating > 10) {
        res.status(400).json({ error: "Invalid rating. Rating must be a number between 0 and 10." });
        return;
      }
      const result = await RatingService.postRating(rating);
      res.json(result);
    } catch (error) {
      console.error("Error posting rating:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }

 /* public static async postFeedback(req: Request, res: Response): Promise<void> {
    try {
      const { rating, feedback } = req.body;
      const { id } = req.params; // Get ID from URL
      if (typeof feedback !== "string" || feedback.trim() === "") {
        res.status(400).json({ error: "Invalid feedback. Feedback must be a non-empty string." });
        return;
      }
      const result = await RatingService.postFeedback(rating, feedback, id); // Pass ID to service method
      res.json(result);
    } catch (error) {
      console.error("Error posting feedback:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }*/


  public static async postFeedback(req: Request, res: Response): Promise<void> {
    try {
      const { rating, feedback } = req.body;
      const { id } = req.params; // Get ID from URL
      if (typeof feedback !== "string" || feedback.trim() === "") {
        res.status(400).json({ error: "Invalid feedback. Feedback must be a non-empty string." });
        return;
      }
      // Pass ID to service method and handle status change
      const result = await RatingService.postFeedback(rating, feedback, id);
      // If feedback is successfully saved, update status in filedatas model
      if (typeof result !== 'string' && result !== null) {
        await FileData.findOneAndUpdate({ uniqueId: id }, { status: 'Survey Completed' });
      }
      res.json(result);
    } catch (error) {
      console.error("Error posting feedback:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
}

export default RatingController;