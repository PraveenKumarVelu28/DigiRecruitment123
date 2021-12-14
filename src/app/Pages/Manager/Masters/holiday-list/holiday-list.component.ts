import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {
  event: any;
  date: any;
  paramID: any;
  dayList: any[];
  dayID: number;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dayID=0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetDaysMaster();
  }
  public GetDaysMaster() {
    this.DigiOfficeService.GetDaysMaster().subscribe(data => {
      this.dayList = data;
    })
  }
  public InsertDetails() 
  {
    
    var Entity = {
      'Event': this.event ,
      'Date': this.date ,
    }
    this.DigiOfficeService.InsertHolidayListMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Holiday Added Successfully.');
        }
        location.href = "#/HolidayListDashboard";
      }, error => {
      }
    )
  }

}
