import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-visitor-request',
  templateUrl: './visitor-request.component.html',
  styleUrls: ['./visitor-request.component.css']
})
export class VisitorRequestComponent implements OnInit {
  name: any;
  visitingDate: any;
  visitingTime: any;
  reason: any;
  visitingPersonNameList:any;
  visitingPersonName: any;
  requestBy: any;
  UserID: any;
  staffName: any;
  staffID: any;
  any: any;
  visitorFor: any;
  SDate: any;
  EDate: any;
  buildingID: any;
  buildinglist: any[];
  paramID: any;
  ID: any;
  saveupdate: number;
  VisitorRequest: any[];
  visitorTypeList: any[];
  visitorIDType: any;
  address: any;
  iDNumber: any;
  idType: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    //this.staffName=0;
    this.UserID=0;
    this.visitorFor=0;
    this.visitorIDType=0;
    this.SDate = '2019-01-01';
    this.EDate = '2025-12-31';
    this.staffID = localStorage.getItem('staffID');  
    this.buildingID = localStorage.getItem('BuildingID');
    this.staffName=localStorage.getItem('staffName');
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetAllStaff();
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
      }
      else {
        this.saveupdate = 1;
        this.DigiOfficeService.GetAllStaff().subscribe(data => {
          this.visitingPersonNameList = data;
          
        })
        this.DigiOfficeService.GetVisitorRequestForEdit().subscribe(
          data => {
            
            this.VisitorRequest = data;
            this.VisitorRequest = this.VisitorRequest.filter(x => x.id == this.ID);
            this.buildingID = this.VisitorRequest[0].buildingID;
            this.staffName = this.VisitorRequest[0].visitorFor;
            this.requestBy = this.VisitorRequest[0].visitorName;
            this.reason = this.VisitorRequest[0].reason;
            this.visitingDate = this.VisitorRequest[0].visitingDate;
            this.visitingTime = this.VisitorRequest[0].visitingTime;
            
          }, error =>
           {
          }
        )
      }
    }
    )
    this.GetBuildinglist();
  }
  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildinglist = res;
    });
  }
  public GetVisitorIDType() {
    
    this.DigiOfficeService.GetVisitorIDType().subscribe(res => {
      
      this.visitorTypeList = res;
    });
  }
  
  public GetAllStaff() {
    this.DigiOfficeService.GetAllStaff().subscribe(data => {
      this.visitingPersonNameList = data;
    })
  }

  public InsertDetails() 
  {
    debugger;
    var Entity = {  
      'BuildingID' :this.buildingID,
      'Name': this.requestBy,
      'Date': this.visitingDate,
      'Time': this.visitingTime,
      'Reason': this.reason,
      'RequestBy' :this.staffID,
      'VisitorFor' :this.staffName,
      'Address' : this.address,
      // 'VisitorIDType' :this.visitorIDType,
      'IDType' : this.idType,
      'IDNumber' : this.iDNumber
    }
    this.DigiOfficeService.InsertVisitorRequest(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Visitor Request Successfully.');
        }
        location.href = "#/VisitorRequestDashboard";
      }, error => {
      }
    )
  } 
  public updatedetails() {
    
    var entity = {
      'ID': this.ID,
      'BuildingID' :this.buildingID,
      'Name': this.requestBy,
      'Date': this.visitingDate,
      'Time': this.visitingTime,
      'Reason': this.reason,
      'RequestBy' :this.staffID,
      'VisitorFor' :this.staffName
    }
    this.DigiOfficeService.UpdateVisitorRequest(entity).subscribe(data => {
      Swal.fire('Visitor updated Successfully.');
      location.href = "#/VisitorRequestDashboard";
    })
  }
 
}
