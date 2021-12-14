import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-applied-hrstaff-leave',
  templateUrl: './applied-hrstaff-leave.component.html',
  styleUrls: ['./applied-hrstaff-leave.component.css']
})
export class AppliedHRStaffLeaveComponent implements OnInit {

  Search: any;
  appliedleaveList: any;
  filteredappliedleaveList: any;
  staffID: any;
  UserName: any;
  appliedCount: any;
  hrID: any;
  userRoleID: any;
  id: any;
  rejectReason: any;
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
    this.hrID = localStorage.getItem('hrID');
    this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
    this.GetStaffLeaves(this.hrID, this.userRoleID, this.startdate, this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetStaffLeaves(this.hrID, this.userRoleID, this.Sdate, this.Edate);
  }
  public GetStaffLeaves(hrID,userRoleID,Sdate,Edate) {
    
    this.DigiOfficeService.GetStaffLeaves(hrID,userRoleID,Sdate,Edate).subscribe(res => {
      
      this.appliedleaveList = res;
      this.filteredappliedleaveList = this.appliedleaveList.filter(x => x.status == null && x.supervisor == this.hrID);

    });
  }

  public approveStaffLeave(id) {
    

    this.DigiOfficeService.ApprovedStaffLeaves(id).subscribe(res => {
      
      Swal.fire('Leave Approved Successfully...')
      this.ngOnInit();
    });
  }
  public rejectStaffLeave(id){
    
    this.staffID = id;
   }
  public rejectStaffLeaveReason() {
    
    this.DigiOfficeService.RejctedStaffLeaves(this.staffID,this.rejectReason).subscribe(res => {
      
      Swal.fire('Leave Rejected Successfully...')
      this.ngOnInit();
    });
  }

  appliedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.appliedleaveList.length; i++) {
      
      var list = {
        Building: this.appliedleaveList[i].building,
        LeaveType: this.appliedleaveList[i].leaveType,
        StaffName: this.appliedleaveList[i].staffName,
        Applieddate: this.appliedleaveList[i].sDateOfLeave,
        SDateOfLeave: this.appliedleaveList[i].applieddate,
        EDateOfLeave: this.appliedleaveList[i].eDateOfLeave,
        NoOfDays: this.appliedleaveList[i].noOfDays,
        LeaveReason: this.appliedleaveList[i].leaveReason,
        CoveringStaff: this.appliedleaveList[i].coveringStaff,
        Status: this.appliedleaveList[i].status
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
