import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-work-place-request',
  templateUrl: './work-place-request.component.html',
  styleUrls: ['./work-place-request.component.css']
})
export class WorkPlaceRequestComponent implements OnInit {
  workSpaceRequest: any[];
  SDate: string;
  EDate: string;
  filteredList: any[];
  buildingList: any[];
  buildingID: any;
  Search: any;
  projectlist: any[];
  project: number;
  count: any;
  completedfilteredList: any[];
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  Sdate = new Date();
  roleid: any;
  Edate = new Date();
  staffID: any;
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.roleid = localStorage.getItem('roleid');
    this.staffID = localStorage.getItem('staffID');
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
    var x = document.getElementById('def_open');
    x.className += " active";
    this.GetWorkSpaceDetails(this.startdate, this.enddate);
  }
  public selectedDate(data) {
    this.todaydate = data[0].toLocaleString().split(',')[0]
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetWorkSpaceDetails(this.startdate, this.enddate);
  }
  public GetWorkSpaceDetails(SDate, EDate) {
    debugger;
    if (localStorage.getItem('roleid') == '4') {
      this.DigiOfficeService.GetWorkSpaceDetails(SDate, EDate).subscribe(data => {
        debugger;
        this.workSpaceRequest = data;
        this.filteredList = this.workSpaceRequest.filter(x => x.approvedStatus == null);
        document.getElementById('def_open').click();
        this.count = this.filteredList.length;
      });
    } else {
      this.DigiOfficeService.GetWorkSpaceDetails(SDate, EDate).subscribe(data => {
        debugger;
        this.workSpaceRequest = data;
        this.filteredList = this.workSpaceRequest.filter(x => x.assignedTo == localStorage.getItem('staffID') && x.approvedStatus == null);
        document.getElementById('def_open').click();
        this.count = this.filteredList.length;
      });
    }

  }

  public GetBuildinglist() {

    this.DigiOfficeService.GetBuildinglist().subscribe(res => {

      this.buildingList = res;
    });
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

    if (cityName == "NewRequest") {
      if (localStorage.getItem('roleid') == '4') {
        this.filteredList = this.workSpaceRequest.filter(x => x.approvedStatus == null);
        this.count = this.workSpaceRequest.length;
      }
      else {
        this.filteredList = this.workSpaceRequest.filter(x => x.assignedTo == localStorage.getItem('staffID') && x.approvedStatus == null);
        this.count = this.workSpaceRequest.length;
      }

    }
    else (cityName == "Approved")
    {
      if (localStorage.getItem('roleid') == '4') {
        this.completedfilteredList = this.workSpaceRequest.filter(x => x.approvedStatus == 'Approved');
        this.count = this.completedfilteredList.length;
      }
      else {
        this.completedfilteredList = this.workSpaceRequest.filter(x => x.assignedTo == localStorage.getItem('staffID') && x.approvedStatus == 'Approved');
        this.count = this.completedfilteredList.length;
       
      }

    }
  }

  public getbuildingID(even) {

    this.buildingID = even.target.value;
    if (this.buildingID == 0) {
      this.DigiOfficeService.GetWorkSpaceDetails(this.SDate, this.EDate).subscribe(data => {
        this.workSpaceRequest = data
        this.filteredList = this.workSpaceRequest;
        this.count = this.workSpaceRequest.length;
      })
    }
    else {
      this.filteredList = this.workSpaceRequest.filter(x => x.buildingID == this.buildingID);
      this.count = this.workSpaceRequest.length;
    }
  }
  mappedProjectList: any;
  projectList1: any;
  public GetProjectMasterList() {

    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {

      this.projectlist = res;
      this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
        debugger
        this.mappedProjectList = res.filter(x => x.staffID == this.staffID);
        let userrole = this.mappedProjectList[0].projectID.split(',');
        let FillteredModels = [];
        for (let i = 0; i < userrole.length; i++) {
          let userselectedModule = this.projectlist.filter(x => x.projectName == userrole[i].trim());
          FillteredModels.push(userselectedModule[0]);
        }
        this.projectList1 = FillteredModels;
      });
    });
  }
  public getproject(even) {

    this.project = even.target.value;
    if (this.project == 0) {
      if (localStorage.getItem('roleid') == '4') {
        this.filteredList = this.workSpaceRequest.filter(x => x.approvedStatus == null);
        this.count = this.workSpaceRequest.length;
      }
      else {
        this.filteredList = this.workSpaceRequest.filter(x => x.assignedTo == localStorage.getItem('staffID') && x.approvedStatus == null);
        this.count = this.workSpaceRequest.length;
      }
    }
    else {
      if (localStorage.getItem('roleid') == '4') {
        this.filteredList = this.workSpaceRequest.filter(x => x.approvedStatus == null && x.project == this.project);
        this.count = this.workSpaceRequest.length;
      }
      else {
        this.filteredList = this.workSpaceRequest.filter(x => x.assignedTo == localStorage.getItem('staffID') && x.approvedStatus == null && x.project == this.project);
        this.count = this.workSpaceRequest.length;
      }


    }
  }
  public DeleteWorkplaceRequest(id) {

    this.DigiOfficeService.DeleteWorkplaceRequest(id).subscribe(
      data => {

        this.ngOnInit();
        Swal.fire('Work place Request  Deleted Successfully.');
      }, error => {
      }
    )
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

  //Prashant
  workid: any;
  public GetWorkID(workid) {
    debugger
    this.workid = workid
  }

  files: File[] = [];
  brochures = [];
  brochures1 = [];
  imagesurl: any;
  public onBrochureUpload(abcd) {
    debugger;
    this.brochures.push(abcd.addedFiles[0]);
    this.uploadImages();
    abcd.length = 0;
  }
  public uploadImages() {

    this.DigiOfficeService.UploadImages(this.brochures).subscribe(res => {

      this.brochures1.push(res);
      let a = this.brochures1[0].slice(2);

      this.imagesurl = 'http://14.192.17.225' + a;
      Swal.fire("Added Successfully");

    });
  }
  Comments: any;
  public UpdateWorkSchedule() {
    debugger
    var Entity = {
      'ID': this.workid,
      'Comments': this.Comments,
      'Attachment': this.imagesurl,
    }
    this.DigiOfficeService.UpdateWorkplaceRequestWork(Entity).subscribe(
      data => {
        if (data != undefined) {
          Swal.fire('Updated Successfully');
        }
        this.ngOnInit();
      }, error => {
      }
    )
  }
}
