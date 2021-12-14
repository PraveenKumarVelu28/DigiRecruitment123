import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-locator-request',
  templateUrl: './add-locator-request.component.html',
  styleUrls: ['./add-locator-request.component.css']
})
export class AddLocatorRequestComponent implements OnInit {
  paramID: any;
  name: any;
  transportationType: any;
  date: any;
  project: any;
  destination: any;
  purpose: any;
  timeOfDeparture: any;
  timeOfReturn: any;
  Supervisor: any;
  UserID: any;
  UserName: any;
  transportationtypelist: any[];
  ProjectId: any;
  projectlist: any[];
  supervisorList: any[];
  userName: any;
  staffID: any;
  staffName: any;
  managerID: any;
  roleID: number;
  contactPerson: any;
  contactPhNo: any;
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.transportationType = 0;
    this.project = 0;
    this.Supervisor = 0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.managerID = localStorage.getItem('managerID')
    this.staffID = localStorage.getItem('staffID');
    this.name = localStorage.getItem('name');
    // this.UserID=localStorage.getItem('staffID');
    // this.UserName=localStorage.getItem('Name');
    this.GetTransportRequestType();
    this.GetProjectMasterList();
    this.GetSupervisor();
  }

  public GetTransportRequestType() {
    
    this.DigiOfficeService.GetTransportRequestType().subscribe(res => {
      
      this.transportationtypelist = res;
    });
  }

  public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      
      this.projectlist = res;
    });
  }
  public GetSupervisor() {
    
    this.DigiOfficeService.GetSupervisor(this.staffID).subscribe(res => {
      
      this.supervisorList = res;
    });
  }

  //  public GetUsers() {
  //   
  //   this.DigiOfficeService.GetUsers(this.staffID).subscribe(res => {
  //     
  //     this.supervisorList = res;
  //   });
  //  }


  public InsertDetails() {
    
    var Entity = {
      'UserID': this.managerID,
      'Name': this.name,
      'Date': this.date,
      'Project': this.project,
      'Destination': this.destination,
      'Purpose': this.purpose,
      'ContactPerson': this.contactPerson,
      'ContactPhNo': this.contactPhNo,
      'TimeOfDeparture': this.timeOfDeparture,
      'TimeOfReturn': this.timeOfReturn,
      'Supervisor': this.Supervisor,
      'TransportationType': this.transportationType

    }
    this.DigiOfficeService.InsertLocatorTable(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Locator Request Raised Successfully.');
        }

        location.href = "#/ManagerLocatorDashboard";
      }, error => {
      }
    )
  }


  public GetTime(even) {
    
    this.timeOfDeparture = even.target.value;
  }

}
