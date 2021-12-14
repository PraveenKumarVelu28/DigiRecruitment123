import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-staff-dashboard',
  templateUrl: './my-staff-dashboard.component.html',
  styleUrls: ['./my-staff-dashboard.component.css']
})
export class MyStaffDashboardComponent implements OnInit {

  search:any;
  managerID: any;
  staffID: any;
  staffList: any[];
  buildingList: any[];
  buildingid: any;
  count:any;
  constructor(private DigiOfficeService: DigiOfficeService){ }

  ngOnInit(): void {
    this.buildingid=0;
    this.managerID = localStorage.getItem('managerID');
    this.staffID = localStorage.getItem('staffID');
    this.GetBuildingStaff();
    this.GetBuildinglist();
  }
  public GetBuildingStaff() {
    
    // this.DigiOfficeService.GetBuildingStaff(this.managerID).subscribe(res => {
      
    //   this.staffList = res.filter(x=>x.supervisorID==this.managerID);
    //   this.count=this.staffList.length;
    // });
    this.DigiOfficeService.GetAllStaff().subscribe(res => {
      this.staffList = res.filter(x => x.managerid == this.staffID);
    })
   }
   public GetBuildinglist() {
    
    this.DigiOfficeService.GetBuildinglist().subscribe(res => {
      
      this.buildingList = res;   
    });
   }
 
   public getbuildingID(even)
   {
    
    this.buildingid=even.target.value;
    if(this.buildingid==0)
    {
      this.DigiOfficeService.GetBuildingStaff(this.managerID).subscribe(res => {
        
        this.staffList = res;
        this.count=this.staffList.length;
      });
    }
    else
    {
      this.DigiOfficeService.GetBuildingStaff(this.managerID).subscribe(res => {
        
        this.staffList = res.filter(x=>x.buildingid==this.buildingid);
        this.count=this.staffList.length;
      });   
    }    
   }
   
   exportexcel() {
    
    var itemmasterlist = []

    for (let i = 0; i < this.staffList.length; i++) {
      
      var list = {
        Building: this.staffList[i].building,
        Name: this.staffList[i].name,
        EmailID: this.staffList[i].emailID,
        PhoneNo: this.staffList[i].phoneNo,
        Type: this.staffList[i].type,
        Supervisor: this.staffList[i].supervisor,
        EmergencyContactNo: this.staffList[i].emergencyContactNo
       
      }
      
      itemmasterlist.push(list)
    }
    
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Details',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Details'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }


}
