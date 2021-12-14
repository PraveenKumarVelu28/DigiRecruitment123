import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-technology-request-dashboard',
  templateUrl: './technology-request-dashboard.component.html',
  styleUrls: ['./technology-request-dashboard.component.css']
})
export class TechnologyRequestDashboardComponent implements OnInit {
  search:any;
  technologyRequestList: any[];
  count: any;
  filteredList: any[];

  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetTechnologyRequestRaised();
  }
  public GetTechnologyRequestRaised() {
    
    this.DigiOfficeService.GetTechnologyRequestRaised().subscribe(res => {
      
      this.technologyRequestList = res;
      this.filteredList = this.technologyRequestList;
      this.count = this.filteredList.length;
    }
    )
  }
 
  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.technologyRequestList.length; i++) {
      
      var list = {
        DueDate: this.technologyRequestList[i].dueDate,
        RequestType: this.technologyRequestList[i].requestType,
        status: this.technologyRequestList[i].status      
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Technology Request Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Technology Request Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
}
