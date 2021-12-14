import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-announcements',
  templateUrl: './new-announcements.component.html',
  styleUrls: ['./new-announcements.component.css']
})
export class NewAnnouncementsComponent implements OnInit {
  floorList: any[];
  buildingID: any;
  floorID: any;
  buildingList: any[];
  announcement: any;
  description: any;
  date: any;
  announcementDetails: any;
  time: any;
  venue: any;
  attachmentsurl : any;
  attachments = [];
  paramID: any;
  ExpencesName: any;
  DateTime: any;
  Description: any;
  ModifiedBy: string;
  Name: any;
  Time: any;
  Reason: any;
  Venue: any;
  BuildingID: any;
  FloorID: any;
  name: any;
  reason: any;

  userRoleID: any;
  ID: any;
  saveupdate: number;
  announcementsList: any[];
  ttt: any;

  constructor(private ActivatedRoute: ActivatedRoute, private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.userRoleID = localStorage.getItem('userRoleID');
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.buildingID = 0;
    this.floorID = 0;
    this.GetBuildinglist();
    //this.GetAnnouncementByID();
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;

      }
      else {
        this.saveupdate = 1;

        this.DigiOfficeService.GettodayannouncementsForEdit().subscribe(
          data => {
        debugger
            this.announcementsList = data;
            this.announcementsList = this.announcementsList.filter(x => x.id == this.ID);
            this.buildingID = this.announcementsList[0].buildingID;          
            this.name = this.announcementsList[0].announcement;
            this.description = this.announcementsList[0].description;
            this.date = this.announcementsList[0].dateTime;
            this.time = this.announcementsList[0].time; // this.announcementsList[0].time;
            this.reason = this.announcementsList[0].reason;
            this.venue = this.announcementsList[0].venue;
            this.attachmentsurl = this.announcementsList[0].attachment;
            this.DigiOfficeService.GetFloor(this.announcementsList[0].buildingID).subscribe(data => {
              this.floorList = data;
              this.floorID = this.floorList[0].floorID;
            })  
           

          }, error => {
          }
        )
      }
    }
    )
  }
  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(data => {
      this.buildingList = data;
    })
  }

  public getBuildingID(even) {
    this.buildingID = even.target.value;
    if (this.buildingID == 0) {
      this.GetBuildinglist();
    }
    else {
      this.DigiOfficeService.GetFloor(this.buildingID).subscribe(data => {
        this.floorList = data;
      })
    }
  }

  public onattachmentUpload(abcd) {
    debugger
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    abcd.length = 0;
  }
  brochures1 = [];
  public uploadattachments() {
    debugger
    this.DigiOfficeService.UploadImages(this.attachments).subscribe(res => {
      //this.attachmentsurl[0] = res;
      this.brochures1.push(res);
      let a = this.brochures1[0].slice(2);
      this.attachmentsurl = 'http://14.192.17.225' + a;
      // this.attachments.length = 0;
      Swal.fire("Added Successfully");

    });
  }

  

  public insertDetails() {
    
    var Entity = {
      DateTime: this.date,
      Description: this.description,
      ModifiedBy: 'none',
      Name: this.name,
      Time: this.time,
      Reason: this.reason,
      Venue: this.venue,
      BuildingID: this.buildingID,
      FloorID: this.floorID,
      Attachment: this.attachmentsurl
    }
    this.DigiOfficeService.InsertAnnouncement(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire("Announcement Added Successfully.");
        }
        location.href = "#/UpcomingAnnouncementsDashboardForHr";
      }, error => {
      }
    )
  }

  // public GetAnnouncementByID() {
  //   debugger
  //   this.DigiOfficeService.GetAnnouncementsByID(this.paramID).subscribe((data) => {
  //     debugger
  //     this.date = this.datepipe.transform(data["date"], 'yyyy-MM-dd');
  //     this.description = data['description']
  //     this.name = data['name'],
  //       this.time = data['justtime'],
  //       this.reason = data['reason'],
  //       this.venue = data['venue'],
  //       this.buildingID = data['buildingID'],
  //       this.attachmentsurl[0] = data['attachmentsurl']
  //     this.DigiOfficeService.GetFloor(this.buildingID).subscribe(data => {
  //       this.floorList = data;
  //     })
  //     this.floorID = data['floorID']
  //   });
  // }

  public updatedetails() {
    var entity = {
      Id: this.paramID,
      //ExpencesName: this.ExpencesName,
      DateTime: this.date,
      Description: this.description,
      ModifiedBy: 'none',
      Name: this.name,
      Time: this.time,
      Reason: this.reason,
      Venue: this.venue,
      BuildingID: this.buildingID,
      FloorID: this.floorID,
      Attachment: this.attachmentsurl
    }
    this.DigiOfficeService.UpdateAnnouncement(entity).subscribe(data => {
     
        location.href = "#/UpcomingAnnouncementsDashboardForHr";
      
      Swal.fire('Announcement Updated Successfully.');
    })
  }

}
