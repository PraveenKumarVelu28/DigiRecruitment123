import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-all-assets-for-admin',
  templateUrl: './all-assets-for-admin.component.html',
  styleUrls: ['./all-assets-for-admin.component.css']
})
export class AllAssetsForAdminComponent implements OnInit {

  eventList: any[];
  filteredEventList: any[];
  count: number;
  search:any;
  staffID: any;
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
    this.staffID=localStorage.getItem('staffID')
    this.GetAllEmployeeAssets(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAllEmployeeAssets(this.startdate,this.enddate);
  }
  public GetAllEmployeeAssets(SDate,EDate) {
    this.DigiOfficeService.GetAllEmployeeAssets(SDate,EDate).subscribe(res => {
      
      this.eventList= res;
      this.filteredEventList=this.eventList;
      this.count=this.filteredEventList.length;
    })
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
  


  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.filteredEventList.length; i++) {
      
      var list = {
        assetID: this.filteredEventList[i].assetID,
        assetName: this.filteredEventList[i].assetName,
        issueDate: this.filteredEventList[i].issueDate,
        returnDate: this.filteredEventList[i].returnDate,
        //userRole: this.filteredEventList[i].userRole,
      
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Assets Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Assets Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
