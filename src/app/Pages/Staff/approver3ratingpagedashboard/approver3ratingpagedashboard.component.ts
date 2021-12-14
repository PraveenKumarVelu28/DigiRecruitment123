import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
@Component({
  selector: 'app-approver3ratingpagedashboard',
  templateUrl: './approver3ratingpagedashboard.component.html',
  styleUrls: ['./approver3ratingpagedashboard.component.css']
})
export class Approver3ratingpagedashboardComponent implements OnInit {

  constructor(public fmService: DigiOfficeService) { }
  StaffTypeID;
  StaffID;
  staffID;
  search: any
  StaffTypelist: any;
  ngOnInit() {
    this.StaffTypeID = 0;
    this.StaffID = 0;
    this.staffID = localStorage.getItem('staffID');
    this.ConductappraisalStaffList();
    // this.fmService.GetStaffType(1).subscribe(data => {
    //   debugger
    //   this.StaffTypelist = data;
    // })
  }

  StaffAppraisalList
  public ConductappraisalStaffList() {
    this.fmService.GetConductappraisalStaffList().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffAppraisalList = temp.filter(x => x.selfScores != null && x.groupHeadScores != null && x.cioScores != null && x.divisionscore == null)
        // .filter(x => x.groupHeadID == this.UserID && x.managagerScore != null);
      }
    )
  }

  // Stafflist: any
  // StaffType: any
  // GetStaffTypeID(event) {
  //   this.StaffTypeID = event.target.value;
  //   this.fmService.GetStaff(1).subscribe(data => {
  //     debugger
  //     let temp: any = data;
  //     this.Stafflist = temp.filter(x => x.staffTypeID == this.StaffTypeID);
  //   })
  //   if (this.StaffTypeID == 0) {
  //     this.ConductappraisalStaffList();
  //   }
  //   else {
  //     this.fmService.GetConductappraisalStaffList().subscribe(data => {
  //       debugger
  //       let temp: any = data
  //       this.StaffAppraisalList = temp.filter(x => x.type == this.StaffTypeID && x.selfScores == null);
  //     })
  //   }
  // }

  // list: any
  // StaffName: any
  // SupervisorID: any;
  // AppraisalManager: any;
  // GetStaff(event) {
  //   this.StaffID = event.target.value;
  //   this.fmService.GetStaffScores().subscribe(data => {
  //     let temp: any = data;
  //     this.Scores = temp.filter(x => x.satffID == this.StaffID);
  //     let total = 0;
  //     this.Scores.forEach(element => {
  //       total += element.score;
  //     });
  //     debugger
  //     this.avg = total / 5;
  //   })
  //   if (this.StaffID == 0) {
  //     this.fmService.GetConductappraisalStaffList().subscribe(data => {
  //       debugger
  //       let temp: any = data
  //       this.StaffAppraisalList = temp.filter(x => x.type == this.StaffTypeID && x.selfScores == null);
  //     })
  //   }
  //   else {
  //     this.fmService.GetConductappraisalStaffList().subscribe(data => {
  //       debugger
  //       let temp: any = data
  //       this.StaffAppraisalList = temp.filter(x => x.type == this.StaffTypeID && x.id == this.StaffID && x.selfScores == null);
  //     })
  //   }
  // }

  insertdetails1(event) {
    this.StaffTypeID = event.type;
    this.StaffID = event.id;
  }
  Scores: any
  avg: any

}


