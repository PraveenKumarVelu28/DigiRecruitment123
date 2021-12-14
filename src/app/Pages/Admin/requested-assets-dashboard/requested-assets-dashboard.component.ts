
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requested-assets-dashboard',
  templateUrl: './requested-assets-dashboard.component.html',
  styleUrls: ['./requested-assets-dashboard.component.css']
})
export class RequestedAssetsDashboardComponent implements OnInit {
  eventList: any[];
  filteredEventList: any[];
  count: number;
  search:any;
  staffID: string;
  status: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.status=0;
    this.GetEmployee_Assets();
  }

  public GetEmployee_Assets() {
    this.DigiOfficeService.GetEmployee_AssetsForAdmin(0,1).subscribe(res => {
      
      this.eventList= res;
      this.filteredEventList=this.eventList;
      this.count=this.filteredEventList.length;
    })
  }
  public getStatus(even) {
    
    this.status = even.target.value;
    if (this.status != 0) {
      this.filteredEventList = this.eventList.filter(x => x.status == this.status)
    } else {
      this.filteredEventList=this.eventList;
    }
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.filteredEventList.length; i++) {
      
      var list = {
        userType: this.filteredEventList[i].userType,
        name: this.filteredEventList[i].name,
        emailID: this.filteredEventList[i].emailID,
        phoneNo: this.filteredEventList[i].phoneNo,
        userRole: this.filteredEventList[i].userRole,
      
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Events Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Events Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
  
}
