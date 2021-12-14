import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-visitor-dashboard',
  templateUrl: './visitor-dashboard.component.html',
  styleUrls: ['./visitor-dashboard.component.css']
})
export class VisitorDashboardComponent implements OnInit {
  search:any;
  
  visitorList: any[];
  buildingList: any;
  buildingID:any;
  id: any;
  filteredVisitorList: any[];

  constructor(private DigiOfficeService: DigiOfficeService){ }

  ngOnInit(): void {
    this.buildingID=0;
    this.GetVisitorList();
    this.GetBuildinglist();
  }

  public GetVisitorList(){
    this.DigiOfficeService.GetVisitorList().subscribe(res=>{
      this.visitorList = res;
      this.filteredVisitorList=this.visitorList;
    }) 
  }
  public GetBuildinglist(){
    this.DigiOfficeService.GetBuildinglist().subscribe(res=>{
      this.buildingList = res;
    }) 
  }
  // public getexpencesID(even) {
  //   
  //   this.expence = even.target.value;
  //   if (this.expence == 0) {
  //     this.filteredExpenseList=this.ExpenseList.filter(x=>x.approvalStatus=='Not Yet Approved');
  //   } 
  //   else {
  //     this.filteredExpenseList=this.ExpenseList.filter(x =>x.expencesName==this.expence && x.approvalStatus=='Not Yet Approved');
  //   }
  // }
  public getbuildingID(even){
    this.buildingID=even.target.value;
    if(this.buildingID==0){
      this.filteredVisitorList=this.visitorList;
    }else{
      this.filteredVisitorList=this.visitorList.filter(x=>x.buildingName==this.buildingID)
    }

  }
  

}
