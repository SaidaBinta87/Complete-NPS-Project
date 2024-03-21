import mongoose, { Schema, Document } from 'mongoose';

// Define the interface representing the document in MongoDB
export interface IUploadData extends Document {
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
const UploadDataSchema: Schema<IUploadData> = new Schema({
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
export const UploadData = mongoose.model<IUploadData>('UploadData', UploadDataSchema);
//export default FileData;
