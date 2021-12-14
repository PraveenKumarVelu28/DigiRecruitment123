
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-staff-expences-dash',
  templateUrl: './all-staff-expences-dash.component.html',
  styleUrls: ['./all-staff-expences-dash.component.css']
})
export class AllStaffExpencesDashComponent implements OnInit {
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
  startDate: string;
  endDate: string;
  allExpenseList: any[];
  approvedExpenseList: any;
  rejectedExpenseList: any;

  p: number = 1;
  constructor( private DigiOfficeService: DigiOfficeService) { }
  
  ngOnInit(): void {
    this.Raised = true;
    this.expence=0;
    this.UserID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.startDate='2020-01-01';
    this.endDate='2020-10-31';
    this.GetAllExpensesListweb();
    this.GetCompletedExpenses();
    this.GetExpensesMaster();
    document.getElementById('def_open').click();
  }
  public GetAllExpensesListweb() {
    
    this.DigiOfficeService.GetAllExpensesListweb(this.startDate,this.endDate).subscribe(res => {
      
      this.allExpenseList = res;
      this.filteredExpenseList=this.allExpenseList;
      this.approvedExpenseList=this.filteredExpenseList.filter(x=>x.approvalStatus=='Closed' || x.approvalStatus=='Checked By Jenny');
      this.rejectedExpenseList=this.filteredExpenseList.filter(x=>x.approvalStatus=='Rejected')
    });
   }
   public GetCompletedExpenses() {
    
    this.DigiOfficeService.GetMyExpenses(this.UserID,this.SDate,this.EDate).subscribe(res => {
      
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
  public ApproveAllExpensesByFinance(id) {
    this.DigiOfficeService.ApproveAllExpensesByFinance(id).subscribe(
      data => {
        
        Swal.fire('Expenses Finance Approved Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }
  UpdateExpencesapprove
  public RejectAllExpensesByFinance(id) {
    this.DigiOfficeService.RejectAllExpensesByFinance(id,0).subscribe(
      data => {
        
        Swal.fire('Expenses Finance Reject Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
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
        Webdate: this.ExpenseList[i].webdate,
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
  completedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.CompletedExpenseList.length; i++) {
      
      var list = {
        Name: this.CompletedExpenseList[i].name,
        ExpenceAmount: this.CompletedExpenseList[i].expenceAmount,
        ExpencesName: this.CompletedExpenseList[i].expencesName,
        Project: this.CompletedExpenseList[i].project,
        Webdate: this.CompletedExpenseList[i].webdate,
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


  invoiceURL:any;
  public GetImageURL(data){
    
    this.invoiceURL=data.invoiceURL;
    
  }

}
