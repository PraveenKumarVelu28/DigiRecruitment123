import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-staff-locator-requests-dashboard',
  templateUrl: './all-staff-locator-requests-dashboard.component.html',
  styleUrls: ['./all-staff-locator-requests-dashboard.component.css']
})
export class AllStaffLocatorRequestsDashboardComponent implements OnInit {
  Search:any;
  SDate: any;
  EDate: any;
  allStaffLocatorRequestsList: any[];
  p: number = 1;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.SDate = '2020-01-01';
    this.EDate = '2025-12-31';
    this.GetAllStaffLocatorRequests();
  }
  public GetAllStaffLocatorRequests(){
    
    this.DigiOfficeService.GetAllStaffLocatorRequests(this.SDate, this.EDate).subscribe(res=>{
      
      this.allStaffLocatorRequestsList = res;
    }
  )}

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.allStaffLocatorRequestsList.length; i++) {
      
      var list = {
        name: this.allStaffLocatorRequestsList[i].name,
        project: this.allStaffLocatorRequestsList[i].project,
        date: this.allStaffLocatorRequestsList[i].date,
        Purpose: this.allStaffLocatorRequestsList[i].Purpose,
        contactPerson: this.allStaffLocatorRequestsList[i].contactPerson,
        contactPhNo: this.allStaffLocatorRequestsList[i].contactPhNo,
        timeOfDeparture: this.allStaffLocatorRequestsList[i].timeOfDeparture,
        timeOfReturn: this.allStaffLocatorRequestsList[i].timeOfReturn,
        destination: this.allStaffLocatorRequestsList[i].destination,
        hourDiff: this.allStaffLocatorRequestsList[i].hourDiff
       
        
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
  
}
