import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  Search: any;
  leaveList = [];
  UserID: any;
  SDate: any;
  EDate: any;
  
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

  constructor(private DigiOfficeService: DigiOfficeService) { }
  Applied: boolean;
  Approved: boolean;
  Rejected: boolean;

  ngOnInit(): void {
    this.staffID = localStorage.getItem('staffID');
    this.UserName = localStorage.getItem('Name');
    this.SDate = '2019-01-01';
    this.EDate = '2020-12-31';
    this.Applied = true;
    this.GetMyLeaves();
    document.getElementById('def_open').click();
    // this.GetMyLeavesApproved();
    //this.GetMyLeavesReject();
  }

  // public GetMyLeaves() {
  //   
  //   this.DigiOfficeService.GetMyLeaves(this.staffID, this.SDate, this.EDate).subscribe(res => {
  //     
  //     this.leaveList = res;
  //     this.filteredleaveList = this.leaveList.filter(x => x.status == 'Not Approved');
  //     this.appliedCount = this.filteredleaveList.length;
  //   });
  // }

  public GetMyLeaves() {
    
    this.DigiOfficeService.GetMyLeaves(this.staffID, this.SDate, this.EDate).subscribe(res => {
      
      this.leaveList = res;
      this.filteredleaveList = this.leaveList.filter(x => x.status == 'Not Approved');
      this.appliedCount = this.filteredleaveList.length;

      this.filteredApprovedLeaves = this.leaveList.filter(x => x.status == 'Approved');
      this.approvedCount = this.filteredApprovedLeaves.length;

      this.filteredRejectedLeaves = this.leaveList.filter(x => x.status == 'Rejected');
      this.rejectCount = this.filteredRejectedLeaves.length;

    });
   
  
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
  }

  // Appliedclicked(data) {
  //   
  //   if (data.isTrusted == true) {
  //     this.Approved = false;
  //     this.Rejected = false;
  //     this.Applied = true;
  //   } else {
  //     this.Approved = false;
  //     this.Rejected = false;
  //     this.Applied = false;
  //   }
  // }

  // ApprovedClicked(data) {
  //   if (data.isTrusted == true) {
  //     this.Approved = true;
  //     this.Rejected = false;
  //     this.Applied = false;
  //   }
  //   else {
  //     this.Approved = false;
  //     this.Rejected = false;
  //     this.Applied = false;
  //   }
  // }

  // RejectedClicked(data) {
  //   if (data.isTrusted == true) {
  //     this.Approved = false;
  //     this.Rejected = true;
  //     this.Applied = false;
  //   }
  //   else {
  //     this.Approved = false;
  //     this.Rejected = false;
  //     this.Applied = false;
  //   }
  // }

  appliedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.leaveList.length; i++) {
      
      var list = {
        Building: this.leaveList[i].building,
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
        Building: this.leaveList[i].building,
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
        Building: this.leaveList[i].building,
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
