import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-all-locator-dashboard-for-finance',
  templateUrl: './all-locator-dashboard-for-finance.component.html',
  styleUrls: ['./all-locator-dashboard-for-finance.component.css']
})
export class AllLocatorDashboardForFinanceComponent implements OnInit {

  Search:any;
  allStaffLocatorRequestsList: any[];
  p: number = 1;
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
    this.todaydate = formatDate(myDate, format, locale);
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
    this.GetAllStaffLocatorRequests(this.startdate, this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllStaffLocatorRequests(this.startdate, this.enddate);
  }
  public GetAllStaffLocatorRequests(SDate,EDate){
    
    this.DigiOfficeService.GetAllStaffLocatorRequests(SDate,EDate).subscribe(res=>{
      
      this.allStaffLocatorRequestsList = res;
    }
  )}
  public ApprovedStaffLocatorByAdmin(id){
    
   
    this.DigiOfficeService.ApprovedStaffLocatorByAdmin(id).subscribe(res => {
     
     Swal.fire('Leave Approved Successfully...')
     this.ngOnInit();
   });
  }
  
  public RejctedStaffLocatorByAdmin(id){
    
   
    this.DigiOfficeService.RejctedStaffLocatorByAdmin(id).subscribe(res => {
     
     Swal.fire('Leave Rejected Successfully...')
     this.ngOnInit();
   });
  }
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
