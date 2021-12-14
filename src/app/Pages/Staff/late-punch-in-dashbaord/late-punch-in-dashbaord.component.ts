import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-late-punch-in-dashbaord',
  templateUrl: './late-punch-in-dashbaord.component.html',
  styleUrls: ['./late-punch-in-dashbaord.component.css']
})
export class LatePunchInDashbaordComponent implements OnInit {
  puchinlist: any[];
  search:any;

  constructor(public DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.GetLateAttendanceMaster();
  }
  public GetLateAttendanceMaster() {
    this.DigiOfficeService.GetLateAttendanceMaster().subscribe(res => {
      
      this.puchinlist = res;
      
    })
  }
}
