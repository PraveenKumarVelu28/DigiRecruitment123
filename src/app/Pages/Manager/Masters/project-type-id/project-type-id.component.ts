import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-type-id',
  templateUrl: './project-type-id.component.html',
  styleUrls: ['./project-type-id.component.css']
})
export class ProjectTypeIDComponent implements OnInit {
  Short: any;
  paramID: any;
  digitalMarketing: any;
  projects: any;
  products: any;
  short: number;
  code: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.short=0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetProjectIDTypeByID(this.paramID);
  }

  public InsertDetails() 
  {
    var Entity = {
      'Short' : this.short,
      'Code' : this.code
     
    }
    this.DigiOfficeService.InsertProjectIDType(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Project ID Type Added Successfully.');
        }
        location.href = "#/ProjectIDTypeDashboard";
      }, error => {
      }
    )
  }
  public GetProjectIDTypeByID(paramID) {
    
    this.DigiOfficeService.GetProjectIDTypeByID(paramID).subscribe((data) => {
      
      this.Short = data['short'];
    });
  }
  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'Short': this.Short 
    }
    this.DigiOfficeService.UpdateProjectIDType(entity).subscribe(data => {
      Swal.fire('Project Type Updated Successfully.');
      location.href = "#/ProjectIDTypeDashboard";
    })
  }
  
}
