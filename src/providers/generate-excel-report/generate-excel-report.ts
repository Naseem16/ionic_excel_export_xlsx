import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Workbook } from 'exceljs';
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular';
import * as XLSX from 'xlsx';

@Injectable()
export class GenerateExcelReportProvider {

  constructor(public http: HttpClient, public file: File, public platform: Platform) {
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
      let fileName = 'export_excel.xlsx'
      // console.log(this.platform._platforms)

      if(this.platform.is('core'))
        XLSX.writeFile(wb, fileName);
      else if(this.platform.is('mobile')) {
        this.exportToMobileDevice(wb, fileName)
      }

      
      // await this.file.createFile(this.file.externalRootDirectory, 'export_file.xlsx', true)
      
      // XLSX.writeFile(wb, 'out_file.xlsx');

      // XLSX.write(wb)

      console.log('success')
    } catch (error) {
      console.log(error)
    }
  }

  async exportToMobileDevice(wb, fileName) {
    let folderName = 'Lactation'
    let fileToArray = XLSX.write(wb, { type: 'array' })
    await this.file.writeFile(this.file.externalRootDirectory, fileName, fileToArray, {
      replace: true,
      append: false
    })
  }


}
