
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

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
    this.senderID = localStorage.getItem('staffID');
    this.GetGroupMembersForChat();
    this.GetChatGroupMaster();
  }

  public GetGroupMembersForChat() {
    this.DigiOfficeService.GetGroupMembersForChat(this.paramID).subscribe(res => {
      this.userList = res;
    });
  }


  colors = ["red", "green", "cyan"];
  start = this.colors[0];
  div = document.getElementById("color");



  color: any;
  // public GetChatGroupMaster() {
  //   
  //   this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
  //     

  //     this.chatList = res.filter(x => x.groupID == this.paramID);
  //     for (let i = 0; i < this.chatList.length; i++) {
  //       if (this.chatList[i].senderID == this.senderID) {

  //         this.chatList[i].position = 'right';
  //       }
  //       else {

  //         document.getElementById("color").style.backgroundColor = this.colors[0];
  //         for (let x = 0; x < this.colors.length; x++) {
  //           document.getElementById("color").style.backgroundColor = this.colors[x];
  //           if (this.colors[x] == this.colors[this.colors.length - 1]) {
  //             this.div.style.backgroundColor = this.start;
  //             this.chatList[i].position = 'left';
  //           }
  //         }
  //       }
  //     }
  //   });
  // }




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

  // public GetChatGroupMaster() {
  //   
  //   this.DigiOfficeService.GetChatGroupMaster().subscribe(res => {
  //     
  //     this.chatList = res.filter(x => x.groupID == this.paramID);
  //     for (let i = 0; i < this.chatList.length; i++) {
  //       if (this.chatList[i].senderID == this.senderID) {
  //         this.chatList[i].position = 'right';
  //       }
  //       else {
  //         for (let x = 0; x < this.color.length; x++) {
  //           document.getElementsByClassName("received_msg");
          
  //         }
  //         this.chatList[i].position = 'left';

  //       }
  //     }
  //   });
  // }

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


// insertmsg{
//   var entity = {
//     'GroupID': 1,
//     'SenderID': 1,
//     'Message': "hie",
//     'MessageDateTime': new Date(),
//     'MessageType':1
//   }
//   var entity = {
//     'GroupID': 1,
//     'SenderID': 1,
//     'Message': "C://images/image.jpg",
//     'MessageDateTime': new Date(),
//     'MessageType':2
//   }
  //insert func
}




