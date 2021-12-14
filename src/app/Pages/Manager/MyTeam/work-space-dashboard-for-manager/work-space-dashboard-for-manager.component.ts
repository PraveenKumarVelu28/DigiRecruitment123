
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-work-space-dashboard-for-manager',
  templateUrl: './work-space-dashboard-for-manager.component.html',
  styleUrls: ['./work-space-dashboard-for-manager.component.css']
})
export class WorkSpaceDashboardForManagerComponent implements OnInit {
  search: any;
  workSpaceRequest: any[];
  value: any;
  //todaydate: any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  buildingList: any[];
  buildingid: any;
  buildingID: any;
  floorList: any[];
  floorID: any;
  roomTypeList: any[];
  roomTypeID: any;
  constructor(public DigiOfficeService: DigiOfficeService, private DatePipe: DatePipe) { }
  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  selectedlanguage: any;
  selectedlanguage1: any;
  public todayDay = this.DatePipe.transform(new Date().getDay(), 'EEEE');

  ngOnInit(): void {
    this.buildingID = 0;
    this.floorID = 0;
    this.roomTypeID = 0;
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    //this.todaydate = formatDate(date, format, locale);
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
    this.GetWorkSpaceDetails(this.startdate, this.enddate);
    this.GetBuildinglist();
    this.GetFloorType();
    this.GetMeetingRoomType();
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetWorkSpaceDetails(this.startdate, this.enddate);
  }
  public GetWorkSpaceDetails(SDate, EDate) {
    debugger;
    this.DigiOfficeService.GetWorkSpaceDetails(SDate, EDate).subscribe(res => {

      this.workSpaceRequest = res.filter(x => x.assignedTo == localStorage.getItem('staffID'));;
      document.getElementById('def_open').click();

    })
  }
  public GetBuildinglist() {
    this.DigiOfficeService.GetBuildinglist().subscribe(data => {
      this.buildingList = data;
    })
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

    // if (cityName == "NewRequest") {
    //   this.filteredList = this.workSpaceRequest.filter(x => x.approvedStatus == null);
    //   this.count = this.workSpaceRequest.length;
    // }
    // else (cityName == "Approved")
    // {
    //   this.completedfilteredList = this.workSpaceRequest.filter(x => x.approvedStatus == 'Approved');
    //   this.count = this.completedfilteredList.length;
    // }
  }




  public getBuildingID(even) {

    this.buildingID = even.target.value;
    if (this.buildingID == 0) {
      this.DigiOfficeService.GetWorkSpaceDetails(this.startdate, this.enddate).subscribe(res => {

        this.workSpaceRequest = res;
      })
    }
    else {
      this.DigiOfficeService.GetWorkSpaceDetails(this.startdate, this.enddate).subscribe(res => {

        this.workSpaceRequest = res.filter(x => x.buildingID == this.buildingID);
      })
    }
  }

  public GetFloorType() {
    this.DigiOfficeService.GetFloorType(this.buildingID).subscribe(data => {

      this.floorList = data.filter(x => x.buildingID == this.buildingID);
    })
  }

  public getFloorID(even) {
    this.floorID = even.target.value;
    if (this.floorID == 0) {
      this.DigiOfficeService.GetWorkSpaceDetails(this.startdate, this.enddate).subscribe(res => {

        this.workSpaceRequest = res;
      })
    }
    else {
      this.DigiOfficeService.GetWorkSpaceDetails(this.startdate, this.enddate).subscribe(res => {

        this.workSpaceRequest = res.filter(x => x.floorID == this.floorID);
      })
    }
  }
  public GetMeetingRoomType() {

    this.DigiOfficeService.GetWorkStationType_Master().subscribe(data => {

      this.roomTypeList = data;
    })
  }

  getRoomTypeID(even) {
    this.roomTypeID = even.target.value;
    if (this.roomTypeID == 0) {
      this.DigiOfficeService.GetWorkSpaceDetails(this.startdate, this.enddate).subscribe(res => {

        this.workSpaceRequest = res;
      })
    }
    else {
      this.DigiOfficeService.GetWorkSpaceDetails(this.startdate, this.enddate).subscribe(res => {

        this.workSpaceRequest = res.filter(x => x.workSpaceMasterID == this.roomTypeID);
      })
    }
  }


  public CanceledWorkplaceRequest(id) {
    debugger;
    this.DigiOfficeService.CanceledWorkplaceRequest(id).subscribe(res => {
      Swal.fire('Cancel Work place Request...')
      this.ngOnInit();
    });
  }



  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.workSpaceRequest);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.workSpaceRequest);
  }

  public buildcallender(filteredList) {
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.DatePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.DatePipe.transform(sdate, 'dd');
      let _day = this.DatePipe.transform(sdate, 'EEE');
      let dateformat = this.DatePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }
    //Events Binding
    for (let j = 0; j < filteredList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => this.DatePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.DatePipe.transform(filteredList[j].meetingDateTime, 'yyyy-MM-dd'));
      if (currenteventlist.length > 0) {

        this.callenderdaysdount[currenteventlist[0].date - 1]['StaffName'] = filteredList[j].doctorName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['StaffType'] = filteredList[j].doctorName;


        if (this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = "";
        }
        this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] + "<span class='DemoStaffWorkScheduleCalendar_2' id='" + filteredList[j].id + "'> Doctor Name: " + filteredList[j].doctorName + "</span>";
      }

    }
  }

  showorhidecontent: boolean;

  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }

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
