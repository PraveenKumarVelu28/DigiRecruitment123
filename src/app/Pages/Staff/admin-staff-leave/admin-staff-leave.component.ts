import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-admin-staff-leave',
  templateUrl: './admin-staff-leave.component.html',
  styleUrls: ['./admin-staff-leave.component.css']
})
export class AdminStaffLeaveComponent implements OnInit {
  Search:any;
  appliedleaveList: any;
  filteredappliedleaveList: any;
  staffID: any;
  UserName: any;
  appliedCount: any;
  managerID: any;
  userRoleID: any;
  id: any;
  allStaffList: any[];
  p: number = 1;
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
    this.userRoleID = localStorage.getItem('userRoleID');
    this.GetAllStaffLeavesForAdmin(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllStaffLeavesForAdmin(this.startdate,this.enddate);
  }
  public GetAllStaffLeavesForAdmin(Sdate,Edate) {
    debugger
    this.DigiOfficeService.GetAllStaffLeavesForAdmin(Sdate,Edate).subscribe(res => {
      debugger
      this.allStaffList = res.filter(x=>x.staffSupervisor==this.managerID);
      //this.filteredappliedleaveList=this.appliedleaveList.filter(x => x.status == null);

    });
   }
 
   public approveStaffLeaveByAdmin(id){
    
   
    this.DigiOfficeService.ApprovedStaffLeavesByAdmin(id).subscribe(res => {
     
     Swal.fire('Leave Approved Successfully...')
     this.ngOnInit();
   });
  }
  
  public rejectStaffLeaveByAdmin(id){
    
   
    this.DigiOfficeService.RejctedStaffLeavesByAdmin(id).subscribe(res => {
     
     Swal.fire('Leave Rejected Successfully...')
     this.ngOnInit();
   });
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.allStaffList.length; i++) {
      
      var list = {
        Building: this.allStaffList[i].building,
        LeaveType: this.allStaffList[i].leaveType,
        StaffName: this.allStaffList[i].staffName,
        Applieddate: this.allStaffList[i].sDateOfLeave,
        SDateOfLeave: this.allStaffList[i].applieddate,
        EDateOfLeave: this.allStaffList[i].eDateOfLeave,
        NoOfDays: this.allStaffList[i].noOfDays,
        LeaveReason: this.allStaffList[i].leaveReason,
        CoveringStaff: this.allStaffList[i].coveringStaff,
        Status: this.allStaffList[i].status
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
