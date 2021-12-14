import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DigiOfficeService {
 host = "https://23.101.22.93/DigiOfficeBSINTAPI";
  //DigiOfficeBSINTAPI
//  private host = "http://localhost:1807/";
  //private host = localStorage.getItem('apiurl');
  private url: string = "";
  showvid: any;
  URL: string;
  constructor(private http: HttpClient) {
  }
  public InsertTrainers(data) {

    this.url = this.host + "/Master/InsertTrainers";
    return this.http.post(this.url, data);
  }
  public UpdateTrainers(data) {

    this.url = this.host + "/Master/UpdateTrainers";
    return this.http.post(this.url, data);
  }
  public GetMyAttendanceList(UserID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "MobileUser/GetMyAttendanceList?UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetTrainersforlogin(url) {

    return this.http.get<any[]>(url + "/Master/GetTrainers");
  }
  public DeleteTrainers(id) {

    return this.http.get<any[]>(this.host + "/Master/DeleteTrainers?ID=" + id);
  }
  public GetWorkSpaceDetails(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/Building/GetWorkSpaceDetails?SDate=" + SDate + "&EDate=" + EDate);
  }
  public GetMyComplaints(UserID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyComplaints?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate);
  }
  public GetAttendanceMobile(UserID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAttendanceMobile?UserID=" + UserID);
  }
  public GetUsersdetailsMob(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsMob?Name=" + Name + "&Password=" + Password);
  }
  public GetBuildinglist() {

    return this.http.get<any[]>(this.host + "/Building/GetBuildinglist");
  }
  public GetSupervisor(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetSupervisor?ID=" + ID);
  }

  public GetProjectMasterList() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetProjectMasterList");
  }
  public GetVisitorIDType() {

    return this.http.get<any[]>(this.host + "/Visitors/GetVisitorIDType");
  }

  public InsertTransportationRequestsMob(data) {

    this.url = this.host + "/MobileUser/InsertTransportationRequestsMob";
    return this.http.post(this.url, data);
  }

  public GetMyLeaves(UserID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyLeaves?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate);
  }
  public GetTransportationRequestDetailsMob(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetTransportationRequestDetailsMob?ID=" + ID);
  }
  public GetMyLocatorRequests(UserID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyLocatorRequests?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate);
  }

  public GetMyTimeSheets(UserID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyTimeSheets?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate);
  }

  public GetMyExpenses(UserID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyExpenses?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate);
  }
  public InsertStaffLeaves(data) {
    debugger;
    this.url = this.host + "/Building/InsertStaffLeaves";
    return this.http.post(this.url, data);
  }

  public InsertLocatorTable(data) {
    this.url = this.host + "/MobileUser/InsertLocatorTable";
    return this.http.post(this.url, data);
  }

  public GetLeaveType() {

    return this.http.get<any[]>(this.host + "/MasterDemo/GetLeaveType");
  }

  public GetUsers(ID) {

    return this.http.get<any[]>(this.host + "/User/GetUsers?ID=" + ID);
  }

  public GetFloorType(BuildingID) {

    return this.http.get<any[]>(this.host + "/Building/GetFloor?BuildingID=" + BuildingID);
  }

  public GetWorkStationType_Master() {

    return this.http.get<any[]>(this.host + "/Building/Get_WorkStationType_Master");
  }
  public GetWorkspaceMasterMobile(BuildingID, WorkStationType, FloorID) {

    return this.http.get<any[]>(this.host + "/Building/GetWorkspaceMasterMobile?BuildingID=" + BuildingID + "&WorkStationType=" + WorkStationType + "&FloorID=" + FloorID);
  }

  public GetTransportRequestType() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetTransportRequestType");
  }
  public GetExpensesMaster() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetExpensesMaster");
  }
  public InsertExpensesWEB(data) {

    this.url = this.host + "/MobileUser/InsertExpensesWEB";
    return this.http.post(this.url, data);
  }
  public GetCurrencyMaster() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetCurrencyMaster");
  }
  public DeleteStaffLeaves(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteStaffLeaves?ID=" + id);
  }
  public DeleteStaffLocatorRequest(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteStaffLocatorRequest?ID=" + id);
  }

  public DeleteWorkplaceRequest(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteWorkplaceRequest?ID=" + id);
  }
  public DeleteVisitorRequest(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteVisitorRequest?ID=" + id);
  }
  public DeleteStaffExpences(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteStaffExpences?ID=" + id);
  }
  public GetUsersdetails(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetails?Name=" + Name + "&Password=" + Password);
  }
  public GetTransportationList(managerID, userRoleID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/TransportationRequest/GetTransportationRequest?UserID=" + managerID + "&TypeID=" + userRoleID + "&SDate=" + SDate + "&EDate=" + EDate);
  }
  public InsertWorkplaceRequest(data) {

    this.url = this.host + "/Building/InsertWorkplaceRequest";
    return this.http.post(this.url, data);
  }
  //Manager Login
  public GetStaffLeaves(managerID, userRoleID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetStaffLeaves?ID=" + managerID + "&TypeID=" + userRoleID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetBuildingStaff(SID) {

    return this.http.get<any[]>(this.host + "/Building/GetBuildingStaff?SID=" + SID);
  }
  public GetLocatorRequestsforreceptionist(UserID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetLocatorRequestsforreceptionist?UserID=" + UserID);
  }

  public GetExpensesListweb(managerID, userRoleID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetExpensesListweb?UserID=" + managerID + "&TypeID=" + userRoleID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetChatGroupsToApprove() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetChatGroupsToApprove");
  }
  public GetTransportationRequestsForReceptionist(DDate, RDate) {

    return this.http.get<any[]>(this.host + "/TransportationRequest/GetTransportationRequestsForReceptionist?DDate=" + DDate + "&RDate=" + RDate);
  }

  public GetAllStaffLeaves(ID, TypeID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffLeaves?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }

  public GetComplaintsDashboardWEB(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetComplaintsDashboardWEB?Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetVisitorList() {

    return this.http.get<any[]>(this.host + "/Visitors/GetVisitorList");
  }
  public GetAllStaff() {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaff?");
  }
  public GetAllStaffForManager(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffForManager?SDate=" + Sdate + "&EDate=" + Edate);
  }
  public GetAllAttendance(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAllAttendance?SDate=" + Sdate + "&EDate=" + Edate);
  }
  public GetStaffLeavesCountDetails() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetStaffLeavesCountDetails");
  }
  public GetProjectIDType() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetProjectIDType");
  }
  public GetAllStaffLocatorRequests(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAllStaffLocatorRequests?Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetAnnouncementList(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Announcement/GetAnnouncementList?SDate=" + Sdate + "&EDate=" + Edate);
  }

  public GetParkingSlotsByID(ID, Floor) {

    return this.http.get<any[]>(this.host + "/Building/GetParkingSlotsByID?ID=" + ID + "&Floor=" + Floor);
  }
  public GetVisitorbytodaydate(BID) {

    return this.http.get<any[]>(this.host + "/Building/GetVisitorbytodaydate?BID=" + BID);
  }
  public InsertUserJoinedGroups_Table(data) {

    this.url = this.host + "/MobileUser/InsertUserJoinedGroups_Table";
    return this.http.post(this.url, data);
  }
  public GetUserJoinedGroups_Table(UserID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetUserJoinedGroups_Table?UserID=" + UserID);
  }
  public InsertChatGroup_Table(data) {

    this.url = this.host + "/MobileUser/InsertChatGroup_Table";
    return this.http.post(this.url, data);
  }
  public InsertProjectMaster(data) {

    this.url = this.host + "/ProjectRequest/InsertProjectMaster";
    return this.http.post(this.url, data);
  }

  public GetStaffType() {

    return this.http.get<any[]>(this.host + "/Building/GetStaffType");
  }
  public GetAllStaffUnderSupervisor(ID) {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffUnderSupervisor?ID=" + ID);
  }
  public InsertStaff(data) {

    this.url = this.host + "/Building/InsertBuildingStaff";
    return this.http.post(this.url, data);
  }
  public DeleteStaff(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteBuildingStaff?ID=" + id);
  }

  public ResignStaff(ID, ResignReason, ResignationDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/ResignStaff?ID=" + ID + "&ResignReason=" + ResignReason + "&ResignationDate=" + ResignationDate);
  }

  public GetRoleType(UserTypeID) {

    return this.http.get<any[]>(this.host + "/MasterDemo/GetRoleType?UserTypeID=" + UserTypeID);
  }
  public InsertUsers(data) {

    this.url = this.host + "/Visitors/InsertUsers";
    return this.http.post(this.url, data);
  }
  public InsertUserRoles(data) {

    this.url = this.host + "/Visitors/InsertUserRoles";
    return this.http.post(this.url, data);
  }
  public GetUserType(ID) {

    return this.http.get<any[]>(this.host + "/User/GetUserType?ID=" + ID);
  }
  public InsertLeaveTypeMaster(data) {

    this.url = this.host + "/ProjectRequest/InsertLeaveTypeMaster";
    return this.http.post(this.url, data);
  }

  public InsertProjectIDType(data) {

    this.url = this.host + "/ProjectRequest/InsertProjectIDType";
    return this.http.post(this.url, data);
  }
  public DeleteLeaveTypeMaster(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/DeleteLeaveTypeMaster?ID=" + id);
  }

  public DeleteProjectIDType(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/DeleteProjectIDType?ID=" + id);
  }
  public InsertExpencesMaster(data) {

    this.url = this.host + "/ProjectRequest/InsertExpencesMaster";
    return this.http.post(this.url, data);
  }

  public DeleteExpenseMaster(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/DeleteExpenseMaster?ID=" + id);
  }

  public DeleteProjectMaster(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/DeleteProjectMaster?ID=" + id);
  }

  public UpdateExpencesMaster(data) {

    this.url = this.host + "/ProjectRequest/UpdateExpencesMaster";
    return this.http.post(this.url, data);
  }
  public UpdateProjectMaster(data) {

    this.url = this.host + "/ProjectRequest/UpdateProjectMaster";
    return this.http.post(this.url, data);
  }


  public GetExpencesMasterByID(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/GetExpencesMasterByID?ID=" + id);
  }
  public GetUserList() {

    return this.http.get<any[]>(this.host + "/User/GetUserslist");
  }
  public GetLeaveTypeByID(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/GetLeaveTypeByID?ID=" + id);
  }
  public UpdateLeaveTypeMaster(data) {

    this.url = this.host + "/ProjectRequest/UpdateLeaveTypeMaster";
    return this.http.post(this.url, data);
  }
  public GetProjectIDTypeByID(id) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/GetProjectIDTypeByID?ID=" + id);
  }
  public UpdateProjectIDType(data) {

    this.url = this.host + "/ProjectRequest/UpdateProjectIDType";
    return this.http.post(this.url, data);
  }
  public GetAllTransportExpensesListweb(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAllTransportExpensesListweb?SDate=" + Sdate + "&EDate=" + Edate);
  }
  public ApproveAllExpensesByFinance(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApproveAllExpensesByFinance?ID=" + id);
  }
  public RejectAllExpensesByFinance(id, notes) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejectAllExpensesByFinance?ID=" + id + "&Notes=" + notes);
  }
  public GetAllExpensesListweb(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAllExpensesListweb?SDate=" + Sdate + "&EDate=" + Edate);
  }
  public GetFloor(BuildingID) {

    return this.http.get<any[]>(this.host + "/Building/GetFloor?BuildingID=" + BuildingID);
  }
  public InsertAnnouncement(data) {

    this.url = this.host + "/Announcement/InsertAnnouncement";
    return this.http.post(this.url, data);
  }
  public DeleteAnnouncement(id) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/DeleteAnnouncement?ID=" + id);
  }
  public GetAnnouncementsByID(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAnnouncementsByID?ID=" + id);
  }
  public UpdateAnnouncement(data) {

    this.url = this.host + "/Announcement/UpdateAnnouncement";
    return this.http.post(this.url, data);
  }
  public InsertEvents(data) {

    this.url = this.host + "/TransportationRequest/InsertEvents";
    return this.http.post(this.url, data);
  }
  public GettodayEvents(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/TransportationRequest/GettodayEvents?SDate=" + SDate + "&EDate=" + EDate);
  }
  public GetEquipmentType() {

    return this.http.get<any[]>(this.host + "/MasterDemo/GetEquipmentType");
  }
  // public InsertBarrowRequest(data) {
  //   
  //   this.url = this.host + "/Vendor/InsertBarrowRequest";
  //   return this.http.post(this.url, data);
  // }
  public GetVisitorRequest(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Visitors/GetVisitorRequest?SDate=" + Sdate + "&EDate=" + Edate);
  }
  public InsertVisitorRequest(data) {

    this.url = this.host + "/Visitors/InsertVisitorRequest";
    return this.http.post(this.url, data);
  }

  public GetTransportationRequestsForStaff(Sdate, Edate, StaffID) {

    return this.http.get<any[]>(this.host + "/TransportationRequest/GetTransportationRequestsForStaff?SDate=" + Sdate + "&EDate=" + Edate + "&StaffID=" + StaffID);
  }
  public GetTechnologyRequestRaised() {

    return this.http.get<any[]>(this.host + "/Technology/GetTechnologyRequestRaised");
  }
  public InsertTechnologyRequest(data) {

    this.url = this.host + "/Technology/InsertTechnologyRequest";
    return this.http.post(this.url, data);
  }

  public InsertStaffLookUp(data) {

    this.url = this.host + "/Technology/InsertStaffLookUp";
    return this.http.post(this.url, data);
  }
  public GetStaffLookUp() {

    return this.http.get<any[]>(this.host + "/Technology/GetStaffLookUp");
  }
  public GetEmployee_Assets(ID, typeID) {

    return this.http.get<any[]>(this.host + "/Equipment/GetEmployee_Assets?ID=" + ID + '&TypeID=' + typeID);
  }
  public GetBorrowerRequest(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/TransportationRequest/GetBorrowerRequest?SDate=" + SDate + '&EDate=' + EDate);
  }
  public GetEquipment() {

    return this.http.get<any[]>(this.host + "/Equipment/GetEquipment");
  }
  public InsertEquipment(data) {

    this.url = this.host + "/Equipment/InsertEquipment";
    return this.http.post(this.url, data);
  }

  public InsertEmployee_Assets(data) {

    this.url = this.host + "/Equipment/InsertEmployee_Assets";
    return this.http.post(this.url, data);
  }

  public InsertWorkplaceRequestWeb(data) {

    this.url = this.host + "/ScheduleRequest/InsertWorkplaceRequestWeb";
    return this.http.post(this.url, data);
  }

  public GetEmployee_AssetsForAdmin(ID, typeID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetEmployee_AssetsForAdmin?ID=" + ID + '&TypeID=' + typeID);
  }
  public UpdateBarrowerStatus(data) {

    this.url = this.host + "/MobileUser/UpdateBarrowerStatus";
    return this.http.post(this.url, data);
  }
  public UpdateEmployee_Assets(data) {

    this.url = this.host + "/Equipment/UpdateEmployee_Assets";
    return this.http.post(this.url, data);
  }
  // public VisitedVisitorRequest(id,exitDate,exitTime) {
  //   
  //   return this.http.get<any[]>(this.host + "/Visitors/VisitedVisitorRequest?ID=" + id + '&ExitDate=' + exitDate + '&ExitTime=' + exitTime) ;
  // }
  public GetChatMaster() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetChatMaster");
  }
  public InsertChatMaster(data) {

    this.url = this.host + "/MobileUser/InsertChatMaster";
    return this.http.post(this.url, data);
  }
  public InsertChatDetails(data) {

    this.url = this.host + "/MobileUser/InsertChatDetails";
    return this.http.post(this.url, data);
  }
  public GetChatDetailsByID(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetChatDetailsByID?ChatID=" + ID);
  }

  public ApprovedStaffLeaves(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedStaffLeaves?ID=" + ID);
  }

  public RejctedStaffLeaves(ID, RejectReason) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejctedStaffLeaves?ID=" + ID + "&RejectReason=" + RejectReason);
  }

  public GetExpensesListwebforManager(managerID, userRoleID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetExpensesListwebforManager?UserID=" + managerID + "&TypeID=" + userRoleID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetAllStaffLeavesForReceptionist(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffLeavesForReceptionist?Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public EnableStaff(ID) {

    return this.http.get<any[]>(this.host + "/Building/EnableStaff?ID=" + ID);
  }
  public DisableStaff(ID) {

    return this.http.get<any[]>(this.host + "/Building/DisableStaff?ID=" + ID);
  }
  public ApprovedExpencesByAdmin(ID) {

    return this.http.get<any[]>(this.host + "/Building/ApprovedExpencesByAdmin?ID=" + ID);
  }
  public RejctedExpencesByAdmin(ID) {

    return this.http.get<any[]>(this.host + "/Building/RejctedExpencesByAdmin?ID=" + ID);
  }
  public GetExpensesListwebForAdmin(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetExpensesListwebForAdmin?Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetLocatorRequestForAdmin(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetLocatorRequestForAdmin?Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetGroupMembers() {

    return this.http.get<any[]>(this.host + "/Building/GetGroupMembers");
  }
  public InsertApprovedGroup(data) {

    this.url = this.host + "/Building/InsertApprovedGroup";
    return this.http.post(this.url, data);
  }
  public GetApprovedGroup(UserID) {

    return this.http.get<any[]>(this.host + "/Building/GetApprovedGroup?UserID=" + UserID);
  }
  public GetGroupMembersForChat(GroupID) {

    return this.http.get<any[]>(this.host + "/Building/GetGroupMembersForChat?GroupID=" + GroupID);
  }
  public BookedTransportRequest(data) {

    this.url = this.host + "/TransportationRequest/BookedTransportRequest";
    return this.http.post(this.url, data);
  }
  public CancelTransportationRequest(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/CancelTransportationRequest?ID=" + ID);
  }
  public CompletedTransportationRequests(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/CompletedTransportationRequests?ID=" + ID);
  }

  public InsertGroupChatMaster(data) {

    this.url = this.host + "/Building/InsertGroupChatMaster";
    return this.http.post(this.url, data);
  }
  public GetChatGroup_TableList() {

    return this.http.get<any[]>(this.host + "/Building/GetChatGroup_TableList");
  }
  public GetChatGroupMaster() {

    return this.http.get<any[]>(this.host + "/Building/GetChatGroupMaster");
  }
  public GetLocatorRequests(managerID, userRoleID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetLocatorRequests?UserID=" + managerID + "&TypeID=" + userRoleID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }

  public ApprovedLocatorTable(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedLocatorTable?ID=" + ID);
  }

  public RejctedLocatorTable(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejctedLocatorTable?ID=" + ID);
  }
  public GetChatForStaff(staffID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetChatForStaff?StaffID=" + staffID);
  }

  public RejectChatGroup_Table(ID) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejectChatGroup_Table?ID=" + ID);
  }
  public EnableUser(ID) {

    return this.http.get<any[]>(this.host + "/Building/EnableUser?ID=" + ID);
  }
  public DisableUser(ID) {

    return this.http.get<any[]>(this.host + "/Building/DisableUser?ID=" + ID);
  }

  public UpdateGroupChatMaster(GroupID) {

    return this.http.get<any[]>(this.host + "/Announcement/UpdateGroupChatMaster?GroupID=" + GroupID);
  }
  public GetUserrole() {

    return this.http.get<any[]>(this.host + "/User/GetUserrole");
  }

  public GetUsersdetailsForFinanceLogin(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForFinanceLogin?Name=" + Name + "&Password=" + Password);
  }
  public GetUsersdetailsForHRLogin(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForHRLogin?Name=" + Name + "&Password=" + Password);
  }
  public GetUsersdetailsForReceptionistLogin(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForReceptionistLogin?Name=" + Name + "&Password=" + Password);
  }
  public GetUsersdetailsForManagerLogin(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForManagerLogin?Name=" + Name + "&Password=" + Password);
  }
  public GetUsersdetailsForStaffLogin(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetUsersdetailsForStaffLogin?Name=" + Name + "&Password=" + Password);
  }

  public Gettodayannouncements(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/Announcement/Gettodayannouncements?SDate=" + SDate + "&EDate=" + EDate);
  }

  public GetEventList(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Announcement/GetEventList?Sdate=" + Sdate + "&Edate=" + Edate);
  }
  // public GetEquipmentlist() {
  //   
  //   return this.http.get<any[]>(this.host + "/Equipment/GetEquipmentlist");
  // }
  public GetExpenseRequestDetailsByID(ID) {

    return this.http.get<any[]>(this.host + "/ProjectRequest/GetExpenseRequestDetailsByID?ID=" + ID);
  }

  public GetBuildingStaffByID(ID) {

    return this.http.get<any[]>(this.host + "/Building/GetBuildingStaffByID?ID=" + ID);
  }

  public GetVisitorRequestbyUserID(UserID) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetVisitorRequest?UserID=" + UserID);
  }
  public GetVisitorRequestNotVisited(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetVisitorRequestNotVisited?SDate=" + SDate + "&EDate=" + EDate);
  }

  public InsertComplaintsMobile(data) {

    this.url = this.host + "/MobileUser/InsertComplaintsMobile";
    return this.http.post(this.url, data);
  }
  public GetEquipmentlist(LanguageID) {

    return this.http.get<any[]>(this.host + "/Equipment/GetEquipmentlist?LanguageID=" + LanguageID);
  }

  public GetEmployee_AssetsForstaff(ID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Equipment/GetEmployee_AssetsForstaff?ID=" + ID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetMyTravelRequestsList(UserID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyTravelRequestsList?UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }

  public UpdateUserIDForStaff(data) {

    this.url = this.host + "/MasterDemo/UpdateUserIDForStaff";
    return this.http.post(this.url, data);
  }
  public ApprovedStaffLeavesByHR(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedStaffLeavesByHR?ID=" + id);
  }
  public ClosedComplaints(id, Notes, PhotoUrl) {

    return this.http.get<any[]>(this.host + "/MobileUser/ClosedComplaints?ID=" + id + "&Notes=" + Notes + "&PhotoUrl=" + PhotoUrl);
  }
  public GetLocatorRequestsReport(UserID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetLocatorRequestsReport?UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }
  public GetAdmin(Name, Password) {

    return this.http.get<any[]>(this.host + "/User/GetAdmin?Name=" + Name + "&Password=" + Password);
  }

  public GetExpensesListForManagerStaff(managerID, Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetExpensesListForManagerStaff?UserID=" + managerID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }

  public ApprovedStaffExpense(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedStaffExpense?ID=" + id);
  }

  public RejectStaffExpense(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejectStaffExpense?ID=" + id);
  }
  public GetAllEmployeeAssets(IDate, RDate) {

    return this.http.get<any[]>(this.host + "/Building/GetAllEmployeeAssets?IDate=" + IDate + "&RDate=" + RDate);
  }
  public GetAllStaffLeavesForAdmin(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffLeavesForAdmin?SDate=" + SDate + "&EDate=" + EDate);
  }

  public ApprovedStaffLeavesByAdmin(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedStaffLeavesByAdmin?ID=" + id);
  }

  public RejctedStaffLeavesByAdmin(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejctedStaffLeavesByAdmin?ID=" + id);
  }

  public GetAllExpensesForAdmin(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetAllExpensesForAdmin?Sdate=" + Sdate + "&Edate=" + Edate);
  }

  public InsertVendor(data) {

    this.url = this.host + "/Vendor/InsertVendor";
    return this.http.post(this.url, data);
  }
  public GetAccountType() {

    return this.http.get<any[]>(this.host + "/MasterDemo/GetAccountType");
  }
  public GetVendorList() {

    return this.http.get<any[]>(this.host + "/Vendor/GetVendorList");
  }
  public UpdateUsers(data) {

    this.url = this.host + "/User/UpdateUsers";
    return this.http.post(this.url, data);
  }
  public GetStaffRequetsReport(UserID, SDate, EDate, RoleTypeID) {

    return this.http.get<any[]>(this.host + "/Tenant/GetStaffRequetsReport?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate + "&RoleTypeID=" + RoleTypeID);
  }
  public ReturnAssets(id, Notes, ReturnDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/ReturnAssets?ID=" + id + "&Notes=" + Notes + "&ReturnDate=" + ReturnDate);
  }
  public InsertBarrowRequest(data) {

    this.url = this.host + "/Vendor/InsertBarrowRequest";
    return this.http.post(this.url, data);
  }
  public GetUserroleType() {

    return this.http.get<any[]>(this.host + "/MasterDemo/GetUserroleType");
  }
  public GetChatGroupsToApprovebyUserID(UserID) {

    return this.http.get<any[]>(this.host + "/User/GetChatGroupsToApprovebyUserID?UserID=" + UserID);
  }

  public ReturnBorrowerRequest(id, Notes, ReturnDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/ReturnBorrowerRequest?ID=" + id + "&Notes=" + Notes + "&ReturnDate=" + ReturnDate);
  }

  public DeleteUsers(id) {

    return this.http.get<any[]>(this.host + "/User/DeleteUsers?ID=" + id);
  }

  public ApprovedStaffLocatorByAdmin(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedStaffLocatorByAdmin?ID=" + id);
  }

  public RejctedStaffLocatorByAdmin(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/RejctedStaffLocatorByAdmin?ID=" + id);
  }
  public ApprovedStaffExpenseByFinance(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedStaffExpenseByFinance?ID=" + id);
  }
  public GetManagerStaffRequetsReport(UserID, SDate, EDate, RoleTypeID, Name) {

    return this.http.get<any[]>(this.host + "/Tenant/GetManagerStaffRequetsReport?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate + "&RoleTypeID=" + RoleTypeID + "&Name=" + Name);
  }

  public GetLocatorRequestsForEdit() {

    return this.http.get<any[]>(this.host + "/Building/GetLocatorRequestsForEdit");
  }

  public GetWorkSpaceDetailsforEdit() {

    return this.http.get<any[]>(this.host + "/Building/GetWorkSpaceDetailsforEdit");
  }
  public GetVisitorRequestForEdit() {

    return this.http.get<any[]>(this.host + "/Building/GetVisitorRequestForEdit");
  }
  public GetAllStaffForManagerforEdit() {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffForManagerforEdit");
  }
  public UpdateVisitorRequest(data) {

    this.url = this.host + "/Visitors/UpdateVisitorRequest";
    return this.http.post(this.url, data);
  }
  public UpdateWorkplaceRequest(data) {

    this.url = this.host + "/ProjectRequest/UpdateWorkplaceRequest";
    return this.http.post(this.url, data);
  }
  public UpdateLocatorTable(data) {

    this.url = this.host + "/Visitors/UpdateLocatorTable";
    return this.http.post(this.url, data);
  }

  public CheckedAllStaffExpenseByReceptionist(id) {

    return this.http.get<any[]>(this.host + "/MobileUser/CheckedAllStaffExpenseByReceptionist?ID=" + id);
  }
  public VisitedVisitorRequest(data) {

    this.url = this.host + "/Visitors/VisitedVisitorRequest";
    return this.http.post(this.url, data);
  }
  public DeleteStaffLocatorForFinance(id) {

    return this.http.get<any[]>(this.host + "/Building/DeleteStaffLocatorForFinance?ID=" + id);
  }

  public InsertDesignationMaster(data) {
    this.url = this.host + "/Announcement/InsertDesignationMaster";
    return this.http.post(this.url, data);
  }
  public DeleteDesignationType(id) {

    return this.http.get<any[]>(this.host + "/Vendor/DeleteDesignationType?ID=" + id);
  }
  public UpdateDesignationType(data) {
    this.url = this.host + "/Vendor/UpdateDesignationType";
    return this.http.post(this.url, data);
  }
  public GetDesignationType() {

    return this.http.get<any[]>(this.host + "/Vendor/GetDesignationType");
  }
  public GetLoginTypeMaster() {

    return this.http.get<any[]>(this.host + "/Vendor/GetLoginTypeMaster");
  }

  public GetHolidayListMaster() {
    return this.http.get<any[]>(this.host + "/MobileUser/GetHolidayListMaster");
  }
  public GetDaysMaster() {
    return this.http.get<any[]>(this.host + "/MobileUser/GetDaysMaster");
  }
  public InsertHolidayListMaster(data) {
    this.url = this.host + "/ProjectRequest/InsertHolidayListMaster";
    return this.http.post(this.url, data);
  }
  public EnableVendor(ID) {

    return this.http.get<any[]>(this.host + "/Building/EnableVendor?ID=" + ID);
  }
  public DisableVendor(ID) {

    return this.http.get<any[]>(this.host + "/Building/DisableVendor?ID=" + ID);
  }
  public GetAssetTypeMaster() {
    return this.http.get<any[]>(this.host + "/Vendor/GetAssetTypeMaster");
  }
  public InsertAssetTypeMaster(data) {
    this.url = this.host + "/Vendor/InsertAssetTypeMaster";
    return this.http.post(this.url, data);
  }
  public UpdateAssetTypeMaster(data) {
    this.url = this.host + "/Vendor/UpdateAssetTypeMaster";
    return this.http.post(this.url, data);
  }

  public GetGeneralAssetsMaster() {
    return this.http.get<any[]>(this.host + "/Vendor/GetGeneralAssetsMaster");
  }
  public InsertGeneralAssetsMaster(data) {
    this.url = this.host + "/Vendor/InsertGeneralAssetsMaster";
    return this.http.post(this.url, data);
  }
  public UpdateGeneralAssetsMaster(data) {
    this.url = this.host + "/Vendor/UpdateGeneralAssetsMaster";
    return this.http.post(this.url, data);
  }
  public UpdateBuildingStaff(data) {
    this.url = this.host + "/Building/UpdateBuildingStaff";
    return this.http.post(this.url, data);
  }
  public UpdateProfile(data) {
    this.url = this.host + "/Building/UpdateProfile";
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeAssets(data) {
    this.url = this.host + "/Equipment/UpdateEmployeeAssets";
    return this.http.post(this.url, data);
  }

  public CanceledWorkplaceRequest(id) {
    return this.http.get<any[]>(this.host + "/MobileUser/CanceledWorkplaceRequest?ID=" + id);
  }
  public CanceledExpencesByID(id) {
    return this.http.get<any[]>(this.host + "/MobileUser/CanceledExpencesByID?ID=" + id);
  }
  public GetAllStaffforGroup() {
    return this.http.get<any[]>(this.host + "/MobileUser/GetAllStaffforGroup");
  }

  public GetAllUserorGroup() {
    return this.http.get<any[]>(this.host + "/MobileUser/GetAllUserorGroup");
  }
  public DeleteEvents(ID) {
    return this.http.get<any[]>(this.host + "/Vendor/DeleteEvents?ID=" + ID);
  }
  public DeleteGeneralAssetsMaster(ID) {
    return this.http.get<any[]>(this.host + "/Vendor/DeleteGeneralAssetsMaster?ID=" + ID);
  }
  public DeleteEmployee_Assets(ID) {
    return this.http.get<any[]>(this.host + "/Vendor/DeleteEmployee_Assets?ID=" + ID);
  }
  public InsertTimeSheets_Table(data) {

    this.url = this.host + "/MobileUser/InsertTimeSheets_Table";
    return this.http.post(this.url, data);
  }

  public GetAllEmployee_Assets() {
    return this.http.get<any[]>(this.host + "/Vendor/GetAllEmployee_Assets");
  }
  public GettodayannouncementsForEdit() {

    return this.http.get<any[]>(this.host + "/Visitors/GettodayannouncementsForEdit");
  }
  public InsertCompanyExpencesWEB(data) {

    this.url = this.host + "/MobileUser/InsertCompanyExpencesWEB";
    return this.http.post(this.url, data);
  }

  public GetMyExpensesForFinance(UserID, SDate, EDate) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyExpensesForFinance?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate);
  }
  public GetMyExpensesForAdmin() {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMyExpensesForAdmin");
  }
  public ApprovedCompanyExpencesByAdmin(id) {
    return this.http.get<any[]>(this.host + "/MobileUser/ApprovedCompanyExpencesByAdmin?ID=" + id);
  }
  public RejectedCompanyExpencesByAdmin(id) {
    return this.http.get<any[]>(this.host + "/MobileUser/RejectedCompanyExpencesByAdmin?ID=" + id);
  }

  public GetAllStaffLeavesForCEO(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetAllStaffLeavesForCEO?SDate=" + Sdate + "&EDate=" + Edate);
  }

  public GetRequetsReportForCEOWeb(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Building/GetRequetsReportForCEOWeb?SDate=" + Sdate + "&EDate=" + Edate);
  }
  public InsertInventoryWeb(data) {

    this.url = this.host + "/Inventory/InsertInventoryWeb";
    return this.http.post(this.url, data);
  }
  public GetInventoryList(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Inventory/GetInventoryList?SDate=" + Sdate + "&EDate=" + Edate);
  }

  public GetInventoryType() {

    return this.http.get<any[]>(this.host + "/MasterDemo/GetInventoryType");
  }
  public EnableProjectMaster(ID) {

    return this.http.get<any[]>(this.host + "/Building/EnableProjectMaster?ID=" + ID);
  }
  public DisableProjectMaster(ID) {

    return this.http.get<any[]>(this.host + "/Building/DisableProjectMaster?ID=" + ID);
  }

  public GetTimeSheetsForWeb(UserID, sDate, eDate) {

    return this.http.get<any[]>(this.host + "/Tenant/GetTimeSheetsForWeb?UserID=" + UserID + "&sDate=" + sDate + "&eDate=" + eDate);
  }
  public GetTimeSheetsForCEO(sDate, eDate) {

    return this.http.get<any[]>(this.host + "/Vendor/GetTimeSheetsForCEO?sDate=" + sDate + "&eDate=" + eDate);
  }
  public GetInventorylistweb() {

    return this.http.get<any[]>(this.host + "/Inventory/GetInventorylistweb");
  }
  public UpdateInventory(data) {
    this.url = this.host + "/Inventory/UpdateInventory";
    return this.http.post(this.url, data);
  }
  public DeleteInventory(ID) {

    return this.http.get<any[]>(this.host + "/Inventory/DeleteInventory?ID=" + ID);
  }
  public GetInventoryItem() {

    return this.http.get<any[]>(this.host + "/Inventory/GetInventoryItem");
  }
  public updateInventoryItem(data) {
    this.url = this.host + "/Inventory/updateInventoryItem";
    return this.http.post(this.url, data);
  }

  public InsertInventoryPurchaseDetails(data) {
    this.url = this.host + "/Inventory/InsertInventoryPurchaseDetails";
    return this.http.post(this.url, data);
  }

  public GetInventoryPurchaseDetails(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/Inventory/GetInventoryPurchaseDetails?SDate=" + SDate + "&EDate=" + EDate);
  }

  public InsertInventoryItem(data) {
    this.url = this.host + "/Inventory/InsertInventoryItem";
    return this.http.post(this.url, data);
  }

  public InsertTasks(data) {

    this.url = this.host + "/ScheduledMaintenance/InsertTasks";
    return this.http.post(this.url, data);
  }
  public GetMyTasksweb() {

    return this.http.get<any[]>(this.host + "/ScheduledMaintenance/GetMyTasksweb");
  }

  public GetTaskForDateWeb(StartDate, EndDate) {

    return this.http.get<any[]>(this.host + "/ScheduledMaintenance/GetTaskForDateWeb?StartDate=" + StartDate + "&EndDate=" + EndDate);
  }

  public UpdateTasksweb(data) {

    this.url = this.host + "/ScheduledMaintenance/UpdateTasksweb";
    return this.http.post(this.url, data);
  }
  public InsertCompanyExpensePhotosweb(data) {

    this.url = this.host + "/ScheduledMaintenance/InsertCompanyExpensePhotosweb";
    return this.http.post(this.url, data);
  }
  public DeleteTasks(ID) {

    return this.http.get<any[]>(this.host + "/ScheduledMaintenance/DeleteTasks?ID=" + ID);
  }

  public GetAllAbsetees() {

    return this.http.get<any[]>(this.host + "/Building/GetAllAbsetees");
  }


  public InsertstaffProject(data) {

    this.url = this.host + "/Vendor/InsertstaffProject";
    return this.http.post(this.url, data);
  }
  public GetStaffMappedProject() {

    return this.http.get<any[]>(this.host + "/Building/GetStaffMappedProject");
  }

  public GetcurrentInventoryList(Sdate, Edate) {

    return this.http.get<any[]>(this.host + "/Inventory/GetcurrentInventoryList?SDate=" + Sdate + "&EDate=" + Edate);
  }

  public ConsumeInventory(ID, ConsumeCount) {

    return this.http.get<any[]>(this.host + "/MobileUser/ConsumeInventory?ID=" + ID + "&ConsumeCount=" + ConsumeCount);
  }
  public GetSalarySplits(Salary) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/GetSalarySplits?Salary=" + Salary);
  }

  public GetSalary(EmployeeID, LopdaysCount, Month, Year) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/GetSalary?EmployeeID=" + EmployeeID + "&LopdaysCount=" + LopdaysCount + "&Month=" + Month + "&Year=" + Year);
  }

  public GetStaffLeavesForPayroll(Month, Year, StaffID) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/GetStaffLeavesForPayroll?Month=" + Month + "&Year=" + Year + "&StaffID=" + StaffID);
  }

  public GetDepartmentMaster() {

    return this.http.get<any[]>(this.host + "/Building/GetDepartmentMaster");
  }

  public InsertInsertDepartmentMaster(data) {

    this.url = this.host + "/Building/InsertInsertDepartmentMaster";
    return this.http.post(this.url, data);
  }

  public UpdateDepartmentMaster(data) {

    this.url = this.host + "/Building/UpdateDepartmentMaster";
    return this.http.post(this.url, data);
  }
  public DeleteDepartmentMaster(ID) {

    return this.http.get<any[]>(this.host + "/Building/DeleteDepartmentMaster?ID=" + ID);
  }
  public GetLateAttendanceMaster() {

    return this.http.get<any[]>(this.host + "/Building/GetLateAttendanceMaster");
  }

  public InsertLateAttendanceMaster(data) {

    this.url = this.host + "/Building/InsertLateAttendanceMaster";
    return this.http.post(this.url, data);
  }

  public UpdateLateAttendanceMaster(data) {

    this.url = this.host + "/Building/UpdateLateAttendanceMaster";
    return this.http.post(this.url, data);
  }
  public UpdateWorkplaceRequestWork(data) {

    this.url = this.host + "/Announcement/UpdateWorkplaceRequestWork";
    return this.http.post(this.url, data);
  }
  public UpdateStaffMappedProject(data) {

    this.url = this.host + "/Announcement/UpdateStaffMappedProject";
    return this.http.post(this.url, data);
  }

  public GetTimeSheetsForMyTeamForWeb(UserID, sDate, eDate) {

    return this.http.get<any[]>(this.host + "/Tenant/GetTimeSheetsForMyTeamForWeb?UserID=" + UserID + "&sDate=" + sDate + "&eDate=" + eDate);
  }

  public GetAllAttendanceLatePunchin(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/Announcement/GetAllAttendanceLatePunchin?SDate=" + SDate + "&EDate=" + EDate);
  }
  public GetAllAttendanceLatePunchout(SDate, EDate) {

    return this.http.get<any[]>(this.host + "/Announcement/GetAllAttendanceLatePunchout?SDate=" + SDate + "&EDate=" + EDate);
  }

  public InsertStaffMappedProjectMobile(data) {

    this.url = this.host + "/Visitors/InsertStaffMappedProjectMobile";
    return this.http.post(this.url, data);
  }

  public Get_SalaryByDate(EmployeeID, LopdaysCount, startdate, enddate) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/Get_SalaryByDate?EmployeeID=" + EmployeeID + "&LopdaysCount=" + LopdaysCount + "&startdate=" + startdate + "&enddate=" + enddate);
  }

  public GetStaffLeavesForPayrollByDate(startdate, enddate, StaffID) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/GetStaffLeavesForPayrollByDate?startdate=" + startdate + "&enddate=" + enddate + "&StaffID=" + StaffID);
  }
  public DeleteEmployeeSalary() {

    return this.http.get<any[]>(this.host + "/Building/DeleteEmployeeSalary");
  }

  public GetEmployeeSalary() {

    return this.http.get<any[]>(this.host + "/Building/GetEmployeeSalary");
  }

  public DeleteStaffMappedProject(ID) {

    return this.http.get<any[]>(this.host + "/Building/DeleteStaffMappedProject?ID=" + ID);
  }

  public InsertKeyResultArea(data) {

    this.url = this.host + "/Building/InsertKeyResultArea";
    return this.http.post(this.url, data);
  }
  public GetKeyResultArea() {

    return this.http.get<any[]>(this.host + "/Building/GetKeyResultArea");
  }


  public InsertPerformanceIndicator(data) {

    this.url = this.host + "/Building/InsertPerformanceIndicator";
    return this.http.post(this.url, data);
  }
  public GetPerformanceIndicator() {

    return this.http.get<any[]>(this.host + "/Building/GetPerformanceIndicator");
  }

  public InsertAppraisalCycle(data) {

    this.url = this.host + "/Building/InsertAppraisalCycle";
    return this.http.post(this.url, data);
  }
  public GetAppraisalCycle() {

    return this.http.get<any[]>(this.host + "/Building/GetAppraisalCycle");
  }


  public InsertEmployeeKraMap(data) {
    this.url = this.host + "/Building/InsertEmployeeKraMap";
    return this.http.post(this.url, data);
  }
  public InsertStaffScores(data) {
    this.url = this.host + "/Building/InsertStaffScores";
    return this.http.post(this.url, data);
  }
  public UpdateGroupHeadStaffScores(data) {
    this.url = this.host + "/Building/UpdateGroupHeadStaffScores";
    return this.http.post(this.url, data);
  }
  public UpdateCIOStaffScores(data) {
    this.url = this.host + "/Building/UpdateCIOStaffScores";
    return this.http.post(this.url, data);
  }
  public UpdateCEOStaffScores(data) {
    this.url = this.host + "/Building/UpdateCEOStaffScores";
    return this.http.post(this.url, data);
  }

  public GetKRAByStaffID(id) {
    debugger;
    return this.http.get(this.host + "/Building/GetKRAByStaffID?StaffID=" + id);
  }
  public GetConductappraisalStaffList() {
    return this.http.get<any[]>(this.host + "/Building/GetConductappraisalStaffList");
  }
  public GetHighScores() {
    return this.http.get<any[]>(this.host + "/Building/GetHighScores");
  }
  public GetEmployeeKraMap() {
    return this.http.get<any[]>(this.host + "/Building/GetEmployeeKraMap");
  }
  public UploadImages(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any>(this.host + "/Building/UploadImages/", formdata);
  }
  public GetStaffScoresByStaffandYear(Year, StaffID) {
    return this.http.get<any[]>(this.host + '/Building/GetStaffScoresByStaffandYear?Year=' + Year + '&StaffID=' + StaffID);
  }



  //latest

  public InsertJob_Requirements(data) {
    this.url = this.host + "/Vendor/InsertJob_Requirements";
    return this.http.post(this.url, data);
  }


  public GetJob_Requirements() {
    return this.http.get<any[]>(this.host + "/Vendor/GetJob_Requirements");
  }


  public InsertCandidateRegistration(data) {
    this.url = this.host + "/Vendor/InsertCandidateRegistration";
    return this.http.post(this.url, data);
  }
  public GetCandidateRegistration() {
    return this.http.get<any[]>(this.host + "/Vendor/GetCandidateRegistration");
  }

  public UpdateCandidateRegistrationAcceptReject(id, typeid, shortlist) {
    return this.http.get<any[]>(this.host + "/Vendor/UpdateCandidateRegistrationAcceptReject?ID=" + id + '&TypeID=' + typeid + '&ShortlistionNotes=' + shortlist);
  }

  public UpdateCandidateInterviewSchedule(data) {
    this.url = this.host + "/Vendor/UpdateCandidateInterviewSchedule";
    return this.http.post(this.url, data);
  }

  public GetSlotsMaster() {
    return this.http.get<any[]>(this.host + "/Vendor/GetSlotsMaster");
  }

  public GetStaffs() {
    return this.http.get<any[]>(this.host + "/Vendor/GetStaffs");
  }


  public RejectInterview(id, typeid, rinterview) {
    return this.http.get<any[]>(this.host + "/Vendor/RejectInterview?ID=" + id + '&TypeID=' + typeid + '&Interviewercomments=' + rinterview);
  }

  public UpdateOfferLetter(data) {
    this.url = this.host + "/Vendor/UpdateOfferLetter";
    return this.http.post(this.url, data);
  }

  public AcceptRejectOffer(id, typeid, offercomments) {
    return this.http.get<any[]>(this.host + "/Vendor/AcceptRejectOffer?ID=" + id + '&TypeID=' + typeid + '&OfferComments=' + offercomments);
  }

  public UpdateCandidateJoiningDate(data) {
    this.url = this.host + "/Vendor/UpdateCandidateJoiningDate";
    return this.http.post(this.url, data);
  }


  public UsersHr() {

    return this.http.get<any[]>(this.host + "/Vendor/UsersHr");
  }

  public GetStaffInterviewCalender(startdate, staffid) {
    return this.http.get<any[]>(this.host + "/Vendor/GetStaffInterviewCalender?StartDate=" + startdate + '&StaffID=' + staffid);
  }









  public GetSlotsMasterByStaffID(startdate, staffid) {
    return this.http.get<any[]>(this.host + "/Vendor/GetSlotsMasterByStaffID?Date=" + startdate + '&StaffID=' + staffid);
  }




  public sendemail(data) {
    this.url = this.host + "/Vendor/sendemail";
    return this.http.post(this.url, data);
  }



  public UpdateKeyResultAreas(data) {
    this.url = this.host + "/Vendor/UpdateKeyResultAreas";
    return this.http.post(this.url, data);
  }



  public UpdatePerformanceIndicator(data) {
    this.url = this.host + "/Vendor/UpdatePerformanceIndicator";
    return this.http.post(this.url, data);
  }

  public UpdateAppraisalCycle(data) {
    this.url = this.host + "/Building/UpdateAppraisalCycle";
    return this.http.post(this.url, data);
  }
  // public CheckUrlsData(data) {
  //   debugger
  //   this.url = "https://authserver.dev-ehswatch.com/connect/token?grant_type=" + 'password' + '&scope=' + 'IdentityService' + '&username=' + 'admin' + '&password=' + 'Exceego@123' + '&client_id=' + 'ehswatchapp' + '&client_secret=' + '1q2w3E*';
  //   return this.http.post(this.url,0);
  // }


  public DeleteAppraisalCycle(ID) {

    return this.http.get<any[]>(this.host + "/Building/DeleteAppraisalCycle?ID=" + ID);
  }

  public DeleteKeyResultArea(ID) {

    return this.http.get<any[]>(this.host + "/Building/DeleteKeyResultArea?ID=" + ID);
  }

  public DeletePerformanceIndicator(ID) {

    return this.http.get<any[]>(this.host + "/Building/DeletePerformanceIndicator?ID=" + ID);
  }


  public InsertNotifications(data) {
    this.url = this.host + "/Vendor/InsertNotifications";
    return this.http.post(this.url, data);
  }

  public GetNotifications(staffid) {

    return this.http.get<any[]>(this.host + "/Vendor/GetNotifications?StaffID=" + staffid);
  }

  public GetMenuMaster(lid) {

    return this.http.get<any[]>(this.host + "/Vendor/GetMenuMaster?LanguageID=" + lid);
  }

  public GetSubMenuMaster(lid, menuid) {

    return this.http.get<any[]>(this.host + "/Vendor/GetSubMenuMaster?LanguageID=" + lid + '&MenuID=' + menuid);
  }

  public GetMenuRoleMappingTable(lid) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMenuRoleMappingTable?LanguageID=" + lid);
  }

  public DeleteMenuRoleMappingTable(lid, menuid) {

    return this.http.get<any[]>(this.host + "/Vendor/DeleteMenuRoleMappingTable?RoleID=" + lid + '&MenuID=' + menuid);
  }

  public InsertMenuRoleMappingTable(data) {
    debugger
    this.url = this.host + "/MobileUser/InsertMenuRoleMappingTable";
    return this.http.post(this.url, data);
  }
  public DeleteMenuRoleMappingTableRow(lid) {

    return this.http.get<any[]>(this.host + "/MobileUser/DeleteMenuRoleMappingTableRow?ID=" + lid);
  }

  public GetMenuRoleMappingTableByRoleID(lid, roleid) {

    return this.http.get<any[]>(this.host + "/MobileUser/GetMenuRoleMappingTableByRoleID?LanguageID=" + lid + '&RoleID=' + roleid);
  }
}
