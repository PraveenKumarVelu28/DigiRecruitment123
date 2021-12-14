import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  groupName: any;
  description: any;
  attachments = [];
  attachmentsurl :any;
  stafflist: any[];
  adminID: any;
  SDate: any;
  EDate: any;
  staffID: string;
  paramID: any;
  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.SDate = '2019-01-01';
    this.EDate = '2025-12-31';
    this.adminID = 0;
    this.staffID = localStorage.getItem('staffID');
    this.GetAllStaff();
  }
  public GetAllStaff() {

    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.stafflist = res;
    });
  }

  brochures = [];
  imagesurl: any;
  brochures1 = [];
  public onattachmentUpload(abcd) {
    debugger;
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadImages();
    abcd.length = 0;
  }
  public uploadImages() {
    debugger;
    this.DigiOfficeService.UploadImages(this.attachments).subscribe(res => {
      debugger
      this.brochures1.push(res);
      let a = this.brochures1[0].slice(2);
      this.attachmentsurl = 'http://14.192.17.225' + a;
      Swal.fire("Added Successfully");

    });
  }
  // public uploadattachments() {

  //   this.DigiOfficeService.UploadImages(this.attachments).subscribe(res => {

  //     this.attachmentsurl[0] = res;
  //     // this.attachments.length = 0;
  //     Swal.fire("Added Successfully");

  //   });
  // }

  public insertDetails() {

    var Entity = {
      'GroupName': this.groupName,
      'Description': this.description,
      'PhotoUrl': this.attachmentsurl,
      'AdminID': this.staffID
    }
    this.DigiOfficeService.InsertChatGroup_Table(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Group Created Successfully.');
        }
        location.href = "#/GroupsApproveDashboard";
      }, error => {
      }
    )
  }
}
