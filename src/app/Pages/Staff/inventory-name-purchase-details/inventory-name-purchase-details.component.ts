import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-name-purchase-details',
  templateUrl: './inventory-name-purchase-details.component.html',
  styleUrls: ['./inventory-name-purchase-details.component.css']
})
export class InventoryNamePurchaseDetailsComponent implements OnInit {

 
  paramID: any;
  inventoryList: any[];
  inventoryNameList: any[];
  inventoryTypeID: any;
  inventoryNameID: any;
  purchaseDate: any;
  quantity: any;
  unit: any;
  vendorName: any;
  vendorPhoneNo: any;
  

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.inventoryTypeID=0;
    this.inventoryNameID=0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetInventoryItem();
    this.GetInventoryType();
    
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
  public InsertDetails() 
  {
    var Entity = {
     
      'InvetoryNameId': this.inventoryNameID,
      'PurchaseDate': this.purchaseDate,
      'InventoryTypeID': this.inventoryTypeID,
      'Quantity':this.quantity,
      'Unit':this.unit,
      'VendorName': this.vendorName,
      'VendorPhoneNo': this.vendorPhoneNo
     
      
    }
    this.DigiOfficeService.InsertInventoryPurchaseDetails(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Inventory  Purchase Details Added Successfully.');
        }
        location.href = "#/InventoryNamePurchaseDetailsDashboard";
      }, error => {
      }
    )
  }
  
  public updatedetails() {
    // var entity = {
    //   Id: this.paramID,
    //   'Designation': this.designation 
    // }
    // this.DigiOfficeService.UpdateDesignationType(entity).subscribe(data => {
    //   Swal.fire('Designation Updated Successfully.');
    //   location.href = "#/DesignationDashboard";
    // })
  }

}
