import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit {
  eventList: any[];
  filteredEventList: any[];
  count: number;
  search: any;
  status: any;
  value:any;
  todaydate: any;
  startdate: any;
  enddate: any;
  SDate = new Date();
  EDate = new Date();
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    var date = new Date();
    var kkk = new Date(date.getFullYear(), date.getMonth(), 1);
    var lll = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
    const format = "yyyy-MM-dd";
    const locale = "en-US";
    this.todaydate = formatDate(date, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    // Find current hour in AM-PM Format
    hours = hours % 12;
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;  
    this.GettodayEvents(this.startdate,this.EDate);
  }
  
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate= data[1].toLocaleString().split(',')[0]
    this.GettodayEvents(this.startdate,this.enddate);
  }

  public GettodayEvents(SDATE,EDATE) {
    this.DigiOfficeService.GetEventList(SDATE,EDATE).subscribe(res => {
      
      this.eventList = res;
      this.filteredEventList = this.eventList;
      this.count = this.filteredEventList.length;
    })
  }

  exportexcel() {
    
    var itemmasterlist = []
    for (let i = 0; i < this.filteredEventList.length; i++) {
      
      var list = {
        dateTime: this.filteredEventList[i].dateTime,
        name: this.filteredEventList[i].name,
        venue: this.filteredEventList[i].venue,
        description: this.filteredEventList[i].description,
        modifiedBy: this.filteredEventList[i].modifiedBy

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
