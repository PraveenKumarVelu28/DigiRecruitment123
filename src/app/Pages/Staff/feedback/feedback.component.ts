import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedBackList: any[];
  complaintList: any[];
  firstDay: string;
  lastDay: string;
 
  Search:any;
  staffID: string;
  value:any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  SDate = new Date();
  EDate = new Date();
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.todaydate = formatDate(date, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    // Find current hour in AM-PM Format
    hours = hours % 12;
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;  
    this.staffID = localStorage.getItem('staffID');
 
    this.GetComplaints(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0] ;
    this.GetComplaints(this.startdate,this.enddate);
  }
public GetComplaints(SDATE,EDATE){
  this.DigiOfficeService.GetMyComplaints(this.staffID ,SDATE,EDATE).subscribe(data => {
    
    this.complaintList = data
  })
}
  exportexcel() {
    
    var itemmasterlist = []
    for (let i = 0; i < this.complaintList.length; i++) {
      
      var list = {
        requestFor: this.complaintList[i].requestFor,
        modifiedDate: this.complaintList[i].modifiedDate,
        building: this.complaintList[i].building,
        statusName: this.complaintList[i].statusName,
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Feedback',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Feedback'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
  

}
