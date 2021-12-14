import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventory-item-dashboard',
  templateUrl: './inventory-item-dashboard.component.html',
  styleUrls: ['./inventory-item-dashboard.component.css']
})
export class InventoryItemDashboardComponent implements OnInit {
  search:any;
  expenseList: any;
  inventoryItemList: any[];

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetInventoryItem();
  }

  public GetInventoryItem(){
    
    this.DigiOfficeService.GetInventoryItem().subscribe(res=>{
      
      this.inventoryItemList = res;
    }
  )}

 

}
