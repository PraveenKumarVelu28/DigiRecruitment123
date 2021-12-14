
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-group-chat-for-admin',
  templateUrl: './group-chat-for-admin.component.html',
  styleUrls: ['./group-chat-for-admin.component.css']
})
export class GroupChatForAdminComponent implements OnInit {

  dropdownSettings = {};
  userList: any[];
  id: any;
  paramID: any;
  groupID: any;
  senderID: any;
  message: any;
  chatList: any[];
  document: Document;
  pageScrollService: any;
  x: any;

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute, private datePipe: DatePipe) {
  }

  ngOnInit() {


    //document.getElementById("defaultOpen").click();
    
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.senderID = localStorage.getItem('managerID');
    this.GetGroupMembersForChat();
    this.GetChatGroupMaster();
  }

  public GetGroupMembersForChat() {
    
    this.DigiOfficeService.GetGroupMembersForChat(this.paramID).subscribe(res => {
      
      this.userList = res;
    });
  }

  public GetChatGroupMaster() {
    
    this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
      
      this.chatList = res.filter(x => x.groupID == this.paramID);
      for (let i = 0; i < this.chatList.length; i++) {
        
        if (this.chatList[i].senderID == this.senderID) {
          this.chatList[i].position = 'right';
        }
        else
         {
          this.chatList[i].position = 'left';
        }
      }
    });
  }



  public insertchatdetails() {
    var entity = {
      'GroupID': this.paramID,
      'SenderID': this.senderID,
      'Message': this.message,
      'MessageDateTime': this.datePipe.transform(new Date(), "MM-dd-yyyy")
    }
    this.DigiOfficeService.InsertGroupChatMaster(entity).subscribe(
      data => {
        
        this.GetChatGroupMaster();
        this.message = "";
      })
  }

}
