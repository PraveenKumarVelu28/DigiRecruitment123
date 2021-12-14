import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppComponent } from './app.component';
import { StaffAttendanceComponent } from './Pages/Staff/staff-attendance/staff-attendance.component';
import { StaffLeaveComponent } from './Pages/Staff/staff-leave/staff-leave.component';
import { LoginComponent } from './Pages/login/login.component';
import { SidebarComponent } from './Pages/sidebar/sidebar.component';
import { HomeComponent } from './Pages/home/home.component';
import { TravelRequestComponent } from './Pages/Staff/travel-request/travel-request.component';
import { WorkPlaceRequestComponent } from './Pages/Staff/work-place-request/work-place-request.component';
import { FeedbackComponent } from './Pages/Staff/feedback/feedback.component';
import { ExpensesComponent } from './Pages/Staff/expenses/expenses.component';
import { LeaveRequestsComponent } from './Pages/Staff/leave-requests/leave-requests.component';
import { TimeSheetsComponent } from './Pages/Staff/time-sheets/time-sheets.component';
import { StaffDashbaordComponent } from './Pages/Manager/MyTeam/staff-dashbaord/staff-dashbaord.component';
import { StaffLeaveDashboardComponent } from './Pages/Manager/MyTeam/staff-leave-dashboard/staff-leave-dashboard.component';
import { LocatorDashboardComponent } from './Pages/Manager/MyTeam/locator-dashboard/locator-dashboard.component';
import { NewStaffLeaveComponent } from './Pages/Manager/MyTeam/new-staff-leave/new-staff-leave.component';
import { LocatorComponent } from './Pages/Manager/MyTeam/locator/locator.component';
import { MasterTypeDashboardComponent } from './Pages/Manager/Masters/master-type-dashboard/master-type-dashboard.component';
import { ExpenseTypeDashboardComponent } from './Pages/Manager/Masters/expense-type-dashboard/expense-type-dashboard.component';
import { ExpenseTypeComponent } from './Pages/Manager/Masters/expense-type/expense-type.component';
import { LeaveTypeComponent } from './Pages/Manager/Masters/leave-type/leave-type.component';
import { LeaveTypeDashboardComponent } from './Pages/Manager/Masters/leave-type-dashboard/leave-type-dashboard.component';
import { VisitorParkingDashboardComponent } from './Pages/Manager/Visitor/visitor-parking-dashboard/visitor-parking-dashboard.component';
import { VisitorDashboardComponent } from './Pages/Manager/Visitor/visitor-dashboard/visitor-dashboard.component';
import { NewVisitorComponent } from './Pages/Manager/Visitor/new-visitor/new-visitor.component';
import { GroupsApproveDashboardComponent } from './Pages/Manager/Communication/groups-approve-dashboard/groups-approve-dashboard.component';
//import { GroupDashboardComponent } from './Pages/Manager/Communication/group-dashboard/group-dashboard.component';
import { AddgroupComponent } from './Pages/Manager/Communication/addgroup/addgroup.component';
import { AddTravelRequestComponent } from './Pages/Staff/add-travel-request/add-travel-request.component';
import { AddWorkPlaceRequestComponent } from './Pages/Staff/add-work-place-request/add-work-place-request.component';
import { AddFeedbackComponent } from './Pages/Staff/add-feedback/add-feedback.component';
import { AddLocatorRequestComponent } from './Pages/Staff/add-locator-request/add-locator-request.component';
import { ExpensesRequestComponent } from './Pages/Staff/expenses-request/expenses-request.component';
import { LoginDashboardComponent } from './Pages/Staff/login-dashboard/login-dashboard.component';
import { TravelRequestForManagerComponent } from './Pages/Manager/MyTeam/travel-request-for-manager/travel-request-for-manager.component';
import { WorkSpaceDashboardForManagerComponent } from './Pages/Manager/MyTeam/work-space-dashboard-for-manager/work-space-dashboard-for-manager.component';
import { LocatorRequestsComponent } from './Pages/Staff/locator-requests/locator-requests.component';
import { StaffexpensesdashboardComponent } from './Pages/Manager/MyTeam/staffexpensesdashboard/staffexpensesdashboard.component';
import { AllStaffLeavesDashboradComponent } from './Pages/Manager/all-staff-leaves-dashborad/all-staff-leaves-dashborad.component';
import { ComplaintDashboardComponent } from './Pages/Manager/complaint-dashboard/complaint-dashboard.component';
import { AllStaffDashboardComponent } from './Pages/Manager/all-staff-dashboard/all-staff-dashboard.component';
import { AllStaffAttendanceDashboardComponent } from './Pages/Manager/all-staff-attendance-dashboard/all-staff-attendance-dashboard.component';
import { StaffLeaveDetailsDashboardComponent } from './Pages/Manager/Masters/staff-leave-details-dashboard/staff-leave-details-dashboard.component';
import { ProjectIDTypeDashboardComponent } from './Pages/Manager/Masters/project-idtype-dashboard/project-idtype-dashboard.component';
import { AllStaffLocatorRequestsDashboardComponent } from './Pages/Manager/all-staff-locator-requests-dashboard/all-staff-locator-requests-dashboard.component';
import { AnnouncementsDashboardComponent } from './Pages/Manager/announcements-dashboard/announcements-dashboard.component';
import { ViewGroupComponent } from './Pages/Manager/Communication/view-group/view-group.component';
import { NewStaffComponent } from './Pages/Manager/new-staff/new-staff.component';
import { UserDashboardComponent } from './Pages/Manager/user-dashboard/user-dashboard.component';
import { NewUserComponent } from './Pages/Manager/new-user/new-user.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ProjectTypeIDComponent } from './Pages/Manager/Masters/project-type-id/project-type-id.component';
import { WorkPlaceAllocationComponent } from './Pages/Manager/work-place-allocation/work-place-allocation.component';
import { WorkSpaceAllocationDashboardComponent } from './Pages/Manager/work-space-allocation-dashboard/work-space-allocation-dashboard.component';
import { ExpensesDashboardHRComponent } from './Pages/Manager/expenses-dashboard-hr/expenses-dashboard-hr.component';
import { UnApprovedExpensesDashboardComponent } from './Pages/Manager/un-approved-expenses-dashboard/un-approved-expenses-dashboard.component';
import { LeaveReportDashboardComponent } from './Pages/Manager/leave-report-dashboard/leave-report-dashboard.component';
import { AllStaffExpencesDashComponent } from './Pages/Manager/all-staff-expences-dash/all-staff-expences-dash.component';
import { AllStaffExpensesComponent } from './Pages/Manager/all-staff-expenses/all-staff-expenses.component';
import { NewAnnouncementsComponent } from './Pages/Manager/new-announcements/new-announcements.component';
import { DatePipe } from '@angular/common';
import { EventsComponent } from './Pages/Staff/events/events.component';
import { EventsDashboardComponent } from './Pages/Staff/events-dashboard/events-dashboard.component';
import { BorrowingsComponent } from './Pages/Staff/borrowings/borrowings.component';
import { BorrowingsDashboardComponent } from './Pages/Staff/borrowings-dashboard/borrowings-dashboard.component';
import { StaffLookupComponent } from './Pages/Staff/staff-lookup/staff-lookup.component';
import { TechnologyRequestComponent } from './Pages/Staff/technology-request/technology-request.component';
import { TechnologyRequestDashboardComponent } from './Pages/Staff/technology-request-dashboard/technology-request-dashboard.component';
import { TransportRequestDashboardComponent } from './Pages/Staff/transport-request-dashboard/transport-request-dashboard.component';
import { VisitorRequestComponent } from './Pages/Staff/visitor-request/visitor-request.component';
import { VisitorRequestDashboardComponent } from './Pages/Staff/visitor-request-dashboard/visitor-request-dashboard.component';
import { StaffLookUpDashboardComponent } from './Pages/Staff/staff-look-up-dashboard/staff-look-up-dashboard.component';
import { AssetsDashboardComponent } from './Pages/Staff/assets-dashboard/assets-dashboard.component';
import { AssetsComponent } from './Pages/Staff/assets/assets.component';
import { TransportRequestComponent } from './Pages/Staff/transport-request/transport-request.component';
import { RequestedAssetsDashboardComponent } from './Pages/Admin/requested-assets-dashboard/requested-assets-dashboard.component';
import { RequestBorrowerDashboardComponent } from './Pages/Admin/request-borrower-dashboard/request-borrower-dashboard.component';
import { VisitorRequestForAdminComponent } from './Pages/Admin/visitor-request-for-admin/visitor-request-for-admin.component';
import { TransportRequestForAdminComponent } from './Pages/Admin/transport-request-for-admin/transport-request-for-admin.component';
import { RegisteredEventsComponent } from './Pages/Admin/registered-events/registered-events.component';
import { ChatMasterComponent } from './Pages/Staff/chat-master/chat-master.component';
import { AppliedStaffLeaveDashboardComponent } from './Pages/Manager/MyTeam/applied-staff-leave-dashboard/applied-staff-leave-dashboard.component';
import { RejectedStaffLeaveDashboardComponent } from './Pages/Manager/MyTeam/rejected-staff-leave-dashboard/rejected-staff-leave-dashboard.component';
import { ApprovedStaffExpenseForManagerDashbaordComponent } from './Pages/Manager/approved-staff-expense-for-manager-dashbaord/approved-staff-expense-for-manager-dashbaord.component';
import { RejectedStaffExpenseForManagerDashboardComponent } from './Pages/Manager/rejected-staff-expense-for-manager-dashboard/rejected-staff-expense-for-manager-dashboard.component';
import { AppliedStaffLeaveDashboardForReceptionistComponent } from './Pages/Admin/applied-staff-leave-dashboard-for-receptionist/applied-staff-leave-dashboard-for-receptionist.component';
import { ApprovedStaffLeaveDashboardForReceptionistComponent } from './Pages/Admin/approved-staff-leave-dashboard-for-receptionist/approved-staff-leave-dashboard-for-receptionist.component';
import { RejectedStaffLeaveDashboardForReceptionistComponent } from './Pages/Admin/rejected-staff-leave-dashboard-for-receptionist/rejected-staff-leave-dashboard-for-receptionist.component';
import { ApprovedStaffExpenseForAdminDashbaordComponent } from './Pages/Admin/approved-staff-expense-for-admin-dashbaord/approved-staff-expense-for-admin-dashbaord.component';
import { RejectedStaffExpenseForAdminDashboardComponent } from './Pages/Admin/rejected-staff-expense-for-admin-dashboard/rejected-staff-expense-for-admin-dashboard.component';
import { RaisedStaffExpenseForAdminDashboardComponent } from './Pages/Admin/raised-staff-expense-for-admin-dashboard/raised-staff-expense-for-admin-dashboard.component';
import { ApprovedLocatorRequestForAdminComponent } from './Pages/Admin/approved-locator-request-for-admin/approved-locator-request-for-admin.component';
import { LocatorRequestDashboardComponent } from './Pages/Admin/locator-request-dashboard/locator-request-dashboard.component';
import { RejectedLocatorRequestForAdminComponent } from './Pages/Admin/rejected-locator-request-for-admin/rejected-locator-request-for-admin.component';
import { GroupChatComponent } from './Pages/Manager/Communication/group-chat/group-chat.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RaisedTransportRequestForReceptionistComponent } from './Pages/Admin/raised-transport-request-for-receptionist/raised-transport-request-for-receptionist.component';
import { BookedTransportRequestForReceptionistComponent } from './Pages/Admin/booked-transport-request-for-receptionist/booked-transport-request-for-receptionist.component';
import { CompletedTransportRequestForReceptionistComponent } from './Pages/Admin/completed-transport-request-for-receptionist/completed-transport-request-for-receptionist.component';
import { CancelledTransportRequestForReceptionistComponent } from './Pages/Admin/cancelled-transport-request-for-receptionist/cancelled-transport-request-for-receptionist.component';
import { MyStaffDashboardComponent } from './Pages/Manager/MyTeam/my-staff-dashboard/my-staff-dashboard.component';
import { ManagerLeaveDashboardComponent } from './Pages/Manager/MyTeam/manager-leave-dashboard/manager-leave-dashboard.component';
import { ManagerStaffAttendanceDashboardComponent } from './Pages/Manager/manager-staff-attendance-dashboard/manager-staff-attendance-dashboard.component';
import { ManagerLocatorDashboardComponent } from './Pages/Manager/manager-locator-dashboard/manager-locator-dashboard.component';
import { RejectLocatorDashboardForManagerComponent } from './Pages/Manager/MyTeam/reject-locator-dashboard-for-manager/reject-locator-dashboard-for-manager.component';
import { TeamLocatorDashboardForManagerComponent } from './Pages/Manager/MyTeam/team-locator-dashboard-for-manager/team-locator-dashboard-for-manager.component';
import { ChatForStaffComponent } from './Pages/Manager/Communication/chat-for-staff/chat-for-staff.component';
import { AnnouncementsDashboardForHRComponent } from './Pages/Staff/announcements-dashboard-for-hr/announcements-dashboard-for-hr.component';
import { ManagerExpenseDashboardComponent } from './Pages/Manager/manager-expense-dashboard/manager-expense-dashboard.component';
import { RasiedExpenseForManagerDashboardComponent } from './Pages/Manager/rasied-expense-for-manager-dashboard/rasied-expense-for-manager-dashboard.component';
import { UpcomingAnnouncementsDashboardForHrComponent } from './Pages/Manager/upcoming-announcements-dashboard-for-hr/upcoming-announcements-dashboard-for-hr.component';
import { HRLeaveDashboardComponent } from './Pages/Manager/hrleave-dashboard/hrleave-dashboard.component';
import { UpComingEventsDashboardForHRComponent } from './Pages/Staff/up-coming-events-dashboard-for-hr/up-coming-events-dashboard-for-hr.component';
import { AddAssetsComponent } from './Pages/Staff/add-assets/add-assets.component';
import { UpcomingAnnouncementsDashboardForFinanceComponent } from './Pages/Manager/MyTeam/upcoming-announcements-dashboard-for-finance/upcoming-announcements-dashboard-for-finance.component';
import { UpComingEventsDashboardForFinanceComponent } from './Pages/Staff/up-coming-events-dashboard-for-finance/up-coming-events-dashboard-for-finance.component';
import { ExpensesDashboardForFinanceComponent } from './Pages/Manager/expenses-dashboard-for-finance/expenses-dashboard-for-finance.component';
import { UpcomingAnnouncementsDashboardForManagerComponent } from './Pages/Manager/upcoming-announcements-dashboard-for-manager/upcoming-announcements-dashboard-for-manager.component';
import { UpComingEventsDashboardForManagerComponent } from './Pages/Manager/up-coming-events-dashboard-for-manager/up-coming-events-dashboard-for-manager.component';
import { AddLocatorByStaffComponent } from './Pages/Staff/add-locator-by-staff/add-locator-by-staff.component';
import { ManagerLeaveComponent } from './Pages/Manager/Masters/manager-leave/manager-leave.component';
import { NewFeedbackByStaffComponent } from './Pages/Staff/new-feedback-by-staff/new-feedback-by-staff.component';
import { AppliedStaffLeaveDashboardForHRComponent } from './Pages/Manager/MyTeam/applied-staff-leave-dashboard-for-hr/applied-staff-leave-dashboard-for-hr.component';
import { HRLeaveComponent } from './Pages/Staff/hrleave/hrleave.component';
import { AppliedHRStaffLeaveComponent } from './Pages/Staff/applied-hrstaff-leave/applied-hrstaff-leave.component';
import { HRAssetsDashboardComponent } from './Pages/Staff/hrassets-dashboard/hrassets-dashboard.component';
import { AddAssetsByHRComponent } from './Pages/Staff/add-assets-by-hr/add-assets-by-hr.component';
import { BorrowingsDashboardForStaffComponent } from './Pages/Staff/borrowings-dashboard-for-staff/borrowings-dashboard-for-staff.component';
import { BorrowingsBYStaffComponent } from './Pages/Staff/borrowings-bystaff/borrowings-bystaff.component';
import { BorrowingsDashboardForHRComponent } from './Pages/Staff/borrowings-dashboard-for-hr/borrowings-dashboard-for-hr.component';
import { BorrowingsBYHRComponent } from './Pages/Staff/borrowings-byhr/borrowings-byhr.component';
import { ApprovedHRStaffLeaveDashboardComponent } from './Pages/Staff/approved-hrstaff-leave-dashboard/approved-hrstaff-leave-dashboard.component';
import { RejectedHRStaffLeaveDashboardComponent } from './Pages/Staff/rejected-hrstaff-leave-dashboard/rejected-hrstaff-leave-dashboard.component';
import { RasiedExpenseForFinanceDashboardComponent } from './Pages/Staff/rasied-expense-for-finance-dashboard/rasied-expense-for-finance-dashboard.component';
import { ApprovedStaffExpenseForFinanceDashbaordComponent } from './Pages/Staff/approved-staff-expense-for-finance-dashbaord/approved-staff-expense-for-finance-dashbaord.component';
import { RejectedStaffExpenseForFinanceDashboardComponent } from './Pages/Staff/rejected-staff-expense-for-finance-dashboard/rejected-staff-expense-for-finance-dashboard.component';
import { FinanceLeaveComponent } from './Pages/Staff/finance-leave/finance-leave.component';
import { FinanceLeaveDashboardComponent } from './Pages/Staff/finance-leave-dashboard/finance-leave-dashboard.component';
import { AppliedStaffLeaveDashboardForFinanceComponent } from './Pages/Staff/applied-staff-leave-dashboard-for-finance/applied-staff-leave-dashboard-for-finance.component';
import { ApprovedStaffLeaveDashboardForFinanceComponent } from './Pages/Staff/approved-staff-leave-dashboard-for-finance/approved-staff-leave-dashboard-for-finance.component';
import { RejectedStaffLeaveDashboardForFinanceComponent } from './Pages/Staff/rejected-staff-leave-dashboard-for-finance/rejected-staff-leave-dashboard-for-finance.component';
import { AllStaffLeaveForAdminComponent } from './Pages/Staff/all-staff-leave-for-admin/all-staff-leave-for-admin.component';
import { AllExpenseForAdminComponent } from './Pages/Staff/all-expense-for-admin/all-expense-for-admin.component';
import { AllAssetsForAdminComponent } from './Pages/Staff/all-assets-for-admin/all-assets-for-admin.component';
import { AllStaffForAdminComponent } from './Pages/Staff/all-staff-for-admin/all-staff-for-admin.component';
import { AllLocatorDashboardForAdminComponent } from './Pages/Staff/all-locator-dashboard-for-admin/all-locator-dashboard-for-admin.component';
import { NewVendorComponent } from './Pages/Staff/new-vendor/new-vendor.component';
import { VendorDashboardComponent } from './Pages/Staff/vendor-dashboard/vendor-dashboard.component';
import { WorkPlaceRequestForAdminComponent } from './Pages/Staff/work-place-request-for-admin/work-place-request-for-admin.component';
import { AttendanceDashboardForAdminComponent } from './Pages/Staff/attendance-dashboard-for-admin/attendance-dashboard-for-admin.component';
import { UpcomingEventsDashboardForAdminComponent } from './Pages/Staff/upcoming-events-dashboard-for-admin/upcoming-events-dashboard-for-admin.component';
import { CompletedEventsDashboardForAdminComponent } from './Pages/Staff/completed-events-dashboard-for-admin/completed-events-dashboard-for-admin.component';
import { UpcomingAnnouncementsDashboardForAdminComponent } from './Pages/Staff/upcoming-announcements-dashboard-for-admin/upcoming-announcements-dashboard-for-admin.component';
import { CompletedAnnouncementsDashboardForAdminComponent } from './Pages/Staff/completed-announcements-dashboard-for-admin/completed-announcements-dashboard-for-admin.component';
import { ProjectListForAdminComponent } from './Pages/Staff/project-list-for-admin/project-list-for-admin.component';
import { JoingGroupChatForAdminComponent } from './Pages/Staff/joing-group-chat-for-admin/joing-group-chat-for-admin.component';
import { GroupChatForAdminComponent } from './Pages/Staff/group-chat-for-admin/group-chat-for-admin.component';
import { UpcomingAnnouncementsDashboardForStaffComponent } from './Pages/Staff/upcoming-announcements-dashboard-for-staff/upcoming-announcements-dashboard-for-staff.component';
import { UpcomingAnnouncementsDashboardForReceptionistComponent } from './Pages/Staff/upcoming-announcements-dashboard-for-receptionist/upcoming-announcements-dashboard-for-receptionist.component';
import { LocatorDashboardForAdminComponent } from './Pages/Staff/locator-dashboard-for-admin/locator-dashboard-for-admin.component';
import { AllRaisedExpenseComponent } from './Pages/Staff/all-raised-expense/all-raised-expense.component';
import { ExpensesRequestByManagerComponent } from './Pages/Manager/expenses-request-by-manager/expenses-request-by-manager.component';
import { ExpensesRequestByFinanceComponent } from './Pages/Staff/expenses-request-by-finance/expenses-request-by-finance.component';
import { StaffManagementDashboardFoReceptionistComponent } from './Pages/Staff/staff-management-dashboard-fo-receptionist/staff-management-dashboard-fo-receptionist.component';
import { AllStaffLeaveFoReceptionistComponent } from './Pages/Staff/all-staff-leave-fo-receptionist/all-staff-leave-fo-receptionist.component';
import { AllLocatorDashboardForReceptionistComponent } from './Pages/Staff/all-locator-dashboard-for-receptionist/all-locator-dashboard-for-receptionist.component';
import { AllExpenseForReceptionistComponent } from './Pages/Staff/all-expense-for-receptionist/all-expense-for-receptionist.component';
import { FeedbackDahsboardForReceptionistComponent } from './Pages/Staff/feedback-dahsboard-for-receptionist/feedback-dahsboard-for-receptionist.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserDashboardForFinanceComponent } from './Pages/Staff/user-dashboard-for-finance/user-dashboard-for-finance.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgxTimeSchedulerModule} from 'ngx-time-scheduler';
import { EventDashboardForReceptionistComponent } from './Pages/Staff/event-dashboard-for-receptionist/event-dashboard-for-receptionist.component';
import { ResignedStaffComponent } from './Pages/Staff/resigned-staff/resigned-staff.component';
import { CheckedStaffExpenseComponent } from './Pages/Staff/checked-staff-expense/checked-staff-expense.component';
import { AllLocatorDashboardForFinanceComponent } from './Pages/Staff/all-locator-dashboard-for-finance/all-locator-dashboard-for-finance.component';
import { AllStaffLeaveForFinanceComponent } from './Pages/Staff/all-staff-leave-for-finance/all-staff-leave-for-finance.component';
import { NewProjectComponent } from './Pages/Staff/new-project/new-project.component';
import { NewDesignationComponent } from './Pages/Staff/new-designation/new-designation.component';
import { DesignationDashboardComponent } from './Pages/Staff/designation-dashboard/designation-dashboard.component';
import { HolidayListComponent } from './Pages/Manager/Masters/holiday-list/holiday-list.component';
import { HolidayListDashboardComponent } from './Pages/Manager/Masters/holiday-list-dashboard/holiday-list-dashboard.component';
import { HRProfileComponent } from './Pages/Staff/hrprofile/hrprofile.component';
import { ProjectListComponent } from './Pages/Manager/Masters/project-list/project-list.component';
import { ProjectListDashboardComponent } from './Pages/Manager/Masters/project-list-dashboard/project-list-dashboard.component';
import { AssetsMasterComponent } from './Pages/Manager/Masters/assets-master/assets-master.component';
import { AssetDashboardComponent } from './Pages/Manager/Masters/asset-dashboard/asset-dashboard.component';
import { GeneralAssetComponent } from './Pages/Manager/Masters/general-asset/general-asset.component';

