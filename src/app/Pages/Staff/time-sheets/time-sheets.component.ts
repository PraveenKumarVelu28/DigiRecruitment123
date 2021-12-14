
import { DigiOfficeService } from '../../../digi-office.service';

import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { DayPilot, DayPilotSchedulerComponent } from "daypilot-pro-angular";
import { formatDate } from "@angular/common";
import SchedulerPropsAndEvents = DayPilot.SchedulerPropsAndEvents;


import { Item, Period, Section, Events, NgxTimeSchedulerService } from 'ngx-time-scheduler';
import * as moment from 'moment';
@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.css']
})
export class TimeSheetsComponent implements OnInit {
  search: any;
  events: Events = new Events();
  periods: Period[];
  sections: Section[];
  items: Item[];
  value: any;
  stafflist: any[];
  staffID: any;
  name: any;
  year: any;
  UserID: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  roleid: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.roleid = localStorage.getItem('roleid')
    this.staffID = localStorage.getItem('staffID');
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = "yyyy-MM-dd";
    const myDate = new Date();
    const locale = "en-US";
    this.todaydate = formatDate(date, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    // Find current hour in AM-PM Format
    hours = hours % 12;
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    //this.SDate = '2019-01-01';
    //this.EDate = '2025-12-31';
    this.GetTimeSheetsForWeb(this.staffID, this.startdate, this.enddate);


  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetTimeSheetsForWeb(this.staffID, this.startdate, this.enddate);
  }
  public GetTimeSheetsForWeb(staffID, SDate, EDate) {
    if (this.roleid == 4) {
      this.DigiOfficeService.GetTimeSheetsForMyTeamForWeb(staffID, SDate, EDate).subscribe(res => {
        this.stafflist = res;
      }
      )
    }
    else {
      this.DigiOfficeService.GetTimeSheetsForWeb(staffID, SDate, EDate).subscribe(res => {
        this.stafflist = res;
      }
      )
    }

  }

  // public GetProjectMasterList() {
  //   this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
  //     this.stafflist = res;
  //   }
  //   )
  // }




}
