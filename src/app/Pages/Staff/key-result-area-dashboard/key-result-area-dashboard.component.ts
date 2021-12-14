import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-key-result-area-dashboard',
  templateUrl: './key-result-area-dashboard.component.html',
  styleUrls: ['./key-result-area-dashboard.component.css']
})
export class KeyResultAreaDashboardComponent implements OnInit {

  Search: any;
  kraList: any[];
  count: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {

    // this.hrID = localStorage.getItem('hrID');
    // this.staffID = localStorage.getItem('staffID');
    // this.userRoleID = localStorage.getItem('userRoleID');
    this.GetKeyResultArea();
    this.GetDesignationType();
  }

  designationList: any;

  public GetDesignationType() {

    this.DigiOfficeService.GetDesignationType().subscribe(res => {

      this.designationList = res;
    }
    )
  }

  dummlist: any;
  public GetKeyResultArea() {

    this.DigiOfficeService.GetKeyResultArea().subscribe(res => {

      this.kraList = res;
      this.dummlist = res;
      this.count = this.kraList.length;

    });
  }


  public Delete(id) {
    this.DigiOfficeService.DeleteKeyResultArea(id).subscribe(data => {
      Swal.fire("Deleted Successfully");

      this.GetKeyResultArea();
    })
  }

  roleid: any;

  public GetRoleType(even) {
    if (even.target.value != 0) {
      this.roleid = even.target.value;
      this.kraList = this.dummlist.filter(x => x.designation == this.roleid)
    } else {
      this.GetKeyResultArea()
    }
  }
}
