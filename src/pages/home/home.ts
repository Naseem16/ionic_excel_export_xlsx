import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GenerateExcelReportProvider } from '../../providers/generate-excel-report/generate-excel-report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public excelService: GenerateExcelReportProvider) {

  }

  startExcelWork(){
    this.excelService.saveExcel();
  }

}
