import { Component, OnInit } from '@angular/core';

import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shortlisted-candidates',
  templateUrl: './shortlisted-candidates.component.html',
  styleUrls: ['./shortlisted-candidates.component.css']
})
export class ShortlistedCandidatesComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }

  joblist: any;
  search: any;
  stafflist: any;
  slotslist: any;
  timeid: any;
  count: any;
  DropJobList: any;

  ngOnInit(): void {
    this.GetCandidateReg();
    this.GetStaffType();
    // this.GetSlotsMaster()

    this.DigiOfficeService.GetJob_Requirements().subscribe(data => {
      this.DropJobList = data;

    })
  }

  public GetDate(even) {
    this.date = even.target.value;
    this.GetSlotsMaster();
  }


  dummjoblist: any;


  public GetCandidateReg() {
    this.DigiOfficeService.GetCandidateRegistration().subscribe(data => {
      this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
      this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
      this.count = this.joblist.length;
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


  staffid: any;

  public GetStaffID(even) {
    this.staffid = even.target.value;
    this.GetSlotsMaster();
  }


  public GetStaffType() {
    this.DigiOfficeService.GetStaffs().subscribe(data => {
      this.stafflist = data;
    })

  }

  public GetTimeID(even) {
    this.timeid = even.target.value;
  }


  public GetSlotsMaster() {
    debugger
    this.DigiOfficeService.GetSlotsMasterByStaffID(this.date, this.staffid).subscribe(data => {
      this.slotslist = data;
      debugger
    })

  }

  candidateid: any;

  public GetCandidateID(candidateid) {
    this.candidateid = candidateid;
  }


  date: any;
  notes: any;

  public UpdateInterviewSchedule() {
    var entity = {
      'ID': this.candidateid,
      'StaffID': this.staffid,
      'Date': this.date,
      'TimeID': this.timeid,
      'Notes': this.notes
    }
    this.DigiOfficeService.UpdateCandidateInterviewSchedule(entity).subscribe(data => {
      Swal.fire("Interview Scheduled Successfully");
      this.GetCandidateReg();
    })
  }

  public GetOfferLetter(offer) {
    window.open(offer, "_blank")
  }




}
