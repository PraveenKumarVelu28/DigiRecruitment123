
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  search: any;
  visitorList: any[];
  buildingList: any;
  buildingID: any;
  id: any;
  filteredVisitorList: any[];
  userList: any[];
  filteredUserList: any[];
  count: number;
  p: number = 1;
  paramID:any;
  constructor(private DigiOfficeService: DigiOfficeService,private ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
   
    this.GetUserList();
  }
  public GetUserList() {
    this.DigiOfficeService.GetUserList().subscribe(res => {
      
      this.userList = res;
      this.filteredUserList=this.userList;
      this.count=this.filteredUserList.length;
    })
  }
  public DisableUser(id) 
  {
   
   this.DigiOfficeService.DisableUser(id).subscribe(
     data => {
       
       Swal.fire("Disabled Successfully");
       this.GetUserList()
     }, error => {
     }
   )
 }

 public EnableUser(id) 
 {
  
  this.DigiOfficeService.EnableUser(id).subscribe(
    data => {
      
       Swal.fire("Enabled Successfully");
       this.GetUserList()
    }, error => {
    }
  )
}


  exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.filteredUserList.length; i++) {
      
      var list = {
        userType: this.filteredUserList[i].userType,
        name: this.filteredUserList[i].name,
        emailID: this.filteredUserList[i].emailID,
        phoneNo: this.filteredUserList[i].phoneNo,
        userRole: this.filteredUserList[i].userRole,
      
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'User Dashboard',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'User Dashboard'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }
}
