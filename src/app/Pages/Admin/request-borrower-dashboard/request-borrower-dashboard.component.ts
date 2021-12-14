

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-borrower-dashboard',
  templateUrl: './request-borrower-dashboard.component.html',
  styleUrls: ['./request-borrower-dashboard.component.css']
})
export class RequestBorrowerDashboardComponent implements OnInit {
  eventList: any[];
  filteredEventList: any[];
  count: number;
  search:any;
  requestList: any;
  staffName: string;
  status: any;
  staffID: any;
  EDate: any;
  SDate: any;
  value: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  ngOnInit(): void {
    this.SDate = '2019-01-01';
    this.EDate = '2025-12-31';
    
    this.status =0;
    this.staffName=localStorage.getItem('userName');
    this.GetBorrowerRequest(this.SDate,this.EDate);
    }
    public selectedDate(data) {
      this.SDate = data[0].toLocaleString().split(',')[0]
      this.EDate = data[1].toLocaleString().split(',')[0]
      this.GetBorrowerRequest(this.SDate,this.EDate);
    }
  
  public GetBorrowerRequest(SDate,EDate) {
    this.DigiOfficeService.GetBorrowerRequest(SDate,EDate).subscribe(res => {
      
      this.requestList= res;
      this.filteredEventList=this.requestList;
      this.count=this.filteredEventList.length;
    })
  }
  public getStatus(even) {
    
    this.status = even.target.value;
    if (this.status != 0) {
      this.filteredEventList = this.requestList.filter(x => x.approveStatus == this.status)
    } else {
      this.filteredEventList=this.requestList;
    }
  }

  public getStatusID(id){
    this.staffID=id;
    var Entity={
      'ID':this.staffID,
      'Notes':'Request is on hold',
      'Status':"Hold"
    }
    this.DigiOfficeService.UpdateBarrowerStatus(Entity).subscribe(res => {
      
     Swal.fire('Request is on Hold.')
    })
  }
  public getStatusIDForApprove(id){
    this.staffID=id;
    var Entity={
      'ID':this.staffID,
      'Notes':'Request is Approved',
      'Status':"Approved"
    }
    this.DigiOfficeService.UpdateBarrowerStatus(Entity).subscribe(res => {
      
     Swal.fire('Request is Approved.')
    })
  }
  public getStatusIDForeject(id){
    this.staffID=id;
    var Entity={
      'ID':this.staffID,
      'ReturnDate':new Date(),
      'Notes':"Returned"
    }
    this.DigiOfficeService.UpdateEmployee_Assets(Entity).subscribe(res => {
      
     Swal.fire('Assets are Returned.')
    })
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
