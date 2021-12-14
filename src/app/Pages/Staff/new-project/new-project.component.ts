import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  projectTypelist: any;
  ProjectIDType: any;
  projectName: any;
  projectCode: any;
  projectIDType: any;
  description: any;
  paramID: any;
  ID: any;
  saveupdate: any;
  projectList: any[];
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectIDType = 0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.ActivatedRoute.params.subscribe(params => {
      
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.saveupdate = 0;
      }
      else {

        this.saveupdate = 1;
        this.DigiOfficeService.GetProjectMasterList().subscribe(
          data => {
            
            this.projectList = data;
            this.projectList = this.projectList.filter(x => x.id == this.ID);
            this.projectName = this.projectList[0].projectName;
            this.projectCode = this.projectList[0].projectCode;
            this.projectIDType = this.projectList[0].projectIDType;
            this.description   = this.projectList[0].description;

          }, error => {
        }
        )
      }
    }
    )
    this.GetProjectIDType();
  }
  public GetProjectIDType() {
    
    this.DigiOfficeService.GetProjectIDType().subscribe(res => {
      
      this.projectTypelist = res;

    });
  }
  public InsertDetails() {
    
    var Entity = {
      'ProjectName': this.projectName,
      'ProjectCode': this.projectCode,
      'ProjectIDType': this.projectIDType,
      'Description': this.description,
    }
    this.DigiOfficeService.InsertProjectMaster(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Project Added Successfully.');
        }
        location.href = "#/ProjectListForAdmin";
      }, error => {
      }
    )
  }
  public updatedetails() {
    var entity = {
      Id: this.paramID,
      ProjectName: this.projectName,
      ProjectCode: this.projectCode,
      ProjectIDType: this.projectIDType,
      Description: this.description
    }
    this.DigiOfficeService.UpdateProjectMaster(entity).subscribe(data => {
     
     
        location.href = "#/ProjectListForAdmin";
    
      Swal.fire('Project Updated Successfully.');
    })
  }

}
