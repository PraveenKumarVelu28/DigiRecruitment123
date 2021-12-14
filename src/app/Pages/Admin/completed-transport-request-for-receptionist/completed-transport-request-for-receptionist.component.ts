import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-completed-transport-request-for-receptionist',
  templateUrl: './completed-transport-request-for-receptionist.component.html',
  styleUrls: ['./completed-transport-request-for-receptionist.component.css']
})
export class CompletedTransportRequestForReceptionistComponent implements OnInit {

  search: any;
  DDate = new Date();
  RDate = new Date();
  transportationRequestsList: any[];
  StaffID: any;
  filteredList: any;
  count: any;
  status: number;
  bookindID: any;
  vehicleNumber: any;
  driverName: any;
  phoneNumber: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any;
  constructor(public DigiOfficeService: DigiOfficeService) { }

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
    this.GetTransportationRequestsForReceptionist(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetTransportationRequestsForReceptionist(this.startdate,this.enddate);
  }
  public GetTransportationRequestsForReceptionist(DDate,RDate) {
    
    this.DigiOfficeService.GetTransportationRequestsForReceptionist(DDate,RDate).subscribe(res => {
      
      this.transportationRequestsList = res;
      this.filteredList = this.transportationRequestsList.filter(x=>x.status=='Completed');
      this.count = this.filteredList.length;
    }
    )
  }


  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.transportationRequestsList.length; i++) {
      
      var list = {
        DepartureDateTime: this.transportationRequestsList[i].departureDateTime,
        ReturnDateTime: this.transportationRequestsList[i].returnDateTime,
        TypeOfVechile: this.transportationRequestsList[i].typeOfVechile,
        projectName: this.transportationRequestsList[i].projectName,
        PickUpPoint: this.transportationRequestsList[i].pickUpPoint,
        Destination: this.transportationRequestsList[i].destination,
        Status: this.transportationRequestsList[i].status
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Transport Request Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Transport Request Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
