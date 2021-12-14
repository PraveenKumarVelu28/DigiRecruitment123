import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent implements OnInit {
  countList: any[];
  SDate: any;
  EDate: any;
  staffID: any;
  UserRoleID: any;
  Name: any;
  staffcountList: any[];
  loginTypeId: any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.staffID = localStorage.getItem('staffID');
    this.UserRoleID = localStorage.getItem('userRoleID');
    this.Name = localStorage.getItem('name');
    this.loginTypeId = localStorage.getItem('loginTypeId');


    this.SDate = '2020-01-01';
    this.EDate = '2025-12-31';

    if (this.loginTypeId != 1) {
      this.DigiOfficeService.GetStaffRequetsReport(this.staffID, this.SDate, this.EDate, this.UserRoleID).subscribe(res => {

        this.countList = res;

      });
      this.GetManagerStaffRequetsReport();
    }

  }

  public GetManagerStaffRequetsReport() {

    this.DigiOfficeService.GetManagerStaffRequetsReport(this.staffID, this.SDate, this.EDate, this.UserRoleID, this.Name).subscribe(res => {

      this.staffcountList = res;

    });
  }
}


