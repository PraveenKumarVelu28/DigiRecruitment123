import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css']
})
export class InventoryItemsComponent implements OnInit {

  expencesName: any;
  paramID: any;
 
  saveupdate: any;
  expenseList: any[];
  ID: any;
  ExpencesName: any;
  InventoryTypeID: any;
  inventoryName: any;
  quantity: any;
  consumed: any;
  inventoryList: any[];
  inventoryTypeID: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.inventoryTypeID-0;
    this.GetInventoryType();
    
  }

  public GetInventoryType() {
    debugger
    this.DigiOfficeService.GetInventoryType().subscribe(res => {

      this.inventoryList = res;

    });
  }

  public InsertDetails() 
  
  {
debugger
    var Entity = {
      'InventoryTypeID': this.inventoryTypeID,
      'InventoryName': this.inventoryName ,
      
    }
    this.DigiOfficeService.InsertInventoryItem(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire(' Successfully.');
        }
        location.href = "#/InventoryItemDashboard";
      }, error => {
      }
    )
  }

}
