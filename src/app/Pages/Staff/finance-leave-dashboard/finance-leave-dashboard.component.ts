import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-finance-leave-dashboard',
  templateUrl: './finance-leave-dashboard.component.html',
  styleUrls: ['./finance-leave-dashboard.component.css']
})
export class FinanceLeaveDashboardComponent implements OnInit {

  Search: any;
  appliedleaveList: any;
  filteredappliedleaveList: any;
  staffID: any;
  UserName: any;

  appliedCount: any;
  managerID: any;
  userRoleID: any;
  id: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  leaveTypeID: number;
  leaveTypeList: any[];
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.leaveTypeID=0;
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
    this.GetMyLeaves(this.staffID, this.startdate, this.enddate);
    this.GetLeaveType();
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyLeaves(this.staffID, this.startdate, this.enddate);
  }
  public GetMyLeaves(staffID, SDate, EDate) {
    
    this.DigiOfficeService.GetMyLeaves(staffID, SDate, EDate).subscribe(res => {
      
      this.appliedleaveList = res;
      //this.filteredappliedleaveList=this.appliedleaveList;

    });
  }
  public GetLeaveType() {
    
    this.DigiOfficeService.GetLeaveType().subscribe(res => {
      
      this.leaveTypeList = res;
    });
  }
   getleaveTypeID(even){
    
    this.leaveTypeID=even.target.value;
    if(this.leaveTypeID==0)
    {
      this.DigiOfficeService.GetMyLeaves(this.staffID, this.startdate, this.enddate).subscribe(res => {
        
        this.appliedleaveList = res;
        //this.filteredappliedleaveList=this.appliedleaveList;
  
      });
    }
    else
    {
      this.DigiOfficeService.GetMyLeaves(this.staffID, this.startdate, this.enddate).subscribe(res => {
        
        this.appliedleaveList = res.filter(x =>x.leaveTypeID==this.leaveTypeID && x.status == null);
        //this.filteredappliedleaveList=this.appliedleaveList;
      });
 
    }    
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
