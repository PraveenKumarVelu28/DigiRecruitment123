import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-travel-request',
  templateUrl: './travel-request.component.html',
  styleUrls: ['./travel-request.component.css']
})
export class TravelRequestComponent implements OnInit {
  travelRequset: any[];
  SDate: any;
  EDate: any;
  staffID: string;
  count: any;

  constructor(public DigiOfficeService: DigiOfficeService) { }


  ngOnInit(): void {
    this.SDate='2020-01-01';
    this.EDate='2020-12-31';
    this.staffID=localStorage.getItem('staffID');
    // var date = new Date();
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.DigiOfficeService.GetTransportationRequestsForStaff(this.SDate,this.EDate,this.staffID).subscribe(data => {
      
      this.travelRequset = data;
      this.count=this.travelRequset.length; 
    })
  }
  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.travelRequset.length; i++) {
      
      var list = {
        webSigninDate: this.travelRequset[i].webSigninDate,
        signoutDate: this.travelRequset[i].signoutDate,
        signinLocation: this.travelRequset[i].signinLocation,
        signoutLocation: this.travelRequset[i].signoutLocation,
        hr: this.travelRequset[i].hr,
     
      }
      
      itemmasterlist.push(list)
    }

    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Attendance',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Attendance'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
}


