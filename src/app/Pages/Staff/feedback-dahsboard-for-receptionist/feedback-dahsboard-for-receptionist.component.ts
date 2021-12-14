import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-feedback-dahsboard-for-receptionist',
  templateUrl: './feedback-dahsboard-for-receptionist.component.html',
  styleUrls: ['./feedback-dahsboard-for-receptionist.component.css']
})
export class FeedbackDahsboardForReceptionistComponent implements OnInit {
  Search:any;
  search:any;
  buildingID:any;
  complaintList: any[];
  completedComplaintList: any[];
  buildingList: any[];
  notes: any;
  id: any;
  feedbackID: any;
  value: any;
  todaydate: any;
  startdate: any;
  enddate: any; 
  Sdate = new Date();
  Edate = new Date();
  buildingid: any;
  constructor(private DigiOfficeService: DigiOfficeService){ }

  ngOnInit(): void {
    this.buildingid=0;
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
    this.GetComplaintsDashboardWEB(this.startdate,this.enddate);
    this.GetCompletedComplaint(this.startdate,this.enddate);
    this.GetBuildinglist();
    document.getElementById('def_open').click();
  }
  public selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    this.GetComplaintsDashboardWEB(this.startdate,this.enddate);
  }

  public GetComplaintsDashboardWEB(Sdate,Edate) {
    
    this.DigiOfficeService.GetComplaintsDashboardWEB(Sdate,Edate).subscribe(res => {
      
      this.complaintList = res.filter(x=>x.statusName=='Open');
      document.getElementById('def_open').click();
    });
   }
   public GetCompletedComplaint(Sdate,Edate) {
    
    this.DigiOfficeService.GetComplaintsDashboardWEB(Sdate,Edate).subscribe(res => {
      
      this.completedComplaintList = res.filter(x=>x.statusName=='Closed');
    });
   }
   
   public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildingList = res;
    });
   }
   public getbuildingID(even)
   {
    
    this.buildingid=even.target.value;
    if(this.buildingid==0)
    {
      this.DigiOfficeService.GetComplaintsDashboardWEB(this.startdate,this.enddate).subscribe(res => {
        
        this.complaintList = res.filter(x=>x.statusName=='Open');
      });
    }
    else
    {
      this.DigiOfficeService.GetComplaintsDashboardWEB(this.startdate,this.enddate).subscribe(res => {
        
        this.complaintList = res.filter(x=>x.buildingID== this.buildingid && x.statusName=='Open');
      });
    }    
   }
   brochures=[];
   photoUrl:any;
   public onBrochureUpload(abcd) {
     
     this.brochures.push(abcd.addedFiles[0]);
     this.uploadImages();
     abcd.length = 0;
   }
   public uploadImages() {
     
     this.DigiOfficeService.UploadImages(this.brochures).subscribe(res => {
       
       this.photoUrl=res;
      
       Swal.fire("Added Successfully");
       
     });
   }
   
   public completeComplaints(id){
    
    this.feedbackID = id;
   }

   public ClosedComplaints() {
    
    this.DigiOfficeService.ClosedComplaints(this.feedbackID,this.notes,this.photoUrl).subscribe(res => {
      
      Swal.fire('Complaint Closed Successfully...')
      this.ngOnInit();
    });
  }


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
}
