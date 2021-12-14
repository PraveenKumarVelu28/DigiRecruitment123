import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-leave-details-dashboard',
  templateUrl: './staff-leave-details-dashboard.component.html',
  styleUrls: ['./staff-leave-details-dashboard.component.css']
})
export class StaffLeaveDetailsDashboardComponent implements OnInit {
  Search:any;
  staffLeaveDetailsList: any[];
  p: number = 1;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetStaffLeavesCountDetails();
  }
  public GetStaffLeavesCountDetails(){
    
    this.DigiOfficeService.GetStaffLeavesCountDetails().subscribe(res=>{
      
      this.staffLeaveDetailsList = res;
    }
  )}
  

}
