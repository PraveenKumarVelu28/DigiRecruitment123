import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-up-coming-events-dashboard-for-manager',
  templateUrl: './up-coming-events-dashboard-for-manager.component.html',
  styleUrls: ['./up-coming-events-dashboard-for-manager.component.css']
})
export class UpComingEventsDashboardForManagerComponent implements OnInit {

  eventList: any[];
  filteredEventList: any[];
  count: number;
  search: any;
  status: any;
  value: any;
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
    const myDate = new Date();
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
    this.GettodayEvents(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GettodayEvents(this.startdate,this.enddate);
  }

  public GettodayEvents(SDate,EDate) {
    this.DigiOfficeService.GettodayEvents(SDate,EDate).subscribe(res => {
      
      this.eventList = res;
      this.filteredEventList = this.eventList;
      this.count = this.filteredEventList.length;
    })
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
