import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-idtype-dashboard',
  templateUrl: './project-idtype-dashboard.component.html',
  styleUrls: ['./project-idtype-dashboard.component.css']
})
export class ProjectIDTypeDashboardComponent implements OnInit {
  projectIDTypeList: any[];

constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetProjectIDType();
  }
  public GetProjectIDType(){
    
    this.DigiOfficeService.GetProjectIDType().subscribe(res=>{
      
      this.projectIDTypeList = res;
    }
  )}
  public DeleteProjectIDType(id) {
    this.DigiOfficeService.DeleteProjectIDType(id).subscribe(
      data => {
        
        Swal.fire('Project Master Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }
  
  

}
