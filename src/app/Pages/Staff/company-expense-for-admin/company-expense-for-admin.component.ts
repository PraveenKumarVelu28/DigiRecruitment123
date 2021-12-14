import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-company-expense-for-admin',
  templateUrl: './company-expense-for-admin.component.html',
  styleUrls: ['./company-expense-for-admin.component.css']
})
export class CompanyExpenseForAdminComponent implements OnInit {

  search:any;
  managerID: any;
  userID: any;
  transportExpensesList: any[];
  p: number = 1;
  UserID: string;
  pdf: any;
  invoiceURL: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  SDate = new Date();
  EDate = new Date();
  attachment: any;
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
    //this.UserName = localStorage.getItem('Name');
    this.GetMyExpensesForAdmin();
    //this.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyExpensesForAdmin();
  }
  public GetMyExpensesForAdmin() {
    
    this.DigiOfficeService.GetMyExpensesForAdmin().subscribe(res => {
      
      this.transportExpensesList = res;
      //this.appliedCount=this.filteredleaveList.length;
      
    
      for(var i=0;i<=this.transportExpensesList.length;i++)
      {
        if(this.transportExpensesList[i].attachment.includes('.pdf')){
  
          this.transportExpensesList[i]['type']=0;
  
        }else if(this.transportExpensesList[i].attachment.includes('.jpg')){
          this.transportExpensesList[i]['type']=1;
        }
        else if(this.transportExpensesList[i].attachment.includes('.png')){
          this.transportExpensesList[i]['type']=1;
        }
        else{

          this.transportExpensesList[i]['type']=2;
           
        }
        
      }  
  });
  
}
public approveStaffExpenseByAdmin(id){
    
   
  this.DigiOfficeService.ApprovedCompanyExpencesByAdmin(id).subscribe(res => {
   
   Swal.fire('Company Expense Approved Successfully...')
   this.ngOnInit();
 });
}

public rejectStaffExpenseByAdmin(id){
  
 
  this.DigiOfficeService.RejectedCompanyExpencesByAdmin(id).subscribe(res => {
   
   Swal.fire('Company Expense Rejected Successfully...')
   this.ngOnInit();
 });
}




public GetImageURL(data){
  
  this.attachment=data.attachment;
  if(this.attachment.includes('.pdf')){
  this.pdf=1;
}
else{
  this.pdf=0;
}
}

}
