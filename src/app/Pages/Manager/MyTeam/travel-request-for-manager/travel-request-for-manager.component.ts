
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-travel-request-for-manager',
  templateUrl: './travel-request-for-manager.component.html',
  styleUrls: ['./travel-request-for-manager.component.css']
})
export class TravelRequestForManagerComponent implements OnInit {
  travelRequset: any[];
  SDate: any;
  EDate: any;
  staffID: string;
  count: any;
  managerID: string;
  approvedTravelRequest: any[];
  rejectedTravelRequest: any[];
  totalcount: number;
  approvedRequest: number;
  rejectedRequest: number;
  userRoleID: string;
  constructor(public DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.SDate='2020-01-01';
    this.EDate='2020-12-31';
    this.managerID=localStorage.getItem('managerID');
    this.staffID=localStorage.getItem('staffID');
    this.userRoleID=localStorage.getItem('userRoleID');
    // var date = new Date();
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.DigiOfficeService.GetTransportationList(this.managerID,this.userRoleID,this.SDate,this.EDate).subscribe(data => {
      
      this.travelRequset = data;
      this.approvedTravelRequest=this.travelRequset.filter(x=>x.approvalStatus=='Approved')
      this.rejectedTravelRequest=this.travelRequset.filter(x=>x.approvalStatus=='Rejected')
      this.totalcount=this.travelRequset.length;
      this.approvedRequest= this.approvedTravelRequest.length;
      this.rejectedRequest= this.rejectedTravelRequest.length;
    })
    document.getElementById('def_open').click();
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


