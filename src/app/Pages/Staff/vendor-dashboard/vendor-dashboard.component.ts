
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {
  search:any;
  vendorList: any;
  count: any;

  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.GetVendorList();
  }
  public GetVendorList() {
    this.DigiOfficeService.GetVendorList().subscribe(res => {
      this.vendorList = res;
      this.count=this.vendorList.length;
    })
  }
  
  public EnableVendor(id) {
    this.DigiOfficeService.EnableVendor(id).subscribe(
      data => {
        Swal.fire("Enabled Successfully");
        this.GetVendorList();
      }, error => {
      }
    )
  }
  public DisableVendor(id) {
    this.DigiOfficeService.DisableVendor(id).subscribe(
      data => {
        Swal.fire("Disabled Successfully");
        this.GetVendorList();
      }, error => {
      }
    )
  }


}
