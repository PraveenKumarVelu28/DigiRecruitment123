import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-time-sheets-for-manager',
  templateUrl: './add-time-sheets-for-manager.component.html',
  styleUrls: ['./add-time-sheets-for-manager.component.css']
})
export class AddTimeSheetsForManagerComponent implements OnInit {
  buildingList: any[];
  buildingID: any;
  floorList: any[];
  projectList: any[];
  staffID: any;
  supervisorList: any[];
  staffName: any;
  floorID: any;
  date: any;
  startTime: any;
  endTime: any;
  projectName: any;
  task: any;
  supervisor: any;
  comments: any;
  qwerty = [];
  floorname: any;
  buildingname: any;
  StaffName: any;
  buildinggID: any;
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.staffID = localStorage.getItem('staffID');
    this.buildinggID=0;
    this.buildingID = localStorage.getItem('BuildingID');
    this.staffName = localStorage.getItem('name');
    this.getBuilding();
    this.GetProjectMasterList();
    this.GetSupervisor();
  }

  public getBuilding() {
    this.DigiOfficeService.GetBuildinglist().subscribe(data => {
      this.buildingList = data;
    })
  }

  public getBuildingID(even) {
    debugger;
    let build = even.target.value.split(',');
    this.buildingID = build[0];
    this.buildingname = build[1];
    //this.buildingID = even.target.value;
    this.DigiOfficeService.GetFloorType(this.buildingID).subscribe(data => {
      this.floorList = data;
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
  public GetSupervisor() {

    this.DigiOfficeService.GetSupervisor(this.staffID).subscribe(res => {

      this.supervisorList = res;
    });
  }

  public getFloorID(even) {
    let trety = even.target.value.split(',');
    this.floorID = trety[0];
    this.floorname = trety[1];
  }

  public AddDetails() {
    debugger
    var Entity = {
      //'Building': this.buildingID,
      //'BuildingName':this.buildingname,
      'StaffName': this.staffName,

      'FloorID': this.floorID,
      'FloorName': this.floorname,
      'Date': this.date,
      'StartTime': this.startTime,
      'EndTime': this.endTime,
      'ProjectName': this.projectName,
      'Task': this.task,
      'Supervisor': this.supervisor,
      'Comments': this.comments
    }
    this.qwerty.push(Entity);
    this.buildingID = '';
    //this.staffID='';
  }

  public InsertDetails() {
    debugger;
    for (let i = 0; i < this.qwerty.length; i++) {
      debugger;
      var Entity = {
        //'Building': this.qwerty[i].Building,
        'StaffID': this.staffID,
        'Floor': this.qwerty[i].FloorName,
        'Date': this.qwerty[i].Date,
        'StartTime': this.qwerty[i].StartTime,
        'EndTime': this.qwerty[i].EndTime,
        'Project': this.qwerty[i].ProjectName,
        'Task': this.qwerty[i].Task,
        'Supervisor': this.qwerty[i].Supervisor,
        'Comments': this.qwerty[i].Comments
      }
      this.DigiOfficeService.InsertTimeSheets_Table(Entity).subscribe(data => {
        Swal.fire("TimeSheet Added");
        location.href = "#/TimeSheetsForHr";

      });
    }


  }

}
