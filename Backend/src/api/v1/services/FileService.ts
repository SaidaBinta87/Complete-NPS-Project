import { File } from '../../../models/File';

export class FileService {
  static async saveFileDetails(fileId: string, fileName: string, filePath: string, surveyTitle: string, userCount: number, userId: string): Promise<void> {
    const file = new File({
      fileId: fileId,
      fileName: fileName,
      filePath: filePath,
      surveyTitle: surveyTitle,
      userCount: userCount,
      userId: userId // Add userId field
    });
    await file.save();
  }


  static async getAllFileInfo(): Promise<any[]> {
    try {
      const fileInfos = await File.find({});
      // Extract required information for all files
      const fileInfoList = fileInfos.map(fileInfo => ({
        surveyTitle: fileInfo.surveyTitle,
        fileId: fileInfo.fileId,
        fileName: fileInfo.fileName,
        createdAt: fileInfo.createdAt,
        userCount: fileInfo.userCount
      }));
      return fileInfoList;
    } catch (error) {
      throw new Error('Error fetching file information');
    }
  }


  static async getFileInfoByUserId(userId: string): Promise<any> {
    try {
      // Query the database to get file information by userId
      const fileInfo = await File.find({ userId: userId });
      return fileInfo;
    } catch (error) {
      throw error;
    }
  }
  
}
