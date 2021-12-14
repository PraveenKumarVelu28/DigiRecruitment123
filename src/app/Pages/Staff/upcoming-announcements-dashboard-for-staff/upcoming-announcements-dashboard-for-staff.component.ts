import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-upcoming-announcements-dashboard-for-staff',
  templateUrl: './upcoming-announcements-dashboard-for-staff.component.html',
  styleUrls: ['./upcoming-announcements-dashboard-for-staff.component.css']
})
export class UpcomingAnnouncementsDashboardForStaffComponent implements OnInit {

  search:any;
 
  announcementList: any[];
  upcomingannouncementList: any[];
  Count: number;
  upcomingAnnouncementList: any[];
  filteredUpcomingannouncementList: any[];
  completedAnnouncementList: any[];
  filteredcompletedannouncementList: any[];
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
    this.Gettodayannouncements(this.startdate,this.enddate);
    this.GetAnnouncementList(this.startdate,this.enddate);
    
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetAnnouncementList(this.startdate,this.enddate);

  }
  public Gettodayannouncements(SDATE,EDATE){
    
    this.DigiOfficeService.Gettodayannouncements(SDATE,EDATE).subscribe(res=>{
      
      this.upcomingAnnouncementList = res;
      this.filteredUpcomingannouncementList=this.upcomingAnnouncementList;
      document.getElementById('def_open').click();
    }
  )}
  public GetAnnouncementList(SDATE,EDATE){
    
    this.DigiOfficeService.GetAnnouncementList(SDATE,EDATE).subscribe(res=>{
      
      this.completedAnnouncementList = res;
      this.filteredcompletedannouncementList=this.completedAnnouncementList;
    }
  )}

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
    
    if(cityName=="NewRequest"){
      this.filteredUpcomingannouncementList=this.upcomingAnnouncementList;
      //this.Count = this.announcementList.length;
    }
    
    else{
      this.filteredcompletedannouncementList=this.completedAnnouncementList;
    }
  }

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
      title: 'Upcoming Announcements',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Upcoming Announcements'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

  
}
