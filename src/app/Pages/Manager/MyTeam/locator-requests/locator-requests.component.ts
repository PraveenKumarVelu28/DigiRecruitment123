import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-locator-requests',
  templateUrl: './locator-requests.component.html',
  styleUrls: ['./locator-requests.component.css']
})
export class LocatorRequestsComponent implements OnInit {
  Search: any;
  UserID: any;
  SDate: any;
  EDate: any;
  LocatorRequestsList: any[];
  UserName: any;
  projectlist: any[];
  project: any;
  transportationtypelist: any[];
  transportationType: number;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.project = 0;
    this.transportationType=0;
    this.UserID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.SDate = '2020-01-01';
    this.EDate = '2020-12-31';
    this.GetMyLocatorRequests();
    this.GetProjectMasterList();
    this.GetTransportRequestType();
  }

  public GetMyLocatorRequests() 
  {
    
    this.DigiOfficeService.GetMyLocatorRequests(this.UserID, this.SDate, this.EDate).subscribe(res => {
    
    this.LocatorRequestsList = res;
    });
  }

  public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      
      this.projectlist = res;
    });
   }
   public GetTransportRequestType() {
    
    this.DigiOfficeService.GetTransportRequestType().subscribe(res => {
      
      this.transportationtypelist = res;
    });
   }
   public getproject(even) {
    
    this.project = even.target.value;
    if (this.project == 0) {
      this.DigiOfficeService.GetMyLocatorRequests(this.UserID, this.SDate, this.EDate).subscribe(res => {
        
        this.LocatorRequestsList = res;
  
      });
    } 
    else {
      this.LocatorRequestsList = this.LocatorRequestsList.filter(x =>x.project==this.project);
     
    }
  }  

  public gettransportationType(even) {
    
    this.project = even.target.value;
    if (this.project == 0) {
      this.DigiOfficeService.GetMyLocatorRequests(this.UserID, this.SDate, this.EDate).subscribe(res => {
        
        this.LocatorRequestsList = res;
  
      });
    } 
    else {
      this.LocatorRequestsList = this.LocatorRequestsList.filter(x =>x.transportationType==this.transportationType);
     
    }
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
