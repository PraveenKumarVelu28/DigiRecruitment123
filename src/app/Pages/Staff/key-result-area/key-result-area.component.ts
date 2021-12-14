import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-key-result-area',
  templateUrl: './key-result-area.component.html',
  styleUrls: ['./key-result-area.component.css']
})
export class KeyResultAreaComponent implements OnInit {
  buildingID: any;
  kraName: any;
  kraTypeID: any;
  designation: any;
  description: any;
  keyResultAreaLsit: any[];
  buildinglist: any[];
  designationList: any[];
  kraList: any;
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
        this.GetKeyResultArea()
      }

    }
    )

    this.buildingID = localStorage.getItem('buildingID');
    this.kraTypeID = 0;
    this.designation = 0;
    this.GetBuildinglist();
    this.GetDesignationType();

  }



  public GetKeyResultArea() {

    this.DigiOfficeService.GetKeyResultArea().subscribe(res => {

      this.kraList = res;
      var list = this.kraList.filter(x => x.id == this.id)
      this.buildingID = list[0].buildingID,
        this.kraName = list[0].kraName,
        this.kraTypeID = list[0].kraTypeID,
        this.designation = list[0].designation,
        this.description = list[0].description

    });
  }





  public GetBuildinglist() {

    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      this.buildinglist = res;

    });
  }
  public GetDesignationType() {

    this.DigiOfficeService.GetDesignationType().subscribe(res => {

      this.designationList = res;
    }
    )
  }

  StaffRoleType
  public InsertDetails() {

    var Entity = {
      'BuildingID': this.buildingID,
      'KraName': this.kraName,
      'KraTypeID': this.kraTypeID,
      'Designation': this.designation,
      'Description': this.description,
    }
    this.DigiOfficeService.InsertKeyResultArea(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Key Result Area Added Successfully.');
        }
        location.href = "#/KeyResultAreaDashboard";
      }, error => {
      }
    )
  }



  public UpdateDetails() {

    var Entity = {
      'ID': this.id,
      'KraName': this.kraName,
      'KraTypeID': this.kraTypeID,
      'Designation': this.designation,
      'Description': this.description,
      'BuildingID': this.buildingID,
    }
    this.DigiOfficeService.UpdateKeyResultAreas(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Key Result  Updated Successfully.');
        }
        location.href = "#/KeyResultAreaDashboard";
      }, error => {
      }
    )
  }
}
