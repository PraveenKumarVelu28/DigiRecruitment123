import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-borrowings-dashboard-for-staff',
  templateUrl: './borrowings-dashboard-for-staff.component.html',
  styleUrls: ['./borrowings-dashboard-for-staff.component.css']
})
export class BorrowingsDashboardForStaffComponent implements OnInit {
  eventList: any[];
  filteredEventList: any[];
  count: number;
  search: any;
  requestList: any;
  staffName: any;
  status: any;
  userID: any;
  SDate: any;
  EDate: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
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
    this.status = 0;
    this.userID = localStorage.getItem('UserID');
    this.GetBorrowerRequest(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetBorrowerRequest(this.startdate,this.enddate);
  }
  public GetBorrowerRequest(SDate,EDate) {
    this.DigiOfficeService.GetBorrowerRequest(SDate,EDate).subscribe(res => {
      
      this.requestList = res;
      // .filter(x=>x.userID==this.userID);
      this.filteredEventList= this.requestList.filter(x=>x.userID == this.userID && x.approveStatus == null);
     // this.filteredEventList = this.requestList.filter(x=>x.id==this.userID);
      this.count = this.filteredEventList.length;
    })
  }
  
  public getStatus(even) {
    
    this.status = even.target.value;
    if (this.status == null) {
      this.DigiOfficeService.GetBorrowerRequest(this.SDate,this.EDate).subscribe(res => {
        
        this.requestList = res;
        this.filteredEventList= this.requestList.filter(x=>x.userID == this.userID && x.approveStatus == null);
        this.count = this.filteredEventList.length;
      })
    }
    else 
    {
      this.DigiOfficeService.GetBorrowerRequest(this.SDate,this.EDate).subscribe(res => {
        
        this.requestList = res;
        this.filteredEventList= this.requestList.filter(x=>x.approveStatus == this.status && x.userID == this.userID && x.approveStatus == null);
      })
    }
  }

  exportexcel() {
    
    var filteredEventList = []
    for (let i = 0; i < this.filteredEventList.length; i++) {
      
      var list = {
        EquipmentType: this.filteredEventList[i].short,
        EquipmentName: this.filteredEventList[i].equipmentName,
        startDate: this.filteredEventList[i].startDate,
        ReturnDate: this.filteredEventList[i].endDate,
        Note: this.filteredEventList[i].notes,
      }
      
      filteredEventList.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'BORROWINGS DASHBOARD',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'BORROWINGS DASHBOARDs'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(filteredEventList);
  }

}
