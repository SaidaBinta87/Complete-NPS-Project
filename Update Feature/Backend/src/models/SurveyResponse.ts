import { Schema, model, Document } from "mongoose";

export interface SurveyResponse {
    userId: Schema.Types.ObjectId | string; // Adjusted type here
    surveyId: Schema.Types.ObjectId | string;
    responses: Record<string, string>;
}

export interface SurveyResponseDocument extends SurveyResponse, Document {}

const surveyResponseSchema = new Schema<SurveyResponseDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
        required: true,
    },
    surveyId: {
        type: Schema.Types.ObjectId,
        ref: 'CustomSurvey',
        required: true,
    },
    responses: {
        type: Schema.Types.Mixed,
        required: true,
    },
}, { timestamps: true });

export const SurveyResponseModel = model<SurveyResponseDocument>("SurveyResponse", surveyResponseSchema);
