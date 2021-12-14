import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-feedback-by-staff',
  templateUrl: './new-feedback-by-staff.component.html',
  styleUrls: ['./new-feedback-by-staff.component.css']
})
export class NewFeedbackByStaffComponent implements OnInit {
  paramID: any;
  transportationType: any;
  project: any;
  supervisor: any;
  staffID: any;
  staffName: any;
  transportationtypelist: any[];
  projectlist: any[];
  expenselist: any[];
  expenceType: any;
  expenceLocation: any;
  date: any;
  expenceAmount: any;
  currency: any;
  comments: any;
  expenseLocation: any;
  currencylist: any[];
  supervisorList: any[];
  Supervisor: any;
  requestFor: any;
  buildingID: any;
  buildinglist: any[];

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.staffID=localStorage.getItem('staffID');
    this.buildingID=localStorage.getItem('BuildingID');
    this.staffName=localStorage.getItem('name');
   
    this.GetBuildinglist();
   
 
  }
 
  public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildinglist = res;
      
    });
   }
brochures=[];
photoUrl:any;
brochures1=[];
public onBrochureUpload(abcd) {
  
  this.brochures.push(abcd.addedFiles[0]);
  this.uploadImages();
  abcd.length = 0;
}
public uploadImages() {
  
  this.DigiOfficeService.UploadImages(this.brochures).subscribe(res => {
    
    this.brochures1.push(res);
    let a = this.brochures1[0].slice(2);
    
    this.photoUrl = 'http://14.192.17.225' + a;
    //this.photoUrl=res;
    //this.imagesurl.push(res);
   //  this.attachments.length = 0;
    Swal.fire("Added Successfully");
    
  });
}

  public InsertDetails() 
  {
    
    var Entity = {
      'UserID':this.staffID,
      'PhotoUrl': this.photoUrl,
      'BuildingID': this.buildingID,
      'FloorName': 3,
      'Unit': 2,
      'RequestFor': this.requestFor,
     
    }
    this.DigiOfficeService.InsertComplaintsMobile(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Feedeback Added Successfully.');
        }
        location.href = "#/Feedback";
      }, error => {
      }
    )
  }

}
