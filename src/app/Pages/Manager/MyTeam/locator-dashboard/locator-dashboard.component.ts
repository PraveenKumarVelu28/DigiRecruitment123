
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-locator-dashboard',
  templateUrl: './locator-dashboard.component.html',
  styleUrls: ['./locator-dashboard.component.css']
})
export class LocatorDashboardComponent implements OnInit {
  Search: any;
  UserID: any;
  LocatorRequestsList: any[];
  UserName: any;
  managerID: any;
  staffID: any;
  filterLocatorRequestsList: any[];
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  SDate = new Date();
  EDate = new Date();
  constructor(private DigiOfficeService: DigiOfficeService) { }

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
    this.managerID = localStorage.getItem('managerID');
    this.UserID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.UserName = localStorage.getItem('Name');
    this.GetMyLocatorRequests(this.managerID,this.startdate, this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyLocatorRequests(this.managerID,this.startdate, this.enddate);
  }
  public GetMyLocatorRequests(managerID,SDate,EDate) {
    debugger;
    this.DigiOfficeService.GetLocatorRequestsReport(managerID,SDate,EDate).subscribe(res => {
      debugger;
      this.LocatorRequestsList = res;
      this.filterLocatorRequestsList = this.LocatorRequestsList.filter(x=>x.supervisorID==this.managerID && x.status=='Approved');
    });
  }
  
  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.LocatorRequestsList.length; i++) {
      
      var list = {
        Name: this.LocatorRequestsList[i].name,
        Project: this.LocatorRequestsList[i].project,
        TransportationType: this.LocatorRequestsList[i].transportationType,
        Date: this.LocatorRequestsList[i].date,
        Purpose: this.LocatorRequestsList[i].purpose,
        ContactPerson: this.LocatorRequestsList[i].contactPerson,
        ContactPhNo: this.LocatorRequestsList[i].contactPhNo,
        TimeOfDeparture: this.LocatorRequestsList[i].timeOfDeparture,
        TimeOfReturn: this.LocatorRequestsList[i].timeOfReturn,
        Destination: this.LocatorRequestsList[i].destination,
        HourDiff: this.LocatorRequestsList[i].hourDiff        
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Locator Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Locator Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }



}
