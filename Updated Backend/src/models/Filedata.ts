import mongoose, { Schema, Document } from 'mongoose';

// Define the interface representing the document in MongoDB
export interface IFileData extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    uniqueId: string;
    fileId: string;
    uniqueLink: string;
    status: string; // Added status field
}

// Define the schema for the model
const FileDataSchema: Schema<IFileData> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  uniqueId: { type: String, required: true },
  fileId: { type: String, required: true },
  uniqueLink: { type: String, required: true },
  status: { type: String, default: 'Survey Sent' } // Added status field with default value 'Survey Sent'
});

// Define and export the model
export const FileData = mongoose.model<IFileData>('FileData', FileDataSchema);
//export default FileData;
