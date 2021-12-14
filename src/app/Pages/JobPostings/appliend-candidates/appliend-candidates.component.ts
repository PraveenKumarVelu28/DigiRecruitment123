import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-appliend-candidates',
  templateUrl: './appliend-candidates.component.html',
  styleUrls: ['./appliend-candidates.component.css']
})
export class AppliendCandidatesComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }
  joblist: any;
  count: any;
  DropJobList: any;
  dummjoblist: any;
  term: any;
  ngOnInit(): void {
    this.GetCandidateReg()
  }

  public GetCandidateReg() {
    this.DigiOfficeService.GetCandidateRegistration().subscribe(data => {
      this.dummjoblist = data.filter(x => x.accept == 0 && x.reject == 0)
      this.joblist = data.filter(x => x.accept == 0 && x.reject == 0);
      this.count = this.joblist.length;
    })


    this.DigiOfficeService.GetJob_Requirements().subscribe(data => {
      this.DropJobList = data;

    })

  }

  jobid: any;

  public GetJobFilter(even) {
    this.jobid = even.target.value;

    if (even.target.value != 0) {
      this.joblist = this.dummjoblist.filter(x => x.jobID == this.jobid)
    }
    else {
      this.GetCandidateReg();
    }
  }


  public Accept(id, shortlistionNotes) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Shortlist this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiOfficeService.UpdateCandidateRegistrationAcceptReject(id, 1, shortlistionNotes).subscribe(data => {
          Swal.fire(
            'Shortlisted!',
            'Candidate has been shortlisted',
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

  public Reject(id, shortlistionNotes) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Reject this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiOfficeService.UpdateCandidateRegistrationAcceptReject(id, 2, shortlistionNotes).subscribe(data => {
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
}
