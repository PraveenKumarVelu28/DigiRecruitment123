

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';

@Component({
  selector: 'app-work-place-allocation',
  templateUrl: './work-place-allocation.component.html',
  styleUrls: ['./work-place-allocation.component.css']
})

export class WorkPlaceAllocationComponent implements OnInit {
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
  roomTypeID: string;
  conferenceRoomID: any;
  conferenceRoomList: any[];
  BuildingID: any;
  WorkStationType: any;
  FloorID: any;
  purpose:any;
  startDate:any;
  endDate:any;
  startTime:any;
  endTime:any;
  comments:any;
  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  form: FormGroup;
  ngOnInit(): void {
    this.buildingID = "";
    this.floorID = "";
    this.roomTypeID = "";
    this.conferenceRoomID="";
    this.projectID="";
    this.staffID = localStorage.getItem('staffID');
    this.staffName = localStorage.getItem('staffName');
    this.getBuilding();
    this.getMeetingRoomType();
    this.GetProjectMasterList();
    // this.GetWorkspaceMasterMobile();

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
  public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(data => {
      
      this.projectList = data;
    })
  }


  public insertDetails() {
    
    var entity = {
      WorkStationID: this.conferenceRoomID,
      WorkSpaceMasterID:  this.roomTypeID,
      RaisedBy: this.staffID,
      BuildingID: this.buildingID,
      FloorID:this.floorID,
      Unit:  22,
      Request: this.purpose,
      Facilities: '1',
      StartDate: this.startDate,
      StartTime: this.startTime,
      EndDate: this.endDate,
      EndTime: this.endTime,
      Name: '',
      MobileNumber:'',
      Comments:'',

    };
    this.DigiOfficeService.InsertWorkplaceRequest(entity).subscribe(data => {
      if (data != null) {
        Swal.fire("Work Place Request Raised Successfully.");
        location.href = "#/TravelRequest";

      }
      else {
        Swal.fire("Something Went Worng");
      }
    });
  }

}
