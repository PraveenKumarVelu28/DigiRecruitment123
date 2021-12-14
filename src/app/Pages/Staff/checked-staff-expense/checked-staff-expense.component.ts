import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-checked-staff-expense',
  templateUrl: './checked-staff-expense.component.html',
  styleUrls: ['./checked-staff-expense.component.css']
})
export class CheckedStaffExpenseComponent implements OnInit {

  search:any;
  managerID: any;
  userID: any;
  transportExpensesList: any[];
  p: number = 1;
  UserID: string;
  pdf: number;
  value: any;
  SDate = new Date();
  EDate = new Date();
  todaydate: any;
  startdate: any;
  enddate: any
  count: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.UserID = localStorage.getItem('staffID');
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
    this.GetAllExpensesForAdmin(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllExpensesForAdmin(this.startdate,this.enddate);
  }

  public GetAllExpensesForAdmin(Sdate,Edate) {
    
    this.DigiOfficeService.GetAllExpensesForAdmin(Sdate,Edate).subscribe(res => {
      
      this.transportExpensesList = res.filter(x=>x.approvalStatus == 'Checked');
      
      this.count=this.transportExpensesList.length;
      
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


}
