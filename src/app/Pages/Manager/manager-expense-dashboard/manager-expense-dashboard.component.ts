import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { formatDate } from "@angular/common";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manager-expense-dashboard',
  templateUrl: './manager-expense-dashboard.component.html',
  styleUrls: ['./manager-expense-dashboard.component.css']
})
export class ManagerExpenseDashboardComponent implements OnInit {

  Raised:boolean;
  Completed:boolean;
  ExpenseList: any;
  UserID: any;
  Search:any;
  CompletedExpenseList: any;
  filteredCompletedExpenseList: any;
  filteredExpenseList: any;
  UserName: string;
  dashboardExpenseList: any[];
  expence: any;
  pdf: number;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  SDate = new Date();
  EDate = new Date();
  constructor( private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
    const format = "yyyy-MM-dd";
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
    this.Raised = true;
    this.expence=0;
    this.UserID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
   
    this.GetMyExpenses(this.UserID,this.startdate,this.enddate);
    this.GetExpensesMaster();
    document.getElementById('def_open').click();
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyExpenses(this.UserID,this.startdate,this.enddate);
  }
  public GetMyExpenses(UserID,SDate,EDate) {
    debugger;
    this.DigiOfficeService.GetMyExpenses(UserID,SDate,EDate).subscribe(res => {
      debugger;
      this.ExpenseList = res;
      this.filteredExpenseList=this.ExpenseList.filter(x=>x.approvalStatus=='Not Yet Approved');
      for(var i=0;i<=this.filteredExpenseList.length;i++)
      {
        if(this.filteredExpenseList[i].invoiceURL.includes('.pdf')){
  
          this.filteredExpenseList[i]['type']=0;
  
        }else if(this.filteredExpenseList[i].invoiceURL.includes('.jpg')){
          this.filteredExpenseList[i]['type']=1;
        }
        else if(this.filteredExpenseList[i].invoiceURL.includes('.png')){
          this.filteredExpenseList[i]['type']=1;
        }
        else{

          this.filteredExpenseList[i]['type']=2;
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
        Name: this.ExpenseList[i].name,
        ExpenceAmount: this.ExpenseList[i].expenceAmount,
        ExpencesName: this.ExpenseList[i].expencesName,
        Project: this.ExpenseList[i].project,
        Webdate: this.ExpenseList[i].webdate,
        ExpenceLocation: this.ExpenseList[i].expenceLocation,
        Currency: this.ExpenseList[i].currency,
        LeaveReapprovalStatusason: this.ExpenseList[i].approvalStatus,
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

  public CanceledExpencesByID(id){
    debugger;
    this.DigiOfficeService.CanceledExpencesByID(id).subscribe(res => {
     Swal.fire('Cancel Work place Request...')
     this.ngOnInit();
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
