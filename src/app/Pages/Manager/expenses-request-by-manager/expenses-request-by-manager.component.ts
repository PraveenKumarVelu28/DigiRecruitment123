import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenses-request-by-manager',
  templateUrl: './expenses-request-by-manager.component.html',
  styleUrls: ['./expenses-request-by-manager.component.css']
})
export class ExpensesRequestByManagerComponent implements OnInit {

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
  name: any;
  approver: string;
  projectName: string;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.transportationType=0;
    this.project=0;
    this.expenceType=0;
    this.currency=0;
    this.Supervisor=0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;

    this.staffID=localStorage.getItem('staffID');
    this.name=localStorage.getItem('name');
    this.projectName=localStorage.getItem('projectName');
    this.approver=localStorage.getItem('supervisor')
 
    this.GetProjectMasterList();
    this.GetExpensesMaster();
    this.GetCurrencyMaster();
    this.GetSupervisor();
 
  }
 
   public GetProjectMasterList() {
    
    this.DigiOfficeService.GetProjectMasterList().subscribe(res => {
      
      this.projectlist = res;
    });
   }

   public GetExpensesMaster() {
    
    this.DigiOfficeService.GetExpensesMaster().subscribe(res => {
      
      this.expenselist = res;
    });
   }

   public GetCurrencyMaster() {
    
    this.DigiOfficeService.GetCurrencyMaster().subscribe(res => {
      
      this.currencylist = res;
    });
   }
   public GetSupervisor() {
    
    this.DigiOfficeService.GetSupervisor(this.staffID).subscribe(res => {
      
      this.supervisorList = res;
    });
   }
 
brochures=[];
imagesurl:any;
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
    
    this.imagesurl = 'http://14.192.17.225' + a;
    Swal.fire("Added Successfully");
    
  });
}

  public InsertDetails() 
  {
    
    var Entity = {
      'UserID':this.staffID,
      'Name': this.name,
      'ExpenceType': this.expenceType,
      'Project': this.project,
      'Date': this.date,
      'ExpenceLocation': this.expenceLocation,
      'ExpenceAmount':this.expenceAmount,
      'PaymentType':'Null',
      'Supervisor':this.approver,
      'InvoiceURL': this.imagesurl,
      'StartDate': 'Null',
      'EndDate': 'Null',
      'Currency':this.currency,
      'ExpenceCode':'Null',
      'Comments':this.comments,
      'Mileage':'Null',
      'OverTime':'Null'
     
    }
    this.DigiOfficeService.InsertExpensesWEB(Entity).subscribe(
      data => {
        
        if(data!=undefined)
        {
          Swal.fire('Expense Added Successfully.');
        }
        location.href = "#/ManagerExpenseDashboard";
      }, error => {
      }
    )
  }

}
