import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-performance-indicator',
  templateUrl: './performance-indicator.component.html',
  styleUrls: ['./performance-indicator.component.css']
})
export class PerformanceIndicatorComponent implements OnInit {

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
  id: any;
  showbutton: any;

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else {
        this.showbutton = 1;
        this.GetPerformanceIndicator()

      }

    }
    )


    this.buildingID = localStorage.getItem('buildingID');
    this.kraTypeID = 0;
    this.designation = 0;
    this.GetBuildinglist();
    this.GetKeyResultArea();

  }

  pilist: any;

  public GetPerformanceIndicator() {

    this.DigiOfficeService.GetPerformanceIndicator().subscribe(res => {
      debugger
      this.pilist = res;
      var list = this.pilist.filter(x => x.id == this.id)
      this.buildingID = list[0].buildingID,
        this.kraID = list[0].kraID,
        this.performanceIndicator = list[0].performanceindicator,
        this.description = list[0].description

        debugger
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
      'KraID': this.kraID,
      'PerformanceIndicator': this.performanceIndicator,
      'Description': this.description,
    }
    this.DigiOfficeService.InsertPerformanceIndicator(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Performance Indicator Added Successfully.');
        }
        location.href = "#/PerformanceIndicatorDashboard";
      }, error => {
      }
    )
  }





  public UpdateDetails() {
    debugger
    var Entity = {
      'ID': this.id,
      'BuildingID': this.buildingID,
      'KraID': this.kraID,
      'PerformanceIndicator': this.performanceIndicator,
      'Description': this.description,
    }
    this.DigiOfficeService.UpdatePerformanceIndicator(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Performance Indicator Updated Successfully.');
        }
        location.href = "#/PerformanceIndicatorDashboard";
      }, error => {
      }
    )
  }
}
