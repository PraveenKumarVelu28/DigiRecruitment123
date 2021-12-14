import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-transport-request-dashboard',
  templateUrl: './transport-request-dashboard.component.html',
  styleUrls: ['./transport-request-dashboard.component.css']
})
export class TransportRequestDashboardComponent implements OnInit {
  search: any;
  SDate: any;
  EDate: any;
  transportationRequestsList: any[];
  StaffID: any;
  filteredList: any;
  count: any;
  raisedFilteredList: any[];
  approvedFilteredList: any[];
  completedFilteredList: any[];
  project: any;
  projectlist: any[];
  staffID: string;
  UserID: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  Sdate = new Date();
  Edate = new Date();
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
    this.project = 0;
    this.staffID = localStorage.getItem('staffID');
    document.getElementById('def_open').click();
    this.GetProjectMasterList();
    this.GetMyTravelRequestsList(this.startdate, this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyTravelRequestsList(this.startdate, this.enddate);
  }

  public GetMyTravelRequestsList(SDATE, EDATE) {
    
    this.DigiOfficeService.GetMyTravelRequestsList(this.staffID, SDATE, EDATE).subscribe(res => {
      
      this.transportationRequestsList = res;
      // this.filteredList = this.transportationRequestsList;
      this.raisedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Yet To complete');
      this.approvedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Booked');
      this.completedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Completed');
      this.count = this.transportationRequestsList.length;
      document.getElementById('def_open').click();
    }
    )
  }

  CompletedVis: boolean;
  RaisedVis: boolean;
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
  }

  public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      
      this.projectlist = res;
    });
  }

  public getproject(even) {
    
    this.project = even.target.value;
    if (this.project == 0) {
      this.raisedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Yet To Complete');
      this.approvedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Approved');
      this.completedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Completed');
      this.count = this.filteredList.length;
    }
    else {
      // this.filteredList = this.transportationRequestsList.filter(x => x.projectName == this.project);
      this.raisedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Yet To Complete' && x.projectName == this.project);
      this.approvedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Approved' && x.projectName == this.project);
      this.completedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Completed' && x.projectName == this.project);
      this.count = this.filteredList.length;
    }
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.transportationRequestsList.length; i++) {
      
      var list = {
        DepartureDateTime: this.transportationRequestsList[i].departureDateTime,
        ReturnDateTime: this.transportationRequestsList[i].returnDateTime,
        TypeOfVechile: this.transportationRequestsList[i].typeOfVechile,
        PickUpPoint: this.transportationRequestsList[i].pickUpPoint,
        Destination: this.transportationRequestsList[i].destination,
        Status: this.transportationRequestsList[i].status
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Transport Request Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Transport Request Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }



}
