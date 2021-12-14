
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-work-place-request',
  templateUrl: './add-work-place-request.component.html',
  styleUrls: ['./add-work-place-request.component.css']
})
export class AddWorkPlaceRequestComponent implements OnInit {
  travelType: any;
  buildingID: any;
  buildingList: any[];
  staffID: string;
  approverList: any[];
  projectList: any[];
  destination: any;
  departureDate: any;
  returnDate: any;
  Description: any;
  projectID: any;
  approverID: any;
  notes: any;
  staffName: string;
  air: number;
  travel: number;
  hotel: number;
  floorList: any[];
  floorID: any;
  roomTypeList: any[];
  roomTypeID: any;
  conferenceRoomID: any;
  conferenceRoomList: any[];
  BuildingID: any;
  WorkStationType: any;
  FloorID: any;
  purpose: any;
  startDate: any;
  endDate: any;
  startTime: any;
  endTime: any;
  comments: any;
  todaydate: any;
  paramID: any;
  ID: any;
  saveupdate: any;
  WorkSpaceDetailslist: any[];
  workSpaceID: any;
  mintime: any;
  projectName: any;
  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  form: FormGroup;
  ngOnInit(): void {
    this.buildingID = 0;
    this.floorID = 0;
    this.roomTypeID = 0;
    this.workSpaceID = 0;
    //this.projectID = 0;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.staffID = localStorage.getItem('staffID');
    this.projectName = 0;
    this.staffName = localStorage.getItem('staffName');
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
        this.getBuilding();
        this.GetAllStaff();
        this.getMeetingRoomType();
        this.GetProjectMasterList();
      }
      else {
        this.saveupdate = 1;

        this.DigiOfficeService.GetWorkSpaceDetailsforEdit().subscribe(
          data => {
            debugger
            this.DigiOfficeService.GetBuildinglist().subscribe(data => {
              this.buildingList = data;
            })
            this.DigiOfficeService.GetWorkStationType_Master().subscribe(data => {

              this.roomTypeList = data;
            })
            this.DigiOfficeService.GetAllStaff().subscribe(res => {
              this.allStaffList = res.filter(x => x.managerid == this.staffID);
            })
            this.GetProjectMasterList();
            // this.DigiOfficeService.GetProjectMasterList().subscribe(data => {

            //   this.projectList = data;
            // })
            this.WorkSpaceDetailslist = data;
            this.WorkSpaceDetailslist = this.WorkSpaceDetailslist.filter(x => x.id == this.ID);
            this.DigiOfficeService.GetWorkspaceMasterMobile(this.WorkSpaceDetailslist[0].buildingID, this.WorkSpaceDetailslist[0].workSpaceMasterID, this.WorkSpaceDetailslist[0].floorID).subscribe(res => {
              this.conferenceRoomList = res;
            })
            this.DigiOfficeService.GetFloorType(this.WorkSpaceDetailslist[0].buildingID).subscribe(data => {
              this.floorList = data;
            })

            this.buildingID = this.WorkSpaceDetailslist[0].buildingID;
            this.floorID = this.WorkSpaceDetailslist[0].floorID;
            this.roomTypeID = this.WorkSpaceDetailslist[0].workSpaceMasterID;
            this.projectID = this.WorkSpaceDetailslist[0].project;
            this.workSpaceID = this.WorkSpaceDetailslist[0].workStationID;
            this.purpose = this.WorkSpaceDetailslist[0].requestFor;
            this.startDate = this.WorkSpaceDetailslist[0].startDate;
            this.endDate = this.WorkSpaceDetailslist[0].endDate;
            this.startTime = this.WorkSpaceDetailslist[0].startTime;
            this.endTime = this.WorkSpaceDetailslist[0].endTime;
            this.comments = this.WorkSpaceDetailslist[0].comments;
            this.projectName = this.WorkSpaceDetailslist[0].project;
            this.AssignedTo = this.WorkSpaceDetailslist[0].assignedTo;
          }, error => {
          }
        )
      }
    }
    )

    // this.GetWorkspaceMasterMobile();

  }

  allStaffList: any;
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetAllStaff().subscribe(res => {
      this.allStaffList = res.filter(x => x.managerid == this.staffID);
    }
    )
  }

  public getBuilding() {

    this.DigiOfficeService.GetBuildinglist().subscribe(data => {

      this.buildingList = data;

    })
  }
  public getBuildingID(even) {

    this.buildingID = even.target.value;
    this.DigiOfficeService.GetFloorType(this.buildingID).subscribe(data => {

      this.floorList = data;
    })
  }
  public getFloorID(even) {
    this.floorID = even.target.value;
  }
  public getMeetingRoomType() {

    this.DigiOfficeService.GetWorkStationType_Master().subscribe(data => {

      this.roomTypeList = data;
    })
  }
  public getRoomTypeID(even) {

    this.roomTypeID = even.target.value;
    this.DigiOfficeService.GetWorkspaceMasterMobile(this.buildingID, this.roomTypeID, this.floorID).subscribe(data => {

      this.conferenceRoomList = data;
    })
  }
  mappedProjectList: any;
  projectList1: any;
  public GetProjectMasterList() {

    this.DigiOfficeService.GetProjectMasterList().subscribe(data => {

      this.projectList = data;
      this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
        debugger
        this.mappedProjectList = res.filter(x => x.staffID == this.staffID);
        let userrole = this.mappedProjectList[0].projectID.split(',');
        let FillteredModels = [];
        for (let i = 0; i < userrole.length; i++) {
          let userselectedModule = this.projectList.filter(x => x.projectName == userrole[i].trim());
          FillteredModels.push(userselectedModule[0]);
        }
        this.projectList1 = FillteredModels;
      });
    })
  }

  AssignedTo: any;
  public InsertDetails() {
    if (this.startDate == true) {
      this.endDate = this.startDate
    }

    var entity = {

      WorkStationID: this.workSpaceID,
      WorkSpaceMasterID: this.roomTypeID,
      RaisedBy: this.staffID,
      BuildingID: 19,
      FloorID: 1,
      Unit: 22,
      Request: this.purpose,
      Facilities: '1',
      StartDate: this.startDate,
      StartTime: this.startTime,
      EndDate: this.endDate,
      EndTime: this.endTime,
      Name: '',
      MobileNumber: '',
      Comments: this.comments,
      Project: this.projectName,
      AssignedTo: this.AssignedTo

    };
    this.DigiOfficeService.InsertWorkplaceRequestWeb(entity).subscribe(data => {
      if (data != null && data != 0) {
        Swal.fire("Work Allocation Added Successfully.");
        location.href = "#/WorkPlaceRequest";
      }
      else if (data == 0) {
        Swal.fire("Not Available");
      }

    });
  }
  public updatedetails() {

    var entity = {
      'ID': this.ID,
      'WorkStationID': this.workSpaceID,
      'WorkSpaceMasterID': this.roomTypeID,
      'RaisedBy': this.staffID,
      'BuildingID': this.buildingID,
      'FloorID': this.floorID,
      'Unit': 22,
      'RequestFor': this.purpose,
      'Facilities': '1',
      'StartDate': this.startDate,
      'StartTime': this.startTime,
      'EndDate': this.endDate,
      'EndTime': this.endTime,
      'Name': '',
      'MobileNumber': '',
      'Comments': this.comments,
      'Project': this.projectName,
      'AssignedTo': this.AssignedTo
    }
    this.DigiOfficeService.UpdateWorkplaceRequest(entity).subscribe(data => {
      Swal.fire('Work Allocation updated Successfully.');
      location.href = "#/WorkPlaceRequest";
    })
  }

  setstarttime() {
    debugger
    let td = this.startDate;

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    if (this.todaydate == this.startDate) {
      debugger
      var d = new Date();
      d.getHours(); // => 9
      d.getMinutes(); // =>  30
      this.mintime = d.getHours() + ":" + d.getMinutes();
    }

  }

  checktinme() {
    console.log("time :", this.startTime);
    let time = this.startTime.split(":");
    var d = new Date();
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    if (time > d.getHours()) {
      this.startTime = "01:01";
    }
    //this.mintime=d.getHours()+":"+d.getMinutes();
  }
}
