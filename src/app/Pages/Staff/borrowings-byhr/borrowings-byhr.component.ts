import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-borrowings-byhr',
  templateUrl: './borrowings-byhr.component.html',
  styleUrls: ['./borrowings-byhr.component.css']
})
export class BorrowingsBYHRComponent implements OnInit {
  userID: any;
  staffName: any;
  name: any;
  description: any;
  date: any;
  venue: any;
  dropdownSettings = {};
  modifiedBy: any;
  equipmentList: any;
  equipmentTypeList: any[];
  equipmentTypeID: any;
  equipmentName: any;
  startDate: any;
  endDate: any;
  notes: any;
  userName: any;
  stafflist: any[];
  employeeID: number;
  dropdownList: any[];
  selectedItems: any[];
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.employeeID=0;
    this.equipmentTypeID=0;
    this.userID = localStorage.getItem('staffID');
    this.userName = localStorage.getItem('name');
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Modules",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.GetBuildingStaff();
    this.GetEquipmentType();
  }
  public GetBuildingStaff() {
    
    this.DigiOfficeService.GetBuildingStaff(this.userID).subscribe(res => {
      
      this.stafflist = res;

    });
  }

  public GetEquipmentType() {
    this.DigiOfficeService.GetEquipmentType().subscribe(data => {

      this.equipmentTypeList = data;
    })
  }
  
  selectedItems1 = [];

 
  onItemSelect(item: any) {
    debugger;
    this.selectedItems.push(item);
    this.selectedItems=this.selectedItems;
  }

  OnItemDeSelect(item: any) {
    debugger;
    // this.selectedItems1.splice();
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
    // this.selectedItems1.pop();
    // console.log(item);
    // console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  public InsertDetails() {
    debugger
    var Entity = {
      'UserID': this.employeeID,
      'BarrowerName': this.userName,
      'EquipmentType': this.equipmentTypeID,
      //'EquipmentType': this.selectedItems.map(x => x.itemName).join(','),
      'EquipmentName': this.equipmentName,
      'StartDate': this.startDate,
      // 'EndDate': this.endDate,
      'Supervisor' :this.userID,
      'Notes': this.notes
    }
    this.DigiOfficeService.InsertBarrowRequest(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Borrower Request Raised Successfully.');
        }
        location.href = "#/BorrowingsDashboardForHR";
      }, error => {
      }
    )
  }
}
