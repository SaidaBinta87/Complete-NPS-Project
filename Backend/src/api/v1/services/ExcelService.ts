import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


export class ExcelService {
  static async writeExcelFile(data: any[][], filename: string): Promise<void> {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data array to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to the ExcelDownload folder
    const filePath = path.join(__dirname, '/../../../ExcelDownload', filename);
    XLSX.writeFile(workbook, filePath);
  }

  static async readExcelFile(filePath: string): Promise<any[]> {
    // Read the workbook from the file
    const workbook = XLSX.readFile(filePath);

    // Get the first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // Convert worksheet to array of objects
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    return data;
  }

static async writeUniqueId(filePath: string, rowIndex: number, uniqueId: string): Promise<void> {
    // Read the workbook from the file
    const workbook = XLSX.readFile(filePath);

    // Get the first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // Append the uniqueId to the worksheet
    const cellAddress = `D${rowIndex + 1}`; // Assuming the uniqueId column is D
    worksheet[cellAddress] = { v: uniqueId };

    // Write the updated workbook to the file
    XLSX.writeFile(workbook, filePath);
  }
  
}

