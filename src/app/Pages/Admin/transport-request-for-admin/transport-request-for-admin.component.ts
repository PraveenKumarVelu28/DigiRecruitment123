import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-transport-request-for-admin',
  templateUrl: './transport-request-for-admin.component.html',
  styleUrls: ['./transport-request-for-admin.component.css']
})
export class TransportRequestForAdminComponent implements OnInit {
  search: any;
  SDate: any;
  EDate: any;
  transportationRequestsList: any[];
  StaffID: any;
  filteredList: any;
  count: any;
  status: number;
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.SDate = '2019-01-01';
    this.EDate = '2020-12-31';
    this.status = 0;
    this.GetTransportationRequestsForStaff();
  }

  public GetTransportationRequestsForStaff() {
    
    this.DigiOfficeService.GetTransportationRequestsForStaff(this.SDate, this.EDate, 297).subscribe(res => {
      
      this.transportationRequestsList = res;
      this.filteredList = this.transportationRequestsList;
      this.count = this.filteredList.length;
    }
    )
  }
  getstatus(even) {
    
    this.status = even.target.value;
    if (this.status == 0) {
      this.DigiOfficeService.GetTransportationRequestsForStaff(this.SDate, this.EDate, 297).subscribe(res => {
        
        this.transportationRequestsList = res;
        this.filteredList = this.transportationRequestsList;

      }
      )
    }
    else {
      this.DigiOfficeService.GetTransportationRequestsForStaff(this.SDate, this.EDate, 297).subscribe(res => {
        
        this.transportationRequestsList = res;

        this.filteredList = this.transportationRequestsList.filter(x => x.status == this.status);;
        //this.count = this.filteredList.length;
      }
      )
    }

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
