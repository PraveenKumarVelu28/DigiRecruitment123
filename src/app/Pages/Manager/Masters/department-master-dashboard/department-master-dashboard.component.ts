import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-master-dashboard',
  templateUrl: './department-master-dashboard.component.html',
  styleUrls: ['./department-master-dashboard.component.css']
})
export class DepartmentMasterDashboardComponent implements OnInit {
  departmentList: any[];
  search:any;

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetDepartmentMaster();
  }

  public GetDepartmentMaster(){
    
    this.DigiOfficeService.GetDepartmentMaster().subscribe(res=>{
      
      this.departmentList = res;
    }
  )}

  public DeleteDepartmentMaster(id) {
    this.DigiOfficeService.DeleteDepartmentMaster(id).subscribe(
      data => {
        
        Swal.fire('Department Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

}
