import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-all-staff-dashboard',
  templateUrl: './all-staff-dashboard.component.html',
  styleUrls: ['./all-staff-dashboard.component.css']
})
export class AllStaffDashboardComponent implements OnInit {
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
  SDate: string;
  EDate: string;
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
    this.buildingID = "";
    this.GetAllStaff();
    //this.GetAllStaffForManager(this.startdate,this.enddate);
    this.GetBuildinglist();
  }

  changepage(page){
   this.p=page;
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    //this.GetAllStaffForManager(this.startdate,this.enddate);
  }
  public GetAllStaff() {
      
      this.DigiOfficeService.GetAllStaff().subscribe(res => {
        
        this.allStaffList = res;
        this.filteredList = this.allStaffList.filter(x=>x.resignationDate==null);
        this.Count = this.filteredList.length;
      }
      )
    }
  // public GetAllStaffForManager(SDate, EDate) {
  //   
  //   this.DigiOfficeService.GetAllStaffForManager(SDate, EDate).subscribe(res => {
  //     
  //     this.allStaffList = res;
  //     this.filteredList = this.allStaffList;
  //     this.Count = this.filteredList.length;
  //   }
  //   )
  // }
  public Delete(id) {
    
    this.DigiOfficeService.DeleteStaff(id).subscribe(res => {
      
      this.GetAllStaff();
      Swal.fire('Deleted successfully.');
    }
    )
  }
  public getStaffID(id) {
    this.staffID = id;
  }

  public resign() {
    this.DigiOfficeService.ResignStaff(this.staffID, this.reason, this.resignationDate).subscribe(res => {
      
      this.GetAllStaff();
      Swal.fire('Resignation Sent Successfully.');

    }
    )
  }
  
  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildingList = res;
    });
  }

  public getbuildingID(even) {
    
    this.buildingID = even.target.value;
    if (this.buildingID == "") {
      this.GetAllStaff();
      this.Count = this.filteredList.length;
    }
    else {
      this.filteredList = this.allStaffList.filter(x => x.buildingid == this.buildingID);
      this.Count = this.filteredList.length;
    }
  }

  public DisableStaff(id) {
    
    this.DigiOfficeService.DisableStaff(id).subscribe(
      data => {
        
        Swal.fire("Disabled Successfully");
        this.GetAllStaff();
      }, error => {
      }
    )
  }

  public EnableStaff(id) {
    
    this.DigiOfficeService.EnableStaff(id).subscribe(
      data => {
        
        Swal.fire("Enabled Successfully");
        this.GetAllStaff();
      }, error => {
      }
    )
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.filteredList.length; i++) {
      
      var list = {
        Building: this.filteredList[i].building,
        employeID: this.filteredList[i].employeID,
        name: this.filteredList[i].name,
        emailID: this.filteredList[i].emailID,
        phoneNo: this.filteredList[i].phoneNo,
        type: this.filteredList[i].type,
        supervisor: this.filteredList[i].supervisor,
        emergencyContactNo: this.filteredList[i].emergencyContactNo,
        joiningDate: this.filteredList[i].joiningDate,
        ageing: this.filteredList[i].ageing,
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
