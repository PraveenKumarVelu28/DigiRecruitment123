import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-staff-project-mapping',
  templateUrl: './staff-project-mapping.component.html',
  styleUrls: ['./staff-project-mapping.component.css']
})
export class StaffProjectMappingComponent implements OnInit {

  staffList: any[];
  projectList: any;
  staffID: any;
  projectID: any;
  selectedItems = [];
  dropdownSettings = {};
  sDate: any;
  eDate: any;

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }
  ID: any;
  ngOnInit(): void {
    this.staffID = 0;
    this.projectID = 0;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'projectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.GetAllStaff();
        this.GetProjectMasterList();
      }
      else {
        this.GetAllStaff();
        this.GetProjectMasterList();

        this.DigiOfficeService.GetStaffMappedProject().subscribe(res => {
          debugger
          this.mappedProjectList = res.filter(x => x.id == this.ID);
          this.staffID = this.mappedProjectList[0].staffID;
          this.sDate = this.mappedProjectList[0].startDate;
          this.eDate = this.mappedProjectList[0].endDate;
          let userrole = this.mappedProjectList[0].projectID.split(',');
          let FillteredModels = [];
          for (let i = 0; i < userrole.length; i++) {
            let userselectedModule = this.projectList.filter(x => x.projectName == userrole[i].trim());
            FillteredModels.push(userselectedModule[0]);
            this.selectedItems.push(userselectedModule[0]);
          }
          this.projectList1 = FillteredModels;
        });
      }
    }
    )
  }
  selecteditemlist = [];
  public UserRoleList = [];
  mappedProjectList: any;
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.staffList = res;

    });
  }
  projectList1: any;
  public GetProjectMasterList() {
    debugger
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {

      this.projectList = res;

    });
  }
  onItemSelect(item: any) {
    debugger;
    this.selectedItems.push(item)
  }
  onItemDeSelect(item: any) {
    debugger;
    var index = this.selectedItems.findIndex(x => x.id == item.id)
    this.selectedItems.splice(index, 1);

  }

  public InsertDetails() {
    debugger
    this.projectList = '';
    for (let i = 0; i < this.selectedItems.length; i++) {

      if (this.selectedItems.length < 1) {
        this.projectList = this.projectList + this.selectedItems[i].projectName;
      }
      else {
        this.projectList = this.projectList + ',' + this.selectedItems[i].projectName;
      }
    }
    var Entity = {
      'StaffID': this.staffID,
      'ProjectID': this.projectList,
      'SDate': this.sDate,
      'EDate': this.eDate
    }
    this.DigiOfficeService.InsertstaffProject(Entity).subscribe(
      data => {
        for (let i = 0; i < this.selectedItems.length; i++) {
            debugger
           var Entity1={
            'StaffID': this.staffID,
            'ProjectName': this.selectedItems[i].projectName,
            'SDate': this.sDate,
            'EDate': this.eDate
           }
           this.DigiOfficeService.InsertStaffMappedProjectMobile(Entity1).subscribe(
            data => {
             
              if (data != undefined) {
                Swal.fire('Project Added Successfully.');
              }
              location.href = "#/StaffProjectMappingDashboard";
            },
            
          )
          
         
        }
        // if (data != undefined) {
        //   Swal.fire('Project Added Successfully.');
        // }
        // location.href = "#/StaffProjectMappingDashboard";
      }, error => {
      }
    )


  }
  public UpdateDetails() {
    debugger
    Swal.fire('Updated Successfully.');
  
    this.projectList = '';
    for (let i = 0; i < this.selectedItems.length; i++) {

      if (this.selectedItems.length < 1) {
        this.projectList = this.projectList + this.selectedItems[i].projectName;
      }
      else {
        this.projectList = this.projectList + ',' + this.selectedItems[i].projectName;
      }
    }
    var Entity = {
      'ID': this.ID,
      'StaffID': this.staffID,
      'ProjectID': this.projectList,
      'SDate': this.sDate,
      'EDate': this.eDate
    }
    this.DigiOfficeService.UpdateStaffMappedProject(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Project Added Successfully.');
        }
        location.href = "#/StaffProjectMappingDashboard";
      }, error => {
      }
    )
  }

}
