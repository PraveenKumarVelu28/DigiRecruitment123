import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-performance-indicator-dashboard',
  templateUrl: './performance-indicator-dashboard.component.html',
  styleUrls: ['./performance-indicator-dashboard.component.css']
})
export class PerformanceIndicatorDashboardComponent implements OnInit {

  Search: any;
  kraList: any[];
  pilist: any[];
  count: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {

    // this.hrID = localStorage.getItem('hrID');
    // this.staffID = localStorage.getItem('staffID');
    // this.userRoleID = localStorage.getItem('userRoleID');
    this.GetPerformanceIndicator();
    this.GetKeyResultArea();
  }


  dummlist: any;
  public GetKeyResultArea() {

    this.DigiOfficeService.GetKeyResultArea().subscribe(res => {

      this.kraList = res;
      this.dummlist = res;
      this.count = this.kraList.length;

    });
  }

  kraname: any;


  public GetkraName(even) {
    if (even.target.value != 0) {
      this.kraname = even.target.value;
      this.pilist = this.dummpilist.filter(x => x.resultAreaName == this.kraname)
    }
    else {
      this.GetPerformanceIndicator();
    }

  }
  dummpilist: any;

  public GetPerformanceIndicator() {

    this.DigiOfficeService.GetPerformanceIndicator().subscribe(res => {

      this.pilist = res;
      this.dummpilist = res;
      this.count = this.pilist.length;

    });
  }



  public Delete(id) {
    this.DigiOfficeService.DeletePerformanceIndicator(id).subscribe(data => {
      Swal.fire("Deleted Successfully");

      this.GetPerformanceIndicator();
    })
  }
}
