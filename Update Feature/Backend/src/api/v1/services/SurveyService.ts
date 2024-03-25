import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { ExcelService } from './ExcelService';
import { Uploads} from '../../../models/Uploads';
import {UploadData, IUploadData } from '../../../models/UploadData';

interface QueryParameters {
  [key: string]: string;
}


export class SurveyService {
  static async generateUniqueLinksAndSave(fileId: string, emailSubject: string, emailText: string): Promise<string[]> {
    try {
      // Find the file based on fileId
      const file = await Uploads.findOne({ fileId });
      if (!file) {
        throw new Error('File not found');
      }

      // Read recipients' data from the Excel file
      const recipients: string[][] = await ExcelService.readExcelFile(file.filePath);

      console.log('Recipients:', recipients); // Log recipients to verify data

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'binteoysha@gmail.com',
          pass: 'your password',
        },
      });

      const uniqueLinks: string[] = [];
      console.log('Email Subject:', emailSubject);
      console.log('Email Text:', emailText);
      for (let i = 1; i < recipients.length; i++) {
        const recipient = recipients[i];
        const uniqueId = uuidv4(); // Generate a unique ID for each user
        const randomLink = `http://localhost:3000/${uniqueId}`;
        const mailOptions = {
          from: 'binteoysha@gmail.com',
          to: recipient[1],
          subject: emailSubject,
          text: `${emailText}\n\nLink: ${randomLink}\n\nRegards,\nAdmin`,
        };
        

        await transporter.sendMail(mailOptions);

        // Save the data with the generated unique ID to the database
        const fileData: Partial<IUploadData> = {
          name: recipient[0], //  name is at index 0
          email: recipient[1], // email is at index 1
          phoneNumber: recipient[2], // phone number is at index 2
          companyName: recipient[3], // company name is at index 3
          uniqueId: uniqueId,
          fileId: fileId,
          uniqueLink: randomLink,
          status: 'Survey Sent' // Set status to 'Survey Sent'
        };

        await UploadData.create(fileData);
        uniqueLinks.push(randomLink);
      }

      return uniqueLinks;
    } catch (error) {
      console.error('Error generating random links and saving data:', error);
      throw new Error('An unexpected error occurred.');
    }
  }

  static async getUserDataFromFile(fileId: string): Promise<any[]> {
    try {
      // Find the file based on fileId
      const file = await Uploads.findOne({ fileId });
      if (!file) {
        throw new Error('File not found');
      }
  
      // Read recipients' data from the Excel file
      const recipients = await ExcelService.readExcelFile(file.filePath);
  
      // Modify recipients data to add status, skipping the first row
      const userData = recipients.slice(1).map((recipient) => ({
        name: recipient[0], // Assuming name is at index 0
        email: recipient[1], // Assuming email is at index 1
        phoneNumber: recipient[2], // Assuming phone number is at index 2
        companyName: recipient[3], // Assuming company name is at index 3
        status: 'Survey Sent' // Add status 'Survey Sent' for all rows
      }));
  
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('An unexpected error occurred.');
    }
  }


  static async getFileDataByFileId(fileId: string): Promise<IUploadData[]> {
    try {
      const fileData = await UploadData.find({ fileId });
      return fileData;
    } catch (error) {
      console.error('Error fetching file data:', error);
      throw new Error('An unexpected error occurred.');
    }
  }


  // static async getFileDataByFileId(fileId: string): Promise<IFileData[]> {
  //   try {
  //     const fileData = await FileData.find({ fileId });
  //     return fileData;
  //   } catch (error) {
  //     console.error('Error fetching file data:', error);
  //     throw new Error('An unexpected error occurred.');
  //   }
  // }
  
  // static async getFileDataByFileIdWithQuery(fileId: string, query: QueryParameters): Promise<IFileData[]> {
  //   try {
  //     // Construct the query object based on the provided query parameters
  //     const queryObject: { [key: string]: any } = { fileId };
  //     for (const key in query) {
  //       if (Object.prototype.hasOwnProperty.call(query, key)) {
  //         queryObject[key] = query[key];
  //       }
  //     }
  
  //     const fileData = await FileData.find(queryObject);
  //     return fileData;
  //   } catch (error) {
  //     console.error('Error fetching file data with query:', error);
  //     throw new Error('An unexpected error occurred.');
  //   }
  // }
  

  


  static async resendSurveyToUser(uniqueId: string): Promise<void> {
    try {
      // Find the user with the given uniqueId and status 'Survey Sent'
      const userToResend = await UploadData.findOne({ uniqueId, status: 'Survey Sent' });

      if (!userToResend) {
        throw new Error('User not found or survey already completed.');
      }

      // Resend the survey to the user using their uniqueId or email address
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'binteoysha@gmail.com',
          pass: 'piqg xfsh tbum wdmg',
        },
      });

      const mailOptions = {
        from: 'binteoysha@gmail.com',
        to: userToResend.email,
        subject: 'Survey Link',
        text: `Dear User,\n\nPlease click on the following link to take the survey:\n\nLink: ${userToResend.uniqueLink}\n\nRegards,\nAdmin`,
      };

      await transporter.sendMail(mailOptions);

      // Update user status to 'Survey Resent' or any appropriate status
      await UploadData.findByIdAndUpdate(userToResend._id, { status: 'Survey Resent' });
    } catch (error) {
      console.error('Error resending survey to user:', error);
      throw new Error('An unexpected error occurred.');
    }
  }




  ////////new search//////////


  static async searchFileData(fileId: string, searchText: string): Promise<IUploadData[]> {
    try {
      // Ensure searchText is properly defined and not empty
      const regexText = searchText ? searchText.toString() : '';
  
      // Find the file data matching the fileId and searchText
      const fileData = await UploadData.find({
        fileId,
        $or: [
          { name: { $regex: regexText, $options: 'i' } },
          { email: { $regex: regexText, $options: 'i' } },
          { phoneNumber: { $regex: regexText, $options: 'i' } },
          { uniqueLink: { $regex: regexText, $options: 'i' } },
          { status: { $regex: regexText, $options: 'i' } }
        ]
      });
  
      return fileData;
    } catch (error) {
      console.error('Error searching file data:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
}
