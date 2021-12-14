import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, DebugEventListener, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-inventory-dashboard',
  templateUrl: './inventory-dashboard.component.html',
  styleUrls: ['./inventory-dashboard.component.css']
})
export class InventoryDashboardComponent implements OnInit {
  search:any;
  inventoryList: any[];
  todaydate: any;
  startdate: any;
  enddate: any; 
  IDate = new Date();
  RDate = new Date();
  value:any;
  TotalCount: any;
  inventoryListCopy: any[];
  InventoryTypeID: any;
  consumeCount: any;
  id: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    // Find current hour in AM-PM Format
    hours = hours % 12;
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;  
    this.GetInventoryList(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetInventoryList(this.startdate,this.enddate);
  }
  public GetInventoryList(Sdate,Edate) {
    
    this.DigiOfficeService.GetcurrentInventoryList(Sdate,Edate).subscribe(res => {
      
      this.inventoryList= res;
      this.inventoryListCopy= this.inventoryList;
      
      this.TotalCount = this.inventoryListCopy.map(a => a.currentQty).reduce(function (a, b) {
        return a + b;
      });
    })
  }
  public getconsumeitem(id) {
    debugger
    this.id = id;
  }

  public consumedItem() {
    this.DigiOfficeService.ConsumeInventory(this.id, this.consumeCount).subscribe(res => {
      
      this.GetInventoryList(this.startdate,this.enddate);
      Swal.fire('consume amount added Successfully.');

    }
    )
  }
  public Delete(id) {
    debugger
    this.DigiOfficeService.DeleteInventory(id).subscribe(
      data => {
        Swal.fire('Inventory Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }
}
