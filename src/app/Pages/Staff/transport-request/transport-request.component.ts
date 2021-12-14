import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transport-request',
  templateUrl: './transport-request.component.html',
  styleUrls: ['./transport-request.component.css']
})
export class TransportRequestComponent implements OnInit {
  departureDateTime: any;
  returnDateTime: any;
  typeOfVechile: any;
  pickUpPoint: any;
  destination: any;
  staffID: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.staffID=297;
  }

  public InsertDetails() 
  {
    
    var Entity = {  
      'Supervisor': this.staffID,
      'DepartureDateTime': this.departureDateTime,
      'ReturnDateTime': this.returnDateTime,
      'TypeOfVechile': this.typeOfVechile,
      'PickUpPoint': this.pickUpPoint,
      'Destination': this.destination
    }
    this.DigiOfficeService.InsertTransportationRequestsMob(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Transport Request Successfully.');
        }
        location.href = "#/TransportRequestDashboard";
      }, error => {
      }
    )
  } 


}
