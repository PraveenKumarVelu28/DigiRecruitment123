import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { DigiOfficeService } from '../app/digi-office.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginTypeID: any;
  constructor(private spinner: NgxSpinnerService, private digioffice: DigiOfficeService) { }
  title = 'digiOffice';
  public temp: any;
  staffid: any;
  noticount: any;
  ngOnInit() {
    this.loginTypeID = localStorage.getItem('loginTypeID');
    this.staffid = localStorage.getItem('staffID');
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();

    }, 3000);
    this.temp = localStorage.getItem("temp");
    // this.getnotifications();
  }

  notificatioins: any;

  // public getnotifications() {
  //   debugger
  //   this.digioffice.GetNotifications(this.staffid).subscribe(data => {
  //     this.notificatioins = data;
  //     // this.noticount = this.notificatioins[0].notificatioioncount
  //     debugger
  //   })
  // }







  public logout() {

    localStorage.clear();
    location.href = "#/Login";
    location.reload();
  }

  public onActivate(event) {
    window.scroll(0, 0);
  }

  public userCheated() {
    // The user cheated by leaving this window (e.g opening another window)
    // Do something
    alert("You can't cheat!");
  }


}

