import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-approved-hrstaff-leave-dashboard',
  templateUrl: './approved-hrstaff-leave-dashboard.component.html',
  styleUrls: ['./approved-hrstaff-leave-dashboard.component.css']
})
export class ApprovedHRStaffLeaveDashboardComponent implements OnInit {

  Search:any;
  staffLeaveList: any;
  filteredstaffLeaveList: any;
  ID: any;
  TypeID: any;
  managerID: any;
  staffID:any;
  userRoleID:any;
  hrID: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
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
    this.hrID = localStorage.getItem('hrID');
    this.userRoleID = localStorage.getItem('userRoleID');
    
    this.GetStaffLeaves(this.hrID,this.userRoleID,this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetStaffLeaves(this.hrID,this.userRoleID,this.startdate,this.enddate);
  }
  public GetStaffLeaves(hrID,userRoleID,Sdate,Edate) {
    
    this.DigiOfficeService.GetStaffLeaves(hrID,userRoleID,Sdate,Edate).subscribe(res => {
      
      this.staffLeaveList = res;
      this.filteredstaffLeaveList=this.staffLeaveList.filter(x => x.status == 'Approved By Manager' && x.supervisor ==this.hrID);

    });
   }

   
  approvedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.staffLeaveList.length; i++) {
      
      var list = {
        Building: this.staffLeaveList[i].building,
        LeaveType: this.staffLeaveList[i].leaveType,
        StaffName: this.staffLeaveList[i].staffName,
        Applieddate: this.staffLeaveList[i].sDateOfLeave,
        SDateOfLeave: this.staffLeaveList[i].applieddate,
        EDateOfLeave: this.staffLeaveList[i].eDateOfLeave,
        NoOfDays: this.staffLeaveList[i].noOfDays,
        LeaveReason: this.staffLeaveList[i].leaveReason,
        CoveringStaff: this.staffLeaveList[i].coveringStaff,
        Status: this.staffLeaveList[i].status
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
