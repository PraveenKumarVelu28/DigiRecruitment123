import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-postajobdash',
  templateUrl: './postajobdash.component.html',
  styleUrls: ['./postajobdash.component.css']
})
export class PostajobdashComponent implements OnInit {

  constructor(private DigiOfficeService: DigiOfficeService, private fb: FormBuilder) { }
  joblist: any;
  search: any;
  count: any;

  ngOnInit(): void {
    this.DigiOfficeService.GetJob_Requirements().subscribe(data => {
      this.joblist = data;
      this.count = this.joblist.length;
    })
  }

}
