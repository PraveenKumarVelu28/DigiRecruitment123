import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-droped-candidates',
  templateUrl: './droped-candidates.component.html',
  styleUrls: ['./droped-candidates.component.css']
})
export class DropedCandidatesComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  ngOnInit(): void {
    this.GetCandidateReg()
  }


  public GetCandidateReg() {
    this.DigiOfficeService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => x.offerAcceptreject == 2);
      this.count = this.joblist.length;
    })

  }

  public GetOfferLetter(offer) {
    window.open(offer, "_blank")
  }





  public Accept(id, comments) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Candidate joined!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Joined it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiOfficeService.AcceptRejectOffer(id, 1, comments).subscribe(data => {
          Swal.fire(
            'Joined!',
            'Candidate has Joined',
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


  public Reject(id, comments) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Candidate has dropped!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, dropped!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigiOfficeService.AcceptRejectOffer(id, 2, comments).subscribe(data => {
          Swal.fire(
            'Rejected!',
            'Candidate has dropped',
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
