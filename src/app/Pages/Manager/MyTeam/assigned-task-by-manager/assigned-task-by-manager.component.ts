import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assigned-task-by-manager',
  templateUrl: './assigned-task-by-manager.component.html',
  styleUrls: ['./assigned-task-by-manager.component.css']
})
export class AssignedTaskByManagerComponent implements OnInit {
  managerID: any;
  staffID: any;
  staffList: any[];
  taskName: any;
  startDate: any;
  endDate: any;
  notes: any;
  mytaskList: any[];
  paramID: any;
  ID: any;
  saveupdate: number;
  page: any;
  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.staffID=0;
    this.managerID = localStorage.getItem('managerID');
    this.page = this.ActivatedRoute.snapshot.params.page;
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
        this.GetBuildingStaff();
      }
      else {
        this.saveupdate = 1;

        this.DigiOfficeService.GetMyTasksweb().subscribe(
          data => {
        debugger
            this.mytaskList = data;
            this.mytaskList = this.mytaskList.filter(x => x.id == Number(this.ID));
            this.DigiOfficeService.GetBuildingStaff(this.managerID).subscribe(res => {
              this.staffList = res.filter(x=>x.supervisorID==this.managerID);
            });
            this.staffID = this.mytaskList[0].employeeID;
            this.taskName = this.mytaskList[0].taskName;
            this.startDate = this.mytaskList[0].startDate;
            this.endDate = this.mytaskList[0].endDate;
            this.notes = this.mytaskList[0].notes;

          }, error => {
          }
        )
      }
    }
    )
    // this.staffID = localStorage.getItem('staffID');
  
  }

  public GetBuildingStaff() {
    
    this.DigiOfficeService.GetBuildingStaff(this.managerID).subscribe(res => {
      
      this.staffList = res.filter(x=>x.supervisorID==this.managerID);
      
    });
   }

   public InsertDetails() {
    debugger;
    
    var Entity = {
      'ManagerID':this.managerID,
      'EmployeeID': this.staffID,
      'TaskName':this.taskName,
      'StartDate': this.startDate,
      'EndDate': this.endDate,
     'Notes':this.notes
     
    }
    this.DigiOfficeService.InsertTasks(Entity).subscribe(
      data => {
        debugger;
        if (data != undefined) {
          Swal.fire('Task Applied  Successfully.');
        }
        location.href = "#/AssignedTaskForTLDashboard";
      }, error => {
      }
    )
  }
  public updatedetails() {
    debugger
    var entity = {
      Id: this.ID,
      'ManagerID':this.managerID,
      'EmployeeID': this.staffID,
      'TaskName':this.taskName,
      'StartDate': this.startDate,
      'EndDate': this.endDate,
     'Notes':this.notes
    }
    this.DigiOfficeService.UpdateTasksweb(entity).subscribe(data => {
      Swal.fire('Task Updated Successfully.');
      location.href = "#/AssignedTaskForTLDashboard";
    })
  }

}
