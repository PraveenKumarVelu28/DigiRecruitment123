import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-locator-requests',
  templateUrl: './locator-requests.component.html',
  styleUrls: ['./locator-requests.component.css']
})
export class LocatorRequestsComponent implements OnInit {
  search: any;
  UserID: any;
  SDate: any;
  EDate: any;
  LocatorRequestsList: any[];
  UserName: any;
  filteredLocatorRequestsList: any[];
  ApprovedLocatorRequestsList: any[];
  RejectedLocatorRequestsList: any[];
  appliedCount: number;
  value:any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    // var kkk = this.Sdate.setDate(this.Sdate.getDate() - 1);
    // 
    // var lll = this.Edate.setDate(this.Edate.getDate() + 7);
    
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.todaydate = formatDate(myDate, format, locale);
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
    this.UserID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.GetMyLocatorRequests(this.UserID,this.startdate,this.enddate);
    
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyLocatorRequests(this.UserID,this.startdate, this.enddate);
  }
    public GetMyLocatorRequests(UserID,SDATE,EDATE) {
    debugger;
    this.DigiOfficeService.GetMyLocatorRequests(this.UserID, SDATE,EDATE).subscribe(res => {
      
      this.LocatorRequestsList = res;
      this.filteredLocatorRequestsList = this.LocatorRequestsList.filter(x =>x.status == null);
      this.appliedCount = this.filteredLocatorRequestsList.length;
      document.getElementById('def_open').click();
    });
  }
  public DeleteStaffLocatorRequest(id) {
    
    this.DigiOfficeService.DeleteStaffLocatorRequest(id).subscribe(
      data => {
        
        this.ngOnInit();
        Swal.fire('Leave  Deleted Successfully.');
      }, error => {
      }
    )
  }
  public openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(cityName=="NewRequest"){
      this.filteredLocatorRequestsList = this.LocatorRequestsList.filter(x =>x.status == null);
      this.appliedCount = this.filteredLocatorRequestsList.length;
    }
    else if(cityName=="Approved")
    {
      this.ApprovedLocatorRequestsList = this.LocatorRequestsList.filter(x =>x.status == 'Approved');
      this.appliedCount = this.ApprovedLocatorRequestsList.length;
    }
    else{
      this.RejectedLocatorRequestsList = this.LocatorRequestsList.filter(x =>x.status == ' Reject ');
      this.appliedCount = this.RejectedLocatorRequestsList.length;
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
