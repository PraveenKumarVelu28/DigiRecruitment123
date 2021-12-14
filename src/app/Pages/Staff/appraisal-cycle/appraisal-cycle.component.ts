import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-appraisal-cycle',
  templateUrl: './appraisal-cycle.component.html',
  styleUrls: ['./appraisal-cycle.component.css']
})
export class AppraisalCycleComponent implements OnInit {
  buildingID: any;
  kraName: any;
  kraTypeID: any;
  designation: any;
  description: any;
  keyResultAreaLsit: any[];
  buildinglist: any[];
  designationList: any[];
  kraID: any;
  performanceIndicator: any;
  kraList: any[];
  frequencyType: any;
  cycleStartDate: any;
  cycleEndDate: any;
  todaydate: any;
  appraiselcyclename: any;
  id: any;
  showbutton: any;

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.buildingID = localStorage.getItem('buildingID');
    this.kraTypeID = 0;
    this.designation = 0;

    this.ActivatedRoute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else {
        this.showbutton = 1;
        this.GetAppraisalCycle()

      }

    }
    )

    this.GetBuildinglist();
    this.GetKeyResultArea();

  }

  kraListst: any;

  public GetAppraisalCycle() {

    this.DigiOfficeService.GetAppraisalCycle().subscribe(res => {

      this.kraListst = res;

      var list = this.kraListst.filter(x => x.id == this.id)
      this.appraiselcyclename = list[0].appraiselCycleName,
        this.cycleStartDate = list[0].cycleStartDate,
        this.cycleEndDate = list[0].cycleEndDate,
        this.frequencyType = list[0].frequencyType

    });
  }

  public GetBuildinglist() {

    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      this.buildinglist = res;

    });
  }
  public GetKeyResultArea() {
    this.DigiOfficeService.GetKeyResultArea().subscribe(res => {

      this.kraList = res;

    });
  }

  StaffRoleType
  public InsertDetails() {
    debugger
    var Entity = {
      'BuildingID': this.buildingID,
      'FrequencyType': this.frequencyType,
      'CycleStartDate': this.cycleStartDate,
      'CycleEndDate': this.cycleEndDate,
      'AppraiselCycleName': this.appraiselcyclename
    }
    this.DigiOfficeService.InsertAppraisalCycle(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Appraisal Added Successfully.');
        }
        location.href = "#/AppraisalCycleDashboard";
      }, error => {
      }
    )
  }





  public UpdateDetails() {
    debugger
    var Entity = {
      'ID': this.id,
      'FrequencyType': this.frequencyType,
      'CycleStartDate': this.cycleStartDate,
      'CycleEndDate': this.cycleEndDate,
      'AppraiselCycleName': this.appraiselcyclename
    }
    this.DigiOfficeService.UpdateAppraisalCycle(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Appraisal Added Successfully.');
        }
        location.href = "#/AppraisalCycleDashboard";
      }, error => {
      }
    )
  }

}
