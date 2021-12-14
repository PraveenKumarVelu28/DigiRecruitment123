
import { Component, OnInit } from '@angular/core';
import { DigiOfficeService } from '../../digi-office.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  designationtype: any;
  assignedtask: any;
  completedtask: any;
  constructor(private DigiOfficeService: DigiOfficeService) { }
  public roleID: any;
  public username: any;
  public menulist: any;

  public timesheets: any;
  attendence: any;
  allstaff: any;
  projectmapping: any;
  workschedule: any;
  leave: any;
  allstaffleave: any;
  announcements: any;
  user: any;
  appraisal: any;
  vendor: any;
  assets: any;
  masters: any;
  jobrecruitments: any;
  inventory: any;
  events: any;
  borrowings: any;
  feedback: any;
  visitorrequest: any;
  profile: any;
  staffmanagement: any;
  payroll: any;
  myleave: any;
  mystaffleave: any;
  approvedleave: any;
  rejectedleave: any;
  appliedstaffleave: any;
  approvedstaffleave: any;
  rejectedstaffleave: any;
  upcomingannounsements: any;
  completedannounsements: any;
  myappraisal: any;
  staffappraisal: any;
  staffappraisalreports: any;
  assignedassets: any;
  genaralassets: any;
  holidaylist: any;
  leavetype: any;
  projectslst: any;
  departmentmaster: any;
  latepunchin: any;
  appraisalcycle: any;
  keyresultarea: any;
  kpi: any;
  employeekramapping: any;
  jobrecruitmentsss: any;
  appliedcandidates: any;
  shortlistedcandidates: any;
  selectedcandidates: any;
  offeredcandidates: any;
  joinedcandidates: any;
  droppedcandidates: any;
  upcomingevents: any;
  completedevents: any;
  createchatgrououp: any;
  approvechatgroup: any;
  viewchatgroup: any;
  communication: any;
  workplacerequest: any;

  myproject: any;
  mydetails: any;
  myattendence: any;
  leaves: any;
  scheduledintervies: any;
  calender: any;
  expenses: any;
  myexpence: any;
  companyexpense: any;
  staffexpense: any;
  inventorypurchase: any;
  teamraisedexpnce: any;
  teamrejectedexpense: any;
  teamapprovedexpense: any;
  projectlist: any;
  task: any;

  ngOnInit(): void {
    debugger;
    this.roleID = localStorage.getItem('roleid');
    debugger
    this.username = localStorage.getItem('name');

    if (this.roleID == 2 || this.roleID == 1 || this.roleID == 3 || this.roleID == 4 || this.roleID == 5) {

      this.DigiOfficeService.GetMenuRoleMappingTableByRoleID(1, this.roleID).subscribe(
        data => {
          debugger
          this.menulist = data;
          debugger
          for (let s = 0; s < this.menulist.length; s++) {
            if (this.menulist[s].menus == 'Time Sheets') {
              this.timesheets = 1;

            }
            if (this.menulist[s].menus == 'All Staff Attendance') {
              this.attendence = 1;
            }
            if (this.menulist[s].menus == 'All Staff') {
              this.allstaff = 1;
            }
            if (this.menulist[s].menus == 'Project Mapping') {
              this.projectmapping = 1;
            }
            if (this.menulist[s].menus == 'Work Schedule') {
              this.workschedule = 1;
            }
            if (this.menulist[s].menus == 'Leave') {
              this.leave = 1;
            }
            if (this.menulist[s].menus == 'All Staff Leave') {
              this.allstaffleave = 1;
            }

            if (this.menulist[s].menus == 'Announcements') {
              this.announcements = 1;
            }

            if (this.menulist[s].menus == 'User') {
              this.user = 1;
            }
            if (this.menulist[s].menus == 'Appraisal') {
              this.appraisal = 1;
            }
            if (this.menulist[s].menus == 'Vendor') {
              this.vendor = 1;
            }
            if (this.menulist[s].menus == 'Assets') {
              this.assets = 1;
            }
            if (this.menulist[s].menus == 'Masters') {
              this.masters = 1;
            }
            if (this.menulist[s].menus == 'Job Recruitements') {
              this.jobrecruitments = 1;
            }

            if (this.menulist[s].menus == 'Events') {
              this.events = 1;
            }
            if (this.menulist[s].menus == 'Inventory') {
              this.inventory = 1;
            }

            if (this.menulist[s].menus == 'Borrowings') {
              this.borrowings = 1;
            }
            if (this.menulist[s].menus == 'Feedback') {
              this.feedback = 1;
            }
            if (this.menulist[s].menus == 'Communication') {
              this.communication = 1;
            }
            if (this.menulist[s].menus == 'Visitor Request') {
              this.visitorrequest = 1;
            }
            if (this.menulist[s].menus == 'Profile') {
              this.profile = 1;
            }

            if (this.menulist[s].menus == 'My Project') {
              this.myproject = 1;
              debugger
            }
            if (this.menulist[s].menus == 'My Details') {
              this.mydetails = 1;
              debugger
            }
            if (this.menulist[s].menus == 'My Attendence') {
              this.myattendence = 1;
              debugger
            }

            if (this.menulist[s].menus == 'Expences') {
              this.expenses = 1;
              debugger
            }
            if (this.menulist[s].menus == 'Task') {
              this.task = 1;
              debugger
            }

            if (this.menulist[s].subMenuName == 'Staff Management') {
              this.staffmanagement = 1;
            }
            if (this.menulist[s].subMenuName == 'Payroll') {
              this.payroll = 1;
            }
            if (this.menulist[s].subMenuName == 'My Leave') {
              this.myleave = 1;
            }
            if (this.menulist[s].subMenuName == 'My Staff Leave') {
              this.mystaffleave = 1;
            }
            if (this.menulist[s].subMenuName == 'Approved Leave') {
              this.approvedleave = 1;
            }
            if (this.menulist[s].subMenuName == 'Rejected Leave') {
              this.rejectedleave = 1;
            }

            if (this.menulist[s].subMenuName == 'Applied Staff Leave') {
              this.appliedstaffleave = 1;
            }
            if (this.menulist[s].subMenuName == 'Approved Staff Leave') {
              this.approvedstaffleave = 1;
            }
            if (this.menulist[s].subMenuName == 'Rejected Staff Leave') {
              this.rejectedstaffleave = 1;
            }

            if (this.menulist[s].subMenuName == 'Upcoming Announcements') {
              this.upcomingannounsements = 1;
            }

            if (this.menulist[s].subMenuName == 'Completed Announcements') {
              this.completedannounsements = 1;
            }



            if (this.menulist[s].subMenuName == 'My Appraisal') {
              this.myappraisal = 1;
            }

            if (this.menulist[s].subMenuName == 'Staff Appraisal') {
              this.staffappraisal = 1;
            }
            if (this.menulist[s].subMenuName == 'Staff Appraisal Reports') {
              this.staffappraisalreports = 1;
            }



            if (this.menulist[s].subMenuName == 'Assigned Assets') {
              this.assignedassets = 1;
            }
            if (this.menulist[s].subMenuName == 'Genaral Asset') {
              this.genaralassets = 1;
            }
            if (this.menulist[s].subMenuName == 'Holiday List') {
              this.holidaylist = 1;
            }
            if (this.menulist[s].subMenuName == 'Leave Type') {
              this.leavetype = 1;
            }
            if (this.menulist[s].subMenuName == 'Project List') {
              this.projectslst = 1;
            }
            if (this.menulist[s].subMenuName == 'Designation Type') {
              this.designationtype = 1;
            }
            if (this.menulist[s].subMenuName == 'Department Master') {
              this.departmentmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Late Punchin') {
              this.latepunchin = 1;
            }
            if (this.menulist[s].subMenuName == 'Appraisal Cycle') {
              this.appraisalcycle = 1;
            }
            if (this.menulist[s].subMenuName == 'Key Result Area') {
              this.keyresultarea = 1;
            }
            if (this.menulist[s].subMenuName == 'KPI') {
              this.kpi = 1;
            }
            if (this.menulist[s].subMenuName == 'Employe KRA Mapping') {
              this.employeekramapping = 1;
            }
            if (this.menulist[s].subMenuName == 'Job Recruitements') {
              this.jobrecruitmentsss = 1;
            }
            if (this.menulist[s].subMenuName == 'Applied Candidates') {
              this.appliedcandidates = 1;
            }
            if (this.menulist[s].subMenuName == 'Shortlisted Candidates') {
              this.shortlistedcandidates = 1;
            }
            if (this.menulist[s].subMenuName == 'Selected Candidates') {
              this.selectedcandidates = 1;
            }
            if (this.menulist[s].subMenuName == 'Offered Candidates') {
              this.offeredcandidates = 1;
            }
            if (this.menulist[s].subMenuName == 'Joined Candidates') {
              this.joinedcandidates = 1;
            }
            if (this.menulist[s].subMenuName == 'Dropped Candidates') {
              this.droppedcandidates = 1;
            }
            if (this.menulist[s].subMenuName == 'Upcoming Events') {
              this.upcomingevents = 1;
            }
            if (this.menulist[s].subMenuName == 'Completed Events') {
              this.completedevents = 1;
            }
            if (this.menulist[s].subMenuName == 'Create Chat Group') {
              this.createchatgrououp = 1;
            }
            if (this.menulist[s].subMenuName == 'Approve Chat Group') {
              this.approvechatgroup = 1;
            }
            if (this.menulist[s].subMenuName == 'View Chat Group') {
              this.viewchatgroup = 1;
            }
            if (this.menulist[s].subMenuName == 'My Project') {
              this.myproject = 1;
              debugger
            }
            if (this.menulist[s].subMenuName == 'My Details') {
              this.mydetails = 1;
              debugger
            }
            if (this.menulist[s].subMenuName == 'My Attendence') {
              this.myattendence = 1;
              debugger
            }
            if (this.menulist[s].subMenuName == 'Leaves') {
              this.leaves = 1;
            }
            if (this.menulist[s].subMenuName == 'Scheduled Interviews') {
              this.scheduledintervies = 1;
              debugger
            }
            if (this.menulist[s].subMenuName == 'Calender') {
              this.calender = 1;
            }

            if (this.menulist[s].subMenuName == 'My Expense') {
              this.myexpence = 1;
            }
            if (this.menulist[s].subMenuName == 'Company Expense') {
              this.companyexpense = 1;
            }

            if (this.menulist[s].subMenuName == 'Staff Expense') {
              this.staffexpense = 1;
            }

            if (this.menulist[s].subMenuName == 'Inventory Purchase Details') {
              this.inventorypurchase = 1;
            }
            if (this.menulist[s].subMenuName == 'Team Raised Expense') {
              this.teamraisedexpnce = 1;
            }
            if (this.menulist[s].subMenuName == 'Team Approved Expense') {
              this.teamapprovedexpense = 1;
            }
            if (this.menulist[s].subMenuName == 'Team Rejected Expense') {
              this.teamrejectedexpense = 1;
            }

            if (this.menulist[s].subMenuName == 'Project List') {
              this.projectlist = 1;
            }

            if (this.menulist[s].subMenuName == 'Assigned Task') {
              this.assignedtask = 1;
            }
            if (this.menulist[s].subMenuName == 'Completed Task') {
              this.completedtask = 1;
            }
            if (this.menulist[s].subMenuName == 'Work Place Request') {
              this.workplacerequest = 1;
            }
          }

        })
    }
  }
























  public openCity(evt) {
    var i, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
  }
}
