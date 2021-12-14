import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-postajob',
  templateUrl: './postajob.component.html',
  styleUrls: ['./postajob.component.css']
})
export class PostajobComponent implements OnInit {

  public jobtitile: any;
  public skills: any;
  public yearsofexp: any;
  public yearsofrelavantexp: any;
  public jobdescription: any;
  public joblocation: any;
  public noofpositions: any;
  public companyname: any;
  public package: any;
  public hiringmanager: any;
  public otherreqconditions: any;
  public resourcemanager: any;
  public hrlist: any;

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.DigiOfficeService.UsersHr().subscribe(data => {
      this.hrlist = data;
    })
  }

  public GetHrName(even) {
    this.hiringmanager = even.target.value;
  }


  public insertdetails() {
    var entity = {
      'jobTitle': this.jobtitile,
      'Skills': this.skills,
      'TotalExp': this.yearsofexp,
      'RelaventExp': this.yearsofrelavantexp,
      'JobDescription': this.jobdescription,
      'joblocation': this.joblocation,
      'Noofpositions': this.noofpositions,
      'CompanyName': this.companyname,
      'package': this.package,
      'HiringManager': this.hiringmanager,
      'OtherRequiredConditions': this.otherreqconditions,
      'ResourceManager': this.resourcemanager
    }
    this.DigiOfficeService.InsertJob_Requirements(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/Postajobdash"
      }

    })
  }

}
