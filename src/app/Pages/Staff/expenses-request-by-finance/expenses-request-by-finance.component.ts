import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenses-request-by-finance',
  templateUrl: './expenses-request-by-finance.component.html',
  styleUrls: ['./expenses-request-by-finance.component.css']
})
export class ExpensesRequestByFinanceComponent implements OnInit {

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

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.transportationType=0;
    this.project=0;
   
    this.currency=0;
    this.Supervisor=0;
    this.paramID = this.ActivatedRoute.snapshot.params.id;

    this.staffID=localStorage.getItem('staffID');
    this.name=localStorage.getItem('name');

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
  debugger
 
  for(let i=0;i<abcd.addedFiles.length;i++){
    this.brochures.push(abcd.addedFiles[i]);
  }
  this.uploadImages();
  abcd.length = 0;
}
public uploadImages() {
  debugger
  for(let i=0;i<this.brochures.length;i++){
    debugger
    this.DigiOfficeService.UploadImages(this.brochures).subscribe(res => {
      this.brochures1.push(res);
        let a = this.brochures1[0].slice(2);
        this.imagesurl = 'http://14.192.17.225' + a;
     // Swal.fire("Added Successfully");
      
    });
  }
 
}

  public InsertDetails() 
  {
    
    var Entity = {
      'UserID':this.staffID,
      'ExpenceType': this.expenceType,
      'Date': this.date,
      'ExpenceLocation': this.expenceLocation,
      'ExpenceAmount':this.expenceAmount,
      'Supervisor':this.approver,
      'Attachment': this.imagesurl,
      'Comments':this.comments,
     
    }
    this.DigiOfficeService.InsertCompanyExpencesWEB(Entity).subscribe(
      data => {
        if (Entity != null) {
          debugger
          var userentity = {
            "CompanyExpenseID": data,
            'Attachment': this.imagesurl
          };
          this.DigiOfficeService.InsertCompanyExpensePhotosweb(userentity).subscribe(data2 => {
            if (data2 == null) {
              Swal.fire("Something Went Worng");

            }
            else {
              Swal.fire('Expense Added Successfully.');
              location.href = "#/ExpensesDashboardForFinance";
            }
          });
        }
        // if(data!=undefined)
        // {
        //   Swal.fire('Expense Added Successfully.');
        // }
        // location.href = "#/ExpensesDashboardForFinance";
      }, error => {
      }
    )

  }


}
