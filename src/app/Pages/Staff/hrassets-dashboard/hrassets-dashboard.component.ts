import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, DebugEventListener, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-hrassets-dashboard',
  templateUrl: './hrassets-dashboard.component.html',
  styleUrls: ['./hrassets-dashboard.component.css']
})
export class HRAssetsDashboardComponent implements OnInit {

  eventList: any[];
  filteredEventList: any[];
  count: number;
  search:any;
  staffID: any;
  status: any;
  notes: any;
  returnDate: any;
  assetID: any;
  employeeID: any;
  
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  IDate = new Date();
  RDate = new Date();
  staffList: any[];
  staffid: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.staffid=0;
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
    this.status=0;
    this.staffID=localStorage.getItem('staffID');
    this.GetAllEmployeeAssets(this.startdate,this.enddate);
    this.GetAllStaff();
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllEmployeeAssets(this.startdate,this.enddate);
  }

  public GetAllEmployeeAssets(IDate,RDate) {
    
    this.DigiOfficeService.GetAllEmployeeAssets(IDate,RDate).subscribe(res => {
      
      this.eventList= res;
      this.filteredEventList=this.eventList;
      this.count=this.filteredEventList.length;
    })
  }
  public GetAllStaff() {
    debugger
    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.staffList = res;

    });
  }

  public getstaffID(even)
  {
   this.staffid=even.target.value;
   if(this.staffid==0)
   {
    this.DigiOfficeService.GetAllEmployeeAssets(this.startdate,this.enddate).subscribe(res => {
      this.eventList= res;
      this.filteredEventList=this.eventList;
      this.count=this.filteredEventList.length;
    })
   }
   else
   {
    this.DigiOfficeService.GetAllEmployeeAssets(this.startdate,this.enddate).subscribe(res => {
      this.eventList= res;
      this.filteredEventList=this.eventList.filter(x=>x.employeeID==this.staffid);
      this.count=this.filteredEventList.length;
    })

   }    
  }

  public getStatus(even) {
    
    this.status = even.target.value;
    if (this.status != null) {
      this.filteredEventList = this.eventList.filter(x => x.status == this.status)
    } else {
      this.filteredEventList=this.eventList;
    }
  }
  public getReturnID(id){
    this.staffID=id;
    var Entity={
      'ID':this.staffID,
      'Notes':'Request is Rejected',
      'Status':"Rejected"
    }
    this.DigiOfficeService.UpdateEmployee_Assets(Entity).subscribe(res => {
      
     Swal.fire('Request is Rejected.')
    })
  }
  public issuedAssets(id){
    
    this.employeeID = id;
   }
  public ReturnAssets() {
    
    this.DigiOfficeService.ReturnAssets(this.employeeID,this.notes,this.returnDate).subscribe(res => {
      
      Swal.fire('Returned Successfully...')
      this.ngOnInit();
    });
  }

  public Delete(id) {
    debugger
    this.DigiOfficeService.DeleteEmployee_Assets(id).subscribe(
      data => {
        Swal.fire('Assets Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
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
