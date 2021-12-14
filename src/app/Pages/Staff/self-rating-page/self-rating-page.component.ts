import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DigiOfficeService } from '../../../digi-office.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-self-rating-page',
  templateUrl: './self-rating-page.component.html',
  styleUrls: ['./self-rating-page.component.css']
})
export class SelfRatingPageComponent implements OnInit {

  constructor(private router: Router, private fmsservice: DigiOfficeService, private route: ActivatedRoute, private datepipe: DatePipe) { }
  StaffTypelist: any;
  StaffID: any;
  StaffTypeID: any;
  Stafflist: any;
  appraisalList = [];
  tablecount: number;
  idcount: number;
  ResultAreaID: number;
  ResultAreaList: any;
  ParamID: any;
  i: number;
  j = 0;
  JDate: any;
  YearOfService: any;
  public Score: any;
  PerformanceLists1: any;
  Description: any;
  performanceindicatorName: any;
  PerformaceIndicatorID: any;
  k;
  StaffType: any;
  SupervisorID: any;
  AppraisalManager: any;
  ngOnInit() {
    this.idcount = 0;
    this.Score = 0;
    this.StaffID = localStorage.getItem('UserID');
    this.StaffTypeID = localStorage.getItem('Type')

    // this.fmsservice.GetStaffType(1).subscribe(data => {
    //   debugger
    //   this.StaffTypelist = data;
    // })

    // this.fmsservice.GetStaff(1).subscribe(data => {
    //   debugger
    //   let temp: any = data;
    //   this.Stafflist = temp.filter(x => x.staffTypeID == this.StaffTypeID);
    // })

    // this.fmsservice.GetKRAByStaffID(this.StaffID).subscribe(data => {
    //   debugger
    //   this.ResultAreaList = data;
    //   this.ResultAreaID = this.ResultAreaList[0].resultAreaID
    //   this.k = 0;
    //   this.fmsservice.GetResultAreaPerformanceindicator().subscribe(data => {
    //     debugger
    //     let temp: any = data
    //     this.PerformanceLists1 = temp.filter(x => x.resultAreaID == this.ResultAreaID);
    //     this.Description = this.PerformanceLists1[0].performanceindicator;
    //     this.performanceindicatorName = this.PerformanceLists1[0].performanceindicator;
    //     this.PerformaceIndicatorID = this.PerformanceLists1[0].id;
    //     this.i = 0;
    //   })
    // })
    // this.fmsservice.GetStaffType(1).subscribe(data => {
    //   debugger
    //   this.StaffTypelist = data;
    // })

    this.route.params.subscribe(params => {
      debugger;
      this.ParamID = params['id'];
      if (params['id'] != undefined) {
        this.StaffType = params['StaffID'];
        this.StaffID = params['id'];
        this.StaffTypeID = this.StaffType;
        this.YearOfService = 1;
        // this.fmsservice.GetStaff(1).subscribe(data => {
        //   debugger
        //   let temp: any = data;
        //   this.StaffTypeID = temp.filter(x => x.id == this.StaffID)[0].staffTypeID;
        //   this.SupervisorID = temp.filter(x => x.id == this.StaffID)[0].supervisorID;
        //   this.Stafflist = temp.filter(x => x.staffTypeID == this.StaffTypeID);
        //   this.JDate = this.datepipe.transform(temp.filter(x => x.id == this.StaffID)[0].joiningDate, 'yyyy-MM-dd');
        //   this.AppraisalManager = temp.filter(x => x.id == this.StaffID)[0].supervisorName;
        // })
        this.fmsservice.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data;
          this.ResultAreaID = this.ResultAreaList[0].kraid
          this.k = 0;
          this.fmsservice.GetPerformanceIndicator().subscribe(data => {
            debugger
            let temp: any = data
            this.PerformanceLists1 = temp.filter(x => x.kraID == this.ResultAreaID);
            this.Description = this.PerformanceLists1[0].performanceIndicator;
            this.performanceindicatorName = this.PerformanceLists1[0].performanceIndicator;
            this.PerformaceIndicatorID = this.PerformanceLists1[0].id;
            this.i = 0;
          })
        })
        // this.GetStaffAppraisalByID(this.ParamID);
        this.HighScore()
      }
    }
    );
    this.fmsservice.GetConductappraisalStaffList().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffAppraisalList = temp.filter(x => x.id == this.ParamID)
        this.apprasalstartdate = this.StaffAppraisalList[0].appraisalStartDate
        this.appraisalenddate = this.StaffAppraisalList[0].apprasailEnddate
        this.appraisalname = this.StaffAppraisalList[0].appraiselCycleName,
        this.Approver1=this.StaffAppraisalList[0].approver1


        // .filter(x => x.groupHeadID == this.UserID && x.managagerScore != null);
      }
    )
    // this.HighScore()
  }
  StaffAppraisalList: any;
  apprasalstartdate: any;
  appraisalenddate: any;
  appraisalname: any;
  Approver1:any;

  n
  list
  public HighScore() {
    debugger
    this.fmsservice.GetHighScores().subscribe(data => {
      debugger
      this.list = data;
    })
  }

  SelfComments;
  resultAreaName
  next() {
    debugger;
    if (this.Score == 0) {
      Swal.fire("Please Give Score");
    }
    else {
      if (this.ResultAreaList.length - 1 == this.k && this.PerformanceLists1.length - 1 == this.i) {
        // this.tablecount = 1;
        this.tablecount = 2;
        this.fmsservice.GetPerformanceIndicator().subscribe(data => {
          debugger
          let temp: any = data
          this.PerformanceLists1 = temp.filter(x => x.kraID == this.ResultAreaID);
          this.resultAreaName = this.PerformanceLists1[this.i].resultAreaName;
          this.performanceindicatorName = this.PerformanceLists1[this.i].performanceindicator;
          this.PerformaceIndicatorID = this.PerformanceLists1[this.i].id;
          var entity2 = {
            'Sno': this.idcount,
            'SatffID': this.StaffID,
            'StaffType': this.StaffTypeID,
            'Supervisor': 1,
            'ResultAreaID': this.ResultAreaID,
            'PerformaceIndicatorID': this.PerformaceIndicatorID,
            'SelfScores': this.Score,
            'SelfComments': this.SelfComments,
            'performanceindicatorName': this.performanceindicatorName,
            'resultAreaName': this.resultAreaName

          }
          this.appraisalList.push(entity2);
          this.Score = 0;
          this.ResultAreaID = 0,
            this.Description = "",
            this.SelfComments = '',
            this.idcount = this.idcount + 1;
          this.i++;
        })
      }
      else if (this.i < this.PerformanceLists1.length - 1) {
        this.fmsservice.GetPerformanceIndicator().subscribe(data => {
          debugger
          let temp: any = data;
          this.PerformanceLists1 = temp.filter(x => x.kraID == this.ResultAreaID);
          this.resultAreaName = this.PerformanceLists1[this.i].resultAreaName;
          this.performanceindicatorName = this.PerformanceLists1[this.i].performanceindicator;
          this.PerformaceIndicatorID = this.PerformanceLists1[this.i].id;
          var entity2 = {
            'Sno': this.idcount,
            'SatffID': this.StaffID,
            'StaffType': this.StaffTypeID,
            'Supervisor': 1,
            'ResultAreaID': this.ResultAreaID,
            'PerformaceIndicatorID': this.PerformaceIndicatorID,
            'SelfScores': this.Score,
            'SelfComments': this.SelfComments,
            'performanceindicatorName': this.performanceindicatorName,
            'resultAreaName': this.resultAreaName
          }
          this.appraisalList.push(entity2);
          this.idcount = this.idcount + 1;
          this.Score = 0;
          this.SelfComments = '';
          this.i++;
          this.Description = this.PerformanceLists1[this.i].performanceindicator;
        })
      }
      else if (this.i == this.PerformanceLists1.length - 1) {
        this.fmsservice.GetPerformanceIndicator().subscribe(data => {
          debugger
          let temp: any = data;
          this.PerformanceLists1 = temp.filter(x => x.kraID == this.ResultAreaID);
          this.resultAreaName = this.PerformanceLists1[this.i].resultAreaName;
          this.performanceindicatorName = this.PerformanceLists1[this.i].performanceindicator;
          this.PerformaceIndicatorID = this.PerformanceLists1[this.i].id;
          var entity2 = {
            'Sno': this.idcount,
            'SatffID': this.StaffID,
            'StaffType': this.StaffTypeID,
            'Supervisor': 1,
            'ResultAreaID': this.ResultAreaID,
            'PerformaceIndicatorID': this.PerformaceIndicatorID,
            'SelfScores': this.Score,
            'SelfComments': this.SelfComments,
            'performanceindicatorName': this.performanceindicatorName,
            'resultAreaName': this.resultAreaName
          }
          this.appraisalList.push(entity2);
          this.idcount = this.idcount + 1;
          this.Score = 0;
          this.SelfComments = '';
          this.i = 0;
        })
        this.k++;
        this.fmsservice.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data;
          this.ResultAreaID = this.ResultAreaList[this.k].resultAreaID
          this.fmsservice.GetPerformanceIndicator().subscribe(data => {
            debugger
            let temp: any = data
            this.PerformanceLists1 = temp.filter(x => x.kraID == this.ResultAreaID);
            this.performanceindicatorName = this.PerformanceLists1[this.i].performanceindicator;
            this.PerformaceIndicatorID = this.PerformanceLists1[this.i].id;
            this.Description = this.PerformanceLists1[this.i].performanceindicator;
          })
        })
      }
    }
  }
  prev() {
    debugger
    this.i--;
    let j = this.i;
    this.appraisalList.splice(j, 1);
    this.Description = this.PerformanceLists1[j].performanceindicator;
    this.Score = 0;
    // this.fmsservice.GetResultAreaPerformanceindicator().subscribe(data => {
    //   debugger
    //   let temp: any = data
    //   this.PerformanceLists1 = temp.filter(x => x.resultAreaID == this.ResultAreaID);
    //   this.performanceindicatorName = this.PerformanceLists1[j].performanceindicator;
    //   this.PerformaceIndicatorID = this.PerformanceLists1[j].id;
    //   var entity2 = {
    //     'SatffID': this.StaffID,
    //     'StaffType': this.StaffType,
    //     'Supervisor': this.SupervisorID,
    //     'ResultAreaID': this.ResultAreaID,
    //     'PerformaceIndicatorID': this.PerformaceIndicatorID,
    //     'Score': this.Score
    //   }
    //   this.appraisalList.push(entity2);
    //   this.Score = 0;
    //   this.i--;
    // })
  }
  TableNextPrevHide = 0;
  public Preview() {
    this.tablecount = 1;
    this.TableNextPrevHide = 1;
  }
  GetScore(event) {
    this.Score = event.target.value;
  }
  q: any
  public insertdetails1() {
    debugger
    for (this.q = 0; this.q < this.appraisalList.length; this.q++) {
      var entity = {
        'SatffID': this.appraisalList[this.q].SatffID,
        'StaffType': this.appraisalList[this.q].StaffType,
        'Supervisor': this.appraisalList[this.q].Supervisor,
        'ResultAreaID': this.appraisalList[this.q].ResultAreaID,
        'PerformaceIndicatorID': this.appraisalList[this.q].PerformaceIndicatorID,
        'SelfScores': this.appraisalList[this.q].SelfScores,
        'SelfComments': this.appraisalList[this.q].SelfComments
      }
      this.fmsservice.InsertStaffScores(entity).subscribe(data => {
        debugger
        if (data != undefined && this.q == this.appraisalList.length) {
          Swal.fire("Appraisal Saved Successfully");
          this.InsertNotifications()
          this.router.navigate(['SelfRatingDash']);

        }
      })
    }
  }

  public InsertNotifications() {
    var entity = {
      'StaffID': this.Approver1,
      'Notification': 'New Apparaisal Request',
      'Description': 'You have Got a New Appraisal Request. Please Check'
    }
    this.fmsservice.InsertNotifications(entity).subscribe(data => {

    })
  }




  serialno: any;
  public UpdateIndex(sno) {
    this.serialno = sno;
  }


  public updateindexs() {
    debugger
    var objIndex = this.appraisalList.findIndex(x => x.Sno == this.serialno);
    this.appraisalList[objIndex].SelfScores = this.Score
    this.appraisalList[objIndex].SelfComments = this.SelfComments
    debugger
    Swal.fire("Updated Successfully");
  }
}
