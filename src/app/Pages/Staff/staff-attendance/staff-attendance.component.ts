import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.css']
})
export class StaffAttendanceComponent implements OnInit {
  attendanceList: any[];
  SDate: any;
  EDate: any;
  count: any;
  staffID: any;
  userID: any;
  userName: any;
  Search:any;
  signInDate: any;
  value:any;
  constructor(public DigiOfficeService:DigiOfficeService) { }

  ngOnInit(): void {
    
    var date = new Date();
    this.SDate='2020-01-01';
    this.EDate='2025-10-31';
    this.userID=localStorage.getItem('UserID');
    this.userName=localStorage.getItem('staffName');
    this.GetAttendence(this.SDate,this.EDate);
  }

  public GetAttendence(SDATE,EDATE){
    this.DigiOfficeService.GetMyAttendanceList(this.userID,SDATE,EDATE).subscribe(data => {
      
      this.attendanceList = data
      this.signInDate=this.attendanceList[0].signinDate;
       this.count=this.attendanceList.length;
    })
  }


  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.attendanceList.length; i++) {
      
      var list = {
        webSigninDate: this.attendanceList[i].webSigninDate,
        signoutDate: this.attendanceList[i].signoutDate,
        signinLocation: this.attendanceList[i].signinLocation,
        signoutLocation: this.attendanceList[i].signoutLocation,
        hr: this.attendanceList[i].hr,
     
      }
      
      itemmasterlist.push(list)
    }

    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Attendance',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Attendance'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

  
  public selectedDate(data) {
    this.SDate = data[0].toLocaleString().split(',')[0]
    this.EDate = data[1].toLocaleString().split(',')[0]
    this.GetAttendence(this.SDate,this.EDate);
  }

}


