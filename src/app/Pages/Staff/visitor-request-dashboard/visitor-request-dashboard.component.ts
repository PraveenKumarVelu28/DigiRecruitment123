

import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-visitor-request-dashboard',
  templateUrl: './visitor-request-dashboard.component.html',
  styleUrls: ['./visitor-request-dashboard.component.css']
})
export class VisitorRequestDashboardComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  value: any;
  search: any;
  SDate = new Date();
  EDate = new Date();
  visitorRequestList: any[];
  filteredList: any;
  count: any;
  visitedRequestList: any[];
  filteredvisitedRequestList: any[];
  filteredNotvisitedRequestList: any[];
  NotvisitedRequestList: any[];
  Date: Date;
  todaydate: any;
  yettovistcount: any;
  visitedcount: number;
  type: any;
  startdate: any;
  enddate: any;
  userID: string;
  constructor(private DigiOfficeService: DigiOfficeService) {
  }
  visitorcount: any;
  ngOnInit(): void {
    this.userID=localStorage.getItem('staffID');
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
    this.type == "Raised";
    this.todaydate = formatDate(date, format, locale)
    this.GetVisitorRequest(this.userID);
    this.GetVisitedRequest(this.startdate, this.enddate);
    this.GetVisitorRequestNotVisited(this.startdate, this.enddate);
  }

  public selectedDate(data) {
    this.todaydate = data[0].toLocaleString().split(',')[0]
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetVisitorRequest(this.userID);
    this.GetVisitedRequest(this.startdate, this.enddate);
    this.GetVisitorRequestNotVisited(this.startdate, this.enddate);
  }

  public GetVisitorRequest(userID) {
    
    this.DigiOfficeService.GetVisitorRequestbyUserID(userID).subscribe(res => {
      this.visitorRequestList = res;
      this.filteredList = this.visitorRequestList.filter(x => x.status == 'Yet To Visit');
      this.yettovistcount = this.filteredList.length;
    }
    )
  }
  public GetVisitedRequest(SDate, Edate) {
    
    this.DigiOfficeService.GetVisitorRequest(SDate, Edate).subscribe(res => {
      
      this.visitedRequestList = res;
      this.filteredvisitedRequestList = this.visitedRequestList.filter(x => x.status == 'Visited');
      this.visitedcount = this.filteredvisitedRequestList.length;
      document.getElementById('def_open').click();
    }
    )
  }
  public GetVisitorRequestNotVisited(SDate, Edate) {
    
    this.DigiOfficeService.GetVisitorRequestNotVisited(SDate, Edate).subscribe(res => {
      
      this.NotvisitedRequestList = res;
      // this.filteredNotvisitedRequestList = this.NotvisitedRequestList;
      this.count = this.NotvisitedRequestList.length;
    }
    )
  }
  public DeleteVisitorRequest(id) {
    
    this.DigiOfficeService.DeleteVisitorRequest(id).subscribe(
      data => {
        
        this.ngOnInit();
        Swal.fire('Visitor Request  Deleted Successfully.');
      }, error => {
      }
    )
  }

  CompletedVis: boolean;
  RaisedVis: boolean;
  public openCity(evt, cityName) {
    this.type = cityName;
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

    if (this.type == "Raised") {
      this.filteredList = this.visitorRequestList.filter(x => x.status == 'Yet To Visit');
      this.yettovistcount = this.filteredList.length;
    }
    else if (this.type == "Completed") {
      this.filteredvisitedRequestList = this.visitedRequestList.filter(x => x.status == 'Visited');
      this.visitedcount = this.filteredvisitedRequestList.length;
    }
    else {
      //this.filteredNotvisitedRequestList = this.NotvisitedRequestList;
      this.count = this.NotvisitedRequestList.length;
    }

  }
  public VisitedVisitorRequest(id) {
    this.DigiOfficeService.VisitedVisitorRequest(id).subscribe(
      data => {
        
        Swal.fire('Visitor Visited.');
        this.ngOnInit();
      }, error => {
      }
    )
  }


  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.visitorRequestList.length; i++) {
      
      var list = {
        visitorName: this.visitorRequestList[i].visitorName,
        visitingDate: this.visitorRequestList[i].visitingDate,
        visitingTime: this.visitorRequestList[i].visitingTime,
        status: this.visitorRequestList[i].status

      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'visitor Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'visitor Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
}
