import { Schema, model, Document, Types } from "mongoose";
export interface ISurvey extends Document{
    rating: number;
    feedback: string;
    id: string;
}
const surveySchema = new Schema<ISurvey>({
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    feedback: {
      type: String,
      index: true,
    },
    id: {
      type: String, // Assuming ID is a string
      required: true,
    },
  },
  {
    timestamps: true
  });
  

export const Survey = model<ISurvey>("Survey", surveySchema);