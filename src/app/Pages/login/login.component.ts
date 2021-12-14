import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../digi-office.service';
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
  loginTypeList: any[];
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    if (localStorage.getItem('temp') == '1') {
      localStorage.clear();
      location.reload();
     
    }
    this.GetLoginTypeMaster();
  }
  GetLoginTypeMaster() {
    
    this.DigiOfficeService.GetLoginTypeMaster().subscribe(data => {
      
      this.loginTypeList = data;
    })
  }
  public getRoleID(even) {
    debugger
    this.roleID = even.target.value;
  }

  // public login() {
  //   localStorage.setItem('temp', '1');
  //   localStorage.setItem('roleid', '1');
  //   location.href = "#/Home";
  //   location.reload();

  // }

  public login() {
    
    if (this.userName == 'admin' && this.password == '1') {
      
      localStorage.setItem('userName', 'admin');
      localStorage.setItem('temp', '1');
      location.href = "#/Approver3ratingpagedashboard";
      localStorage.setItem('roleid', '1');
      location.reload();
    }
    
    // else if (this.roleID == 1) {
      
    //   this.DigiOfficeService.GetUsersdetailsForReceptionistLogin(this.userName, this.password).subscribe(data => {
    //     this.result = data;
        
    //     if ((this.result!=undefined || this.result!=null)) {
    //       localStorage.setItem('managerID', this.result.id);
    //       localStorage.setItem('staffID',this.result.staffID);
    //       localStorage.setItem('buildingID',this.result.buildingID);
    //       localStorage.setItem('userRoleID',this.result.userRoleID);
    //       localStorage.setItem('userName', this.result.loginName);
    //       localStorage.setItem('name', this.result.name);
    //       localStorage.setItem('phoneNo', this.result.phoneNo);
    //       localStorage.setItem('userName', this.result.emailID);
    //       localStorage.setItem('password', this.result.password);
    //       localStorage.setItem('temp', '1');
    //       localStorage.setItem('roleid', '1');
    //       location.href = "#/LoginDashboard";
    //       location.reload();
    //     }
    //     else {
          
    //       Swal.fire('Phonenumber or Password is invalid');
    //       this.userName = "";
    //       this.password = "";
    //     }
    //   })
    // }

    else if (this.roleID == 2) {
      debugger;
      this.DigiOfficeService.GetUsersdetailsForHRLogin(this.userName, this.password).subscribe(data => {
        this.result = data;
        debugger;
        if (this.result!=undefined || this.result!=null) {
          localStorage.setItem('hrID', this.result.id);
          localStorage.setItem('staffID',this.result.staffID);
          localStorage.setItem('buildingID',this.result.buildingID);
          localStorage.setItem('userRoleID',this.result.userRoleID);
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('name', this.result.name);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('password', this.result.password);
          localStorage.setItem('projectName', this.result.projectName);
          localStorage.setItem('temp', '1');
          localStorage.setItem('roleid', '2');
          location.href = "#/LoginDashboard";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.userName = "";
          this.password = "";
        }
      })
    }

    else if (this.roleID == 3) {
      debugger
      this.DigiOfficeService.GetUsersdetailsMob(this.userName, this.password).subscribe(data => {
        this.result = data;
        debugger
        if (this.result!=undefined || this.result!=null) {
          localStorage.setItem('staffID', this.result.id);
          localStorage.setItem('staffssID', this.result.id);
          localStorage.setItem('name',this.result.name)
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          //localStorage.setItem('name', this.result.name);
          localStorage.setItem('supervisor', this.result.supervisor);         
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('password', this.result.password);
          localStorage.setItem('BuildingID', this.result.building);
          localStorage.setItem('userRoleID', this.result.roleType);
          localStorage.setItem('projectName', this.result.projectName);
          localStorage.setItem('UserID', this.result.id)
          localStorage.setItem('temp', '1');          
          localStorage.setItem('roleid', '3');
          location.href = "#/LoginDashboard";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.userName = "";
          this.password = "";
        }
      })
    }

    else if (this.roleID == 4) {
      debugger;
      this.DigiOfficeService.GetUsersdetailsForManagerLogin(this.userName, this.password).subscribe(data => {
        this.result = data;
        debugger;
        if (this.result!=undefined || this.result!=null) {
          localStorage.setItem('managerID', this.result.id);
          localStorage.setItem('staffID',this.result.staffID);
          localStorage.setItem('buildingID',this.result.buildingID);
          localStorage.setItem('userRoleID',this.result.userRoleID);
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('name', this.result.name);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('password', this.result.password);
          localStorage.setItem('loginTypeId', this.result.loginTypeID);
          localStorage.setItem('projectName', this.result.projectName);
          
          localStorage.setItem('temp', '1');
          localStorage.setItem('roleid', '4');
          location.href = "#/LoginDashboard";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.userName = "";
          this.password = "";
        }
      })
    }

    else if (this.roleID == 5) {
      
      this.DigiOfficeService.GetUsersdetailsForFinanceLogin(this.userName, this.password).subscribe(data => {
        this.result = data;
        if (this.result!=undefined || this.result!=null) {
          localStorage.setItem('managerID', this.result.id);
          localStorage.setItem('staffID',this.result.staffID);
          localStorage.setItem('buildingID',this.result.buildingID);
          localStorage.setItem('userRoleID',this.result.userRoleID);
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('name', this.result.name);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('password', this.result.password);
          localStorage.setItem('loginTypeId', this.result.loginTypeID);
          localStorage.setItem('temp', '1');
          localStorage.setItem('roleid', '5');
          location.href = "#/LoginDashboard";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.userName = "";
          this.password = "";
        }
      })
    }

    else if (this.roleID == 1) {
      debugger
      this.DigiOfficeService.GetAdmin(this.userName, this.password).subscribe(data => {
        debugger
        this.result = data;
        
        if (this.result!=undefined || this.result!=undefined) {
          localStorage.setItem('userID', this.result.id);
          localStorage.setItem('managerID', this.result.id);
          localStorage.setItem('staffID',this.result.staffID);
          localStorage.setItem('buildingID',this.result.buildingID);
          localStorage.setItem('userRoleID',this.result.userRoleID);
          localStorage.setItem('userName', this.result.loginName);
          localStorage.setItem('name', this.result.name);
          localStorage.setItem('phoneNo', this.result.phoneNo);
          localStorage.setItem('userName', this.result.emailID);
          localStorage.setItem('loginTypeID', this.result.loginTypeID);
          localStorage.setItem('password', this.result.password);
          
          localStorage.setItem('temp', '1');
          localStorage.setItem('roleid', '1');
          location.href = "#/HomeDashboardForAdmin";
          location.reload();
        }
        else {
          
          Swal.fire('Phonenumber or Password is invalid');
          this.userName = "";
          this.password = "";
        }
      })
    }
  
    else {
      Swal.fire('Username or password is Invalid.');
      this.userName = "";
      this.password = "";
    }
  }
}


