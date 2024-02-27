import { Schema, model, Document } from 'mongoose';

export interface ISSurvey extends Document {
  title: string;
  description: string;
  // Add any other fields you need for your survey
}

const surveySchema = new Schema<ISSurvey>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  // Add more fields as needed
});

export const Survey = model<ISSurvey>("SurveyCreate", surveySchema);
