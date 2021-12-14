import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-locator-by-staff',
  templateUrl: './add-locator-by-staff.component.html',
  styleUrls: ['./add-locator-by-staff.component.css']
})
export class AddLocatorByStaffComponent implements OnInit {
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
  UserName:any;
  transportationtypelist: any[];
  ProjectId: any;
  projectlist: any[];
  supervisorList: any[];
  userName: any;
  staffID: any;
  staffName: any;
  managerID:any;
  roleID: number;
  contactPerson: any;
  approver: any;
  phoneNumber: any;
  ID: any;
  saveupdate: number;
  transportationlist: any[];
  supervisorName: any;
  contactPhNo: any;
  raisedBy: any;
  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.transportationType=0;
    this.project=0;
    this.Supervisor=0;
    this.approver=0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
      }
      else {
        this.saveupdate = 1;
        this.DigiOfficeService.GetLocatorRequestsForEdit().subscribe(
          data => {
            
            this.transportationlist = data;
            this.transportationlist = this.transportationlist.filter(x => x.id == this.ID);
            this.raisedBy = this.transportationlist[0].staffName;
            this.transportationType = this.transportationlist[0].transportationType;
            this.date = this.transportationlist[0].date;
            this.project = this.transportationlist[0].project;
            this.destination = this.transportationlist[0].destination;
            this.purpose = this.transportationlist[0].purpose;
            this.timeOfDeparture = this.transportationlist[0].timeOfDeparture;
            this.timeOfReturn = this.transportationlist[0].timeOfReturn;
            this.Supervisor = this.transportationlist[0].supervisorName;
            this.phoneNumber = this.transportationlist[0].contactPhNo;
            
            
          }, error =>
           {
          }
        )
      }
    }
    )
    this.managerID=localStorage.getItem('managerID')
    this.staffID=localStorage.getItem('staffID');
    this.staffName=localStorage.getItem('name');
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


  public InsertDetails() 
  {
    
    var Entity = {
      'UserID':this.staffID,
      'Name': this.staffName,
      'Date': this.date,
      'Project': this.project,
      'Destination': this.destination,
      'Purpose': this.purpose,
      'ContactPerson':this.Supervisor,
      'ContactPhNo':this.phoneNumber,
      'TimeOfDeparture': this.timeOfDeparture,
      'TimeOfReturn': this.timeOfReturn,
      'Supervisor': this.Supervisor,
      'TransportationType': this.transportationType
     
    }
    this.DigiOfficeService.InsertLocatorTable(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Locator Request Raised Successfully.');
        }
        
          location.href = "#/LocatorRequests";
      }, error => {
      }
    )
  }
  public updatedetails() {
    
    var entity = {
      'ID': this.ID,
      'UserID':this.staffID,
      'Name': this.staffName,
      'Date': this.date,
      'Project': this.project,
      'Destination': this.destination,
      'Purpose': this.purpose,
      'ContactPerson':this.Supervisor,
      'ContactPhNo':this.phoneNumber,
      'TimeOfDeparture': this.timeOfDeparture,
      'TimeOfReturn': this.timeOfReturn,
      'Supervisor': this.Supervisor,
      'TransportationType': this.transportationType
    }
    this.DigiOfficeService.UpdateLocatorTable(entity).subscribe(data => {
      Swal.fire('Locator Request updated Successfully.');
      location.href = "#/LocatorRequests";
    })
  }
}
