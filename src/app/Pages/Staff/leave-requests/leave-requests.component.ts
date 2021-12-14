import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  Search: any;
  leaveList = [];
  UserID: any;
  approvedleaveList: any;
  filteredApprovedLeaves: any;
  filteredleaveList: any;
  filteredRejectedLeaves: any;
  rejectleaveList: any[];
  appliedCount: number;
  approvedCount: any;
  rejectCount: any;
  staffID: any;
  UserName: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  leaveTypeID: any;
  leaveTypeList: any[];
  constructor(private DigiOfficeService: DigiOfficeService) { }
  Applied: boolean;
  Approved: boolean;
  Rejected: boolean;
  lastDate:any;
  ngOnInit(): void {
    this.leaveTypeID=0;
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
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.staffID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.Applied = true;
    this.GetMyLeaves(this.staffID,this.startdate, this.enddate);
    this.GetLeaveType();
    // this.GetMyLeavesApproved();
    //this.GetMyLeavesReject();
  }
  
  public selectedDate(data) {
    //document.getElementById('def_open').click();
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetMyLeaves(this.staffID,this.startdate, this.enddate);
  }

  public GetMyLeaves(staffID,SDate, EDate) {
    debugger;
    this.DigiOfficeService.GetMyLeaves(staffID, SDate, EDate).subscribe(res => {
      debugger;
      this.leaveList = res;
      this.filteredleaveList = this.leaveList.filter(x => x.status == 'Not Approved' || x.status == 'Approved By Manager');
      this.appliedCount = this.filteredleaveList.length;
    document.getElementById('def_open').click();
    });
  }

  public GetLeaveType() {
    this.DigiOfficeService.GetLeaveType().subscribe(res => {
      this.leaveTypeList = res;
    });
  }
  public getleaveTypeID(even) {
    debugger;
    this.leaveTypeID = even.target.value;
    if (this.leaveTypeID == 0) {
      this.GetMyLeaves(this.staffID,this.startdate, this.enddate);
      // this.DigiOfficeService.GetMyLeaves(this.staffID,this.startdate, this.enddate).subscribe(res => {
      //   debugger;
      //   this.leaveList = res;
      //   this.filteredleaveList = this.leaveList.filter(x => x.status == 'Not Approved' || x.status == 'Approved By Manager');
      //   this.appliedCount = this.filteredleaveList.length;
      // });
    }
    else {
      this.DigiOfficeService.GetMyLeaves(this.staffID,this.startdate, this.enddate).subscribe(res => {
        debugger;
        this.leaveList = res;
        this.filteredleaveList = this.leaveList.filter(x =>x=>x.leaveTypeID==this.leaveTypeID && (x.status == 'Not Approved' || x.status == 'Approved By Manager') );
        this.appliedCount = this.filteredleaveList.length;
      });
    }
  }
  
  public DeleteStaffLeaves(id) {
    
    this.DigiOfficeService.DeleteStaffLeaves(id).subscribe(
      data => {
        
        this.ngOnInit();
        Swal.fire('Leave  Deleted Successfully.');
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

    if (cityName == "NewRequest") {
      this.filteredleaveList = this.leaveList.filter(x => x.status == 'Not Approved' || x.status == 'Approved By Manager');
      this.appliedCount = this.filteredleaveList.length;
    }
    else if (cityName == "Approved") {
      this.filteredApprovedLeaves = this.leaveList.filter(x => x.status == 'Approved');
      this.appliedCount = this.filteredApprovedLeaves.length;
    }
    else {
      this.filteredRejectedLeaves = this.leaveList.filter(x => x.status == 'Rejected');
      this.appliedCount = this.filteredRejectedLeaves.length;
    }
    
  }
  appliedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.leaveList.length; i++) {
      
      var list = {
        Building: this.leaveList[i].building,
        leavetype: this.leaveList[i].leavetype,
        StaffName: this.leaveList[i].staffName,
        Applieddate: this.leaveList[i].applieddate,
        SDateOfLeave: this.leaveList[i].sDateOfLeave,
        
        EDateOfLeave: this.leaveList[i].eDateOfLeave,
        NoOfDays: this.leaveList[i].noOfDays,
        LeaveReason: this.leaveList[i].leaveReason,
        CoveringStaff: this.leaveList[i].coveringStaff,
        Status: this.leaveList[i].status
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

  approvedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.leaveList.length; i++) {
      
      var list = {
        Buildingid: this.leaveList[i].buildingid,
        LeaveTypeID: this.leaveList[i].leaveTypeID,
        StaffName: this.leaveList[i].staffName,
        Applieddate: this.leaveList[i].sDateOfLeave,
        SDateOfLeave: this.leaveList[i].applieddate,
        EDateOfLeave: this.leaveList[i].eDateOfLeave,
        NoOfDays: this.leaveList[i].noOfDays,
        LeaveReason: this.leaveList[i].leaveReason,
        CoveringStaff: this.leaveList[i].coveringStaff,
        Status: this.leaveList[i].status
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Approved Leave Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Approved Leave Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
  rejectexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.leaveList.length; i++) {
      
      var list = {
        Buildingid: this.leaveList[i].buildingid,
        LeaveTypeID: this.leaveList[i].leaveTypeID,
        StaffName: this.leaveList[i].staffName,
        Applieddate: this.leaveList[i].sDateOfLeave,
        SDateOfLeave: this.leaveList[i].applieddate,
        EDateOfLeave: this.leaveList[i].eDateOfLeave,
        NoOfDays: this.leaveList[i].noOfDays,
        RejectReason: this.leaveList[i].rejectReason,
        CoveringStaff: this.leaveList[i].coveringStaff,
        Status: this.leaveList[i].status
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Reject Leave Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Reject Leave Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }


 
}
