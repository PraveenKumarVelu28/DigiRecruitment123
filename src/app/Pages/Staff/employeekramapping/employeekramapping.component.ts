import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-employeekramapping',
  templateUrl: './employeekramapping.component.html',
  styleUrls: ['./employeekramapping.component.css']
})
export class EmployeekramappingComponent implements OnInit {

  staffList: any[];
  projectList: any;
  staffID: any;
  projectID: any;
  selectedItems = [];
  dropdownSettings = {};
  sDate: any;
  eDate: any;
  designation: any;

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }
  ID: any;
  ngOnInit(): void {
    this.staffID = 0;
    this.Approver1 = 0;
    this.Approver2 = 0;
    this.Approver3 = 0;
    this.projectID = 0;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'kraName',
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

    this.GetDesignationType();
    this.GetAppraisalCycle();
  }


  kraList: any;

  public GetAppraisalCycle() {

    this.DigiOfficeService.GetAppraisalCycle().subscribe(res => {

      this.kraList = res;


    });
  }


  selecteditemlist = [];
  public UserRoleList = [];
  mappedProjectList: any;
  Approver1List: any;
  Approver2List: any;
  approver3ist: any;
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.staffList = res;
    });
    this.DigiOfficeService.GetAllStaff().subscribe(res => {
      this.Approver1List = res.filter(x => x.designationID == 17);
    });
    this.DigiOfficeService.GetAllStaff().subscribe(res => {
      this.Approver2List = res.filter(x => x.designationID == 18);
    });

    this.DigiOfficeService.GetAllStaff().subscribe(res => {
      this.approver3ist = res.filter(x => x.designationID == 19);
    });



  }
  projectList1: any;
  public GetProjectMasterList() {
    debugger
    this.DigiOfficeService.GetKeyResultArea().subscribe(res => {
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
  StaffTypeID: any;
  Approver1: any;
  Approver2: any;
  Approver3: any;
  AppraisalSubmitionDate: any;
  appraiselid: any;

  public GetAppraiselID(even) {
    this.appraiselid = even.target.value;
  }

  public InsertDetails() {
    debugger
    this.projectList = '';
    for (let i = 0; i < this.selectedItems.length; i++) {

      if (this.selectedItems.length == 0) {
        Swal.fire('Please Select Kra For Staff')
      }
      else {
        var Entity = {
          'BuildingID': localStorage.getItem('buildingID'),
          'StaffTypeID': 1,
          'StaffName': this.staffID,
          'Approver1': this.Approver1,
          'Approver2': this.Approver2,
          'Approver3': this.Approver3,
          'AppraisalSubmitionDate': this.AppraisalSubmitionDate,
          'CycleStartDate': new Date(),
          'CycleEndDate': new Date(),
          'kraid': this.selectedItems[i].id,
          'AppraiselID': this.appraiselid
        }
        this.DigiOfficeService.InsertEmployeeKraMap(Entity).subscribe(
          data => {

            if (data != undefined) {
              Swal.fire('Kra Added Successfully.');
              this.InsertNotifications();
            }
            location.href = "#/Employeekramappingdashboard";

          }, error => {
          }
        )
      }
    }

  }

  public InsertNotifications() {
    var entity = {
      'StaffID': this.staffID,
      'Notification': 'New Apparaisal Request',
      'Description': 'You have Got a New Appraisal Request. Please Check'
    }
    this.DigiOfficeService.InsertNotifications(entity).subscribe(data => {

    })
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

  designationList: any;


  public GetDesignationType() {

    this.DigiOfficeService.GetDesignationType().subscribe(res => {

      this.designationList = res;
    }
    )
  }
  roleid: any;

  public GetRoleType(even) {
    debugger
    this.roleid = even.target.value;
  }
}
