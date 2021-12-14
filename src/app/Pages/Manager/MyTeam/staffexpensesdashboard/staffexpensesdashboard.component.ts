import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-staffexpensesdashboard',
  templateUrl: './staffexpensesdashboard.component.html',
  styleUrls: ['./staffexpensesdashboard.component.css']
})
export class StaffexpensesdashboardComponent implements OnInit {
  search:any;
  Raised:boolean;
  Completed:boolean;
  staffExpenseList: any[];
  managerID: any;
  staffID: any;
  userRoleID: any;
  Sdate: any;
  Edate: any;
  filteredstaffExpenseList: any[];
  filteredCompletedStaffExpenseList: any[];
  CompletedstaffExpenseList: any[];
  dashboardExpenseList: any[];
  expence: any;
  constructor( private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
    this.Sdate = '2020-01-01';
    this.Edate = '2020-12-31';
    this.Raised = true;
    this.expence == 0;
    this.GetExpensesListweb();
    this.GetCompletedExpensesListweb();
  }
  public GetExpensesListweb() {
    
    this.DigiOfficeService.GetExpensesListweb(this.managerID,this.userRoleID,this.Sdate,this.Edate).subscribe(res => {
      
      this.staffExpenseList = res;
      //this.filteredstaffExpenseList=this.staffExpenseList.filter(x=>x.approvalStatus=='NULL');
    
    });
   }
   public GetCompletedExpensesListweb() {
    
    this.DigiOfficeService.GetExpensesListweb(this.managerID,this.userRoleID,this.Sdate,this.Edate).subscribe(res => {
      
      this.CompletedstaffExpenseList = res;
      this.filteredCompletedStaffExpenseList=this.staffExpenseList.filter(x=>x.approvalStatus=='Closed');
    
    });
   }
  Raisedclicked(data) {
    
    if (data.isTrusted == true) {
      this.Raised = true;
      this.Completed = false; 
    } else {
      this.Raised = false;
      this.Completed = false;
    }
  }
  CompletedClicked(data) {
    if (data.isTrusted == true) {
      this.Raised = false;
      this.Completed = true;
    }
    else {
      this.Raised = false;
      this.Completed = false;
    }
  }
  raisedexportexcel() {
    
    var itemmasterlist = []
    for (let i = 0; i < this.staffExpenseList.length; i++) {
      
      var list = {
        name: this.staffExpenseList[i].name,
        ExpenceAmount: this.staffExpenseList[i].expenceAmount,
        ExpencesName: this.staffExpenseList[i].expencesName,
        Project: this.staffExpenseList[i].project,
        Webdate: this.staffExpenseList[i].webdate,
        ExpenceLocation: this.staffExpenseList[i].expenceLocation,
        Currency: this.staffExpenseList[i].currency,
        ApprovalStatus: this.staffExpenseList[i].approvalStatus,
        Comments: this.staffExpenseList[i].comments
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
    for (let i = 0; i < this.CompletedstaffExpenseList.length; i++) {
      
      var list = {
        Name: this.CompletedstaffExpenseList[i].name,
        ExpenceAmount: this.CompletedstaffExpenseList[i].expenceAmount,
        ExpencesName: this.CompletedstaffExpenseList[i].expencesName,
        Project: this.CompletedstaffExpenseList[i].project,
        Webdate: this.CompletedstaffExpenseList[i].webdate,
        ExpenceLocation: this.CompletedstaffExpenseList[i].expenceLocation,
        Currency: this.CompletedstaffExpenseList[i].currency,
        LeaveReapprovalStatusason: this.CompletedstaffExpenseList[i].approvalStatus,
        Comments: this.CompletedstaffExpenseList[i].comments
       
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