import { GeneralAssetsDashboardComponent } from './Pages/Manager/Masters/general-assets-dashboard/general-assets-dashboard.component';
import { VisitorRequestForManagerComponent } from './Pages/Staff/visitor-request-for-manager/visitor-request-for-manager.component';
import { VisitorRequestDashboardForManagerComponent } from './Pages/Staff/visitor-request-dashboard-for-manager/visitor-request-dashboard-for-manager.component';
import { AddTimeSheetComponent } from './Pages/Staff/add-time-sheet/add-time-sheet.component';
import { CompanyExpenseForAdminComponent } from './Pages/Staff/company-expense-for-admin/company-expense-for-admin.component';
import { AllVisitorRequestforAdminComponent } from './Pages/Staff/all-visitor-requestfor-admin/all-visitor-requestfor-admin.component';
import { AdminStaffLeaveComponent } from './Pages/Staff/admin-staff-leave/admin-staff-leave.component';
import { HomeDashboardForAdminComponent } from './Pages/Admin/home-dashboard-for-admin/home-dashboard-for-admin.component';
import { GeneralAssetTypeIDComponent } from './Pages/Staff/general-asset-type-id/general-asset-type-id.component';
import { AddInventoryComponent } from './Pages/Staff/add-inventory/add-inventory.component';
import { InventoryDashboardComponent } from './Pages/Staff/inventory-dashboard/inventory-dashboard.component';
import { CEOProfileComponent } from './Pages/Manager/ceoprofile/ceoprofile.component';
import { TimeSheetsForHrComponent } from './Pages/Staff/time-sheets-for-hr/time-sheets-for-hr.component';
import { AddTimeSheetForHRComponent } from './Pages/Staff/add-time-sheet-for-hr/add-time-sheet-for-hr.component';
import { TimeSheetsForManagerComponent } from './Pages/Staff/time-sheets-for-manager/time-sheets-for-manager.component';
import { AddTimeSheetsForManagerComponent } from './Pages/Staff/add-time-sheets-for-manager/add-time-sheets-for-manager.component';
import { TimeSheetsForCEOComponent } from './Pages/Staff/time-sheets-for-ceo/time-sheets-for-ceo.component';
import { TimeSheetForFinanceComponent } from './Pages/Staff/time-sheet-for-finance/time-sheet-for-finance.component';
import { InventoryNamePurchaseDetailsComponent } from './Pages/Staff/inventory-name-purchase-details/inventory-name-purchase-details.component';
import { InventoryNamePurchaseDetailsDashboardComponent } from './Pages/Staff/inventory-name-purchase-details-dashboard/inventory-name-purchase-details-dashboard.component';
import { InventoryItemsComponent } from './Pages/Staff/inventory-items/inventory-items.component';
import { InventoryItemDashboardComponent } from './Pages/Staff/inventory-item-dashboard/inventory-item-dashboard.component';
import { AssignedTaskByManagerComponent } from './Pages/Manager/MyTeam/assigned-task-by-manager/assigned-task-by-manager.component';
import { AssignedTaskDashboardComponent } from './Pages/Manager/MyTeam/assigned-task-dashboard/assigned-task-dashboard.component';
import { CompletedTaskDashboardComponent } from './Pages/Manager/MyTeam/completed-task-dashboard/completed-task-dashboard.component';
import { AccountsExpenseDashboardComponent } from './Pages/Staff/accounts-expense-dashboard/accounts-expense-dashboard.component';
import { AccountsExpenseComponent } from './Pages/Staff/accounts-expense/accounts-expense.component';
import { AssignedTaskForTLDashboardComponent } from './Pages/Staff/assigned-task-for-tldashboard/assigned-task-for-tldashboard.component';
import { AssignedTaskByCEOComponent } from './Pages/Staff/assigned-task-by-ceo/assigned-task-by-ceo.component';
import { CompletedTaskForTlDashboardComponent } from './Pages/Staff/completed-task-for-tl-dashboard/completed-task-for-tl-dashboard.component';
import { AllStaffApprovedLeaveComponent } from './Pages/Staff/all-staff-approved-leave/all-staff-approved-leave.component';
import { AllStaffRejectLeaveComponent } from './Pages/Staff/all-staff-reject-leave/all-staff-reject-leave.component';
import { StaffProjectMappingComponent } from './Pages/Staff/staff-project-mapping/staff-project-mapping.component';
import { StaffProjectMappingDashboardComponent } from './Pages/Staff/staff-project-mapping-dashboard/staff-project-mapping-dashboard.component';
import { ResignedStaffDashboardForHrComponent } from './Pages/Staff/resigned-staff-dashboard-for-hr/resigned-staff-dashboard-for-hr.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StaffPayRollComponent } from './Pages/Staff/staff-pay-roll/staff-pay-roll.component';
import { DepartmentMasterDashboardComponent } from './Pages/Manager/Masters/department-master-dashboard/department-master-dashboard.component';
import { NewDepartmentMasterComponent } from './Pages/Manager/Masters/new-department-master/new-department-master.component';
import { LateAttendanceDashboardComponent } from './Pages/Staff/late-attendance-dashboard/late-attendance-dashboard.component';
import { LatePunchInDashbaordComponent } from './Pages/Staff/late-punch-in-dashbaord/late-punch-in-dashbaord.component';
import { LatePunchInComponent } from './Pages/Staff/late-punch-in/late-punch-in.component';
import { MyprojectsComponent } from './Pages/Staff/myprojects/myprojects.component';
import { LateAttendancePunchOutDashboardComponent } from './Pages/Staff/late-attendance-punch-out-dashboard/late-attendance-punch-out-dashboard.component';
import { PayrollreportsComponent } from './Pages/Staff/payrollreports/payrollreports.component';
import { WorkPlaceRequestCompletedComponent } from './Pages/Staff/work-place-request-completed/work-place-request-completed.component';
import { KeyResultAreaComponent } from './Pages/Staff/key-result-area/key-result-area.component';
import { KeyResultAreaDashboardComponent } from './Pages/Staff/key-result-area-dashboard/key-result-area-dashboard.component';
import { AppraisalCycleComponent } from './Pages/Staff/appraisal-cycle/appraisal-cycle.component';
import { PerformanceIndicatorComponent } from './Pages/Staff/performance-indicator/performance-indicator.component';
import { PerformanceIndicatorDashboardComponent } from './Pages/Staff/performance-indicator-dashboard/performance-indicator-dashboard.component';
import { AppraisalCycleDashboardComponent } from './Pages/Staff/appraisal-cycle-dashboard/appraisal-cycle-dashboard.component';
import { Approver1ratingComponent } from './Pages/Staff/approver1rating/approver1rating.component';
import { Approver1ratingdashboardComponent } from './Pages/Staff/approver1ratingdashboard/approver1ratingdashboard.component';
import { EmployeekramappingComponent } from './Pages/Staff/employeekramapping/employeekramapping.component';
import { EmployeekramappingdashboardComponent } from './Pages/Staff/employeekramappingdashboard/employeekramappingdashboard.component';
import { SelfRatingDashComponent } from './Pages/Staff/self-rating-dash/self-rating-dash.component';
import { SelfRatingPageComponent } from './Pages/Staff/self-rating-page/self-rating-page.component';
import { Approver2ratingpageComponent } from './Pages/Staff/approver2ratingpage/approver2ratingpage.component';
import { Approver2ratingpagedashboardComponent } from './Pages/Staff/approver2ratingpagedashboard/approver2ratingpagedashboard.component';
import { Approver3ratingpageComponent } from './Pages/Staff/approver3ratingpage/approver3ratingpage.component';
import { Approver3ratingpagedashboardComponent } from './Pages/Staff/approver3ratingpagedashboard/approver3ratingpagedashboard.component';
import { StaffScoreReportComponent } from './Pages/Staff/staff-score-report/staff-score-report.component';
import { StaffScoreFullDetailsComponent } from './Pages/Staff/staff-score-full-details/staff-score-full-details.component';
import { PostajobComponent } from './Pages/JobPostings/postajob/postajob.component';
import { PostajobdashComponent } from './Pages/JobPostings/postajobdash/postajobdash.component';
import { AppliendCandidatesComponent } from './Pages/JobPostings/appliend-candidates/appliend-candidates.component';
import { ShortlistedCandidatesComponent } from './Pages/JobPostings/shortlisted-candidates/shortlisted-candidates.component';
import { ScheduledInterviewsComponent } from './Pages/JobPostings/scheduled-interviews/scheduled-interviews.component';
import { SelectedCandidatesComponent } from './Pages/JobPostings/selected-candidates/selected-candidates.component';
import { OfferedCandidatesComponent } from './Pages/JobPostings/offered-candidates/offered-candidates.component';
import { ApplyJobsComponent } from './Pages/JobPostings/apply-jobs/apply-jobs.component';
import { JoinedCandidatesComponent } from './Pages/JobPostings/joined-candidates/joined-candidates.component';
import { DropedCandidatesComponent } from './Pages/JobPostings/droped-candidates/droped-candidates.component';
import { StaffCalenderComponent } from './Pages/JobPostings/staff-calender/staff-calender.component';
import { AppraisalReportsComponent } from './Pages/Staff/appraisal-reports/appraisal-reports.component';
import { RoleMenuMappingComponent } from './Pages/MenuMapping/role-menu-mapping/role-menu-mapping.component';
import { MenuMappingdashComponent } from './Pages/MenuMapping/menu-mappingdash/menu-mappingdash.component';


