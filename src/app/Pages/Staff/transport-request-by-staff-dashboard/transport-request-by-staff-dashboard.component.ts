import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-transport-request-by-staff-dashboard',
  templateUrl: './transport-request-by-staff-dashboard.component.html',
  styleUrls: ['./transport-request-by-staff-dashboard.component.css']
})
export class TransportRequestByStaffDashboardComponent implements OnInit {

  search: any;
  SDate: any;
  EDate: any;
  transportationRequestsList: any[];
  StaffID: any;
  filteredList: any;
  count: any;
  raisedFilteredList: any[];
  approvedFilteredList: any[];
  completedFilteredList: any[];
  project: any;
  projectlist: any[];
  staffID: string;
  UserID: any;

  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.SDate = '2019-01-01';
    this.EDate = '2025-12-31';
    this.project = 0;
    this.staffID=localStorage.getItem('staffID');
    document.getElementById('def_open').click();
    this.GetProjectMasterList();
    this.GetMyTravelRequestsList();
  }
  public GetMyTravelRequestsList() {
    
    this.DigiOfficeService.GetMyTravelRequestsList(this.staffID,this.SDate, this.EDate).subscribe(res => {
      
      this.transportationRequestsList = res;
      // this.filteredList = this.transportationRequestsList;
      this.raisedFilteredList = this.transportationRequestsList.filter(x=>x.status=='Yet To complete');
      this.approvedFilteredList = this.transportationRequestsList.filter(x=>x.status=='Booked');
      this.completedFilteredList = this.transportationRequestsList.filter(x=>x.status=='Completed');
      this.count = this.transportationRequestsList.length;
    }
    )
  }

  CompletedVis: boolean;
  RaisedVis: boolean;
  public openCity(evt, cityName) {
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      
      this.projectlist = res;
    });
  }

  public getproject(even) {
    
    this.project = even.target.value;
    if (this.project == 0) {
      this.raisedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Yet To Complete');
      this.approvedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Approved');
      this.completedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Completed');
      this.count = this.filteredList.length;
    }
    else {
      // this.filteredList = this.transportationRequestsList.filter(x => x.projectName == this.project);
      this.raisedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Yet To Complete' && x.projectName == this.project);
      this.approvedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Approved' && x.projectName == this.project);
      this.completedFilteredList = this.transportationRequestsList.filter(x => x.status == 'Completed' && x.projectName == this.project);
      this.count = this.filteredList.length;
    }
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.transportationRequestsList.length; i++) {
      
      var list = {
        DepartureDateTime: this.transportationRequestsList[i].departureDateTime,
        ReturnDateTime: this.transportationRequestsList[i].returnDateTime,
        TypeOfVechile: this.transportationRequestsList[i].typeOfVechile,
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
