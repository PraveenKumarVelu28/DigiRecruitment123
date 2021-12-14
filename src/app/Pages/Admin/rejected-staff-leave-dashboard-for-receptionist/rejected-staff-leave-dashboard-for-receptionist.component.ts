import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rejected-staff-leave-dashboard-for-receptionist',
  templateUrl: './rejected-staff-leave-dashboard-for-receptionist.component.html',
  styleUrls: ['./rejected-staff-leave-dashboard-for-receptionist.component.css']
})
export class RejectedStaffLeaveDashboardForReceptionistComponent implements OnInit {
  search:any;
 
  filteredrejectedStaffLeaveList: any;
  ID: any;
  TypeID: any;
  Sdate: any;
  Edate: any;
  managerID: any;
  staffID:any;
  userRoleID:any;
  rejectedStaffLeaveList: any[];
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
    this.Sdate = '2019-01-01';
    this.Edate = '2020-12-31';
    this.GetAllStaffLeavesForReceptionist();
  }

  public GetAllStaffLeavesForReceptionist() {
    
    this.DigiOfficeService.GetAllStaffLeavesForReceptionist(this.Sdate,this.Edate).subscribe(res => {
      
      this.rejectedStaffLeaveList = res;
      this.filteredrejectedStaffLeaveList=this.rejectedStaffLeaveList.filter(x=>x.status == 'Rejected');

    });
   }


   rejectexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.rejectedStaffLeaveList.length; i++) {
      
      var list = {
        Buildingid: this.rejectedStaffLeaveList[i].buildingid,
        LeaveTypeID: this.rejectedStaffLeaveList[i].leaveTypeID,
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
