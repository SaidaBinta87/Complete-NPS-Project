import mongoose, { Document, Schema } from 'mongoose';

// Define the schema for the File model
const fileSchema = new Schema({
  fileId: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  surveyTitle: { type: String, required: true }, // Add field for survey title
  userId: { type: String, required: true }, // Add field for userId
  createdAt: { type: Date, default: Date.now }, // Add field for creation time
  userCount: { type: Number, default: 0 } // Add field for user count, default to 0
});

// Define the File model
export interface FileDocument extends Document {
  fileId: string;
  fileName: string;
  filePath: string;
  surveyTitle: string;
  userId: string;
  createdAt: Date;
  userCount: number;
}

export const File = mongoose.model<FileDocument>('File', fileSchema);