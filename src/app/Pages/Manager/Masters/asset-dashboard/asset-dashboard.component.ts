import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset-dashboard',
  templateUrl: './asset-dashboard.component.html',
  styleUrls: ['./asset-dashboard.component.css']
})
export class AssetDashboardComponent implements OnInit {

  search:any;
  expenseList: any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetAssetTypeMaster();
  }

  public GetAssetTypeMaster(){
    
    this.DigiOfficeService.GetAssetTypeMaster().subscribe(res=>{
      
      this.expenseList = res;
    }
  )}

  public DeleteExpenseMaster(id) {
    this.DigiOfficeService.DeleteExpenseMaster(id).subscribe(
      data => {
        
        Swal.fire('Expense Master Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }
}