@NgModule({
  declarations:[
    AppComponent,
    StaffAttendanceComponent,
    StaffLeaveComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    TravelRequestComponent,
    WorkPlaceRequestComponent,
    FeedbackComponent,
    ExpensesComponent,
    LeaveRequestsComponent,

    TimeSheetsComponent,
    StaffDashbaordComponent,
    StaffLeaveDashboardComponent,
    LocatorDashboardComponent,
    NewStaffLeaveComponent,
    LocatorComponent,
    MasterTypeDashboardComponent,
    ExpenseTypeDashboardComponent,
    ExpenseTypeComponent,
    LeaveTypeComponent,
    LeaveTypeDashboardComponent,
    VisitorParkingDashboardComponent,
    VisitorDashboardComponent,
    NewVisitorComponent,
    GroupsApproveDashboardComponent,
    //GroupDashboardComponent,
    AddgroupComponent,
    AddTravelRequestComponent,
    AddWorkPlaceRequestComponent,
    AddFeedbackComponent,
    AddLocatorRequestComponent,
    ExpensesRequestComponent,
    LoginDashboardComponent,
    TravelRequestForManagerComponent,
    WorkSpaceDashboardForManagerComponent,
    LocatorRequestsComponent,
    StaffexpensesdashboardComponent,
    AllStaffLeavesDashboradComponent,
    ComplaintDashboardComponent,
    AllStaffDashboardComponent,
    AllStaffAttendanceDashboardComponent,
    StaffLeaveDetailsDashboardComponent,
    ProjectIDTypeDashboardComponent,
    AllStaffLocatorRequestsDashboardComponent,
    AnnouncementsDashboardComponent,
    ViewGroupComponent,
    NewStaffComponent,
    UserDashboardComponent,
    NewUserComponent,
    ProjectTypeIDComponent,
    WorkPlaceAllocationComponent,
    WorkSpaceAllocationDashboardComponent,
    ExpensesDashboardHRComponent,
    UnApprovedExpensesDashboardComponent,
    LeaveReportDashboardComponent,
    AllStaffExpencesDashComponent,
    AllStaffExpensesComponent,
    NewAnnouncementsComponent,
    EventsComponent,
    EventsDashboardComponent,
    BorrowingsComponent,
    BorrowingsDashboardComponent,
    StaffLookupComponent,
    TechnologyRequestComponent,
    TechnologyRequestDashboardComponent,
    TransportRequestDashboardComponent,
    VisitorRequestComponent,
    VisitorRequestDashboardComponent,
    StaffLookUpDashboardComponent,
    AssetsDashboardComponent,
    AssetsComponent,
    TransportRequestComponent,
    RequestedAssetsDashboardComponent,
    RequestBorrowerDashboardComponent,
    VisitorRequestForAdminComponent,
    TransportRequestForAdminComponent,
    RegisteredEventsComponent,
    ChatMasterComponent,
    AppliedStaffLeaveDashboardComponent,
    RejectedStaffLeaveDashboardComponent,
     
    ApprovedStaffExpenseForManagerDashbaordComponent,
    RejectedStaffExpenseForManagerDashboardComponent,
    AppliedStaffLeaveDashboardForReceptionistComponent,
    ApprovedStaffLeaveDashboardForReceptionistComponent,
    RejectedStaffLeaveDashboardForReceptionistComponent,
    ApprovedStaffExpenseForAdminDashbaordComponent,
    RejectedStaffExpenseForAdminDashboardComponent,
    RaisedStaffExpenseForAdminDashboardComponent,
    ApprovedLocatorRequestForAdminComponent,
    LocatorRequestDashboardComponent,
    RejectedLocatorRequestForAdminComponent,
    GroupChatComponent,
    RaisedTransportRequestForReceptionistComponent,
    BookedTransportRequestForReceptionistComponent,
    CompletedTransportRequestForReceptionistComponent,
    CancelledTransportRequestForReceptionistComponent,
    MyStaffDashboardComponent,
    ManagerLeaveDashboardComponent,
    ManagerStaffAttendanceDashboardComponent,
    ManagerLocatorDashboardComponent,
    RejectLocatorDashboardForManagerComponent,
    TeamLocatorDashboardForManagerComponent,
    ChatForStaffComponent,
    AnnouncementsDashboardForHRComponent,
    ManagerExpenseDashboardComponent,
    RasiedExpenseForManagerDashboardComponent,
    UpcomingAnnouncementsDashboardForHrComponent,
    HRLeaveDashboardComponent,
    UpComingEventsDashboardForHRComponent,
    AddAssetsComponent,
    UpcomingAnnouncementsDashboardForFinanceComponent,
    UpComingEventsDashboardForFinanceComponent,
    ExpensesDashboardForFinanceComponent,
    UpcomingAnnouncementsDashboardForManagerComponent,
    UpComingEventsDashboardForManagerComponent,
    AddLocatorByStaffComponent,
    ManagerLeaveComponent,
    NewFeedbackByStaffComponent,
    AppliedStaffLeaveDashboardForHRComponent,
    HRLeaveComponent,
    AppliedHRStaffLeaveComponent,
    HRAssetsDashboardComponent,
    AddAssetsByHRComponent,
    BorrowingsDashboardForStaffComponent,
    BorrowingsBYStaffComponent,
    BorrowingsDashboardForHRComponent,
    BorrowingsBYHRComponent,
    ApprovedHRStaffLeaveDashboardComponent,
    RejectedHRStaffLeaveDashboardComponent,
    RasiedExpenseForFinanceDashboardComponent,
    ApprovedStaffExpenseForFinanceDashbaordComponent,
    RejectedStaffExpenseForFinanceDashboardComponent,
    FinanceLeaveComponent,
    FinanceLeaveDashboardComponent,
    AppliedStaffLeaveDashboardForFinanceComponent,
    ApprovedStaffLeaveDashboardForFinanceComponent,
    RejectedStaffLeaveDashboardForFinanceComponent,
    AllStaffLeaveForAdminComponent,
    AllExpenseForAdminComponent,
    AllAssetsForAdminComponent,
    AllStaffForAdminComponent,
    AllLocatorDashboardForAdminComponent,
    NewVendorComponent,
    VendorDashboardComponent,
    WorkPlaceRequestForAdminComponent,
    AttendanceDashboardForAdminComponent,
    UpcomingEventsDashboardForAdminComponent,
    CompletedEventsDashboardForAdminComponent,
    UpcomingAnnouncementsDashboardForAdminComponent,
    CompletedAnnouncementsDashboardForAdminComponent,
    ProjectListForAdminComponent,
    JoingGroupChatForAdminComponent,
    GroupChatForAdminComponent,
    UpcomingAnnouncementsDashboardForStaffComponent,
    UpcomingAnnouncementsDashboardForReceptionistComponent,
    LocatorDashboardForAdminComponent,
    AllRaisedExpenseComponent,
    ExpensesRequestByManagerComponent,
    ExpensesRequestByFinanceComponent,
    StaffManagementDashboardFoReceptionistComponent,
    AllStaffLeaveFoReceptionistComponent,
    AllLocatorDashboardForReceptionistComponent,
    AllExpenseForReceptionistComponent,
    FeedbackDahsboardForReceptionistComponent,
    UserDashboardForFinanceComponent,
    EventDashboardForReceptionistComponent,
    ResignedStaffComponent,
    CheckedStaffExpenseComponent,
    AllLocatorDashboardForFinanceComponent,
    AllStaffLeaveForFinanceComponent,
    NewProjectComponent,
    NewDesignationComponent,
    DesignationDashboardComponent,
    HolidayListComponent,
    HolidayListDashboardComponent,
    HRProfileComponent,
    ProjectListComponent,
    ProjectListDashboardComponent,
    AssetsMasterComponent,
    AssetDashboardComponent,
    GeneralAssetComponent,
    
    GeneralAssetsDashboardComponent,
    
    VisitorRequestForManagerComponent,
    
    VisitorRequestDashboardForManagerComponent,
    
    AddTimeSheetComponent,
    
    CompanyExpenseForAdminComponent,
    
    AllVisitorRequestforAdminComponent,
    
    AdminStaffLeaveComponent,
    
    HomeDashboardForAdminComponent,
    
    GeneralAssetTypeIDComponent,
    
    AddInventoryComponent,
    
    InventoryDashboardComponent,
    
    CEOProfileComponent,
    
    TimeSheetsForHrComponent,
    
    AddTimeSheetForHRComponent,
    
    TimeSheetsForManagerComponent,
    
    AddTimeSheetsForManagerComponent,
    
    TimeSheetsForCEOComponent,
    
    TimeSheetForFinanceComponent,
    
    InventoryNamePurchaseDetailsComponent,
    
    InventoryNamePurchaseDetailsDashboardComponent,
    
    InventoryItemsComponent,
    
    InventoryItemDashboardComponent,
    
    AssignedTaskByManagerComponent,
    
    AssignedTaskDashboardComponent,
    
    CompletedTaskDashboardComponent,
    
    AccountsExpenseDashboardComponent,
    
    AccountsExpenseComponent,
    
    AssignedTaskForTLDashboardComponent,
    
    AssignedTaskByCEOComponent,
    
    CompletedTaskForTlDashboardComponent,
    
    AllStaffApprovedLeaveComponent,
    
    AllStaffRejectLeaveComponent,
    
    StaffProjectMappingComponent,
    
    StaffProjectMappingDashboardComponent,

    ResignedStaffDashboardForHrComponent,

    StaffPayRollComponent,

    DepartmentMasterDashboardComponent,

    NewDepartmentMasterComponent,

    LateAttendanceDashboardComponent,

    LatePunchInDashbaordComponent,

    LatePunchInComponent,

    MyprojectsComponent,

    LateAttendancePunchOutDashboardComponent,

    PayrollreportsComponent,

    WorkPlaceRequestCompletedComponent,

    KeyResultAreaComponent,

    KeyResultAreaDashboardComponent,

    AppraisalCycleComponent,

    PerformanceIndicatorComponent,

    PerformanceIndicatorDashboardComponent,

    AppraisalCycleDashboardComponent,

    Approver1ratingComponent,

    Approver1ratingdashboardComponent,

    EmployeekramappingComponent,

    EmployeekramappingdashboardComponent,

    SelfRatingDashComponent,

    SelfRatingPageComponent,

    Approver2ratingpageComponent,

    Approver2ratingpagedashboardComponent,

    Approver3ratingpageComponent,

    Approver3ratingpagedashboardComponent,

    StaffScoreReportComponent,

    StaffScoreFullDetailsComponent,

    PostajobComponent,

    PostajobdashComponent,

    AppliendCandidatesComponent,

    ShortlistedCandidatesComponent,

    ScheduledInterviewsComponent,

    SelectedCandidatesComponent,

    OfferedCandidatesComponent,

    ApplyJobsComponent,

    JoinedCandidatesComponent,

    DropedCandidatesComponent,

    StaffCalenderComponent,

    AppraisalReportsComponent,

    RoleMenuMappingComponent,

    MenuMappingdashComponent,

    
   
 
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    AngularMultiSelectModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    [NgbModule],
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgxTimeSchedulerModule,
    NgMultiSelectDropDownModule.forRoot()
  
  ],
  providers: [DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
