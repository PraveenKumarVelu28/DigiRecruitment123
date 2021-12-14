import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-assets-by-hr',
  templateUrl: './add-assets-by-hr.component.html',
  styleUrls: ['./add-assets-by-hr.component.css']
})
export class AddAssetsByHRComponent implements OnInit {

  buildinglist: any[];
  buildingID: any;
  staffName: any;
  staffID: any;
  selectedItems: any;
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
  emailID:any;
  phoneNo:any;
  purchaseDate: any;
  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.vendorID=0;
    this.equipmentTypeID=0;
    this.buildingID = 0;
    this.employeeID = 0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.staffID = localStorage.getItem('staffID');
    this.staffName=localStorage.getItem('staffName');
    this.buildingID = localStorage.getItem('BuildingID');
    this.GetBuildinglist();

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Modules",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    this.GetBuildinglist();
    this.GetVendorList();
    this.GetEquipmentType();
    this.GetEquipmentlist();
    this.GetBuildingStaff();
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
  public GetEquipmentType(){
    this.DigiOfficeService.GetEquipmentType().subscribe(res => {
      
      this.equipmentTypeList = res;
      
    });
  }
  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildinglist = res;

    });
  }
  public GetEquipmentlist() {
    
    this.DigiOfficeService.GetEquipmentlist(1).subscribe(data => {
      
      this.dropdownList = data;
    })
  }


  public getvendorID(even) {
    
    this.vendorID = even.target.value;
      this.vendorList=this.vendorList.filter(x=>x.id==this.vendorID);
      this.emailID=this.vendorList[0].emailID;
      this.phoneNo=this.vendorList[0].phoneNo;
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
    
    this.selectedItems1.push(item);
  }

  OnItemDeSelect(item: any) {
    this.selectedItems1.pop();
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    
    console.log(items);
  }

  public InsertDetails() {
    
    
    this.mappeditems=this.selectedItems1.map(x=>x.assetID);
    let abcd =this.mappeditems.join(',');
  
    
    var Entity = {
      'EmployeeID': this.staffID,
      'VendorID' : this.vendorID,
      'EquipmentTypeID' :this.equipmentTypeID,
      'AssetID': abcd,
      'BuildingID': this.buildingID,
      'IssueDate': this.issueDate,
      'ReturnDate': this.returnDate,
      'Notes': this.notes,
      'purchaseDate':this.purchaseDate
      // 'Assetname': this.assetName,

    }
    this.DigiOfficeService.InsertEmployee_Assets(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Assets Added Successfully.');
        }
        location.href = "#/AssetsDashboard";
      }, error => {
      }
    )
  }

}
