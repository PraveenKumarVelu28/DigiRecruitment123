import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-groups-approve-dashboard',
  templateUrl: './groups-approve-dashboard.component.html',
  styleUrls: ['./groups-approve-dashboard.component.css']
})
export class GroupsApproveDashboardComponent implements OnInit {
  search: any;
  staffLeaveList: any;
  filteredstaffLeaveList: any;
  ID: any;
  TypeID: any;
  Sdate: any;
  Edate: any;
  managerID: any;
  staffID: any;
  userRoleID: any;
  SDate: any;
  EDate: any;
  chatGroupList: any[];
  groupID: any;
  staffTypeList: any[];
  employeeID: number;
  userList: any[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.employeeID = 0;
    this.dropdownList = [

    ];
    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Staff",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.userRoleID = localStorage.getItem('userRoleID');
    this.GetChatGroupsToApprovebyUserID();
    this.GetStaff();

  }

  public GetChatGroupsToApprovebyUserID() {
    
    this.DigiOfficeService.GetChatGroupsToApprovebyUserID(this.staffID).subscribe(res => {
      this.chatGroupList = res;
    });
  }

  public GetStaff() {
    debugger;
    this.DigiOfficeService.GetAllUserorGroup().subscribe(res => {
      debugger;
      this.staffTypeList = res;
    });
  }

  SelectedItemsfordisplay: any;
  SelectedGroup_with_Id = [];
  selectedItems1 = [];
  displayData = [];

  onItemSelect(item: any, id) {
    debugger
    this.selectedItems1.push(item.id);

    this.displayData.push(item);
    this.SelectedItemsfordisplay = "";
    for (let i = 0; i < this.displayData.length; i++) {
      this.SelectedItemsfordisplay = this.SelectedItemsfordisplay + "," + this.displayData[i].itemName;

    }

    // this.chatGroupList[0]['SelectedItemsfordisplay'] = this.SelectedItemsfordisplay;

    console.log(item);
    console.log(this.selectedItems1);

    if (this.SelectedGroup_with_Id.length == 0) {
      let sltgroup = { group_id: id, selectedemployee: item };
      this.SelectedGroup_with_Id.push(sltgroup);
    }
  }

  OnItemDeSelect(item: any) {
    this.selectedItems1.pop();
    console.log(item);
    console.log(this.selectedItems1);
  }

  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  public approveGroup(list) {
    debugger
    this.groupID = list.id;
    let items = list.selectedItems;
    for (var i = 0; i < items.length; i++) {
      var Entity = {
        'UserID': this.managerID,
        'GroupID': this.groupID,
        'Joined': 1,
        'JoinedEmployees': items[i].id,
      }
      this.DigiOfficeService.InsertApprovedGroup(Entity).subscribe(res => {
        
        Swal.fire("Group Approved Successfully..")
        this.ngOnInit();
      });
    }
  }

  public RejectChatGroup_Table(id) {
    this.DigiOfficeService.RejectChatGroup_Table(id).subscribe(
      data => {
        
        Swal.fire('Group Rejected Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

}
