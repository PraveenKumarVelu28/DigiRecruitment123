import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-joing-group-chat-for-admin',
  templateUrl: './joing-group-chat-for-admin.component.html',
  styleUrls: ['./joing-group-chat-for-admin.component.css']
})
export class JoingGroupChatForAdminComponent implements OnInit {
  search:any;
  chatGroupList: any;
  groupID: any;

  
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetChatGroupsToApprove();
  }
  
  public GetChatGroupsToApprove() {
    
    this.DigiOfficeService.GetChatGroupsToApprove().subscribe(res => {
      
      this.chatGroupList = res;
    });
  }

  public joinGroup(id) {
    
    this.groupID = id;

  }
}
