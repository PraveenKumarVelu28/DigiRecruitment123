import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employeekramappingdashboard',
  templateUrl: './employeekramappingdashboard.component.html',
  styleUrls: ['./employeekramappingdashboard.component.css']
})
export class EmployeekramappingdashboardComponent implements OnInit {

  search: any;
  mappedProjectList: any[];
  staffList: any[];
  staffid: any;
  count: any;


  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.staffid = 0;
    this.GetStaffMappedProject();
    this.GetAllStaff();
    this.GetAppraisalCycle()
  }

  kraList: any;

  public GetAppraisalCycle() {

    this.DigiOfficeService.GetAppraisalCycle().subscribe(res => {

      this.kraList = res;


    });
  }
  appraisalid: any;

  public GetAppraiselID(even) {
    if (even.target.value != 0) {
      this.appraisalid = even.target.value;
      this.mappedProjectList = this.dummlist.filter(x => x.appraiselID == this.appraisalid)
    }
    else {
      this.GetStaffMappedProject()
    }


  }

  dummlist: any;

  public GetStaffMappedProject() {
    debugger
    this.DigiOfficeService.GetEmployeeKraMap().subscribe(res => {

      this.mappedProjectList = res;
      this.dummlist = res;
      this.count = this.mappedProjectList.length;
    });
  }
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.staffList = res;

    });
  }

  public getstaffID(even) {
    this.staffid = even.target.value;
    if (this.staffid == 0) {
      this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
        this.mappedProjectList = res;
      });
    }
    else {
      this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
        this.mappedProjectList = res.filter(x => x.staffName == this.staffid);
      });
    }
  }

}
