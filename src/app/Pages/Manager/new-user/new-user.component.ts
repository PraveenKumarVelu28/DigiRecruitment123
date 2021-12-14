
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExportToCsv } from 'export-to-csv';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
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
  userRoleList: any;
  roleID: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  attachments = [];
  attachmentsurl :any;
  name: any;
  email: any;
  phoneNumber: any;
  description: any;
  paramID: any;
  ID: any;
  saveupdate: number;
  userList: any;
  ModifiedBy: any;
  RoleID: any;
  UserID: any;
  userID: any;
  attachment: any;
  modifiedBy: any;
  UserIdd: Object;
  staffIdd: Object;
  photoURL: any;
  listtobind: any[];
  constructor(private fb: FormBuilder, private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute, private Datepipe: DatePipe) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  form: FormGroup;
  ngOnInit(): void {
    this.buildingID=0;
    this.roleID = 0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
        this.dropdownSettings = {
          singleSelection: false,
          text: "Select Modules",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          enableSearchFilter: true,
          classes: "myclass custom-class"
        };
        this.GetModules();
        this.GetRoleType();
        this.getBuilding();
      }
      else {
        debugger
        this.saveupdate = 1;
        this.DigiOfficeService.GetUserList().subscribe(
          data => {
            this.userList = data;
            this.userList = this.userList.filter(x => x.id == this.ID);
            this.name = this.userList[0].name;
            this.email = this.userList[0].emailID;
            this.phoneNumber = this.userList[0].phoneNo;
            this.description = this.userList[0].description;
            this.buildingID = this.userList[0].buildingID;
            this.attachmentsurl = this.userList[0].photoURL;
            this.roleID = this.userList[0].userRoleID;
            this.DigiOfficeService.GetRoleType(1).subscribe(data => {
              this.userRoleList = data;
            })
            this.selectedItems = this.userList[0].moduleID.split(',');
            this.dropdownSettings = {
              singleSelection: false,
              text: "Select Modules",
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              enableSearchFilter: true,
              classes: "myclass custom-class"
            };
            //this.roleID = ""; 
            this.DigiOfficeService.GetUserrole().subscribe(data => {
              this.dropdownList = data;
              for(let j=0;j<this.dropdownList.length;j++){
                for(let i=0;i<this.selectedItems.length;i++){
                  let nospace=this.selectedItems[i].replace(/\s/g, "");
                  if(nospace==this.dropdownList[j].id){
                    this.selectedItems1.push(this.dropdownList[j]);
                  }
                }
              }
            })
            this.GetRoleType();
            this.getBuilding();
            this.DigiOfficeService.GetRoleType(1).subscribe(data => {
              this.userRoleList = data;
            })
            this.DigiOfficeService.GetUserrole().subscribe(data => {
              this.dropdownList = data;
            })
          }, error =>
           {
          }
        )
      }
    }
    )
    
  }
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
  public GetModules() {
    this.DigiOfficeService.GetUserrole().subscribe(data => {
      this.dropdownList = data;
    })
  }
  selectedItems1 = [];

  onItemSelect(item: any) {
    
    this.selectedItems1.push(item);
    
  }

  OnItemDeSelect(item: any) {
    this.selectedItems1.pop();
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  public onattachmentUpload(abcd) {
    
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    abcd.length = 0;
  }
  brochures1=[];
  public uploadattachments() {
    
    this.DigiOfficeService.UploadImages(this.attachments).subscribe(res => {
      
      this.brochures1.push(res);
      let a = this.brochures1[0].slice(2);
      
      this.attachmentsurl = 'http://14.192.17.225' + a;
      // this.attachments.length = 0;
      Swal.fire("Added Successfully");
      
    });
  }



  public insertDetails() {
    

    var entity = {
      "Name": this.name,
      "EmailID": this.email,
      "PhoneNo": this.phoneNumber,
      "BuildingID" : this.buildingID,
      "UserTypeID": 1,
      "UserRoleID": this.roleID,
      "Description": this.description,
      "PhotoURL": this.attachmentsurl,
      
      // "Supervisor": 0
    };
    this.DigiOfficeService.InsertUsers(entity).subscribe(data => {
      
      this.UserIdd = data
      if (data != null) {
        for (let i = 0; i < this.selectedItems1.length; i++) {
          let selecteditemID = this.selectedItems1[i].id;
          var userRoleEntity = {

            "UserID": data,
            "RoleID": selecteditemID,
            "ModifiedBy": 'sa'

          };
          this.DigiOfficeService.InsertUserRoles(userRoleEntity).subscribe(data2 => {
            if (data2 != null) {
              Swal.fire("User Saved  Successfully.");
              location.href = "#/UserDashboard";
            }
          })
        }
      }
    });
  }


  public updatedetails() {
    var entity = {
      "Id": this.paramID,
      "Name": this.name,
      "EmailID": this.email,
      "PhoneNo": this.phoneNumber,
      "BuildingID" : this.buildingID,
      "UserTypeID": 1,
      "UserRoleID": this.roleID,
      "Description": this.description,
      "PhotoURL": this.attachmentsurl[0],
    }
    this.DigiOfficeService.UpdateUsers(entity).subscribe(data => {
      this.DigiOfficeService.DeleteUsers(this.ID).subscribe(res => {
        this.DigiOfficeService.InsertUsers(entity).subscribe(data => {
          
          this.UserIdd = data
          if (data != null) {
            for (let i = 0; i < this.selectedItems1.length; i++) {
              let selecteditemID = this.selectedItems1[i].id;
              var userRoleEntity = {
                "UserID": data,
                "RoleID": selecteditemID,
                "ModifiedBy": 'sa'
              };
              this.DigiOfficeService.InsertUserRoles(userRoleEntity).subscribe(data2 => {
                Swal.fire('User Updated Successfully.');
                location.href = "#/UserDashboard";
              })
            }
          }
        });
      }
      )
     
    })
  }

}


