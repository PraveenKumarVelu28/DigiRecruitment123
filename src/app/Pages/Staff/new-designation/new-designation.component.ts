import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-designation',
  templateUrl: './new-designation.component.html',
  styleUrls: ['./new-designation.component.css']
})
export class NewDesignationComponent implements OnInit {

  Short: any;
  paramID: any;
  designation: any;
  short: any;
  description: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    
  }

  public InsertDetails() 
  {
    
    var Entity = {
     
      'Short': this.short ,
      'Description': this.description 
    }
    this.DigiOfficeService.InsertDesignationMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Designation Type Added Successfully.');
        }
        location.href = "#/DesignationDashboard";
      }, error => {
      }
    )
  }
  
  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'Designation': this.designation 
    }
    this.DigiOfficeService.UpdateDesignationType(entity).subscribe(data => {
      Swal.fire('Designation Updated Successfully.');
      location.href = "#/DesignationDashboard";
    })
  }

}
