import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-appraisal-cycle-dashboard',
  templateUrl: './appraisal-cycle-dashboard.component.html',
  styleUrls: ['./appraisal-cycle-dashboard.component.css']
})
export class AppraisalCycleDashboardComponent implements OnInit {

  Search: any;
  kraList: any[];
  count: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {

    // this.hrID = localStorage.getItem('hrID');
    // this.staffID = localStorage.getItem('staffID');
    // this.userRoleID = localStorage.getItem('userRoleID');
    this.GetAppraisalCycle();
  }

  public GetAppraisalCycle() {

    this.DigiOfficeService.GetAppraisalCycle().subscribe(res => {

      this.kraList = res;
      this.count = this.kraList.length;

    });
  }


  public Delete(id) {
    this.DigiOfficeService.DeleteAppraisalCycle(id).subscribe(data => {
      Swal.fire("Deleted Successfully");
      this.GetAppraisalCycle();

    })
  }
}
