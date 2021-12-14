

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  staffID: string;
  staffName: string;
  name: any;
  description: any;
  date: any;
  venue: any;
  modifiedBy: any;
  equipmentList: any;
  equipmentTypeList: any[];
  equipmentTypeID: any;
  equipmentName: any;
  startDate: any;
  endDate: any;
  notes: any;
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.equipmentTypeID=0;
    this.staffID = localStorage.getItem('staffID');
    this.staffName = localStorage.getItem('staffName');
    this.GetEquipmentType();
  }
  public GetEquipmentType(){
    this.DigiOfficeService.GetEquipment().subscribe(res => {
      
      this.equipmentList = res;
      
    });
  }
  public InsertDetails() {
    
    var Entity = {
      'UserID': this.staffID,
      'BarrowerName': this.staffName,
      'EquipmentType': this.equipmentTypeID,
      'EquipmentName': this.equipmentName,
      'StartDate': this.startDate,
      'EndDate': this.endDate,
      'Notes': this.notes
    }
    this.DigiOfficeService.InsertEmployee_Assets(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Events Added Successfully.');
        }
        location.href = "#/Expenses";
      }, error => {
      }
    )
  }

}


