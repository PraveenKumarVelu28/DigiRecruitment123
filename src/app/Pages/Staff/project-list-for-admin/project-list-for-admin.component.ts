import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list-for-admin',
  templateUrl: './project-list-for-admin.component.html',
  styleUrls: ['./project-list-for-admin.component.css']
})
export class ProjectListForAdminComponent implements OnInit {
  search:any;
  projectList: any[];
  filteredList: any;
  count: any;

  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetProjectMasterList();
  }
  public GetProjectMasterList() {
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      this.projectList = res;
      this.filteredList = this.projectList;
      this.count = this.filteredList.length;
    
    }
    )
  }
  public EnableProjectMaster(id) {
    
    this.DigiOfficeService.EnableProjectMaster(id).subscribe(
      data => {
        
        Swal.fire("Disabled Successfully");
        this.GetProjectMasterList();
      }, error => {
      }
    )
  }

  public DisableProjectMaster(id) {
    
    this.DigiOfficeService.DisableProjectMaster(id).subscribe(
      data => {
        
        Swal.fire("Enabled Successfully");
        this.GetProjectMasterList();
      }, error => {
      }
    )
  }
  public Delete(id) {
    
    this.DigiOfficeService.DeleteProjectMaster(id).subscribe(res => {
      
      this.GetProjectMasterList;
      Swal.fire('Deleted Succassfully.');
    }
    )
  }
  
}
