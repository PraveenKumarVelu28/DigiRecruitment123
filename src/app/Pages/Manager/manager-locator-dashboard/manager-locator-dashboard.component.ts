
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-manager-locator-dashboard',
  templateUrl: './manager-locator-dashboard.component.html',
  styleUrls: ['./manager-locator-dashboard.component.css']
})
export class ManagerLocatorDashboardComponent implements OnInit {
  value: any;
  Search: any;
  UserID: any;
  SDate: any;
  EDate: any;
  locatorRequestsList: any[];
  UserName: any;
  managerID: any;
  staffID: any;
  filterlocatorRequestsList: any[];
  typeID: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
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
    this.typeID=0;
    this.GetLocatorRequests(this.managerID,this.typeID, this.startdate, this.enddate);

  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetLocatorRequests(this.managerID,this.typeID, this.startdate, this.enddate);
  }
  public GetLocatorRequests(managerID,typeID,SDate,EDate) {
    
    this.DigiOfficeService.GetLocatorRequests(managerID,typeID,SDate,EDate).subscribe(res => {
      
      this.locatorRequestsList = res;
      // this.filterlocatorRequestsList = this.locatorRequestsList.filter(x=>x.approveStatus==null);
    });
  }
  
  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.locatorRequestsList.length; i++) {
      
      var list = {
        Name: this.locatorRequestsList[i].name,
        Project: this.locatorRequestsList[i].project,
        TransportationType: this.locatorRequestsList[i].transportationType,
        Date: this.locatorRequestsList[i].date,
        Purpose: this.locatorRequestsList[i].purpose,
        ContactPerson: this.locatorRequestsList[i].contactPerson,
        ContactPhNo: this.locatorRequestsList[i].contactPhNo,
        TimeOfDeparture: this.locatorRequestsList[i].timeOfDeparture,
        TimeOfReturn: this.locatorRequestsList[i].timeOfReturn,
        Destination: this.locatorRequestsList[i].destination,
        HourDiff: this.locatorRequestsList[i].hourDiff        
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
