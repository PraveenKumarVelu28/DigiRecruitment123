import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-calender',
  templateUrl: './staff-calender.component.html',
  styleUrls: ['./staff-calender.component.css']
})
export class StaffCalenderComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }

  DayDatelist: any;
  SlotsList: any;
  staffid: any;
  StartDate: any;
  term: any;

  ngOnInit(): void {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.StartDate = formatDate(myDate, format, locale);
    this.staffid = localStorage.getItem('staffID');
    this.GetCandidateReg()

  }


  public GetCandidateReg() {
    this.DigiOfficeService.GetStaffInterviewCalender(this.StartDate, this.staffid).subscribe(data => {
      this.DayDatelist = data[0];
      this.SlotsList = data[1];

    })

  }

  public DateChange(even) {
    this.StartDate = even.target.value;
    this.GetCandidateReg();
  }

}
