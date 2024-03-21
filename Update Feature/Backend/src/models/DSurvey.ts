import { Schema, model, Document } from "mongoose";

enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TEXT = "TEXT",
  RADIO_BUTTON = "RADIO_BUTTON",
  RATING_BAR = "RATING_BAR",
}

interface CustomSurveyQuestion {
  type: QuestionType;
  question: string;
  options?: string[]; // Only applicable for MULTIPLE_CHOICE and RADIO_BUTTON types
}

export interface CustomSurvey {
  title: string;
  questions: CustomSurveyQuestion[];
  thankYouMessage: string;
  surveyId: string;
}

export interface CustomSurveyDocument extends CustomSurvey, Document {}

const customSurveySchema = new Schema<CustomSurveyDocument>({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        type: {
            type: String,
            enum: Object.values(QuestionType),
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        options: [String], // Optional array of strings for options
    }],
    thankYouMessage: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const CustomSurveyModel = model<CustomSurveyDocument>("CustomSurvey", customSurveySchema);
