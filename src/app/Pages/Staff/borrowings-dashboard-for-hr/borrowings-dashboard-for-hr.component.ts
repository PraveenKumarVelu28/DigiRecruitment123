import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-borrowings-dashboard-for-hr',
  templateUrl: './borrowings-dashboard-for-hr.component.html',
  styleUrls: ['./borrowings-dashboard-for-hr.component.css']
})
export class BorrowingsDashboardForHRComponent implements OnInit {
  eventList: any[];
  filteredEventList: any[];
  count: number;
  search: any;
  requestList: any;
  staffName: string;
  status: any;
  userID: string;
  hrID: any;
  staffID: any;
  employeeID: any;
  notes: any;
  returnDate: any;
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
    this.status = 0;
    this.userID = localStorage.getItem('UserID');
    this.staffID = localStorage.getItem('staffID');
    this.GetBorrowerRequest(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetBorrowerRequest(this.startdate,this.enddate);
  }
  public GetBorrowerRequest(SDate,EDate) {
    debugger;
    this.DigiOfficeService.GetBorrowerRequest(SDate,EDate).subscribe(res => {
      debugger;
      this.requestList = res;
      //this.requestList= this.requestList.filter(x=>x.approveStatus!='Hold')
     // this.filteredEventList = this.requestList.filter(x=>x.id==this.userID);
      this.count = this.requestList.length;
    })
  }
  
  public getStatus(even) {
    
    this.status = even.target.value;
    if (this.status != null) {
      this.requestList = this.requestList.filter(x => x.approveStatus == this.status || x.approveStatus == null)
    }
    else 
    {
      this.DigiOfficeService.GetBorrowerRequest(this.SDate,this.EDate).subscribe(res => {
        
        this.requestList = res;
      })
    }
  }

  public issuedBorrower(id){
    
    this.userID = id;
   }
  public ReturnBorrowerRequest() {
    
    this.DigiOfficeService.ReturnBorrowerRequest(this.userID,this.notes,this.returnDate).subscribe(res => {
      
      Swal.fire('Returned Successfully...')
      this.ngOnInit();
    });
  }

  exportexcel() {
    
    var itemmasterlist = []
    for (let i = 0; i < this.requestList.length; i++) {
      
      var list = {
        EquipmentType: this.requestList[i].short,
        EquipmentName: this.requestList[i].equipmentName,
        startDate: this.requestList[i].startDate,
        ReturnDate: this.requestList[i].endDate,
        Note: this.requestList[i].notes,
      }
      
      itemmasterlist.push(list)
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
    csvExporter.generateCsv(itemmasterlist);
  }

}
