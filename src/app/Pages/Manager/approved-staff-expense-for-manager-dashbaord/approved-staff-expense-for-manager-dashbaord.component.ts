import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-approved-staff-expense-for-manager-dashbaord',
  templateUrl: './approved-staff-expense-for-manager-dashbaord.component.html',
  styleUrls: ['./approved-staff-expense-for-manager-dashbaord.component.css']
})
export class ApprovedStaffExpenseForManagerDashbaordComponent implements OnInit {
  Search:any;
  UserID: any;
  UserName: any;
  startDate: any;
  endDate: any;
  approvedExpenseList: any[];
  filteredApprovedExpenseList: any[];
  dashboardExpenseList: any[];
  expence: any;
  managerID: any;
  userRoleID: any;
  p: number = 1;
  pdf: number;
  staffID: string;
  username: string;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
  constructor( private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.expence=0;
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
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
    this.username = localStorage.getItem('name');
    this.GetExpensesListweb(this.managerID,this.startdate,this.enddate);
    this.GetExpensesMaster();
  }

  public GetExpensesListweb(managerID,Sdate,Edate) {
    debugger;
    this.DigiOfficeService.GetExpensesListForManagerStaff(managerID,Sdate,Edate).subscribe(res => {
      debugger;
      this.approvedExpenseList = res;
      this.filteredApprovedExpenseList=this.approvedExpenseList.filter(x=>x.approvalStatus=="Approved By Manager" && x.supervisor==this.username);
      for(var i=0;i<=this.approvedExpenseList.length;i++)
      {
        if(this.approvedExpenseList[i].invoiceURL.includes('.pdf')){
  
          this.approvedExpenseList[i]['type']=0;
  
        }else if(this.approvedExpenseList[i].invoiceURL.includes('.jpg')){
          this.approvedExpenseList[i]['type']=1;
        }
        else if(this.approvedExpenseList[i].invoiceURL.includes('.png')){
          this.approvedExpenseList[i]['type']=1;
        }
        else{

          this.approvedExpenseList[i]['type']=2;
           
        }
        
      } 
    });
   }
   public GetExpensesMaster() {
    
    this.DigiOfficeService.GetExpensesMaster().subscribe(res => {
      
      this.dashboardExpenseList = res;
    });
   }

   public getexpencesID(even) {
    
    this.expence = even.target.value;
    if (this.expence == 0) {
      this.filteredApprovedExpenseList=this.approvedExpenseList.filter(x=>x.approvalStatus=="Approved By Manager" && x.supervisor==this.username);
    } 
    else {
      this.filteredApprovedExpenseList=this.approvedExpenseList.filter(x=>x.expencesName==this.expence && x.approvalStatus=="Approved By Manager" && x.supervisor==this.username);
    }
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
  approvedexportexcel() {
    
    var itemmasterlist = []
    for (let i = 0; i < this.approvedExpenseList.length; i++) {
      
      var list = {
        name: this.approvedExpenseList[i].name,
        ExpenceAmount: this.approvedExpenseList[i].expenceAmount,
        ExpencesName: this.approvedExpenseList[i].expencesName,
        Project: this.approvedExpenseList[i].project,
        Webdate: this.approvedExpenseList[i].webdate,
        ExpenceLocation: this.approvedExpenseList[i].expenceLocation,
        Currency: this.approvedExpenseList[i].currency,
        ApprovalStatus: this.approvedExpenseList[i].approvalStatus,
        Comments: this.approvedExpenseList[i].comments
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Leave Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Leave Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
}
