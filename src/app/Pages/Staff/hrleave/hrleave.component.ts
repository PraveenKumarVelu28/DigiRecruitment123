import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-hrleave',
  templateUrl: './hrleave.component.html',
  styleUrls: ['./hrleave.component.css']
})
export class HRLeaveComponent implements OnInit {

  building: any;
  name: any;
  leaveType: any;
  sDateOfLeave: any;
  eDateOfLeave: any;
  coveringStaff: any;
  paramID: any;
  buildinglist: any[];
  buildingID: any;
  leaveTypeList: any[];
  leaveTypeID: any;
  supervisorList: any[];
  leaveReason: any;
  halfday: boolean;
  AMPMText: any;
  Supervisor: any;
  PaidBit: any;
  HalfDayBit: any;
  halfDayBit: boolean;
  staffID: any;
  UserName: any;
  roleID: number;
  managerID: any;
  hrID: any;
  stafflist: any[];
  endDate: boolean;
  todaydate: any;
  SDate: any;
  EDate: any;
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.SDate = '2019-01-01';
    this.EDate = '2025-12-31';
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.staffID = localStorage.getItem('staffID');
    this.hrID = localStorage.getItem('hrID')
    this.buildingID = localStorage.getItem('buildingID');
    this.name = localStorage.getItem('name');
    this.leaveTypeID = 0;
    this.AMPMText = 0;
    this.Supervisor = 0;
    this.coveringStaff = 0;
    this.DigiOfficeService.GetUserList().subscribe(res => {

      let temp: any = res.filter(x => x.id == this.hrID);
      this.StaffRoleType = temp[0].userRoleID;

    });
    this.halfDayBit = true;
    this.endDate = true;
    this.GetBuildinglist();
    this.GetLeaveType();
    this.GetSupervisor();
    this.GetAllStaff();

  }

  public GetBuildinglist() {

    this.DigiOfficeService.GetBuildinglist().subscribe(res => {

      this.buildinglist = res;

    });
  }
  public GetAllStaff() {

    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.stafflist = res.filter(x => x.roleType == 9 && x.id != this.staffID);

    });
  }
  public GetLeaveType() {

    this.DigiOfficeService.GetLeaveType().subscribe(res => {

      this.leaveTypeList = res;
    });
  }

  public GetSupervisor() {

    this.DigiOfficeService.GetSupervisor(this.staffID).subscribe(res => {

      this.supervisorList = res;
    });
  }


  public GetPaidBit(evn) {

    this.PaidBit = evn.target.checked;

  }

  public GetHalfDayBit(evn) {
    this.HalfDayBit = evn.target.checked;
    if (this.HalfDayBit == false) {
      this.halfday = false;
      this.endDate = true;
    } else {
      this.halfday = true;
      this.endDate = false;
    }
  }

  public getDay(evn) {
    if (this.sDateOfLeave == this.eDateOfLeave) {

      this.halfDayBit = false;
    }
    else {
      this.halfDayBit = true;
    }
  }

  brochures = [];
  imagesurl: any;
  brochures1 = [];
  public onBrochureUpload(abcd) {

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
  StaffRoleType
  public InsertDetails() {
    if (this.HalfDayBit == true) {
      this.eDateOfLeave = this.sDateOfLeave;
    }

    var Entity = {
      'Building': this.buildingID,
      'StaffName': this.staffID,
      'SDateOfLeave': this.sDateOfLeave,
      'EDateOfLeave': this.eDateOfLeave,
      'LeaveReason': this.leaveReason,
      'LeaveType': this.leaveTypeID,
      'HalfDayBit': this.HalfDayBit,
      'PaidBit': this.PaidBit,
      'Supervisor': this.Supervisor,
      'CoveringStaff': this.coveringStaff,
      'AMPMText': this.AMPMText,
      'MedicalUrl': this.imagesurl,
      'StaffRoleType': this.StaffRoleType
    }
    this.DigiOfficeService.InsertStaffLeaves(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Leave Applied  Successfully.');
        }
        location.href = "#/HRLeaveDashboard";
      }, error => {
      }
    )
  }


}
