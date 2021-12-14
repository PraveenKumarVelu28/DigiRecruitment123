import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visitor-parking-dashboard',
  templateUrl: './visitor-parking-dashboard.component.html',
  styleUrls: ['./visitor-parking-dashboard.component.css']
})
export class VisitorParkingDashboardComponent implements OnInit {
  show: any;
  buildingList: any;
  buildingID: any;
  floorList: any;
  floorID: any;
  parkingSlotList: any;
  visitorList: any[];
  visitorID: any;

  constructor(private DigiOfficeService:DigiOfficeService) { }

  ngOnInit(): void {
    this.show==0;
    this.buildingID=0;
    this.floorID=0;
    this.visitorID=0;
    this.GetBuildinglist();
  }
  public GetBuildinglist(){
    this.DigiOfficeService.GetBuildinglist().subscribe(res=>{
      this.buildingList = res;
    }) 
  }
  public getBuildingID(even){
    
    this.buildingID=even.target.value;
    this.getVisitors();
    this.GetFloor();
  }
  public GetFloor(){
    
    this.DigiOfficeService.GetFloorType(this.buildingID).subscribe(res=>{
      
      this.floorList = res;
    }) 
  }
  public getVisitors(){
    this.DigiOfficeService.GetVisitorbytodaydate(this.buildingID).subscribe(res=>{
      
      this.visitorList = res;
    }) 
    
  }
  public getFloorID(even){
    this.floorID=even.target.value;
   
    this.GetParkingSlotsByID();
  }
  public GetParkingSlotsByID(){
    
    this.DigiOfficeService.GetParkingSlotsByID(this.buildingID,this.floorID).subscribe(res=>{
      
      this.parkingSlotList = res;
    }) 
  }
  newparking:boolean;
  newparkingallocation() {

    if (this.newparking) {
      this.newparking = false;
    } else {
      this.newparking = true;
    }

  }

}
