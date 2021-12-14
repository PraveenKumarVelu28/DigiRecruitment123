import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {
  managerID: any;
  groupList: any;
  groupID: any;
  staffID: string;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.GetChatGroupsToApprovebyUserID();
  }

  public GetChatGroupsToApprovebyUserID() {
    
    this.DigiOfficeService.GetChatGroupsToApprovebyUserID(this.staffID).subscribe(res => {
      
      this.groupList = res;
    });
  }
  // public GetUserJoinedGroups_Table() {
  //   
  //   this.DigiOfficeService.GetApprovedGroup(this.managerID).subscribe(res => {
  //     
  //     this.groupList=res;
  //   });
  //  }
  public joinGroup(id) {
    this.groupID = id;

  }
}
