
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';

@Component({
  selector: 'app-work-space-allocation-dashboard',
  templateUrl: './work-space-allocation-dashboard.component.html',
  styleUrls: ['./work-space-allocation-dashboard.component.css']
})
export class WorkSpaceAllocationDashboardComponent implements OnInit {
  workSpaceRequest: any[];
  SDate: string;
  EDate: string;
  value: any;
  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.SDate='2020-01-01';
    this.EDate='2025-12-31';
    this.GetWorkSpaceDetails(this.SDate,this.EDate);
  }
  public selectedDate(data) {
    this.SDate = data[0].toLocaleString().split(',')[0]
    this.EDate = data[1].toLocaleString().split(',')[0]
    this.GetWorkSpaceDetails(this.SDate,this.EDate);
  }
public GetWorkSpaceDetails(SDate,EDate)
{
  this.DigiOfficeService.GetWorkSpaceDetails(SDate,EDate).subscribe(data => {
    
    this.workSpaceRequest = data
  })

}
}
