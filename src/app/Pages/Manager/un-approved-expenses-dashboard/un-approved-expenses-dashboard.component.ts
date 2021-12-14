import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-un-approved-expenses-dashboard',
  templateUrl: './un-approved-expenses-dashboard.component.html',
  styleUrls: ['./un-approved-expenses-dashboard.component.css']
})
export class UnApprovedExpensesDashboardComponent implements OnInit {
  search:any;
  Sdate: any;
  Edate: any;
  transportExpensesList: any;
  id: any;
  invoiceURL: any;
  list: any;
  notes: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.Sdate = '2020-01-01';
    this.Edate = '2020-12-31';
    this.GetAllTransportExpensesListweb();
  }
  public GetAllTransportExpensesListweb() {
    
    this.DigiOfficeService.GetAllTransportExpensesListweb(this.Sdate,this.Edate).subscribe(res => {
      
      this.transportExpensesList = res.filter(x=>x.approvalStatus=='Null');
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
  public GetInvoiceUrl(data){
    
    this.invoiceURL=data.invoiceURL;
}

}
