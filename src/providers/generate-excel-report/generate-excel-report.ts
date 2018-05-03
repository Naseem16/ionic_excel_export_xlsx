import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Workbook } from 'exceljs';
import { File } from '@ionic-native/file'
import * as XLSX from 'xlsx';

@Injectable()
export class GenerateExcelReportProvider {

  constructor(public http: HttpClient, public file: File) {
    console.log('Hello GenerateExcelReportProvider Provider');
  }

  async saveExcel(){
    let wb = XLSX.utils.book_new();

    let patient_sheet_name = 'baby_list';
 
    /* make worksheet */
    let patient_sheet_data = [
      [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
      [  1 ,  2 ,  3 ,  4 ,  5, 6, 7, 8 ]
    ]

    let patient_sheet = XLSX.utils.aoa_to_sheet(patient_sheet_data);

    let log_sheet_name = 'log_feed_expressions'
    let log_sheet_data = [
      {
        name: 'hi',
        game: 'asdasd',
        fame: 'asdsa'
      },
      {
        test1: 2,
        name: '1',
        game: '2',
        fame: '3',
        test2: 4
      }
    ]

    let log_sheet = XLSX.utils.json_to_sheet(log_sheet_data);


    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, patient_sheet, patient_sheet_name)
    XLSX.utils.book_append_sheet(wb, log_sheet, log_sheet_name)

    try {
      let folderName = 'Lactation'
      let fileName = 'export_excel.xlsx'
      let fileInString = XLSX.write(wb, {type: 'array'})
      // await this.file.createFile(this.file.externalRootDirectory, 'export_file.xlsx', true)
      await this.file.writeFile(this.file.externalRootDirectory, fileName, fileInString, {replace: true, append: false})
      // XLSX.writeFile(wb, 'out_file.xlsx');

      // XLSX.write(wb)

      console.log('success')
    } catch (error) {
      console.log(error)
    }
    




    // let wbook = new Workbook();

  //   wbook.addWorksheet('baby')
  //   wbook.addWorksheet('logFeed')

  //   let sheet: Worksheet =  wbook.getWorksheet('baby')
  //   sheet.addRow(1);

  //   let row: Row = sheet.getRow(0);
  //   let cell: Cell =  row.getCell(0);
  //   cell.value = 'sad';

  //   wbook.xlsx.writeFile('D:\opt\lactation')
  //   .then(dat => console.log('successfull') )
  //   .catch( error => console.log(error) )
  }

}
