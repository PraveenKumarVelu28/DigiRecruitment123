
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  staffID: string;
  staffName: string;
  name: any;
  description: any;
  date: any;
  venue: any;
  modifiedBy: any;
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.staffID = localStorage.getItem('staffID');
    this.staffName = localStorage.getItem('staffName');
  }

  brochures = [];
  imagesurl: any;
  public onBrochureUpload(abcd) {
    
    this.brochures.push(abcd.addedFiles[0]);
    this.uploadImages();
    abcd.length = 0;
  }
  
  public uploadImages() {
    
    this.DigiOfficeService.UploadImages(this.brochures).subscribe(res => {
      
      this.imagesurl = res;
      
      Swal.fire("Added Successfully");
      
    });
  }

  public InsertDetails() {
    
    var Entity = {
      'Name': this.name,
      'Description': this.description,
      'Photo': this.imagesurl[0],
      'DateTime': this.date,
      'Venue': this.venue,
      'ModifiedBy': this.modifiedBy
    }
    this.DigiOfficeService.InsertEvents(Entity).subscribe(
      data => {
        
        if (data != undefined) {
          Swal.fire('Events Added Successfully.');
        }
        location.href = "#/UpComingEventsDashboardForHR";
      }, error => {
      }
    )
  }

}


