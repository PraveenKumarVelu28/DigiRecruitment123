import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-selected-candidates',
  templateUrl: './selected-candidates.component.html',
  styleUrls: ['./selected-candidates.component.css']
})
export class SelectedCandidatesComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }

  joblist: any;
  count: any;
  search: any;
  date: any;
  ngOnInit(): void {
    this.GetCandidateReg()
  }

  public GetCandidateReg() {
    this.DigiOfficeService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
      this.count = this.joblist.length;
    })

  }

  candidateid: any;
  candidatename: any;


  public GetOfferID(id, job) {
    this.candidateid = id;
    this.candidatename = job.candidateName,
      this.email = job.email
  }


  offernotes: any;


  attachments = []
  attachmentsurl: any;
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
      // this.attachmentsurl = 'http://14.192.17.225' + a;

      this.attachmentsurl.push('assets/Images/pdf.png')
      Swal.fire("Added Successfully");

    });
  }



  public updatedetails() {
    var entity = {
      'ID': this.candidateid,
      'OfferLetterUrl': this.brochures1[0],
      'OfferNotes': this.offernotes
    }
    this.DigiOfficeService.UpdateOfferLetter(entity).subscribe(data => {
      Swal.fire("Candidate Offered Successfully");
      this.sendmail()
    })
  }

  joiningbonus: any;
  Notes: any;
  noticeperiodbythen: any;




  public updatejoiningdate() {
    var entity = {
      'ID': this.candidateid,
      'JoiningDate': this.date,
      'JoiningBonus': this.joiningbonus,
      'NoticePeriodByThen': this.noticeperiodbythen,
      'Commentss': this.Notes
    }
    this.DigiOfficeService.UpdateCandidateJoiningDate(entity).subscribe(data => {
      Swal.fire("Saved Successfully");
      this.date = "";
      this.joiningbonus = "";
      this
    })
  }




  emailattchementurl = [];
  public email: any;
  public doctorname: any;

  public sendmail() {

    var entity = {
      'emailto': this.email,
      'emailsubject': "Amaze Inc Offer Letter",
      'emailbody': 'Dear ' + this.candidatename + ',' + "<br><br>" + this.offernotes,
      'attachmenturl': this.brochures1,
      'cclist': 0,
      'bcclist': 0
    }
    this.DigiOfficeService.sendemail(entity).subscribe(data => {
    })
  }
}
