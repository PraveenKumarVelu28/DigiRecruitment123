import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';


// import { FormGroup } from '@angular/forms';
// import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent implements OnInit {
  buildinglist: any[];
  buildingID: any;
  staffName: any;
  staffID: any;
  selectedItems: any [];
  issueDate: any;
  notes: any;
  assetName: any;
  dropdownList: any[];
  form: FormGroup;
  dropdownSettings = {};
  paramID: any;
  employeeID: any;
  stafflist: any[];
  returnDate: any;
  mappeditems: any[];
  equipmentTypeList: any[];
  equipmentTypeID: number;
  vendorList: any[];
  vendorID: any;
  emailID: any;
  phoneNo: any;
  purchaseDate: any;
  equipmentIDList: any[];
  equipmentID: any;
  saveupdate: number;
  ID: any;
  employeeAssetsList: any[];
  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.vendorID = 0;
    this.equipmentTypeID = 0;
    this.buildingID = 0;
    this.employeeID = 0;
    this.equipmentID = 0;
    // this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.staffID = localStorage.getItem('staffID');
    this.staffName = localStorage.getItem('staffName');
    this.buildingID = localStorage.getItem('buildingID');
    this.GetBuildinglist();
    this.GetVendorList();
    this.GetEquipmentType();
    this.GetEquipmentlist();
    this.GetBuildingStaff();
    // this.GetBuildinglist();
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Modules",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;

      }
      else {
        this.saveupdate = 1;

        this.DigiOfficeService.GetAllEmployee_Assets().subscribe(
          data => {
        debugger
            this.employeeAssetsList = data;
            this.employeeAssetsList = this.employeeAssetsList.filter(x => x.id == this.ID);
            this.employeeID = this.employeeAssetsList[0].employeeID;
            this.vendorID = this.employeeAssetsList[0].vendorID;
            this.emailID = this.employeeAssetsList[0].emailID;
            this.phoneNo = this.employeeAssetsList[0].phoneNo;
            this.phoneNo = this.employeeAssetsList[0].phoneNo;
            this.purchaseDate = this.employeeAssetsList[0].purchaseDate;
            this.equipmentID = this.employeeAssetsList[0].assetID;
            this.buildingID = this.employeeAssetsList[0].buildingID;
            this.issueDate = this.employeeAssetsList[0].issueDate;
            this.notes = this.employeeAssetsList[0].notes;
            let selectemodules=  this.employeeAssetsList[0].equipmentTypeID.split(',');
            for(let k=0;k<selectemodules.length;k++){

              if(this.selectedItems==undefined){
                this.selectedItems=[];
              }
              let t=this.dropdownList.filter(x=>x.itemName==selectemodules[k]);
              this.selectedItems.push(t[0]);
            }


          }, error => {
          }
        )
      }
    }
    )

   
  }
  
  public GetBuildingStaff() {
    this.DigiOfficeService.GetBuildingStaff(this.staffID).subscribe(res => {
      this.stafflist = res;
    });
  }

  public GetVendorList() {

    this.DigiOfficeService.GetVendorList().subscribe(res => {

      this.vendorList = res;

    });
  }

  public GetBuildinglist() {

    this.DigiOfficeService.GetBuildinglist().subscribe(res => {

      this.buildinglist = res;

    });
  }
  public GetEquipmentlist() {

    this.DigiOfficeService.GetEquipmentlist(1).subscribe(data => {

      this.equipmentIDList = data;
    })
  }
  public GetEquipmentType() {

    this.DigiOfficeService.GetEquipmentType().subscribe(data => {
      debugger;
      this.dropdownList = data;
    })
  }

  public getvendorID(even) {

    this.vendorID = even.target.value;
    this.vendorList = this.vendorList.filter(x => x.id == this.vendorID);
    this.emailID = this.vendorList[0].emailID;
    this.phoneNo = this.vendorList[0].phoneNo;
    // this.vendorList=this.vendorList[0].emailID;

  }

  // public GetHalfDayBit(evn){
  //   
  //   this.HalfDayBit=evn.target.checked;
  //   if(this.HalfDayBit==false){
  //     this.halfday=false;
  //   }else{
  //     this.halfday=true;
  //   }
  // }

  selectedItems1 = [];

  onItemSelect(item: any) {
    debugger;
    // this.selectedItems.push(item);
    // this.selectedItems=this.selectedItems;
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
      'EmployeeID': this.employeeID,
      'VendorID': this.vendorID,
      'AssetID': this.equipmentID,
      'EquipmentTypeID': this.selectedItems.map(x => x.itemName).join(','),
      'BuildingID': this.buildingID,
      'IssueDate': this.issueDate,
      // 'ReturnDate': this.returnDate,
      'Notes': this.notes,
      'purchaseDate': this.purchaseDate
      // 'Assetname': this.assetName,

    }
    var entityvalidation = Object.values(Entity).filter(x => x == "" || x == undefined);
    if (entityvalidation.length == 0) {
      this.DigiOfficeService.InsertEmployee_Assets(Entity).subscribe(
        data => {

          if (data != undefined) {
            Swal.fire('Assets Added Successfully.');
          }
          location.href = "#/HRAssetsDashboard";
        }, error => {
        }
      )
    }
    else {
      alert("please fill All Fields");
    }

  }

  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'EmployeeID': this.employeeID,
      'VendorID': this.vendorID,
      'AssetID': this.equipmentID,
      'EquipmentTypeID': this.selectedItems.map(x => x.itemName).join(','),
      'BuildingID': this.buildingID,
      'IssueDate': this.issueDate,
      // 'ReturnDate': this.returnDate,
      'Notes': this.notes,
      'purchaseDate': this.purchaseDate
    }
    this.DigiOfficeService.UpdateEmployeeAssets(entity).subscribe(data => {
      Swal.fire('Assets Updated Successfully.');
      location.href = "#/HRAssetsDashboard";
    })
  }

}
