import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-department-master',
  templateUrl: './new-department-master.component.html',
  styleUrls: ['./new-department-master.component.css']
})
export class NewDepartmentMasterComponent implements OnInit {


  paramID: any;
 
  shorts: any;
  description: any;
  ID: any;
  saveupdate: any;
  departmentList: any[];

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
        this.DigiOfficeService.GetDepartmentMaster().subscribe(
          data => {
            this.departmentList = data;
            this.departmentList = this.departmentList.filter(x => x.id == this.ID);
            this.shorts = this.departmentList[0].shorts;
            this.description = this.departmentList[0].description;
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
      'Shorts': this.shorts ,
      'Description': this.description ,
    }
    this.DigiOfficeService.InsertInsertDepartmentMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Department Added Successfully.');
        }
        location.href = "#/DepartmentMasterDashboard";
      }, error => {
      }
    )
  }
  public updatedetails() {
    var entity = {
      'Id': this.paramID,
      'Shorts': this.shorts ,
      'Description': this.description 
    }
    this.DigiOfficeService.UpdateDepartmentMaster(entity).subscribe(data => {
      Swal.fire('Department Updated Successfully.');
      location.href = "#/DepartmentMasterDashboard";
    })
  }

}
