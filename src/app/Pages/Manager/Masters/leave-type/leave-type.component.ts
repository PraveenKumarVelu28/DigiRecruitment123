import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  paramID: any;
  Short: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetLeaveTypeByID(this.paramID);
  }
  
  
  public InsertDetails() 
  {
    
    var Entity = {
      'Short': this.Short 
    }
    this.DigiOfficeService.InsertLeaveTypeMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Leave Type Added Successfully.');
        }
        location.href = "#/LeaveTypeDashboard";
      }, error => {
      }
    )
  }
  public GetLeaveTypeByID(paramID) {
    
    this.DigiOfficeService.GetLeaveTypeByID(paramID).subscribe((data) => {
      
      this.Short = data['short'];
    });
   
  }
  
  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'Short': this.Short 
    }
    this.DigiOfficeService.UpdateLeaveTypeMaster(entity).subscribe(data => {
      Swal.fire('Leave Type Updated Successfully.');
      location.href = "#/LeaveTypeDashboard";
    })
  }
  
}
