import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DigiOfficeService } from '../../../digi-office.service';

@Component({
  selector: 'app-menu-mappingdash',
  templateUrl: './menu-mappingdash.component.html',
  styleUrls: ['./menu-mappingdash.component.css']
})
export class MenuMappingdashComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public RoleMappinglist: any;
  public search:any;
  ngOnInit(): void {
    this.languageid = 1;
    this.GetRoleMappinglist()
    
  }

  public GetRoleMappinglist() {
    this.DigiOfficeService.GetMenuRoleMappingTable(this.languageid).subscribe(
      data => {
        debugger
        this.RoleMappinglist = data;
        debugger
      }, error => {
      }
    )
  }


  public DeleteRoleMapping(id) {
   
    this.DigiOfficeService.DeleteMenuRoleMappingTableRow(id).subscribe(res => {
      let test = res;
      this.GetRoleMappinglist();
    })
  }
}
