import * as fs from 'fs';
import * as path from 'path';


export class ExcelService {
  static async getDownloadFilePath(fileName: string): Promise<string> {
    try {
      const filePath = path.join(__dirname, '../../../ExcelDownload', fileName);
      if (!fs.existsSync(filePath)) {
        throw new Error('Excel file not found');
      }
      return filePath;
    } catch (error) {
      throw new Error(`Error finding Excel file: ${error}`);
    }
  }
}
