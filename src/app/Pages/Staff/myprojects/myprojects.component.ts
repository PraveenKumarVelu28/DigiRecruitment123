import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {

  search: any;
  mappedProjectList: any[];
  staffList: any[];
  staffid: any;
  projectList

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.staffid = 0;
    this.GetAllStaff();
    


  }
  projectList1: any;
  startdate: any;
  enddate: any;
  public GetStaffMappedProject() {
    debugger
    this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {

      this.mappedProjectList = res.filter(x => x.staffID == localStorage.getItem('staffID'));
      this.startdate = this.mappedProjectList[0].startDate;
      this.enddate = this.mappedProjectList[0].endDate;
      let userrole = this.mappedProjectList[0].projectID.split(',');
      let FillteredModels = [];
      for (let i = 0; i < userrole.length; i++) {
        let userselectedModule = this.projectList.filter(x => x.projectName == userrole[i].trim());
        FillteredModels.push(userselectedModule[0]);
      }
      this.projectList1 = FillteredModels;

    });
  }
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetProjectMasterList().subscribe(res1 => {
      this.projectList = res1;
      this.GetStaffMappedProject();
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
        this.mappedProjectList = res.filter(x => x.staffID == this.staffid);
      });
    }
  }

}
