import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rejected-staff-expense-for-admin-dashboard',
  templateUrl: './rejected-staff-expense-for-admin-dashboard.component.html',
  styleUrls: ['./rejected-staff-expense-for-admin-dashboard.component.css']
})
export class RejectedStaffExpenseForAdminDashboardComponent implements OnInit {

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
  Sdate: any;
  Edate: any;

  constructor( private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.managerID = localStorage.getItem('managerID');
    // this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
    this.Sdate = '2019-01-01';
    this.Edate = '2020-12-31';
    this.GetExpensesListwebForAdmin();
  }
  public GetExpensesListwebForAdmin() {
    
    this.DigiOfficeService.GetExpensesListwebForAdmin(this.Sdate,this.Edate).subscribe(res => {
      
      this.approvedExpenseList = res;
      this.filteredApprovedExpenseList=this.approvedExpenseList.filter(x=>x.approvalStatus=='Rejected');
      //this.rejectedExpenseList=this.filteredExpenseList.filter(x=>x.approvalStatus=='Rejected')
    });
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
