import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-announcements-dashboard',
  templateUrl: './announcements-dashboard.component.html',
  styleUrls: ['./announcements-dashboard.component.css']
})
export class AnnouncementsDashboardComponent implements OnInit {
  search:any;
  announcementList: any[];
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
    this.GetAnnouncementList(this.startdate,this.enddate);
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAnnouncementList(this.startdate,this.enddate);
  }
  public GetAnnouncementList(SDate,EDate){
    
    this.DigiOfficeService.GetAnnouncementList(SDate,EDate).subscribe(res=>{
      
      this.announcementList = res;
    }
  )}


  public DeleteAnnouncement(id) {
    this.DigiOfficeService.DeleteAnnouncement(id).subscribe(
      data => {
        
        Swal.fire('Announcement Deleted Successfully.');
        this.ngOnInit();
      }, error => {
      }
    )
  }

  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.announcementList.length; i++) {
      
      var list = {
        announcement: this.announcementList[i].announcement,
        buildingname: this.announcementList[i].buildingname,
        floor: this.announcementList[i].floor,
        details: this.announcementList[i].details,
        dateTime: this.announcementList[i].dateTime,
        time: this.announcementList[i].time,
        venue: this.announcementList[i].venue,
        reason: this.announcementList[i].reason
        
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Completed Announcements',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Completed Announcements'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
  
}
