import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiOfficeService } from '../../../digi-office.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.css']
})
export class NewVendorComponent implements OnInit {
  paramID: any;
  staffID: string;
  hrID: string;
  buildingID: string;
  name: string;
  accountTypeList: any[];
  accountTypeID: number;
  phoneNo: any;
  emailID: any;
  accountNumber: any;

  bankAddress: any;
  branchName: any;
  paymentTerms: any;
  address: any;
  contactPerson: any;
  vendorSupply: any;

 
  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountTypeID=0;
    
    this.paramID = this.ActivatedRoute.snapshot.params.id;
    this.staffID = localStorage.getItem('staffID');
    this.hrID = localStorage.getItem('hrID')
    this.buildingID = localStorage.getItem('buildingID');
    // this.name = localStorage.getItem('name');
   this.GetAccountType();

  }

  public GetAccountType() {
    
    this.DigiOfficeService.GetAccountType().subscribe(res => {
      
      this.accountTypeList = res;

    });
  }

 
  

  StaffRoleType
  public InsertDetails() {
    debugger
    var Entity = {
      'Name': this.name,
      'EmailID':  this.emailID,
      'PhoneNo': this.phoneNo,
      'AccountNumber': this.accountNumber,
      'AccountTypeID': this.accountTypeID,
      'BankAddress': this.bankAddress,
      'BranchName': this.branchName,
      'PaymentTerms': this.paymentTerms,
      'Address': this.address,
      'ContactPerson': this.contactPerson,
      'VendorSupply': this.vendorSupply
      
    }
    this.DigiOfficeService.InsertVendor(Entity).subscribe(
      data => {
        debugger
        if (data != undefined) {
          Swal.fire('Vendor Added Successfully.');
        }
        location.href = "#/VendorDashboard";
      }, error => {
      }
    )
  }

}
