import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../../digi-office.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-staff-pay-roll',
  templateUrl: './staff-pay-roll.component.html',
  styleUrls: ['./staff-pay-roll.component.css']
})
export class StaffPayRollComponent implements OnInit {
  allStaffpayrollList: any[];
  search: any;
  MonthID: any;
  Payrollvis: boolean;
  LOPDays: any;
  value: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }

  ngOnInit(): void {
    this.MonthID = 0;
    this.GetAllStaff();
  }
  public GetAllStaff() {

    this.DigiOfficeService.GetAllStaff().subscribe(res => {

      this.allStaffpayrollList = res;
      // this.filteredList = this.allStaffList.filter(x=>x.resignationDate==null);
      // this.Count = this.filteredList.length;
    }
    )
  }

  public getMonthID(even) {
    this.MonthID = even.target.value;
    // if (this.MonthID == "") {
    //   this.GetAllStaff();
    // }
    // else {
    //   this.allStaffpayrollList = this.allStaffpayrollList.filter(x => x.MonthID == this.MonthID);
    // }
  }

  EmployeeID;
  temp: any;
  IntID: any
  PrevLOPDays: any;
  StaffSalaryReports: any;
  public ID = [];
  
  public getCheckbocdetails(evn) {
    debugger;
    if (this.MonthID == 0) {
      Swal.fire("Please Select Month");
      this.DigiOfficeService.GetBuildingStaff(1).subscribe(
        res => {
          debugger;
          this.allStaffpayrollList = res;
        }
      )

    } else {
      let temp: any = evn;
      this.temp = Object.entries(temp);
      debugger
      if (this.temp.every(val => val.checked == true)) {
        this.IntID = false;
        this.ID = [];
        this.temp.forEach(val => { val.checked = false });
        this.IntID = false;
      }
      else {
        debugger;

        //  this.ID = [];
        debugger
        this.temp.forEach(val => { val.checked = true });
        this.IntID = true;
        this.ID.push(evn.id);

        for (let i = 0; i < this.ID.length; i++) {
          debugger;
          this.EmployeeID = this.ID[i];
          this.DigiOfficeService.GetStaffLeavesForPayroll(this.MonthID, 2021, this.EmployeeID).subscribe(
            res => {
              debugger;
              if (res.length == 0) {
                this.LOPDays = 0;
                this.DigiOfficeService.GetSalary(this.EmployeeID, this.LOPDays, this.MonthID, 2021).subscribe(
                  res => {
                    debugger;
                    this.StaffSalaryReports = res;
                    Swal.fire("Payroll Processing Completed");
                    this.Payrollvis = true
                  }
                )

              } else {

                this.LOPDays = res[0].noOfDays;
                this.DigiOfficeService.GetStaffLeavesForPayroll(this.MonthID, 2021, this.EmployeeID).subscribe(
                  res1 => {
                    debugger;
                    this.PrevLOPDays = res1[0].noOfDays;
                    if (this.LOPDays > 2) {
                      if (this.PrevLOPDays == 0) {
                        this.LOPDays = this.LOPDays;
                        this.DigiOfficeService.GetSalary(this.EmployeeID, this.LOPDays, this.MonthID, 2021).subscribe(
                          res => {
                            debugger;
                            this.StaffSalaryReports = res;
                            Swal.fire("Payroll Processing Completed");

                            this.ID = [];
                            this.Payrollvis = true;
                          }
                        )
                      }
                      else if (this.PrevLOPDays != 0) {
                        let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
                        if (ActualLOPDays > 4) {
                          this.LOPDays = Number(ActualLOPDays) - 4;
                          this.DigiOfficeService.GetSalary(this.EmployeeID, this.LOPDays, this.MonthID, 2021).subscribe(
                            res => {
                              debugger;
                              this.StaffSalaryReports = res;
                              Swal.fire("Payroll Processing Completed");
                              this.ID = [];
                              this.Payrollvis = true;
                            }
                          )
                        }
                      }
                    }

                    else {
                      if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
                        this.LOPDays = 0;
                        this.DigiOfficeService.GetSalary(this.EmployeeID, this.LOPDays, this.MonthID, 2021).subscribe(
                          res => {
                            debugger;
                            this.StaffSalaryReports = res;
                            Swal.fire("Payroll Processing Completed");
                            this.ID = [];
                            this.Payrollvis = true
                          }
                        )
                      }
                    }

                  }
                )

              }

            }

          )
        }

      }

    }

  }


  ID1 = [];
  startdate: any;
  enddate: any;
  public selectedDate(data) {
    debugger
    this.startdate = data[0].toLocaleString().split(',')[0]
    this.enddate = data[1].toLocaleString().split(',')[0]
    //this.GetAllStaffForManager(this.startdate,this.enddate);
  }

  public SelectAll() {
    debugger

    this.DigiOfficeService.DeleteEmployeeSalary().subscribe(res => {
      if (this.allStaffpayrollList.every(val => val.checked == true)) {
        this.IntID = false;
        this.ID = [];
        this.allStaffpayrollList.forEach(val => { val.checked = false });
      }
      else {
        this.ID1 = [];
        debugger
        this.allStaffpayrollList.forEach(val => { val.checked = true });
        this.IntID = true;
        Swal.fire("Payroll Processing Completed");
        this.Payrollvis = true;
        for (let i = 0; i < this.allStaffpayrollList.length; i++) {
          debugger;
          this.ID1.push(this.allStaffpayrollList[i].id);
          //this.EmployeeID =
          this.ID1[i];
          this.DigiOfficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i]).subscribe(
            res => {
              debugger;
              if (res.length == 0) {
                this.LOPDays = 0;
                this.DigiOfficeService.Get_SalaryByDate(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                  res => {
                    debugger;
                    this.StaffSalaryReports = res;
                    this.ID1 = [];
                  }
                )

              } else {
                this.LOPDays = res[0].noOfDays;
                if (this.LOPDays <= 2) {
                  this.LOPDays = this.LOPDays;
                }
                else {
                  this.LOPDays = this.LOPDays - 2;
                }
                this.DigiOfficeService.Get_SalaryByDate(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                  res => {
                    debugger;
                    this.StaffSalaryReports = res;
                    this.ID1 = [];
                  }
                )
              }

            }


          )

        }

        document.getElementById('showpayroll').click();
        // for (let i = 0; i < this.ID1.length; i++) {
        //   debugger;

        // }

      }
    })


  }

  ShowPayroll() {
    debugger
    location.href = "#/payrollreports"
  }

}
