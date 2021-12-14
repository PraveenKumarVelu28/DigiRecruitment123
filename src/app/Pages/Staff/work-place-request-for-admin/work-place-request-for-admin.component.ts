import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-work-place-request-for-admin',
  templateUrl: './work-place-request-for-admin.component.html',
  styleUrls: ['./work-place-request-for-admin.component.css']
})
export class WorkPlaceRequestForAdminComponent implements OnInit {

  workSpaceRequest: any[];
  filteredList: any[];
  buildingList: any[];
  buildingID: any;
  Search:any;
  projectlist: any[];
  project: number;
  count: number;
  value: any;
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
    this.buildingID = 0;
    this.project = 0;
    this.GetBuildinglist();
    this.GetProjectMasterList();
    var x= document.getElementById('def_open');
    x.className += " active";
    this.GetWorkSpaceDetails(this.startdate,this.enddate);
   
   
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetWorkSpaceDetails(this.startdate,this.enddate);
  }
  public GetWorkSpaceDetails(SDate,EDate) {
    
    this.DigiOfficeService.GetWorkSpaceDetails(SDate,EDate).subscribe(data => {
      
      this.workSpaceRequest = data
      this.filteredList=  this.workSpaceRequest;
      this.count = this.filteredList.length;
    });
  }

  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildingList = res;
    });
  }

  public getbuildingID(even) {
    
    this.buildingID = even.target.value;
    if (this.buildingID == "") {
      this.filteredList=  this.workSpaceRequest;
    }
    else {
      this.filteredList = this.workSpaceRequest.filter(x => x.buildingid == this.buildingID)
    }
  }
  public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      
      this.projectlist = res;
    });
  }
  public getproject(even) {
    
    this.project = even.target.value;
    if (this.project == 0) {
      this.filteredList=  this.workSpaceRequest;
      this.count = this.filteredList.length;
    }
    else {
    this.filteredList = this.workSpaceRequest.filter(x => x.project == this.project);
    this.count = this.filteredList.length;
    }
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.filteredList.length; i++) {
      
      var list = {
        buildingName: this.filteredList[i].buildingName,
        workStationName: this.filteredList[i].workStationName,
        project: this.filteredList[i].project,
        requestFor: this.filteredList[i].requestFor,
        startDate: this.filteredList[i].startDate,
        startTime: this.filteredList[i].startTime,
        endDate: this.filteredList[i].endDate,
        endTime: this.filteredList[i].endTime
     
      }
      
      itemmasterlist.push(list)
    }

    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Work Place Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Work Place Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
