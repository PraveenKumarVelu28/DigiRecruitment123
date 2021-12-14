import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-expenses-dashboard-for-finance',
  templateUrl: './expenses-dashboard-for-finance.component.html',
  styleUrls: ['./expenses-dashboard-for-finance.component.css']
})
export class ExpensesDashboardForFinanceComponent implements OnInit {
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
  totalexpense: any;
  count: any;
  appliedCount: number;
  staffList: any[];
  vendorList: any[];
  vendorID: any;
  staffID: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    debugger
    this.vendorID=0;
    this.staffID=0;
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
    this.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate);
    this.GetAllStaff();
    this.GetVendorList();
  }
  public selectedDate(data) {
    debugger
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate);
  }
  public GetMyExpensesForFinance(UserID,SDate,EDate) {
    debugger
    this.DigiOfficeService.GetMyExpensesForFinance(UserID,SDate,EDate).subscribe(res => {
      debugger
      this.transportExpensesList = res;
      this.appliedCount=this.transportExpensesList.length;
     
      let total1 = 0;
      this.transportExpensesList.forEach(element=> {​​​​​​​​
      total1 += element.hhhh;
            }​​​​​​​​);
     // this.totalexpense = total1.toLocaleString('en-IND');
      for(var i=0;i<=this.transportExpensesList.length;i++)
      {
        if(this.transportExpensesList[i].attachment.includes('.pdf')){
  
          this.transportExpensesList[i]['type']=0;
  
        }else if(this.transportExpensesList[i].attachment.includes('.jpg')){
          this.transportExpensesList[i]['type']=1;
        }
        else if(this.transportExpensesList[i].attachment.includes('.png')){
          this.transportExpensesList[i]['type']=2;
        }
        else{
          this.transportExpensesList[i]['type']=3;
           
        }
        
      }  
    
    

  });
  
}

public GetAllStaff() {
  this.DigiOfficeService.GetAllStaff().subscribe(res => {
    this.staffList = res;
  });
 }
 public GetVendorList() {
  this.DigiOfficeService.GetVendorList().subscribe(res => {
    this.vendorList = res;
  })
}

public getstaffID(even){
  this.staffID=even.target.value;
  this.staffID="";
  if(this.staffID==0){
    this.DigiOfficeService.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate).subscribe(res => {
      debugger
      this.transportExpensesList = res;
      this.appliedCount=this.transportExpensesList.length;
  });
  }
  this.DigiOfficeService.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate).subscribe(res => {
    debugger
    this.transportExpensesList = res.filter(x=>x.staffID == this.staffID);
    this.appliedCount=this.transportExpensesList.length;
   
    let total1 = 0;
    this.transportExpensesList.forEach(element=> {​​​​​​​​
    total1 += element.hhhh;
          }​​​​​​​​);
    this.totalexpense = total1.toLocaleString();
});
}

public getvendorID(even){
  this.vendorID=even.target.value;
  this.vendorID="";
  if(this.vendorID==0){
    this.DigiOfficeService.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate).subscribe(res => {
      debugger
      this.transportExpensesList = res;
      this.appliedCount=this.transportExpensesList.length;
  });
  }
  this.DigiOfficeService.GetMyExpensesForFinance(this.UserID,this.startdate,this.enddate).subscribe(res => {
    debugger
    this.transportExpensesList = res.filter(x=>x.vendorID == this.vendorID);
    this.appliedCount=this.transportExpensesList.length;
   
    let total1 = 0;
    this.transportExpensesList.forEach(element=> {​​​​​​​​
    total1 += element.hhhh;
          }​​​​​​​​);
    this.totalexpense = total1.toLocaleString();
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
