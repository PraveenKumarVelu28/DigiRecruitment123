import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';
// import * as jsPDF from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payrollreports',
  templateUrl: './payrollreports.component.html',
  styleUrls: ['./payrollreports.component.css']
})
export class PayrollreportsComponent implements OnInit {


  constructor(private DigiOfficeService: DigiOfficeService, public router: Router, public datepipe: DatePipe, private sanitizer: DomSanitizer) {
    this.DigiOfficeService.GetEmployeeSalary().subscribe(
      res => {
        debugger;
        this.EmployeeSalary = res;
        this.FilteredEmployeeSalary = this.EmployeeSalary;
        //this.GrandTotal = this.FilteredEmployeeSalary[0].grandTotal
      }
    )
  }
  EmployeeSalary: any;
  Search: any;
  fileUrl
  FilteredEmployeeSalary: any;
  GrandTotal: any;
  ngOnInit() {
    debugger

    this.DigiOfficeService.GetEmployeeSalary().subscribe(
      res => {
        debugger;
        this.EmployeeSalary = res;
        this.FilteredEmployeeSalary = this.EmployeeSalary;
        //this.GrandTotal = this.FilteredEmployeeSalary[0].grandTotal
      }
    )
  }

  newSalary
  StaffID;
  StaffName;
  StaffType;
  SalMonth;
  LeavesPerYear;
  sssRate;
  SavePDF111(evn) {
    debugger;

    this.StaffID = evn.employeeID;
    this.StaffName = evn.staffName;
    this.StaffType = evn.staffType;
    this.SalMonth = evn.salMonth
    this.LeavesPerYear = evn.leavesPerYear;
    this.sssRate = evn.sssRate


    let html = ' <head></head> <body> <h4>Pay Slips</h4> <label></label>    </body>'

    // var doc = new jsPDF()

    // doc.fromHTML(html
    //   , 10, 20)
    // doc.save('a4.pdf')

    // var doc = new jsPDF();
    // doc.text(html, () => {
    //   doc.save("a4.pdf");
    // })

  }
  FilteredEmployeeSalary1

  // public SavePDF(evn): void {

  //   debugger;
  //   let StaffIDPaySlips = evn.employeeID;
  //   let salmonth1 = evn.salMonth

  //   this.FilteredEmployeeSalary1 = this.EmployeeSalary.filter(x => x.employeeID == StaffIDPaySlips);
  //   let content = this.content.nativeElement;
  //   let doc = new jsPDF('p', 'pt', 'a4');
  //   doc.setFontSize(5);

  //   let _elementHandlers =
  //   {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };
  //   doc.fromHTML(content.innerHTML, 70, 0, {

  //     'elementHandlers': _elementHandlers
  //   });


  //   var img = new Image()
  //   var img1 = new Image()
  //   img.src = 'assets/Login/1.jpg';
  //   img1.src = 'assets/Login/2.jpg';
  //   doc.addImage(img, 'jpg', 0, 0, 600, 120)
  //   doc.addImage(img1, 'jpg', 0, 700, 600, 140);

  //   doc.save('test.pdf');
  //   var pdf = doc.output('blob');

  //   var file = new File([pdf], "mypdf" + ".pdf");

  //   let body = new FormData();
  //   body.append('Dan', file);

  //   this.fmsservice.EquipmentInvoiceUpload(body).subscribe(res => {
  //     debugger


  //   })

  // }
  // public blobToFile = (theBlob: Blob, fileName: string): File => {
  //   var b: any = theBlob;

  //   b.name = fileName;

  //   return <File>theBlob;
  // }

  public FilterBytenantMonth(evn) {
    debugger;
    let Month = evn.target.value;
    if (Month == 'none') {
      this.FilteredEmployeeSalary = this.EmployeeSalary;
      this.GrandTotal = this.FilteredEmployeeSalary[0].grandTotal
    }
    else {
      this.FilteredEmployeeSalary = this.EmployeeSalary.filter(x => x.salMonth == Month);
      this.GrandTotal = this.FilteredEmployeeSalary[0].grandTotal
    }
  }
  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Payroll Reports ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Payroll Reports'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredEmployeeSalary);
  }
}
