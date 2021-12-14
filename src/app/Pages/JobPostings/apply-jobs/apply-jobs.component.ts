import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-jobs',
  templateUrl: './apply-jobs.component.html',
  styleUrls: ['./apply-jobs.component.css']
})
export class ApplyJobsComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }
  joblist: any;
  candidatename: any;
  phoneno: any;
  email: any;
  yearsofexp: any;
  relaventexp: any;
  city: any;
  jobid: any;



  ngOnInit(): void {
    this.DigiOfficeService.GetJob_Requirements().subscribe(data => {
      this.joblist = data;
    })
  }


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
      debugger
      this.attachmentsurl='assets/images/pdf.png';
      Swal.fire("Added Successfully");

    });
  }

  public GetJobID(jobid) {
    this.jobid = jobid;
  }

  currentcompany: any;
  noticeperiod: any;
  servingnotice: boolean;
  relocate: boolean;


  public insertdetails() {
    var entity = {
      'JobID': this.jobid,
      'CandidateName': this.candidatename,
      'PhoneNo': this.phoneno,
      'Email': this.email,
      'YearsofExp': this.yearsofexp,
      'RelavantExp': this.relaventexp,
      'City': this.city,
      'ResumeUrl': this.brochures1[0],
      'CurrentCompany': this.currentcompany,
      'NoticePeriod': this.noticeperiod,
      'ServingNotice': this.servingnotice,
      'Relocate': this.relocate
    }
    this.DigiOfficeService.InsertCandidateRegistration(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Registered Successfully");
      }
    })
  }
}
