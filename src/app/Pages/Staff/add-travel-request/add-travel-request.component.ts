import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
@Component({
  selector: 'app-add-travel-request',
  templateUrl: './add-travel-request.component.html',
  styleUrls: ['./add-travel-request.component.css']
})
export class AddTravelRequestComponent implements OnInit {
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
  notes:any;
  staffName: string;
  air: number;
  travel: number;
  hotel: number;
  typeOfVechile: any;
  pickUpPoint: any;
  vechileList: any[];

  constructor( private fb: FormBuilder,private DigiOfficeService:DigiOfficeService) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
 
  form: FormGroup;
  ngOnInit(): void {
    this.buildingID="";
    this.projectID="";
    this.approverID="";
    this.air=0;
    this.travel=0;
    this.hotel=0;
    this.typeOfVechile=0;
    this.staffID=localStorage.getItem('staffID');
    this.staffName=localStorage.getItem('name');
    this.getBuilding();
    this.getApprover();
    this.GetProjectMasterList();
    this.GetTransportRequestType();
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

  public getBuilding(){
    
    this.DigiOfficeService.GetBuildinglist().subscribe(data=>{
      
      this.buildingList=data;
      
    })
  }

  public GetTransportRequestType(){
    
    this.DigiOfficeService.GetTransportRequestType().subscribe(data=>{
      
      this.vechileList=data;
      
    })
  }
  
  public getBuildingID(even){
    this.buildingID=even.target.value;
  }
  public getApprover(){
    
    this.DigiOfficeService.GetSupervisor(this.staffID).subscribe(data=>{
      
      this.approverList=data;
    })
  }
  public GetProjectMasterList(){
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(data=>{
      
      this.projectList=data;
    })
  }
  public insertDetails() {
    
    var entity = {
      BuildingID: this.buildingID,
      Destination: this.destination,
      DepartureDateTime: this.departureDate,
      ReturnDateTime: this.returnDate,
      SpecialInstructions:'NA',
      RequestBy:this.staffID,
      Floor: '1',
      StatusID: '0',
      ProjectName: this.projectID,
      AirBit : this.air,
      Supervisor: this.approverID,
      TravelBit:this.travel,
      HotelBit :this.hotel,
      TypeOfVechile:this.typeOfVechile,
      PickUpPoint:this.pickUpPoint
   
    };
    this.DigiOfficeService.InsertTransportationRequestsMob(entity).subscribe(data => {
      
      if (data != null) {
        Swal.fire("Transportation Request Raised Successfully.");
        location.href = "#/TransportRequestDashboard";

      }
      else{
        Swal.fire("Something Went Worng");
      }
    });
  }

}
