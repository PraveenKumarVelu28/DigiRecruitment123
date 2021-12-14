import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-home-dashboard-for-admin',
  templateUrl: './home-dashboard-for-admin.component.html',
  styleUrls: ['./home-dashboard-for-admin.component.css']
})
export class HomeDashboardForAdminComponent implements OnInit {
  search: any;
  countList: any[];
  value: any;
  staffID: any;
  UserRoleID: any;
  Name: any;
  staffcountList: any[];
  loginTypeId: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  routerlink: any;
  routerlink1: any;
  routerlink2: any;
  routerlink3: any;
  routerlink4: any;
  routerlink5: any;
  routerlink6: any;
  routerlink7: string;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {

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
    this.staffID = localStorage.getItem('staffID');
    this.UserRoleID = localStorage.getItem('userRoleID');
    this.Name = localStorage.getItem('name');
    this.loginTypeId = localStorage.getItem('loginTypeId');

    this.GetRequetsReportForCEOWeb(this.todaydate, this.enddate);


  }
  public selectedDate(data) {
    this.todaydate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetRequetsReportForCEOWeb(this.todaydate, this.enddate);
  }
  public GetRequetsReportForCEOWeb(SDate, EDate) {
    debugger
    this.DigiOfficeService.GetRequetsReportForCEOWeb(SDate, EDate).subscribe(res => {
      debugger
      this.staffcountList = res;
      this.routerlink = this.staffcountList[0].routerlink;
      this.routerlink1 = this.staffcountList[1].routerlink;
      this.routerlink2 = this.staffcountList[2].routerlink;
      this.routerlink3 = this.staffcountList[3].routerlink;
      this.routerlink4 = this.staffcountList[4].routerlink;
      this.routerlink5 = this.staffcountList[5].routerlink;
      this.routerlink6 = this.staffcountList[6].routerlink;
      this.routerlink7 = this.staffcountList[7].routerlink;
    });
  }

  public gotolink(id) {
    debugger;
    if (id == 2) {
      location.href = "#/" + this.routerlink;
    }
    else if (id == 6) {
      location.href = "#/" + this.routerlink1;
    }
    else if (id == 3) {
      location.href = "#/" + this.routerlink2;
    }
    else if (id == 8) {
      location.href = "#/" + this.routerlink3;
    }
    else if (id == 9) {
      location.href = "#/" + this.routerlink4;
    }
    else if (id == 11) {
      location.href = "#/" + this.routerlink5;
    }
    else if (id == 12) {
      location.href = "#/" + this.routerlink6;
    }
    else if (id == 13) {
      location.href = "#/" + this.routerlink7;
    }
    else{
      location.href = "#/" + this.routerlink1;
    }
  }

}
