import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-designation-dashboard',
  templateUrl: './designation-dashboard.component.html',
  styleUrls: ['./designation-dashboard.component.css']
})
export class DesignationDashboardComponent implements OnInit {

  search:any;
  designationList: any[];
 

  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetDesignationType();
  }

  public GetDesignationType(){
    
    this.DigiOfficeService.GetDesignationType().subscribe(res=>{
      
      this.designationList = res;
    }
  )}

  public DeleteDesignationType(id) {
    this.DigiOfficeService.DeleteDesignationType(id).subscribe(
      data => {
        
        Swal.fire('DesignationType Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

}
