import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-type-dashboard',
  templateUrl: './expense-type-dashboard.component.html',
  styleUrls: ['./expense-type-dashboard.component.css']
})
export class ExpenseTypeDashboardComponent implements OnInit {
  search:any;
  expenseList: any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetExpensesMaster();
  }

  public GetExpensesMaster(){
    
    this.DigiOfficeService.GetExpensesMaster().subscribe(res=>{
      
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
