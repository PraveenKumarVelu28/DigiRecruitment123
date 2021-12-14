import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expenses-dashboard-hr',
  templateUrl: './expenses-dashboard-hr.component.html',
  styleUrls: ['./expenses-dashboard-hr.component.css']
})
export class ExpensesDashboardHRComponent implements OnInit {
  search:any;
  Sdate: any;
  Edate: any;
  transportExpensesList: any;
  id: any;
  invoiceURL: any;
  list: any;
  notes: any;
  p: number = 1;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.Sdate = '2020-01-01';
    this.Edate = '2020-12-31';
    this.GetAllTransportExpensesListweb();
  }
  public GetAllTransportExpensesListweb() {
    
    this.DigiOfficeService.GetAllTransportExpensesListweb(this.Sdate,this.Edate).subscribe(res => {
      
      this.transportExpensesList = res;
      //this.appliedCount=this.filteredleaveList.length;
      
    
    for(var i=0;i<=this.transportExpensesList.length;i++)
    {
      if(this.transportExpensesList[i].invoiceURL.includes('.pdf')){

        this.transportExpensesList[i]['type']=1;

      }else{
        this.transportExpensesList[i]['type']=0;
      }
    }  
  });
}
showpdf : boolean;
showimage :boolean;
  public GetInvoiceUrl(data){
    
    this.invoiceURL=data.invoiceURL;

    if(this.invoiceURL.includes('.pdf'))
    {
     this.showpdf = true;
     this.showimage=false;
    }
else{
  this.showpdf = false;
  this.showimage=true;

}

}
AcceptExpense(id) {
  
  this.DigiOfficeService.GetAllTransportExpensesListweb(this.Sdate,this.Edate).subscribe(data => {
    if (data != undefined) {
      Swal.fire("Expense Accepted ");
      this.GetAllTransportExpensesListweb();
    }
    else {
      Swal.fire("Fail To Accept");
    }
  })
}
public ApproveAllExpensesByFinance(id) {
  this.DigiOfficeService.ApproveAllExpensesByFinance(id).subscribe(
    data => {
      
      Swal.fire('Expenses Finance Approved Successfully.');
      this.ngOnInit();
    }, error => {
    }
  )
}
public RejectAllExpensesByFinance(id) {
  this.DigiOfficeService.RejectAllExpensesByFinance(id,0).subscribe(
    data => {
      
      Swal.fire('Expenses Finance Reject Successfully.');
      this.ngOnInit();
    }, error => {
    }
  )
}

   

}
