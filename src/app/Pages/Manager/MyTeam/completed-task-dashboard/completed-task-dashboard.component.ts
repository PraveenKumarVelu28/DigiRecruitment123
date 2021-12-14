import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-completed-task-dashboard',
  templateUrl: './completed-task-dashboard.component.html',
  styleUrls: ['./completed-task-dashboard.component.css']
})
export class CompletedTaskDashboardComponent implements OnInit {

  Search:any;

  staffID: any;

  managerID: any;
  id: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
  taskList: any[];
  filteredtaskList: any[];
  managerStaffID: any;
  staffList: any[];
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    debugger;
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
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.GetTaskForDateWeb(this.startdate,this.enddate);
    this.GetBuildingStaff();
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetTaskForDateWeb(this.startdate,this.enddate);
  }
  public GetTaskForDateWeb(StartDate,EndDate) {
    debugger;
    this.DigiOfficeService.GetTaskForDateWeb(StartDate,EndDate).subscribe(res => {
      debugger;
      this.taskList = res;
      this.filteredtaskList=this.taskList.filter(x=>x.status=="Completed");

    });
   }
   public GetBuildingStaff() {
    this.DigiOfficeService.GetBuildingStaff(this.managerID).subscribe(res => {
      this.staffList = res.filter(x=>x.supervisorID==this.managerID);
    });
   }

   public getstaffID(even)
   {
    this.managerStaffID=even.target.value;
    if(this.managerStaffID==0)
    {
      this.DigiOfficeService.GetTaskForDateWeb(this.startdate,this.enddate).subscribe(res => {
        debugger;
        this.taskList = res;
        this.filteredtaskList=this.taskList.filter(x=>x.status=="Completed");
      });
    }
    else
    {
      this.DigiOfficeService.GetTaskForDateWeb(this.startdate,this.enddate).subscribe(res => {
        debugger;
        this.taskList = res;
        this.filteredtaskList=this.taskList.filter(x=>x.status=="Completed" && x.employeeID==this.managerStaffID);
      });

    }    
   }

  appliedexportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.taskList.length; i++) {
      
      var list = {
        Building: this.taskList[i].building,
        LeaveType: this.taskList[i].leavetype,
        StaffName: this.taskList[i].staffName,
        Applieddate: this.taskList[i].sDateOfLeave,
        SDateOfLeave: this.taskList[i].applieddate,
        
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Leave Request',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Leave Request'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
