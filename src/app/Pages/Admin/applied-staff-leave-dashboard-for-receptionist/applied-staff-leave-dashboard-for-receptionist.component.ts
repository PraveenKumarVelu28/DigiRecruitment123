import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applied-staff-leave-dashboard-for-receptionist',
  templateUrl: './applied-staff-leave-dashboard-for-receptionist.component.html',
  styleUrls: ['./applied-staff-leave-dashboard-for-receptionist.component.css']
})
export class AppliedStaffLeaveDashboardForReceptionistComponent implements OnInit {

  Search:any;
  appliedleaveList: any;
  filteredappliedleaveList: any;
  staffID: any;
  UserName: any;
  Sdate: any;
  Edate: any;
  appliedCount: any;
  managerID: any;
  userRoleID: any;
  id: any;
  rejectReason: any;

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
      
      this.appliedleaveList = res;
      this.filteredappliedleaveList=this.appliedleaveList.filter(x => x.status == 'Not Approved');

    });
   }
 
   public approveStaffLeave(id){
    
   
    this.DigiOfficeService.ApprovedStaffLeaves(id).subscribe(res => {
     
     Swal.fire('Leave Approved Successfully...')
     this.ngOnInit();
   });
  }
  
  public rejectStaffLeave(id){
    
   
    this.DigiOfficeService.RejctedStaffLeaves(this.staffID,this.rejectReason).subscribe(res => {
     
     Swal.fire('Leave Rejected Successfully...')
     this.ngOnInit();
   });
  }

  appliedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.appliedleaveList.length; i++) {
      
      var list = {
        Buildingid: this.appliedleaveList[i].buildingid,
        LeaveTypeID: this.appliedleaveList[i].leaveTypeID,
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
