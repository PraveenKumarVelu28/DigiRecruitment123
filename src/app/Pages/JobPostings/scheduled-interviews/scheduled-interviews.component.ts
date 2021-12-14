import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheduled-interviews',
  templateUrl: './scheduled-interviews.component.html',
  styleUrls: ['./scheduled-interviews.component.css']
})
export class ScheduledInterviewsComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }

  joblist: any;
  search: any;
  count: any;
  staffid: any;

  ngOnInit(): void {
    this.staffid = localStorage.getItem('staffssID');
    this.GetCandidateReg()
    // this.insertdetails()
  }

  public GetCandidateReg() {
    debugger
    if (this.staffid == undefined) {
      this.DigiOfficeService.GetCandidateRegistration().subscribe(data => {
        this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);
        this.count = this.joblist.length;
      })
    }
    else {
      this.DigiOfficeService.GetCandidateRegistration().subscribe(data => {
        debugger
        this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid);
        this.count = this.joblist.length;
      })

    }

  }




  public Accept(id, rinterview) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Accept this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
        this.DigiOfficeService.RejectInterview(id, 1, rinterview).subscribe(data => {
          Swal.fire(
            'Shortlisted!',
            'Candidate has been Accepted',
            'success'
          )
          this.GetCandidateReg()
        })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  public Reject(id, rinterview) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Reject this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiOfficeService.RejectInterview(id, 2, rinterview).subscribe(data => {
          Swal.fire(
            'Rejected!',
            'Candidate has been Rejected',
            'success'
          )
          this.GetCandidateReg()
        })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  public GetOfferLetter(offer) {
    window.open(offer, "_blank")
  }



  // public insertdetails() {
  //   debugger
  //   var entity = {
  //     // 'grant_type': 'password',
  //     // 'scope': 'IdentityService',
  //     'username': 'admin',
  //     'password': 'Exceego@123',
  //     'client_id': 'ehswatchapp'
  //   //  'client_secret': '1q2w3E*'
  //   }
  //   this.DigiOfficeService.CheckUrlsData(entity).subscribe(data => {
  //     data;
  //     debugger
  //   },error=>{
  //     debugger
  //     error.message
  //   })
  // }
}
