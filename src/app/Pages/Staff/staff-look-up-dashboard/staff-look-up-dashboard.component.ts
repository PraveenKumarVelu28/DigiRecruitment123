import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-look-up-dashboard',
  templateUrl: './staff-look-up-dashboard.component.html',
  styleUrls: ['./staff-look-up-dashboard.component.css']
})
export class StaffLookUpDashboardComponent implements OnInit {
  search:any;
  staffLookUpList: any[];
  filteredList: any;
  count: any;
  attachments: any;
  attachmentsurl: any;
  tomail: any;
  subject: any;
  message: any;
  fromMail: any;
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetStaffLookUp();
  }
  public GetStaffLookUp() {
    this.DigiOfficeService.GetStaffLookUp().subscribe(res => {
      this.staffLookUpList = res;
     this.filteredList = this.staffLookUpList;
      this.count = this.filteredList.length;
    }
    )
  }

  public onattachmentUpload(abcd) {
    
    this.attachments.push(abcd[0]);
    this.uploadattachments();
    abcd.length = 0;
  }

  public uploadattachments() {
    // this.DigiOfficeService.UploadAttachment(this.attachments).subscribe(res => {
    //   
    //   this.attachmentsurl.push(res);
    //   Swal.fire('Attachment added successfully.');
    //   this.attachments.length = 0;
    //   
    // })
  }

  public sendMail(id) {
    // 
    // this.id = id;
    // this.service.GetSendEmail().subscribe(
    //   data => {
    //     
    //     this.mails = data;
    //   }, error => {
    //   }
    // )
  }
  public insertSendMail() {

    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = "C:\MRMSAPI\Images\AllImages\addressproof-20200616114151.png";
    }

    // var sm = {
    //   'emailto': this.tomail,
    //   'emailsubject': this.subject,
    //   'emailbody': this.message,
    //   'attachmenturl': this.attachmentsurl
    // }
    // this.DigiOfficeService.sendemail(sm).subscribe(res => {
    //   
    // })
    // 
    // var Entity = {
    //   'ProductUpdateID': this.id,
    //   'From': this.fromMail,
    //   'To': this.tomail,
    //   'Subject': this.subject,
    //   'Message': this.message
    // }
    // this.DigiOfficeService.InsertSendMail(Entity).subscribe(data => {
    //   
    //   if (data != undefined) {
    //     Swal.fire('Saved Successfully');
    //   }
    // })
  
  }
  public getattachmnets(id) {
    // this.service.GetEmailAttachment().subscribe(
    //   data => {
    //     
    //     this.mailattachments = data;
    //     this.mailattachments = this.mailattachments.filter(x => x.mailID == id);
    //   }, error => {
    //   }
    // )
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.staffLookUpList.length; i++) {
      
      var list = {
        name: this.staffLookUpList[i].name,
        phoneNumber: this.staffLookUpList[i].phoneNumber,
        email: this.staffLookUpList[i].email,
        designation: this.staffLookUpList[i].designation,
        department: this.staffLookUpList[i].department
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Look UP',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Look UP'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
