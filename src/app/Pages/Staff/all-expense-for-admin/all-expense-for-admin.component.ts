import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-all-expense-for-admin',
  templateUrl: './all-expense-for-admin.component.html',
  styleUrls: ['./all-expense-for-admin.component.css']
})
export class AllExpenseForAdminComponent implements OnInit {
  search:any;
  managerID: any;
  userID: any;
  transportExpensesList: any[];
  p: number = 1;
  UserID: string;
  pdf: number;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  SDate = new Date();
  EDate = new Date();
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.todaydate = formatDate(date, format, locale);
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
    this.UserID = localStorage.getItem('staffID');
    this.GetAllExpensesForAdmin(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllExpensesForAdmin(this.startdate,this.enddate);
  }
  public GetAllExpensesForAdmin(SDate,EDate) {
    
    this.DigiOfficeService.GetAllExpensesForAdmin(SDate,EDate).subscribe(res => {
      
      this.transportExpensesList = res;
      //this.appliedCount=this.filteredleaveList.length;
      
    
      for(var i=0;i<=this.transportExpensesList.length;i++)
      {
        if(this.transportExpensesList[i].invoiceURL.includes('.pdf')){
  
          this.transportExpensesList[i]['type']=0;
  
        }else if(this.transportExpensesList[i].invoiceURL.includes('.jpg')){
          this.transportExpensesList[i]['type']=1;
        }
        else if(this.transportExpensesList[i].invoiceURL.includes('.png')){
          this.transportExpensesList[i]['type']=1;
        }
        else{

          this.transportExpensesList[i]['type']=2;
           
        }
        
      }  
  });
}

invoiceURL:any;
public GetImageURL(data){
  
  this.invoiceURL=data.invoiceURL;
  if(this.invoiceURL.includes('.pdf')){
  this.pdf=1;
}
else{
  this.pdf=0;
}
}

  public approveStaffExpense(id){
    
   
    this.DigiOfficeService.ApprovedStaffExpense(id).subscribe(res => {
     
     Swal.fire('Expense Approved Successfully...')
     this.ngOnInit();
   });
  }
  
  public rejectStaffExpense(id){
    
   
    this.DigiOfficeService.RejectStaffExpense(id).subscribe(res => {
     
     Swal.fire('Expense Rejected Successfully...')
     this.ngOnInit();
   });
  }
}
