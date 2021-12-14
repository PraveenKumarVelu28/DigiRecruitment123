

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit {
  travelType: any;
  buildingID: any;
  buildingList: any[];
  staffID: string;
  approverList: any[];
  projectList: any[];
  destination: any;
  departureDate: any;
  returnDate: any;
  Description: any;
  projectID: any;
  approverID: any;
  notes: any;
  staffName: string;
  air: number;
  travel: number;
  hotel: number;
  userName: string;
  staffTypeList: any[];
  staffTypeID: any;
  attachments = [];
  attachmentsurl: any;
  name: any;
  phoneNumber: any;
  email: any;
  address: any;
  date: any;
  salary: any;
  joiningDate: any;
  leavesPerYear: any;
  workTimings: any;
  emergencyContactNumber: any;
  employeeID: any;
  medicalLeaveEntld: any;
  meternityLeaveEntld: any;
  marriageLeaveEntld: any;
  petenityLeaveEntld: any;
  compassionateLeaveEntld: any;
  leavesTransferFromPreviousYear: any;
  extendedChildCareLeave: any;
  userRoleList: any[];
  roleID: any;
  staffIdd: any;
  userIdd: any;
  paramID: any;
  ID: any;
  saveupdate: number;
  staffList: any[];
  dateOfBirth: any;
  fathersName: any;
  mothersName: any;
  spouseName: any;
  parentsContact: any;
  emergencyContactName: any;
  bloodGroup: any;
  alternateEmergencyNumber: any;
  officialID: any;
  permanentAddress: any;
  passportNo: any;
  aadharCard: any;
  panCardNumber: any;
  officialBankName: any;
  officialBankAccountNo: any;
  iFSCCode: any;
  drivingLicence: any;
  vehicleNumber: any;
  loginTypeList: any[];
  loginTypeID: any;
  employeID: any;
  basicSalary: any;
  basicsalarylist: any[];
  pagBig: any;
  netMonthSalary: any;
  philHealthContribution: any;
  departmentList: any[];
  departmentID: any;
  supervisorName: any[];

  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  form: FormGroup;
  ngOnInit(): void {
    debugger
    this.roleID = 0;
    this.buildingID = 0;
   // this.projectID = 0;
    this.approverID = 0;
    this.staffTypeID = 0;
    this.air = 0;
    this.travel = 0;
    this.hotel = 0;
    this.loginTypeID = 0;
    this.departmentID=0;
    this.staffID = localStorage.getItem('staffID');
    this.userName = localStorage.getItem('userName');
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.getBuilding();
    this.getApprover();
    this.GetRoleType();
    this.GetProjectMasterList();
    this.GetLoginTypeMaster();
    //this.GetDepartmentMaster();

    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
        this.GetProjectMasterList();
        this.getStaffType();
        this.GetDepartmentMaster();

      }
      else {

        this.saveupdate = 1;
        this.DigiOfficeService.GetAllStaff().subscribe(
          data => {
            debugger
            this.staffList = data;
            this.staffList = this.staffList.filter(x => x.id == this.ID);
            this.buildingID = this.staffList[0].buildingid;
            var test = this.approverID;
            this.approverID = this.staffList[0].approverID;
            // this.DigiOfficeService.GetSupervisor('0').subscribe(data => {
            //   this.approverList = data;
            // })

            this.employeeID = this.staffList[0].employeID;
            this.name = this.staffList[0].name;
            this.email = this.staffList[0].emailID;
            this.phoneNumber = this.staffList[0].phoneNo;
            this.officialID = this.staffList[0].officialID;
            this.roleID = this.staffList[0].roleType;
            this.address = this.staffList[0].address;
            this.attachmentsurl = this.staffList[0].attachment;
          
            this.permanentAddress = this.staffList[0].permanentAddress;
            this.dateOfBirth = this.staffList[0].dateOfBirth;
            this.joiningDate = this.staffList[0].joiningDate;
            this.fathersName = this.staffList[0].fathersName;
            this.mothersName = this.staffList[0].mothersName;
            this.spouseName = this.staffList[0].spouseName;
            this.parentsContact = this.staffList[0].parentsContact;
            this.bloodGroup = this.staffList[0].bloodGroup;
            this.passportNo = this.staffList[0].passportNo;
            this.aadharCard = this.staffList[0].aadharCard;
            this.panCardNumber = this.staffList[0].panCardNumber;
            this.drivingLicence = this.staffList[0].drivingLicence;
            this.vehicleNumber = this.staffList[0].vehicleNumber;
            this.officialBankName = this.staffList[0].officialBankName;
            this.officialBankAccountNo = this.staffList[0].officialBankAccountNo;
            this.iFSCCode = this.staffList[0].ifscCode;
            this.leavesPerYear = this.staffList[0].leavesPerMonth;
            this.workTimings = this.staffList[0].workTimmings;
            this.emergencyContactName = this.staffList[0].emergencyContactName;
            this.emergencyContactNumber = this.staffList[0].emergencyContactNo;
            this.alternateEmergencyNumber = this.staffList[0].alternateEmergencyNumber;
           // this.projectID =this.staffList[0].projectListID,
            this.loginTypeID = this.staffList[0].loginTypeID;
            this.basicSalary = this.staffList[0].basicSalary;
            this.pagBig = this.staffList[0].pagbig;
            this.philHealthContribution = this.staffList[0].philHealthContribution;
            this.netMonthSalary = this.staffList[0].netPay;
            this.departmentID = this.staffList[0].departmentID;
            this.DigiOfficeService.GetDepartmentMaster().subscribe(res=>{
      
              this.departmentList = res;
            }
          )
            

          }, error => {
          }
        )
      }
    }
    )

   

  }
  // onCheckboxChange(e) {
  //   const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  //   if (e.target.checked) {
  //     checkArray.push(new FormControl(e.target.value));

  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }

  public getBuilding() {

    this.DigiOfficeService.GetBuildinglist().subscribe(data => {

      this.buildingList = data;

    })
  }

  public GetRoleType() {
    this.DigiOfficeService.GetRoleType(1).subscribe(data => {
      this.userRoleList = data;
    })
  }

  public getBuildingID(even) {
    this.buildingID = even.target.value;
  }
  public getApprover() {

    this.DigiOfficeService.GetAllStaff().subscribe(data => {
      debugger
      this.approverList = data;
    })
  }
  public getmanagerid(id) {
debugger
this.approverID=id.target.value;
    this.DigiOfficeService.GetAllStaff().subscribe(data => {
      debugger
      let temp:any=data.filter(x=>x.id==this.approverID);
      this.supervisorName = temp[0].name;
    })
  }
  
  getStaffType() {

    this.DigiOfficeService.GetStaffType().subscribe(data => {

      this.staffTypeList = data;
    })
  }
  GetLoginTypeMaster() {

    this.DigiOfficeService.GetLoginTypeMaster().subscribe(data => {

      this.loginTypeList = data;
    })
  }
  public GetProjectMasterList() {

    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {

      this.projectList = res;
    }
    )
  }
  public GetDepartmentMaster(){
    
    this.DigiOfficeService.GetDepartmentMaster().subscribe(res=>{
      
      this.departmentList = res;
    }
  )
}
  public onattachmentUpload(abcd) {
    debugger
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    abcd.length = 0;
  }
  brochures1 = [];
  public uploadattachments() {
    debugger
    this.DigiOfficeService.UploadImages(this.attachments).subscribe(res => {
      //this.attachmentsurl[0] = res;
      this.brochures1.push(res);
      let a = this.brochures1[0].slice(2);
      this.attachmentsurl = 'http://14.192.17.225' + a;
      // this.attachments.length = 0;
      Swal.fire("Added Successfully");

    });
  }
