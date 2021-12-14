import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  roledid: any;
  result: any;
  roleID: any;
  userName: any;
  password: any;
  username: any;
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    if (localStorage.getItem('temp') == '1') {
      localStorage.clear();
      location.reload();
    }
  }
  public getRoleID(even) {
    
    this.roleID = even.target.value;
  }

  // public login() {
  //   localStorage.setItem('temp', '1');
  //   localStorage.setItem('roleid', '1');
  //   location.href = "#/Home";
  //   location.reload();

  // }

  public login() {
    
    if (this.username == 'admin' && this.password == '1') {
      
      localStorage.setItem('userName', 'admin');
      localStorage.setItem('temp', '1');
      location.href = "#/AdminLoginDash";
      location.reload();
    }
    else if (this.roleID == 3) {
      
      this.DigiOfficeService.GetUsersdetailsMob(this.userName, this.password).subscribe(data => {
        this.result = data;
        
        if (this.result.id!=undefined || this.result.id!=null) {
          localStorage.setItem('staffID', this.result.id);
          localStorage.setItem('staffName',this.result.name)
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('password', this.result.password);
          localStorage.setItem('temp', '1');
          localStorage.setItem('roleid', '3');
          location.href = "#/Home";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.username = "";
          this.password = "";
        }
      })
    }
    else if (this.roleID == 4) {
      
      this.DigiOfficeService.GetUsersdetails(this.userName, this.password).subscribe(data => {
        this.result = data;
        
        if (this.result.id!=undefined || this.result.id!=null) {
          localStorage.setItem('managerID', this.result.id);
          localStorage.setItem('staffID',this.result.staffID);
          localStorage.setItem('userRoleID',this.result.userRoleID);
        
          localStorage.setItem('staffName',this.result.name)
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('password', this.result.password);
          localStorage.setItem('temp', '1');
          localStorage.setItem('roleid', '4');
          location.href = "#/Home";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.username = "";
          this.password = "";
        }
      })
    }
    else {
      Swal.fire('Username or password is Invalid.')
    }
  }
}


