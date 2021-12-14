import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-rejected-staff-leave-dashboard-for-finance',
  templateUrl: './rejected-staff-leave-dashboard-for-finance.component.html',
  styleUrls: ['./rejected-staff-leave-dashboard-for-finance.component.css']
})
export class RejectedStaffLeaveDashboardForFinanceComponent implements OnInit {

  search:any;
 
  filteredrejectedStaffLeaveList: any;
  ID: any;
  TypeID: any;
  managerID: any;
  staffID:any;
  userRoleID:any;
  rejectedStaffLeaveList: any[];
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
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
 
    this.GetStaffLeaves(this.managerID,this.userRoleID,this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetStaffLeaves(this.managerID,this.userRoleID,this.todaydate,this.enddate);
  }
  public GetStaffLeaves(managerID,userRoleID,SDate,EDate) {
    
    this.DigiOfficeService.GetStaffLeaves(managerID,userRoleID,SDate,EDate).subscribe(res => {
      
      this.rejectedStaffLeaveList = res;
      this.filteredrejectedStaffLeaveList=this.rejectedStaffLeaveList.filter(x=>x.status == 'Rejected' && x.supervisor==this.managerID);

    });
   }
    
   rejectedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.rejectedStaffLeaveList.length; i++) {
      
      var list = {
        Building: this.rejectedStaffLeaveList[i].building,
        LeaveType: this.rejectedStaffLeaveList[i].leaveType,
        StaffName: this.rejectedStaffLeaveList[i].staffName,
        Applieddate: this.rejectedStaffLeaveList[i].sDateOfLeave,
        SDateOfLeave: this.rejectedStaffLeaveList[i].applieddate,
        EDateOfLeave: this.rejectedStaffLeaveList[i].eDateOfLeave,
        NoOfDays: this.rejectedStaffLeaveList[i].noOfDays,
        LeaveReason: this.rejectedStaffLeaveList[i].leaveReason,
        CoveringStaff: this.rejectedStaffLeaveList[i].coveringStaff,
        Status: this.rejectedStaffLeaveList[i].status
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