public getbasicsalary(basicSalary){
  debugger
  basicSalary 
  this.DigiOfficeService.GetSalarySplits(basicSalary).subscribe(res => {
    this.basicsalarylist = res;
    this.pagBig=this.basicsalarylist[0].pagBig;
    this.netMonthSalary=this.basicsalarylist[0].netMonthSalary;
    this.philHealthContribution=this.basicsalarylist[0].philHealthContribution;
  }
  )


}
  public insertDetails() {

    if (this.roleID == 11) {
      var entity = {
        BuildingID: this.buildingID,
        Name: this.name,
        PhoneNo: this.phoneNumber,
        EmailID: this.email,
        // TypeID: this.staffTypeID,
        Address: this.address,
        Attachment: this.attachmentsurl,
        JoiningDate: this.joiningDate,

        LeavesPerMonth: this.leavesPerYear,
        WorkTimmings: this.workTimings,
        ContactNumber: this.emergencyContactNumber,
        Supervisor: this.approverID,
        EmployeeID: this.employeeID,
        ResignationDate: new Date(),
        DateOfBirth: this.dateOfBirth,
        FathersName: this.fathersName,
        MothersName: this.mothersName,
        SpouseName: this.spouseName,
        ParentsContact: this.parentsContact,
        EmergencyContactName: this.emergencyContactName,
        BloodGroup: this.bloodGroup,
        AlternateEmergencyNumber: this.alternateEmergencyNumber,
        OfficialID: this.officialID,
        PermanentAddress: this.permanentAddress,
        // PassportNo: this.passportNo,
        // AadharCard: this.aadharCard,
        // PanCardNumber: this.panCardNumber,
        // OfficialBankName: this.officialBankName,
        // OfficialBankAccountNo: this.officialBankAccountNo,
        // IFSCCode: this.iFSCCode,
        // DrivingLicence: this.drivingLicence,
        // VehicleNumber: this.vehicleNumber,
        LoginTypeID: this.loginTypeID,
        RoleType: this.roleID,
        BasicSalary:this.basicSalary,
        pagbig:this.pagBig,
        PhilHealthContribution:this.philHealthContribution,
        NetPay:this.netMonthSalary,
        DepartmentID:this.departmentID,
        SupervisorName:this.supervisorName

      };
      this.DigiOfficeService.InsertStaff(entity).subscribe(data => {

        if (data != null) {

          Swal.fire("Staff Added Successfully.");
          location.href = "#/AllStaffDashboard";

        }
        // Swal.fire("Staff Added Successfully.");
        // location.href = "#/AllStaffDashboard";
      });
    }

    else {
      var staffentity =
      {
        BuildingID: this.buildingID,
        Name: this.name,
        PhoneNo: this.phoneNumber,
        EmailID: this.email,
        // TypeID: this.staffTypeID,
        Address: this.address,
        Attachment: this.attachmentsurl,
        JoiningDate: this.joiningDate,
        LeavesPerMonth: this.leavesPerYear,
        WorkTimmings: this.workTimings,
        ContactNumber: this.emergencyContactNumber,
        Supervisor: this.approverID,
        EmployeeID: this.employeeID,
        ResignationDate: new Date(),
        DateOfBirth: this.dateOfBirth,
        FathersName: this.fathersName,
        MothersName: this.mothersName,
        SpouseName: this.spouseName,
        ParentsContact: this.parentsContact,
        EmergencyContactName: this.emergencyContactName,
        BloodGroup: this.bloodGroup,
        AlternateEmergencyNumber: this.alternateEmergencyNumber,
        OfficialID: this.officialID,
        PermanentAddress: this.permanentAddress,
        // PassportNo: this.passportNo,
        // AadharCard: this.aadharCard,
       //PanCardNumber: this.panCardNumber,
       // OfficialBankName: this.officialBankName,
       // OfficialBankAccountNo: this.officialBankAccountNo,
        //IFSCCode: this.iFSCCode,
        // DrivingLicence: this.drivingLicence,
        // VehicleNumber: this.vehicleNumber,
        //ProjectListID :this.projectID,
        LoginTypeID: this.loginTypeID,
        RoleType: this.roleID,
        BasicSalary:this.basicSalary,
        pagbig:this.pagBig,
        PhilHealthContribution:this.philHealthContribution,
        NetPay:this.netMonthSalary,
        DepartmentID:this.departmentID,
        SupervisorName:this.supervisorName

      };
      this.DigiOfficeService.InsertStaff(staffentity).subscribe(data => {
debugger
        if (data != null) {
          var userentity = {

            "Name": this.name,
            "EmailID": this.email,
            "PhoneNo": this.phoneNumber,
            "BuildingID": this.buildingID,
            "UserTypeID": 1,
            "UserRoleID": this.roleID,
            "Description": "",
            "PhotoURL": this.attachmentsurl,
            "StaffID": data,
            "Supervisor": this.approverID,
            "LoginTypeID": this.loginTypeID,
            'OfficialID': this.officialID
          };
          this.DigiOfficeService.InsertUsers(userentity).subscribe(data2 => {
            debugger
            if (data2 == null) {
              Swal.fire("Something Went Worng");

            }
            else {

              let entity = {
                'ID': data,
                'UserID': data2
              }
              this.DigiOfficeService.UpdateUserIDForStaff(entity).subscribe(data3 => {
                Swal.fire("Staff Added Successfully.");
                location.href = "#/AllStaffDashboard";

              });
            }

          });

        }

      });
    }
  }

  public updatedetails() {
    debugger;
    var entity = {
      'Id': this.paramID,
      'BuildingID': this.buildingID,
        'Name': this.name,
        'PhoneNo': this.phoneNumber,
        'EmailID': this.email,
        // TypeID: this.staffTypeID,
        'Address': this.address,
        'Attachment': this.attachmentsurl,
        'JoiningDate': this.joiningDate,
        'LeavesPerMonth': this.leavesPerYear,
        'WorkTimmings': this.workTimings,
        'ContactNumber': this.emergencyContactNumber,
        'Supervisor': this.approverID,
        'EmployeeID': this.employeeID,
        'ResignationDate': new Date(),
        'DateOfBirth': this.dateOfBirth,
        'FathersName': this.fathersName,
        'MothersName': this.mothersName,
        'SpouseName': this.spouseName,
        'ParentsContact': this.parentsContact,
        'EmergencyContactName': this.emergencyContactName,
        'BloodGroup': this.bloodGroup,
        'AlternateEmergencyNumber': this.alternateEmergencyNumber,
        'OfficialID': this.officialID,
        'PermanentAddress': this.permanentAddress,
        'PassportNo': this.passportNo,
        'AadharCard': this.aadharCard,
        'PanCardNumber': this.panCardNumber,
        'OfficialBankName': this.officialBankName,
        'OfficialBankAccountNo': this.officialBankAccountNo,
        'IFSCCode': this.iFSCCode,
        'DrivingLicence': this.drivingLicence,
        'VehicleNumber': this.vehicleNumber,
        'LoginTypeID': this.loginTypeID,
        //'ProjectListID' :this.projectID,
        'RoleType': this.roleID,
        'BasicSalary':this.basicSalary,
        'pagbig':this.pagBig,
        'PhilHealthContribution':this.philHealthContribution,
        'NetPay':this.netMonthSalary,
        'DepartmentID':this.departmentID,
        'SupervisorName':this.supervisorName

    }
    this.DigiOfficeService.UpdateBuildingStaff(entity).subscribe(data => {

      Swal.fire('staff Updated Successfully.');
      location.href = "#/AllStaffDashboard";

    })
  }
}
     
 















