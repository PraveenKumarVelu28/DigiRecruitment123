import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { DigiOfficeService } from '../../../digi-office.service';

@Component({
  selector: 'app-staff-score-report',
  templateUrl: './staff-score-report.component.html',
  styleUrls: ['./staff-score-report.component.css']
})
export class StaffScoreReportComponent implements OnInit {

  constructor(public fmService: DigiOfficeService, public router: Router) { }

  search: any;
  StaffTypelist: any;
  YearID: any;
  StaffID: any;
  UserID: any;

  ngOnInit() {
    this.YearID = 2020;
    this.StaffTypeID = 0;
    this.StaffID = 0;
    // this.StaffID = 0;
    this.UserID = localStorage.getItem('staffid');
    // this.fmService.GetStaffType(1).subscribe(data => {
    //   debugger
    //   this.StaffTypelist = data;
    // })

    this.ConductappraisalStaffList();


  }

  StaffAppraisalList;
  FilteredStaffAppraisalList
  public ConductappraisalStaffList() {
    this.fmService.GetConductappraisalStaffList().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffAppraisalList = temp;
        this.FilteredStaffAppraisalList = this.StaffAppraisalList
      }
    )
  }


  Stafflist: any
  StaffType: any;
  StaffTypeID: any;
  GetStaffTypeID(event) {
    this.StaffTypeID = event.target.value;
    if (this.StaffTypeID == 0) {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList
    }
    else {
      // this.fmService.GetAllStaff().subscribe(data => {
      //   debugger
      //   let temp: any = data;
      //   this.Stafflist = temp.filter(x => x.staffTypeID == this.StaffTypeID);
      //   this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter(x => x.scoreBit == 1 && x.type == this.StaffTypeID);
      // })
    }
  }


  public GetStaffID(event) {
    debugger;
    this.StaffID = event.target.value;
    if (this.StaffID == 0) {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList;
    }
    else {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter(x => x.scoreBit == 1 && x.type == this.StaffTypeID && x.id == this.StaffID);
    }
  }

  public FilterByYear(event) {
    this.YearID = event.target.value;
  }





  public ViewScores(event) {
    debugger;
    let StaffID = event.id;
    let StaffTypeID = event.type;

    this.router.navigate(['/StaffScoreFullDetails', StaffID, StaffID]);

  }

  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Score Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Score Report'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.StaffAppraisalList);
  }


}
