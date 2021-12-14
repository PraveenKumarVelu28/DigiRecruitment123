import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-staff-leaves-dashborad',
  templateUrl: './all-staff-leaves-dashborad.component.html',
  styleUrls: ['./all-staff-leaves-dashborad.component.css']
})
export class AllStaffLeavesDashboradComponent implements OnInit {
  search: any;
  ID: any;
  staffID: any;
  userRoleID: any;
  Sdate: any;
  Edate: any;
  allStaffList: any[];
  TypeID: number;
  approvedStaffList: any[];
  rejectedStaffLeaveList: any[];
  pendingStaffLeaveList: any[];
  approvedFilteredLeaveList: any[];
  buildingList: any[];
  buildingID: any;

  p: number = 1;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.ID = 0;
    this.TypeID = 0;
    this.buildingID=0;
    this.Sdate = '2020-01-01';
    this.Edate = '2020-12-31';
    this.GetBuildinglist();
    this.GetAllStaffLeaves();

  }
  public GetAllStaffLeaves() {
    
    this.DigiOfficeService.GetAllStaffLeaves(this.ID, this.TypeID, this.Sdate, this.Edate).subscribe(res => {
      
      this.allStaffList = res;
      this.approvedStaffList = this.allStaffList.filter(x => x.status == 'Approved');
      this.approvedFilteredLeaveList = this.approvedStaffList;
      this.rejectedStaffLeaveList = this.allStaffList.filter(x => x.status == 'Rejected');
      this.pendingStaffLeaveList = this.allStaffList.filter(x => x.status == 'Pending');
      //this.appliedCount=this.filteredleaveList.length;
    });
  }
  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildingList = res;
    });
  }
  public getbuildingID(even) {
    
    this.buildingID = even.target.value;
    if (this.buildingID == "") {
      this.GetAllStaffLeaves();
    }
    else {
      this.approvedFilteredLeaveList = this.approvedStaffList.filter(x => x.buildingid == this.buildingID)
    }
  }

  public Delete(id) {
    
    this.DigiOfficeService.DeleteStaffLeaves(id).subscribe(res => {
      
      this.GetAllStaffLeaves();
      Swal.fire('Deleted Succassfully.');
    }
    )
  }
  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.approvedFilteredLeaveList.length; i++) {
      
      var list = {
        building: this.approvedFilteredLeaveList[i].building,
        staffName: this.approvedFilteredLeaveList[i].staffName,
        applieddate: this.approvedFilteredLeaveList[i].applieddate,
        sDateOfLeave: this.approvedStaffList[i].sDateOfLeave,
        eDateOfLeave: this.approvedFilteredLeaveList[i].eDateOfLeave,
        noOfDays: this.approvedFilteredLeaveList[i].noOfDays,
        leaveReason: this.approvedFilteredLeaveList[i].leaveReason,
        coveringStaff: this.approvedFilteredLeaveList[i].coveringStaff,
        leavestatus: this.approvedFilteredLeaveList[i].leavestatus,
        rejectReason: this.approvedFilteredLeaveList[i].rejectReason,
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
