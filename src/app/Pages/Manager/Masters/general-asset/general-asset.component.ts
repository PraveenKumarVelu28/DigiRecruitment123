import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-general-asset',
  templateUrl: './general-asset.component.html',
  styleUrls: ['./general-asset.component.css']
})
export class GeneralAssetComponent implements OnInit {
  vendorList: any[];
  assetTypeList: any[];
  assetTypeID: any;
  vendorID: any;
  assetID: any;
  assetName: any;
  purchaseDate: any;
  quantity: any;
  warrantyTillDate: any;
  paramID: any;
  ID: any;
  saveupdate: number;
  generalAssetList: any[];
  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.assetTypeID = 0;
    this.vendorID = 0;
    this.GetAssetTypeMaster();
    this.GetVendorList();
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
      }
      else {
        this.saveupdate = 1;
        this.DigiOfficeService.GetGeneralAssetsMaster().subscribe(
          data => {
            this.generalAssetList = data;
            this.generalAssetList = this.generalAssetList.filter(x => x.id == this.ID);
            this.assetTypeID = this.generalAssetList[0].assetTypeID;
            this.assetName = this.generalAssetList[0].assetName;
            this.vendorID = this.generalAssetList[0].vendorID;
            this.purchaseDate = this.generalAssetList[0].purchaseDate;
            this.quantity = this.generalAssetList[0].quantity;
            this.warrantyTillDate = this.generalAssetList[0].warrantyTillDate;
            
          }, error => {
          }
        )
      }
    }
    )

  }
  public GetAssetTypeMaster() {

    this.DigiOfficeService.GetAssetTypeMaster().subscribe(res => {
      this.assetTypeList = res;
    }
    )
  }

  public GetVendorList() {

    this.DigiOfficeService.GetVendorList().subscribe(res => {

      this.vendorList = res;

    });
  }

  public InsertDetails() {
    var Entity = {
      
      'AssetTypeID' :this.assetTypeID,
      'AssetID': this.assetID,
      'AssetName' : this.assetName,
      'PurchaseDate' : this.purchaseDate,
      'Quantity' : this.quantity,
      'VendorID' : this.vendorID,
      'WarrantyTillDate' :this.warrantyTillDate

    }
    this.DigiOfficeService.InsertGeneralAssetsMaster(Entity).subscribe(
      data => {
        if (data != undefined) {
          Swal.fire('General Asset Added Successfully.');
        }
        location.href = "#/GeneralAssetsDashboard";
      }, error => {
      }
    )
  }

  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'AssetID': this.assetID,
      'AssetTypeID' :this.assetTypeID,
      'AssetName' : this.assetName,
      'PurchaseDate' : this.purchaseDate,
      'Quantity' : this.quantity,
      'VendorID' : this.vendorID,
      'WarrantyTillDate' :this.warrantyTillDate
    }
    this.DigiOfficeService.UpdateGeneralAssetsMaster(entity).subscribe(data => {
      Swal.fire('General Assets Updated Successfully.');
      location.href = "#/GeneralAssetsDashboard";
    })
  }

}
