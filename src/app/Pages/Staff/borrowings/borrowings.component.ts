

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-borrowings',
  templateUrl: './borrowings.component.html',
  styleUrls: ['./borrowings.component.css']
})
export class BorrowingsComponent implements OnInit {
  userID: any;
  staffName: any;
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
    this.userID = localStorage.getItem('managerID');
    this.staffName = localStorage.getItem('staffName');
    this.GetEquipmentType();
  }
  public GetEquipmentType(){
    this.DigiOfficeService.GetEquipmentType().subscribe(res => {
      
      this.equipmentTypeList = res;
      
    });
  }
  public InsertDetails() {
    
    var Entity = {
      'UserID': this.userID,
      'BarrowerName': this.staffName,
      'EquipmentType': this.equipmentTypeID,
      'EquipmentName': this.equipmentName,
      'StartDate': this.startDate,
      'EndDate': this.endDate,
      'Supervisor' :231,
      'Notes': this.notes
    }
    this.DigiOfficeService.InsertBarrowRequest(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Borrower Request Raised Successfully.');
        }
        location.href = "#/BorrowingsDashboard";
      }, error => {
      }
    )
  }

}


