import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approved-staff-leave-dashboard-for-receptionist',
  templateUrl: './approved-staff-leave-dashboard-for-receptionist.component.html',
  styleUrls: ['./approved-staff-leave-dashboard-for-receptionist.component.css']
})
export class ApprovedStaffLeaveDashboardForReceptionistComponent implements OnInit {
  Search:any;
  staffLeaveList: any;
  filteredstaffLeaveList: any;
  ID: any;
  TypeID: any;
  Sdate: any;
  Edate: any;
  managerID: any;
  staffID:any;
  userRoleID:any;
 
  
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
      
      this.staffLeaveList = res;
      this.filteredstaffLeaveList=this.staffLeaveList.filter(x => x.status == 'Approved' );

    });
   }
 

   
  approvedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.staffLeaveList.length; i++) {
      
      var list = {
        Buildingid: this.staffLeaveList[i].buildingid,
        LeaveTypeID: this.staffLeaveList[i].leaveTypeID,
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
