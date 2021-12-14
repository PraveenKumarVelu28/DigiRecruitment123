import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  digitalmarketingList: any[];
  projectCode: any;

  ProjectList: any[];
  productList: any[];
  spoc: any;
  clientName: any;
  clientPhoneNo: any;
  clientEmailID: any;
  projectName: any;
  description: any;
  stafflist: any[];
  employeeID: number;
  supportList: any[];
  salesList: any[];

  constructor(private DigiOfficeService: DigiOfficeService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    this.projectCode = 0;
    this.spoc=0;
    this.GetDigitalMarketingID();
    this.GetProjectID();
    this.GetProductID();
    this.GetSupportID();
    this.GetSalesID();
    this.GetAllStaff();
  }


  public GetDigitalMarketingID() {
    debugger;
    this.DigiOfficeService.GetProjectIDType().subscribe(res => {
      this.digitalmarketingList = res.filter(x => x.short == 1);
    })
  }
  public GetProjectID() {
    debugger;
    this.DigiOfficeService.GetProjectIDType().subscribe(res => {
      this.ProjectList = res.filter(x => x.short == 2);
    })
  }
  public GetProductID() {
    debugger;
    this.DigiOfficeService.GetProjectIDType().subscribe(res => {
      this.productList = res.filter(x => x.short == 3);
    })
  }
  public GetSupportID() {
    debugger;
    this.DigiOfficeService.GetProjectIDType().subscribe(res => {
      this.supportList = res.filter(x => x.short == 4);
    })
  }
  public GetSalesID() {
    debugger;
    this.DigiOfficeService.GetProjectIDType().subscribe(res => {
      this.salesList = res.filter(x => x.short == 5);
    })
  }

  public GetAllStaff() {
    this.DigiOfficeService.GetAllStaff().subscribe(res => {
      this.stafflist = res;
    });
  }

  public InsertDetails() {
    debugger;
    var Entity = {
      'ProjectName': this.projectName,
      'ProjectCode': this.projectCode,
      'Description': this.description,
      'Spoc': this.spoc,
      'ClientName': this.clientName,
      'ClientPhoneNo': this.clientPhoneNo,
      'ClientEmailID': this.clientEmailID,

    }
    this.DigiOfficeService.InsertProjectMaster(Entity).subscribe(
      data => {

        if (data != undefined) {
          Swal.fire('Project  Added Successfully.');
        }
        location.href = "#/ProjectListDashboard";
      }, error => {
      }
    )
  }
}
