import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-technology-request',
  templateUrl: './technology-request.component.html',
  styleUrls: ['./technology-request.component.css']
})
export class TechnologyRequestComponent implements OnInit {
  dueDate: any;
  requestTypeID: any;
  imageUrl: any;
  attachment: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
  }
  brochures=[];
  imagesurl:any;
  public onBrochureUpload(abcd) {
    
    this.brochures.push(abcd.addedFiles[0]);
    this.uploadImages();
    abcd.length = 0;
  }
  public uploadImages() {
    
    this.DigiOfficeService.UploadImages(this.brochures).subscribe(res => {
      
      this.attachment=res;
      //this.imagesurl.push(res);
     //  this.attachments.length = 0;
      Swal.fire("Added Successfully");
      
    });
  }
  public InsertDetails() 
  {
    
    var Entity = {  
      // 'DueDate': this.dueDate,
      // 'RequestTypeID': this.requestTypeID,
      // 'Attachment': this.attachment

      'Request':"ejgfhde",
      'RequestTypeID': this.requestTypeID,
      'BuildingID': 65,
      'DueDate': this.dueDate,
      'Attachment':this.attachment
   
    }
    this.DigiOfficeService.InsertTechnologyRequest(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Technology Request Successfully.');
        }
        location.href = "#/TechnologyRequestDashboard";
      }, error => {
      }
    )
  } 

}
