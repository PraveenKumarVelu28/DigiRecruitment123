import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-type-dashboard',
  templateUrl: './leave-type-dashboard.component.html',
  styleUrls: ['./leave-type-dashboard.component.css']
})
export class LeaveTypeDashboardComponent implements OnInit {
  search:any;
  leaveTypeList: any[];

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetLeaveType();
  }
  public GetLeaveType(){
    
    this.DigiOfficeService.GetLeaveType().subscribe(res=>{
      
      this.leaveTypeList = res;
    }
  )}

  public DeleteLeaveTypeMaster(id) {
    this.DigiOfficeService.DeleteLeaveTypeMaster(id).subscribe(
      data => {
        
        Swal.fire('Leave Type Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

}
