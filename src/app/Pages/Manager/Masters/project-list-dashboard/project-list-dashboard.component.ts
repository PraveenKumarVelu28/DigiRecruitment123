import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list-dashboard',
  templateUrl: './project-list-dashboard.component.html',
  styleUrls: ['./project-list-dashboard.component.css']
})
export class ProjectListDashboardComponent implements OnInit {

  projectIDTypeList: any[];

constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetProjectMasterList();
  }
  public GetProjectMasterList(){
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res=>{
      
      this.projectIDTypeList = res;
    }
  )}
  public DeleteProjectMaster(id) {
    debugger
    this.DigiOfficeService.DeleteProjectMaster(id).subscribe(
      data => {
        
        Swal.fire('Project Master Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }
  

}
