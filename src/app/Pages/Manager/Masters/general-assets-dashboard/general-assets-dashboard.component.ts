import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-assets-dashboard',
  templateUrl: './general-assets-dashboard.component.html',
  styleUrls: ['./general-assets-dashboard.component.css']
})
export class GeneralAssetsDashboardComponent implements OnInit {
  search:any;
  expenseList: any;
  count: any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void
   {
    this.GetGeneralAssetsMaster();
  }

  public GetGeneralAssetsMaster(){
    
    this.DigiOfficeService.GetGeneralAssetsMaster().subscribe(res=>{
      
      this.expenseList = res;
      this.count=this.expenseList.length;
    }
  )}

  public Delete(id) {
    this.DigiOfficeService.DeleteGeneralAssetsMaster(id).subscribe(
      data => {
        Swal.fire('General Asset Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

}
