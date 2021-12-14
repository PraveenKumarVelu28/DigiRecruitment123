import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-attendance-dashboard-for-admin',
  templateUrl: './attendance-dashboard-for-admin.component.html',
  styleUrls: ['./attendance-dashboard-for-admin.component.css']
})
export class AttendanceDashboardForAdminComponent implements OnInit {

  Search:any;
  allStaffAttendanceList: any[];
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  SDate = new Date();
  EDate = new Date();
  attendanceList: any;
  signInDate: any;
  count: any;
  absentstaffList: any[];
  StaffID: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    debugger
    this.StaffID=0;
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
    this.GetAllAttendance(this.todaydate, this.enddate);
    this.GetAllAbsetees();
  }
  public selectedDate(data) {
    this.todaydate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllAttendance(this.todaydate, this.enddate);
  }

  public GetAllAttendance(SDate, EDate){
    debugger
    this.DigiOfficeService.GetAllAttendance(SDate, EDate).subscribe(data=>{
      
      this.attendanceList = data
      this.signInDate=this.attendanceList[0].signinDate;
       this.count=this.attendanceList.length;
    }
  )}

  public GetAllAbsetees(){
    debugger
    this.DigiOfficeService.GetAllAbsetees().subscribe(data=>{
      this.absentstaffList = data.filter(x=>x.resignationDate==null);
    }
  )}

  
  exportexcel() {
    var itemmasterlist = []

    for (let i = 0; i < this.attendanceList.length; i++) {
      
      var list = {
        Name: this.attendanceList[i].name,
        webSigninDate: this.attendanceList[i].webSigninDate,
        signinTime: this.attendanceList[i].signinTime,
        signinLocation: this.attendanceList[i].signinLocation,
        signoutDate: this.attendanceList[i].signoutDate,
        signoutTime: this.attendanceList[i].signoutTime,
        signoutLocation: this.attendanceList[i].signoutLocation,
        hhhh: this.attendanceList[i].hhhh,
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Attendance List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Attendance List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
}
