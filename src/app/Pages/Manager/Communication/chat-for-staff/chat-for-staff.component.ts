import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat-for-staff',
  templateUrl: './chat-for-staff.component.html',
  styleUrls: ['./chat-for-staff.component.css']
})
export class ChatForStaffComponent implements OnInit {

  Search: any;
  dropdownSettings = {};
  userList: any[];
  id: any;
  paramID: any;
  groupID: any;
  senderID: any;
  message: any;
  chatList: any[];
  staffList: any[];
  TotalMessage = [];
  MsgValue: any;
  GID: any;
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) {
  }
  GroupDetailsOfStaffLists: any;
  filteredChatList: any;
  ngOnInit() {
    
    
    //this.paramID = this.ActivatedRoute.snapshot.params.id;
    // this.senderID = localStorage.getItem('managerID');
    this.senderID = localStorage.getItem('staffID');
    this.GetChatForStaff();
    this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
      
      this.chatList = res;

    });

   
    this.DigiOfficeService.GetChatForStaff(this.senderID).subscribe(res => {
      
      this.GroupDetailsOfStaffLists = res;
      {
        for (let k = 0; k < this.GroupDetailsOfStaffLists.length; k++) {

          let GroupID = this.GroupDetailsOfStaffLists[k].groupID;

          this.filteredChatList = this.chatList.filter(x => x.groupID == GroupID && x.readBit==0);

          this.GroupDetailsOfStaffLists[k]["Count"]=this.filteredChatList.length;

        }
      }
    });
  }

  public GetChatForStaff() {
    
    this.DigiOfficeService.GetChatForStaff(this.senderID).subscribe(res => {
      
      this.GroupDetailsOfStaffLists = res;
    });
  }

  FilteredChaLists = [];
  public GetChatGroupMaster() {
    
    this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
      
      this.chatList = res;
      for (let i = 0; i < this.GroupDetailsOfStaffLists.length; i++) {
        for (let j = 0; j < this.chatList.length; j++) {
          if (this.GroupDetailsOfStaffLists[i].groupID == this.chatList[j].groupID) {
            this.FilteredChaLists.push(this.chatList[j]);
            this.chatList[j].position = 'right';
          }
          else {
            this.chatList[j].position = 'left';
          }
        }
      }
    });
  }

  public insertchatdetails() {
    var entity = {
      'GroupID': this.GroupID,
      'SenderID': this.senderID,
      'Message': this.message
    }
    this.DigiOfficeService.InsertGroupChatMaster(entity).subscribe(
      data => {
        

        this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
          
          this.chatList = res.filter(x => x.groupID == this.GroupID);
          for (let i = 0; i < this.chatList.length; i++) {
            if (this.chatList[i].senderID == this.senderID) {
              this.chatList[i].position = 'right';
            }
            else {
              this.chatList[i].position = 'left';
            }
          }
        });
        this.message = "";
      })
  }


  GroupName: any;
  GroupID: any;
  public GetGroupDetails(evn) {
    
    this.GroupName = evn.groupName;
    this.GroupID = evn.groupID;

    this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
      
      this.chatList = res.filter(x => x.groupID == this.GroupID);
      for (let i = 0; i < this.chatList.length; i++) {
        if (this.chatList[i].senderID == this.senderID) {
          this.chatList[i].position = 'right';
        }
        else {
          this.chatList[i].position = 'left';
        }
      }
    });
    this.DigiOfficeService.UpdateGroupChatMaster(this.GroupID).subscribe(
      data => {
        
        this.DigiOfficeService.GetChatForStaff(this.senderID).subscribe(res => {
          
          this.GroupDetailsOfStaffLists = res;
        //   {
        //     for (let k = 0; k < this.GroupDetailsOfStaffLists.length; k++) {
        //       let GroupID = this.GroupDetailsOfStaffLists[k].groupID;
    
        //       this.filteredChatList = this.chatList.filter(x => x.groupID == GroupID);
    
        //       this.GroupDetailsOfStaffLists[k]["Count"]=this.filteredChatList.length;
    
        //     }
        //   }
         });
      }, error => {
      }
    )
  }

   // When the user scrolls down 20px from the top of the document, show the button
   
  }


