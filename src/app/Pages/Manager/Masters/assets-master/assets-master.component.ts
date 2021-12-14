import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assets-master',
  templateUrl: './assets-master.component.html',
  styleUrls: ['./assets-master.component.css']
})
export class AssetsMasterComponent implements OnInit {

  expencesName: any;
  paramID: any;
 
  saveupdate: any;
  expenseList: any[];
  ID: any;
  ExpencesName: any;
  assetType: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    
  }

  public InsertDetails() 
  {
    
    var Entity = {
      'AssetType': this.assetType 
    }
    this.DigiOfficeService.InsertAssetTypeMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Asset Type Added Successfully.');
        }
        location.href = "#/AssetDashboard";
      }, error => {
      }
    )
  }

  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'AssetType': this.assetType 
    }
    this.DigiOfficeService.UpdateAssetTypeMaster(entity).subscribe(data => {
      Swal.fire('Asset Type Updated Successfully.');
      location.href = "#/AssetDashboard";
    })
  }


}
