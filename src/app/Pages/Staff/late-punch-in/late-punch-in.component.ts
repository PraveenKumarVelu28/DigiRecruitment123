import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-late-punch-in',
  templateUrl: './late-punch-in.component.html',
  styleUrls: ['./late-punch-in.component.css']
})
export class LatePunchInComponent implements OnInit {

 
  paramID: any;
 
  shorts: any;
  description: any;
  ID: any;
  saveupdate: any;
  departmentList: any[];
  latePunchInTime: any;
  latePunchOutTime: any;
  punchlist: any[];

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
  
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
       
      }
      else {
        debugger
        this.saveupdate = 1;
        this.DigiOfficeService.GetLateAttendanceMaster().subscribe(
          data => {
            this.punchlist = data;
            this.punchlist = this.punchlist.filter(x => x.id == this.ID);
            this.latePunchInTime = this.punchlist[0].latePunchInTime;
            this.latePunchOutTime = this.punchlist[0].latePunchOutTime;
            //this.roleID = ""; 
          }, error =>
           {
          }
        )
      }
    }
    )
  }
 
  public InsertDetails() 
  {
    
    var Entity = {
      'LatePunchInTime': this.latePunchInTime ,
      'LatePunchOutTime': this.latePunchOutTime 
      
    }
    this.DigiOfficeService.InsertLateAttendanceMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('puch-in Deatils Added Successfully.');
        }
        location.href = "#/LatePunchInDashbaord";
      }, error => {
      }
    )
  }
  public updatedetails() {
    var entity = {
      'Id': this.paramID,
      'LatePunchInTime': this.latePunchInTime ,
      'LatePunchOutTime': this.latePunchOutTime 
    }
    this.DigiOfficeService.UpdateLateAttendanceMaster(entity).subscribe(data => {
      Swal.fire('Punch-In Details Updated Successfully.');
      location.href = "#/LatePunchInDashbaord";
    })
  }
}
