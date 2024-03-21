import { Survey, ISurvey } from "../../../models/Survey";

class RatingService {
  public static async postRating(rating: number): Promise<string | ISurvey> {
    try {
      const survey = new Survey({ rating });
      return await survey.save();
    } catch (error) {
      console.error("Error posting rating:", error);
      return "Failed to post rating. Please try again later.";
    }
  }

  // posting feedbacks of survey
// public static async postFeedback(rating: number, feedback: string, id: string): Promise<string | ISurvey> {
//   try {
//     const survey = new Survey({ rating, feedback, id }); // Save ID along with rating and feedback
//     return await survey.save();
//   } catch (error) {
//     console.error("Error posting feedback:", error);
//     return "Failed to post feedback. Please try again later.";
//   }
// }



public static async postFeedback(rating: number, feedback: string, id: string): Promise<string | ISurvey> {
  try {
    // Check if there is already a survey with the provided ID
    const existingSurvey = await Survey.findOne({ id });

    // If there's an existing survey, update it with the new rating and feedback
    if (existingSurvey) {
      existingSurvey.rating = rating;
      existingSurvey.feedback = feedback;
      return await existingSurvey.save();
    } else {
      // If no existing survey found, create a new one
      const survey = new Survey({ rating, feedback, id });
      return await survey.save();
    }
  } catch (error) {
    console.error("Error posting feedback:", error);
    return "Failed to post feedback. Please try again later.";
  }
}

}

export default RatingService;