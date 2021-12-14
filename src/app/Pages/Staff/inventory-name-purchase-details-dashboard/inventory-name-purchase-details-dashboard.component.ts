import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-inventory-name-purchase-details-dashboard',
  templateUrl: './inventory-name-purchase-details-dashboard.component.html',
  styleUrls: ['./inventory-name-purchase-details-dashboard.component.css']
})
export class InventoryNamePurchaseDetailsDashboardComponent implements OnInit {

  search:any;
  inventoryPurchaseList: any[];
  type: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  inventoryNameList: any[];
  inventoryNameID: any;
 value:any;
  invetoryNameId: any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.inventoryNameID=0;
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
    this.type == "Raised";
    this.GetInventoryPurchaseDetails(this.startdate, this.enddate);
    this.GetInventoryItem();
  }
  public selectedDate(data) {
    this.todaydate = data[0].toLocaleString().split(',')[0]
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetInventoryPurchaseDetails(this.startdate, this.enddate);
    
  }
  public GetInventoryPurchaseDetails(SDate,EDate){
    this.DigiOfficeService.GetInventoryPurchaseDetails(SDate,EDate).subscribe(res=>{
      this.inventoryPurchaseList = res;
    }
  )}

  public GetInventoryItem() {
    debugger
    this.DigiOfficeService.GetInventoryItem().subscribe(res => {

      this.inventoryNameList = res;

    });
  }
  public getInventoryID(even)
  {
   this.inventoryNameID=even.target.value;
   if(this.inventoryNameID==0)
   {
    this.DigiOfficeService.GetInventoryPurchaseDetails(this.startdate, this.enddate).subscribe(res=>{
      this.inventoryPurchaseList = res;
    });
   }
   else
   {
     debugger
    this.DigiOfficeService.GetInventoryPurchaseDetails(this.startdate, this.enddate).subscribe(res=>{
      this.inventoryPurchaseList = res.filter(x=>x.invetoryNameId==this.inventoryNameID);
    })
   }    
  }

  public DeleteDesignationType(id) {
    this.DigiOfficeService.DeleteDesignationType(id).subscribe(
      data => {
        
        Swal.fire('DesignationType Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

}
