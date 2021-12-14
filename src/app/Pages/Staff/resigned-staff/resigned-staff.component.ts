import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";


@Component({
  selector: 'app-resigned-staff',
  templateUrl: './resigned-staff.component.html',
  styleUrls: ['./resigned-staff.component.css']
})
export class ResignedStaffComponent implements OnInit {
  search: any;
  allStaffList: any[];
  reason: any;
  staffID: any;
  resignationDate: any;
  buildingID: any;
  buildingList: any[];
  filteredList: any[];
  Count: any;
  value: any;
  p: number = 1;
  SDate = new Date();
  EDate = new Date();
  todaydate: any;
  startdate: any;
  enddate: any;
 
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
    this.buildingID = 0;
    this.GetAllStaffForManager(this.startdate,this.enddate);
 
  }

  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllStaffForManager(this.startdate,this.enddate);
  }
  public GetAllStaffForManager(SDate, EDate) {
    
    this.DigiOfficeService.GetAllStaffForManager(SDate, EDate).subscribe(res => {
      
      this.allStaffList = res;
      this.filteredList = this.allStaffList;
      this.Count = this.filteredList.length;
    }
    )
  }
 
}
