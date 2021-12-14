import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-list-dashboard',
  templateUrl: './holiday-list-dashboard.component.html',
  styleUrls: ['./holiday-list-dashboard.component.css']
})
export class HolidayListDashboardComponent implements OnInit {
  search:any;
  expenseList: any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetHolidayListMaster();
  }

  public GetHolidayListMaster(){
    
    this.DigiOfficeService.GetHolidayListMaster().subscribe(res=>{
      
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
