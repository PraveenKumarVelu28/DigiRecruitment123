
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-master',
  templateUrl: './chat-master.component.html',
  styleUrls: ['./chat-master.component.css']
})
export class ChatMasterComponent implements OnInit {
  traineeID: any;
  chatList: any;
  trainerList: any;
  trainerID: any;
  chatID: any;
  chatDetailsList = [];
  message: any;
  Show: any;
  traineesList: any[];
  studentName: string;
  trainerName: string;
  search: any;
  staffList: any[];
  staffID: string;
  receivedStaffID: any;
  receiverStaffID: any;
  showSender: number;
  SDate: any;
  EDate: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.SDate = '2019-01-01';
    this.EDate = '2025-12-31';
    this.Show = 0;
    this.staffID = localStorage.getItem('staffID');
    this.trainerName = localStorage.getItem('trainerName');
    //document.getElementById("defaultOpen").click();
    this.getStaffForChat();
  }
  public getStaffForChat() {
    
    this.DigiOfficeService.GetAllStaff().subscribe(
      data => {
        
        this.staffList = data;
      }, error => {
      }
    )
  }
  public GetChatMaster() {
    this.DigiOfficeService.GetChatMaster().subscribe(
      data => {
        
        this.chatList = data;

      }, error => {
      }
    )
  }

  public getchat(id) {
    
    this.Show = 1
    this.receiverStaffID = id;
    var Entity = {
      'SenderID': this.staffID,
      'ReceiverID': this.receiverStaffID
    }
    this.DigiOfficeService.InsertChatMaster(Entity).subscribe(
      data => {
        
        this.chatID = data;
        this.getchatdetails();


      }, error => {
      }
    )

  }

  coversationarray = []


  public insertchatdetails() {
    
    var entity = {
      'ChatID': this.chatID,
      'Message': this.message,
    }
    this.DigiOfficeService.InsertChatDetails(entity).subscribe(
      data => {
        

        this.message = ""
        var chatEntity = {
          'Notification': "Received Message from " + this.trainerName,
          'TraineeID': this.traineeID
        }
        // this.DigiOfficeService.InsertTraineeChatNotifications(chatEntity).subscribe(
        //   data => {
        //     
        //   }, error => {
        //   }
        // )
        this.getchatdetails();
      })
  }


  public getchatdetails() {
    this.DigiOfficeService.GetChatDetailsByID(this.chatID).subscribe(
      data => {
        
        this.chatDetailsList = data;
        this.coversationarray = [];
        for (let i = 0; i < this.chatDetailsList.length; i++) {
          
          if (this.chatDetailsList[i].senderID == this.staffID) {
            this.coversationarray.push({
              chatmsg: this.chatDetailsList[i].message, time: this.chatDetailsList[i].time, user: 'sender'
            })
            this.showSender=1;
          }
          
          if (this.chatDetailsList[i].senderID == this.receiverStaffID) {
            this.coversationarray.push({
              chatmsg: this.chatDetailsList[i].message, time: this.chatDetailsList[i].time, user: 'Receiver'
            })
          }
        }
      }, error => {
      }
    )
  }

}
