
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-locator-request-dashboard',
  templateUrl: './locator-request-dashboard.component.html',
  styleUrls: ['./locator-request-dashboard.component.css']
})
export class LocatorRequestDashboardComponent implements OnInit {
  Search: any;
  UserID: any;
  SDate: any;
  EDate: any;
  LocatorRequestsList: any[];
  UserName: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.UserID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.SDate = '2020-01-01';
    this.EDate = '2020-12-31';
    this.GetMyLocatorRequests();
  }
  public GetMyLocatorRequests() {
    
    this.DigiOfficeService.GetLocatorRequestForAdmin(this.SDate, this.EDate).subscribe(res => {
      
      this.LocatorRequestsList = res;
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

