import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.css']
})
export class ExpenseTypeComponent implements OnInit {
  expencesName: any;
  paramID: any;
 
  saveupdate: any;
  expenseList: any[];
  ID: any;
  ExpencesName: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.GetExpencesMasterByID(this.paramID);
    
  }

  public InsertDetails() 
  {
    
    var Entity = {
      'ExpencesName': this.expencesName 
    }
    this.DigiOfficeService.InsertExpencesMaster(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Expense Added Successfully.');
        }
        location.href = "#/ExpenseTypeDashboard";
      }, error => {
      }
    )
  }

  public GetExpencesMasterByID(paramID) {
    
    this.DigiOfficeService.GetExpencesMasterByID(paramID).subscribe((data) => {
      
      this.ExpencesName = data['expencesName'];
    });
   
  }

  public updatedetails() {
    var entity = {
      Id: this.paramID,
      'ExpencesName': this.ExpencesName 
    }
    this.DigiOfficeService.UpdateExpencesMaster(entity).subscribe(data => {
      Swal.fire('Expense Name Updated Successfully.');
      location.href = "#/ExpenseTypeDashboard";
    })
  }

 

}
