import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-lookup',
  templateUrl: './staff-lookup.component.html',
  styleUrls: ['./staff-lookup.component.css']
})
export class StaffLookupComponent implements OnInit {
  name: any;
  phoneNumber: any;
  email: any;
  designation: any;
  department: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  
  public InsertDetails() 
  {
    
    var Entity = {  
      'Name': this.name,
      'PhoneNumber': this.phoneNumber,
      'Email': this.email,
      'Designation': this.designation,
      'Department': this.department
     
    }
    this.DigiOfficeService.InsertStaffLookUp(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Staff LookUp Inserted Successfully.');
        }
        location.href = "#/StaffLookUpDashboard";
      }, error => {
      }
    )
  } 

}
