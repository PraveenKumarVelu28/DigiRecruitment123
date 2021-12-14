import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-project-mapping-dashboard',
  templateUrl: './staff-project-mapping-dashboard.component.html',
  styleUrls: ['./staff-project-mapping-dashboard.component.css']
})
export class StaffProjectMappingDashboardComponent implements OnInit {

  search:any;
  mappedProjectList: any[];
  staffList: any[];
  staffid: any;
  

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.staffid=0;
    this.GetStaffMappedProject();
    this.GetAllStaff();
  }

  public GetStaffMappedProject() {
    debugger
    this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {

      this.mappedProjectList = res;

    });
  }
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.staffList = res;

    });
  }

  public getstaffID(even)
  {
   this.staffid=even.target.value;
   if(this.staffid==0)
   {
    this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
      this.mappedProjectList = res;
    });
   }
   else
   {
    this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
      this.mappedProjectList = res.filter(x=>x.staffID==this.staffid);
    });
   }    
  }

  public Delete(id) {
    debugger
    this.DigiOfficeService.DeleteStaffMappedProject(id).subscribe(
      data => {
        Swal.fire('Project Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  } 

}
