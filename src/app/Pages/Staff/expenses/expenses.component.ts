import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  Raised:boolean;
  Completed:boolean;
  ExpenseList: any;
  UserID: any;
  SDate: any;
  EDate: any;
  Search:any;
  CompletedExpenseList: any;
  filteredCompletedExpenseList: any;
  filteredExpenseList: any;
  UserName: string;
  dashboardExpenseList: any[];
  expence: any;
  staffID: string;
  pdf: number;
  search:any;
  value:any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
  constructor( private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
    // var kkk = this.Sdate.setDate(this.Sdate.getDate() - 1);
    // 
    // var lll = this.Edate.setDate(this.Edate.getDate() + 7);
   
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
    this.Raised = true;
    this.expence=0;
    this.staffID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.GetMyExpenses(this.todaydate,this.enddate);
    this.GetCompletedExpenses(this.todaydate,this.enddate);
    this.GetExpensesMaster();
   
  }

  public selectedDate(data) {
    this.todaydate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0] ;
    this.GetMyExpenses(this.todaydate,this.enddate);
    this.GetCompletedExpenses(this.todaydate,this.enddate);
  
  }
  
  public GetMyExpenses(SDATE,EDATE) {
    
    this.DigiOfficeService.GetMyExpenses(this.staffID,SDATE,EDATE).subscribe(res => {
      
      this.ExpenseList = res;
      this.filteredExpenseList=this.ExpenseList.filter(x=>x.approvalStatus=='Not Yet Approved');
      document.getElementById('def_open').click();
      for(var i=0;i<=this.ExpenseList.length;i++)
      {
        if(this.ExpenseList[i].invoiceURL.includes('.pdf')){
  
          this.ExpenseList[i]['type']=0;
  
        }else if(this.ExpenseList[i].invoiceURL.includes('.jpg')){
          this.ExpenseList[i]['type']=1;
        }
        else if(this.ExpenseList[i].invoiceURL.includes('.png')){
          this.ExpenseList[i]['type']=1;
        }
        else{

          this.ExpenseList[i]['type']=2;
           
        }
        
      }  
      
    });
   }

   public GetCompletedExpenses(SDATE,EDATE) {
    
    this.DigiOfficeService.GetMyExpenses(this.staffID,SDATE,EDATE).subscribe(res => {
      
      this.CompletedExpenseList = res;
      this.filteredCompletedExpenseList=this.CompletedExpenseList.filter(x=>x.approvalStatus=='Closed');
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
      this.filteredExpenseList=this.ExpenseList.filter(x=>x.approvalStatus=='Not Yet Approved');
    } 
    else {
      this.filteredExpenseList=this.ExpenseList.filter(x =>x.expencesName==this.expence && x.approvalStatus=='Not Yet Approved');
    }
  }
   
  public openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  raisedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.ExpenseList.length; i++) {
      
      var list = {
        name: this.ExpenseList[i].name,
        ExpenceAmount: this.ExpenseList[i].expenceAmount,
        ExpencesName: this.ExpenseList[i].expencesName,
        Project: this.ExpenseList[i].project,
        SubmittedDate: this.ExpenseList[i].webdate,
        ExpenceLocation: this.ExpenseList[i].expenceLocation,
        Currency: this.ExpenseList[i].currency,
        ApprovalStatus: this.ExpenseList[i].approvalStatus,
        Comments: this.ExpenseList[i].comments
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Expense Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Expense Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

  completedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.CompletedExpenseList.length; i++) {
      
      var list = {
        Name: this.CompletedExpenseList[i].name,
        ExpenceAmount: this.CompletedExpenseList[i].expenceAmount,
        ExpencesName: this.CompletedExpenseList[i].expencesName,
        Project: this.CompletedExpenseList[i].project,
        SubmittedDate: this.CompletedExpenseList[i].webdate,
        ExpenceLocation: this.CompletedExpenseList[i].expenceLocation,
        Currency: this.CompletedExpenseList[i].currency,
        LeaveReapprovalStatusason: this.CompletedExpenseList[i].approvalStatus,
        Comments: this.CompletedExpenseList[i].comments
       
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Expense Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Expense Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
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
  public DeleteStaffExpences(id) {
    
    this.DigiOfficeService.DeleteStaffExpences(id).subscribe(
      data => {
        
        this.ngOnInit();
        Swal.fire('Expense  Deleted Successfully.');
      }, error => {
      }
    )
  }
}
