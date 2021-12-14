import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";


@Component({
  selector: 'app-hrprofile',
  templateUrl: './hrprofile.component.html',
  styleUrls: ['./hrprofile.component.css']
})
export class HRProfileComponent implements OnInit {
  staffID: any;
  staffList: any[];
  staffName: any;
  phoneNo: any;
  emailID: any;
  email: any;
  officialID: any;
  password: any;
  paramID: any;
  ID: any;
  saveupdate: number;
  loginTypeId: any;

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    this.staffID = localStorage.getItem('staffID');
    this.loginTypeId = localStorage.getItem('loginTypeId');
    // if(localStorage.getItem('loginTypeId')=='4'){
    //   this.staffID = localStorage.getItem('managerID');
    // }
    // else{
      
    // }
   
    if (this.staffID == undefined && this.loginTypeId==1) {
      this.saveupdate = 0;
      
    }
    else {

      this.saveupdate = 1;
      this.DigiOfficeService.GetBuildingStaffByID(this.staffID).subscribe(data => {
        debugger;
        this.staffList = data;
        this.staffName = this.staffList[0].staffName;
        this.phoneNo = this.staffList[0].phoneNo;
        this.emailID = this.staffList[0].emailID;
        //this.email = this.staffList[0].email;
        this.officialID = this.staffList[0].officialID;
        this.password = this.staffList[0].password;
      })
    }
  }


  // public UpdateDetails(){}

  public updatedetails() {
    debugger;
    var entity = {
      'Id': this.staffID,
      'Name': this.staffName,
      'PhoneNo': this.phoneNo,
      'EmailID': this.emailID,
      'OfficialID': this.officialID,
      'Password': this.password

    }
    this.DigiOfficeService.UpdateProfile(entity).subscribe(data => {
      Swal.fire('Profile Updated Successfully.');
      location.href = "#/HRProfile";
    })
  }

}

