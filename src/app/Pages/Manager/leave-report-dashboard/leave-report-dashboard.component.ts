
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-report-dashboard',
  templateUrl: './leave-report-dashboard.component.html',
  styleUrls: ['./leave-report-dashboard.component.css']
})
export class LeaveReportDashboardComponent implements OnInit {
  search: any;
  Sdate: any;
  Edate: any;
  buildingID: any;
  complaintList: any[];
  completedComplaintList: any[];
  buildingList: any[];
  TypeID: number;
  ID: number;
  allStaffList: any[];
  approvedStaffList: any[];
  rejectedStaffLeaveList: any[];
  pendingStaffLeaveList: any[];
  filteredapprovedStaffList: any[];
  filteredList: any[];
  filteredRejectedLeaveList: any[];
  filteredPendingStaffLeaveList: any[];
  approvedCount: number;
  rejectedStaffLeaveCount: number;
  pendingStaffLeaveListCount: number;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.Sdate = '2019-01-01';
    this.Edate = '2020-12-31';
    this.ID = 0;
    this.TypeID=0;
    this.buildingID=0;
    document.getElementById('def_open').click();
    this.GetAllStaffLeaves();
    this.GetBuildinglist();
  }

  public GetAllStaffLeaves() {
    
    this.DigiOfficeService.GetAllStaffLeaves(this.ID,this.TypeID,this.Sdate, this.Edate).subscribe(res => {
      
      this.allStaffList = res;
      this.approvedStaffList=this.allStaffList.filter(x=>x.status=='Approved');
      this.filteredapprovedStaffList=this.approvedStaffList;
      this.approvedCount=this.filteredapprovedStaffList.length;
      this.rejectedStaffLeaveList=this.allStaffList.filter(x=>x.status=='Rejected');
      this.rejectedStaffLeaveCount=this.rejectedStaffLeaveList.length;
      this.filteredRejectedLeaveList= this.rejectedStaffLeaveList;
      this.pendingStaffLeaveList=this.allStaffList.filter(x=>x.status=='Pending');
      this.pendingStaffLeaveListCount=this.pendingStaffLeaveList.length;
      this.filteredPendingStaffLeaveList=this.pendingStaffLeaveList;
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
      this.rejectedStaffLeaveList = this.rejectedStaffLeaveList.filter(x => x.buildingid == this.buildingID)
      this.filteredapprovedStaffList = this.approvedStaffList.filter(x => x.buildingid == this.buildingID)
    }
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
  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.filteredList.length; i++) {
      
      var list = {
        building: this.filteredList[i].building,
        staffName: this.filteredList[i].staffName,
        applieddate: this.filteredList[i].applieddate,
        sDateOfLeave: this.filteredList[i].sDateOfLeave,
        eDateOfLeave: this.filteredList[i].eDateOfLeave,
        noOfDays: this.filteredList[i].noOfDays,
        leaveReason: this.filteredList[i].leaveReason,
        coveringStaff: this.filteredList[i].coveringStaff,
        leavestatus: this.filteredList[i].leavestatus,
        rejectReason: this.filteredList[i].rejectReason,
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


