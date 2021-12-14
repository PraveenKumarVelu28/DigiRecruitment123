import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  vendorList: any[];
  vendorID: any;
  phoneNo: any;
  inventoryList: any[];
  typeID: any;
  name: any;
  currentQty: any;
  vendorName: any;
  vendorPhoneNo: any;
  purchaseDate: any;
  paramID: any;
  ID: any;
  saveupdate: number;
  inventorylist: any[];
  inventoryNameList: any[];
  invetoryNameId: any;
  inventoryNameID: any;
  inventoryTypeID: any;
  inventoryName: any;
  quantity: any;
  consume: any;
  consumeCount: any;

  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.typeID = 0;
    this.vendorID = 0;
    this.inventoryNameID = 0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetInventoryType();
    this.GetVendorList();
    this.GetInventoryItem();
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;

      }
      else {
        this.saveupdate = 1;
        this.DigiOfficeService.GetInventorylistweb().subscribe(
          data => {
            debugger
            this.inventorylist = data;
            this.inventorylist = this.inventorylist.filter(x => x.id == this.ID);
            this.typeID = this.inventorylist[0].typeID;
            this.name = this.inventorylist[0].name;
            this.currentQty = this.inventorylist[0].currentQty;
            this.vendorName = this.inventorylist[0].vendorName;
            this.vendorPhoneNo = this.inventorylist[0].vendorPhoneNo;
            this.purchaseDate = this.inventorylist[0].purchaseDate;
            // this.DigiOfficeService.GetInventoryType().subscribe(res => {
            //   debugger
            //   this.inventoryList = res;

            // });
          }, error => {
          }
        )
      }
    }
    )

  }
  public GetInventoryType() {
    debugger
    this.DigiOfficeService.GetInventoryType().subscribe(res => {

      this.inventoryList = res;

    });
  }
  public GetInventoryItem() {
    debugger
    this.DigiOfficeService.GetInventoryItem().subscribe(res => {

      this.inventoryNameList = res;

    });
  }
  public GetVendorList() {

    this.DigiOfficeService.GetVendorList().subscribe(res => {

      this.vendorList = res;

    });
  }
  public getinventoryNameID(even) {
    debugger
    this.inventoryNameID = even.target.value;
    this.inventoryNameList = this.inventoryNameList.filter(x => x.id == this.inventoryNameID);
    this.quantity = this.inventoryNameList[0].available;

    // this.vendorList=this.vendorList[0].emailID;

  }
  public getvendorID(even) {

    this.vendorID = even.target.value;
    this.vendorList = this.vendorList.filter(x => x.id == this.vendorID);
    this.phoneNo = this.vendorList[0].phoneNo;
    // this.vendorList=this.vendorList[0].emailID;

  }
  public InsertDetails() {
    debugger
    var Entity = {
      // 'Name': this.name,
      'TypeID': this.typeID,
      'CurrentQty': this.quantity,
      'ConsumeCount': this.consumeCount,
      'VendorName': this.vendorName,
      'VendorPhoneNo': this.vendorPhoneNo,
      'InvetoryNameId': this.inventoryNameID


    }
    this.DigiOfficeService.InsertInventoryWeb(Entity).subscribe(
      data => {
        debugger
        if (data != undefined) {
          Swal.fire('Inventory Added Successfully.');
        }

        location.href = "#/InventoryDashboard";
      }, error => {
      }
    )
  }
  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'TypeID': this.typeID,
      'CurrentQty': this.quantity,
      'ConsumeCount': this.consumeCount,
      'VendorName': this.vendorName,
      'VendorPhoneNo': this.vendorPhoneNo,
      'InvetoryNameId': this.inventoryNameID

    }
    this.DigiOfficeService.UpdateInventory(entity).subscribe(data => {
      Swal.fire('Inventory  Updated Successfully.');
      location.href = "#/InventoryDashboard";
    })
  }

  public CheckQuantity() {
    debugger
    if (Number(this.consumeCount) <= Number(this.quantity)) {

    }
    else {
      Swal.fire("Cosumed Quanity Should be Less Then Avilable Quanity");
      this.consumeCount = 0;
    }
  }

}
