import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxTimeSchedulerService } from './ngx-time-scheduler.service';
import { HeaderDetails, Header, ItemMeta, SectionItem, Text, Events } from './ngx-time-scheduler.model';
import * as moment_ from 'moment';
import { Subscription } from 'rxjs';
const moment = moment_;
let NgxTimeSchedulerComponent = class NgxTimeSchedulerComponent {
    constructor(changeDetector, service) {
        this.changeDetector = changeDetector;
        this.service = service;
        this.currentTimeFormat = 'DD-MMM-YYYY HH:mm';
        this.showCurrentTime = true;
        this.showGoto = true;
        this.showToday = true;
        this.allowDragging = false;
        // @Input() allowResizing = false;
        this.locale = '';
        this.showBusinessDayOnly = false;
        this.headerFormat = 'Do MMM YYYY';
        this.minRowHeight = 40;
        this.maxHeight = null;
        this.text = new Text();
        this.events = new Events();
        this.start = moment().startOf('day');
        this.end = moment().endOf('day');
        this.showGotoModal = false;
        this.currentTimeVisibility = 'visible';
        this.ShowCurrentTimeHandle = null;
        this.SectionLeftMeasure = '0';
        this.currentPeriodMinuteDiff = 0;
        this.subscription = new Subscription();
        this.showCurrentTimeIndicator = () => {
            if (this.ShowCurrentTimeHandle) {
                clearTimeout(this.ShowCurrentTimeHandle);
            }
            const currentTime = moment();
            if (currentTime >= this.start && currentTime <= this.end) {
                this.currentTimeVisibility = 'visible';
                this.currentTimeIndicatorPosition = ((Math.abs(this.start.diff(currentTime, 'minutes')) / this.currentPeriodMinuteDiff) * 100) + '%';
                this.currentTimeTitle = currentTime.format(this.currentTimeFormat);
            }
            else {
                this.currentTimeVisibility = 'hidden';
            }
            this.ShowCurrentTimeHandle = setTimeout(this.showCurrentTimeIndicator, 30000);
        };
        moment.locale(this.locale);
    }
    set SectionTd(elementRef) {
        this.SectionLeftMeasure = elementRef.nativeElement.clientWidth + 'px';
        this.changeDetector.detectChanges();
    }
    ngOnInit() {
        this.setSectionsInSectionItems();
        this.changePeriod(this.periods[0], false);
        this.itemPush();
        this.itemPop();
        this.itemRemove();
        this.sectionPush();
        this.sectionPop();
        this.sectionRemove();
        this.refresh();
    }
    refreshView() {
        this.setSectionsInSectionItems();
        this.changePeriod(this.currentPeriod, false);
    }
    trackByFn(index, item) {
        return index;
    }
    setSectionsInSectionItems() {
        this.sectionItems = new Array();
        this.sections.forEach(section => {
            const perSectionItem = new SectionItem();
            perSectionItem.section = section;
            perSectionItem.minRowHeight = this.minRowHeight;
            this.sectionItems.push(perSectionItem);
        });
    }
    setItemsInSectionItems() {
        const itemMetas = new Array();
        this.sectionItems.forEach(ele => {
            ele.itemMetas = new Array();
            ele.minRowHeight = this.minRowHeight;
            this.items.filter(i => {
                let itemMeta = new ItemMeta();
                if (i.sectionID === ele.section.id) {
                    itemMeta.item = i;
                    if (itemMeta.item.start <= this.end && itemMeta.item.end >= this.start) {
                        itemMeta = this.itemMetaCal(itemMeta);
                        ele.itemMetas.push(itemMeta);
                        itemMetas.push(itemMeta);
                    }
                }
            });
        });
        const sortedItems = itemMetas.reduce((sortItems, itemMeta) => {
            const index = this.sectionItems.findIndex(sectionItem => sectionItem.section.id === itemMeta.item.sectionID);
            if (!sortItems[index]) {
                sortItems[index] = [];
            }
            sortItems[index].push(itemMeta);
            return sortItems;
        }, {});
        this.calCssTop(sortedItems);
    }
    itemMetaCal(itemMeta) {
        const foundStart = moment.max(itemMeta.item.start, this.start);
        const foundEnd = moment.min(itemMeta.item.end, this.end);
        let widthMinuteDiff = Math.abs(foundStart.diff(foundEnd, 'minutes'));
        let leftMinuteDiff = foundStart.diff(this.start, 'minutes');
        if (this.showBusinessDayOnly) {
            widthMinuteDiff -= (this.getNumberOfWeekendDays(moment(foundStart), moment(foundEnd)) * this.currentPeriod.timeFramePeriod);
            leftMinuteDiff -= (this.getNumberOfWeekendDays(moment(this.start), moment(foundStart)) * this.currentPeriod.timeFramePeriod);
        }
        itemMeta.cssLeft = (leftMinuteDiff / this.currentPeriodMinuteDiff) * 100;
        itemMeta.cssWidth = (widthMinuteDiff / this.currentPeriodMinuteDiff) * 100;
        if (itemMeta.item.start >= this.start) {
            itemMeta.isStart = true;
        }
        if (itemMeta.item.end <= this.end) {
            itemMeta.isEnd = true;
        }
        return itemMeta;
    }
    calCssTop(sortedItems) {
        for (const prop of Object.keys(sortedItems)) {
            for (let i = 0; i < sortedItems[prop].length; i++) {
                let elemBottom;
                const elem = sortedItems[prop][i];
                for (let prev = 0; prev < i; prev++) {
                    const prevElem = sortedItems[prop][prev];
                    const prevElemBottom = prevElem.cssTop + this.minRowHeight;
                    elemBottom = elem.cssTop + this.minRowHeight;
                    if (((prevElem.item.start <= elem.item.start && elem.item.start <= prevElem.item.end) ||
                        (prevElem.item.start <= elem.item.end && elem.item.end <= prevElem.item.end) ||
                        (prevElem.item.start >= elem.item.start && elem.item.end >= prevElem.item.end)) && ((prevElem.cssTop <= elem.cssTop && elem.cssTop <= prevElemBottom) ||
                        (prevElem.cssTop <= elemBottom && elemBottom <= prevElemBottom))) {
                        elem.cssTop = prevElemBottom + 1;
                    }
                }
                elemBottom = elem.cssTop + this.minRowHeight + 1;
                if (this.sectionItems[Number(prop)] && elemBottom > this.sectionItems[Number(prop)].minRowHeight) {
                    this.sectionItems[Number(prop)].minRowHeight = elemBottom;
                }
            }
        }
    }
    changePeriod(period, userTrigger = true) {
        this.currentPeriod = period;
        const _start = this.start;
        this.end = moment(_start).add(this.currentPeriod.timeFrameOverall, 'minutes').endOf('day');
        this.currentPeriodMinuteDiff = Math.abs(this.start.diff(this.end, 'minutes'));
        if (userTrigger && this.events.PeriodChange) {
            this.events.PeriodChange(this.start, this.end);
        }
        if (this.showBusinessDayOnly) {
            this.currentPeriodMinuteDiff -=
                (this.getNumberOfWeekendDays(moment(this.start), moment(this.end)) * this.currentPeriod.timeFramePeriod);
        }
        this.header = new Array();
        this.currentPeriod.timeFrameHeaders.forEach((ele, index) => {
            this.header.push(this.getDatesBetweenTwoDates(ele, index));
        });
        this.setItemsInSectionItems();
        this.showCurrentTimeIndicator();
    }
    gotoToday() {
        this.start = moment().startOf('day');
        this.changePeriod(this.currentPeriod);
    }
    nextPeriod() {
        this.start.add(this.currentPeriod.timeFrameOverall, 'minutes');
        this.changePeriod(this.currentPeriod);
    }
    previousPeriod() {
        this.start.subtract(this.currentPeriod.timeFrameOverall, 'minutes');
        this.changePeriod(this.currentPeriod);
    }
    gotoDate(event) {
        this.showGotoModal = false;
        this.start = moment(event).startOf('day');
        this.changePeriod(this.currentPeriod);
    }
    getDatesBetweenTwoDates(format, index) {
        const now = moment(this.start);
        const dates = new Header();
        let prev;
        let colspan = 0;
        while (now.isBefore(this.end) || now.isSame(this.end)) {
            if (!this.showBusinessDayOnly || (now.day() !== 0 && now.day() !== 6)) {
                const headerDetails = new HeaderDetails();
                headerDetails.name = now.locale(this.locale).format(format);
                if (prev && prev !== headerDetails.name) {
                    colspan = 1;
                }
                else {
                    colspan++;
                    dates.headerDetails.pop();
                }
                prev = headerDetails.name;
                headerDetails.colspan = colspan;
                headerDetails.tooltip = this.currentPeriod.timeFrameHeadersTooltip && this.currentPeriod.timeFrameHeadersTooltip[index] ?
                    now.locale(this.locale).format(this.currentPeriod.timeFrameHeadersTooltip[index]) : '';
                dates.headerDetails.push(headerDetails);
            }
            now.add(this.currentPeriod.timeFramePeriod, 'minutes');
        }
        return dates;
    }
    getNumberOfWeekendDays(startDate, endDate) {
        let count = 0;
        while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
            if ((startDate.day() === 0 || startDate.day() === 6)) {
                count++;
            }
            startDate.add(this.currentPeriod.timeFramePeriod, 'minutes');
        }
        return count;
    }
    drop(event) {
        event.item.data.sectionID = event.container.data.id;
        this.refreshView();
        this.events.ItemDropped(event.item.data);
    }
    itemPush() {
        this.subscription.add(this.service.itemAdd.asObservable().subscribe((item) => {
            this.items.push(item);
            this.refreshView();
        }));
    }
    itemPop() {
        this.subscription.add(this.service.item.asObservable().subscribe(() => {
            this.items.pop();
            this.refreshView();
        }));
    }
    itemRemove() {
        this.subscription.add(this.service.itemId.asObservable().subscribe((itemId) => {
            this.items.splice(this.items.findIndex((item) => {
                return item.id === itemId;
            }), 1);
            this.refreshView();
        }));
    }
    sectionPush() {
        this.subscription.add(this.service.sectionAdd.asObservable().subscribe((section) => {
            this.sections.push(section);
            this.refreshView();
        }));
    }
    sectionPop() {
        this.subscription.add(this.service.section.asObservable().subscribe(() => {
            this.sections.pop();
            this.refreshView();
        }));
    }
    sectionRemove() {
        this.subscription.add(this.service.sectionId.asObservable().subscribe((sectionId) => {
            this.sections.splice(this.sections.findIndex((section) => {
                return section.id === sectionId;
            }), 1);
            this.refreshView();
        }));
    }
    refresh() {
        this.subscription.add(this.service.refreshView.asObservable().subscribe(() => {
            this.refreshView();
        }));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
NgxTimeSchedulerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgxTimeSchedulerService }
];
__decorate([
    ViewChild('sectionTd'),
    __metadata("design:type", ElementRef),
    __metadata("design:paramtypes", [ElementRef])
], NgxTimeSchedulerComponent.prototype, "SectionTd", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "currentTimeFormat", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "showCurrentTime", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "showGoto", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "showToday", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "allowDragging", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "locale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "showBusinessDayOnly", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "headerFormat", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "minRowHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NgxTimeSchedulerComponent.prototype, "maxHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "text", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgxTimeSchedulerComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgxTimeSchedulerComponent.prototype, "sections", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgxTimeSchedulerComponent.prototype, "periods", void 0);
__decorate([
    Input(),
    __metadata("design:type", Events)
], NgxTimeSchedulerComponent.prototype, "events", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxTimeSchedulerComponent.prototype, "start", void 0);
NgxTimeSchedulerComponent = __decorate([
    Component({
        selector: 'ngx-ts[items][periods][sections]',
        template: "<div class=\"time-sch-wrapper\" [style.height]=\"maxHeight\">\n  <div class=\"time-sch-header-wrapper mb-1\">\n    <div class=\"time-sch-period-container\">\n      <button class=\"btn\"\n              *ngFor=\"let period of periods\"\n              [ngClass]=\"period.classes\"\n              (click)=\"changePeriod(period)\"\n              [title]=\"period.tooltip? period.tooltip : ''\"\n      >\n        {{period.name}}\n      </button>\n    </div>\n\n    <div class=\"time-sch-time-container\">\n      <button class=\"btn\" *ngIf=\"showGoto\" (click)=\"showGotoModal = !showGotoModal\">{{text.GotoButton}}</button>\n      <div class=\"goto-modal\" *ngIf=\"showGotoModal\">\n        <label>\n          <input type=\"date\" (change)=\"gotoDate($event.target.value)\">\n        </label>\n      </div>\n\n      <button class=\"btn\" *ngIf=\"showToday\" (click)=\"gotoToday()\">{{text.TodayButton}}</button>\n      <button class=\"btn\" (click)=\"previousPeriod()\">{{text.PrevButton}}</button>\n      <button class=\"btn\" (click)=\"nextPeriod()\">{{text.NextButton}}</button>\n    </div>\n\n    <h3 class=\"text-center m-0\">\n      {{ start.locale(locale).format(headerFormat) + ' - ' + end.locale(locale).format(headerFormat)}}\n    </h3>\n  </div>\n\n  <div class=\"time-sch-table-wrapper\">\n    <table class=\"time-sch-table\">\n      <tr *ngFor=\"let timeFrameHeader of header; let i = index; trackBy: trackByFn\">\n\n        <td class=\"time-sch-section text-center\" *ngIf=\"i === 0\" [rowSpan]=\"periods.length\">\n          {{text.SectionTitle}}\n        </td>\n\n        <td class=\"text-center\"\n            *ngFor=\"let dateTime of timeFrameHeader.headerDetails; trackBy: trackByFn\"\n            [colSpan]=\"dateTime.colspan\"\n            [title]=\"dateTime.tooltip? dateTime.tooltip : ''\"\n        >\n          {{dateTime.name}}\n        </td>\n\n      </tr>\n    </table>\n\n    <div class=\"time-sch-content-wrap\">\n      <table class=\"time-sch-table\">\n        <tr *ngFor=\"let sectionItem of sectionItems; trackBy: trackByFn\"\n            [style.height]=\"sectionItem.minRowHeight + 'px'\">\n          <td class=\"time-sch-section text-center\" #sectionTd\n              (click)=\"events.SectionClickEvent ? events.SectionClickEvent(sectionItem.section) : false\"\n              (contextmenu)=\"events.SectionContextMenuEvent ? events.SectionContextMenuEvent(sectionItem.section, $event) : false\"\n              [style.cursor]=\"events.SectionClickEvent ? 'pointer' : ''\"\n              [title]=\"sectionItem.section.tooltip? sectionItem.section.tooltip : ''\"\n          >\n            {{sectionItem.section.name}}\n          </td>\n\n          <td *ngFor=\"let td of header[header.length - 1].headerDetails; trackBy: trackByFn\"></td>\n        </tr>\n      </table>\n\n      <div class=\"time-sch-section-wrapper\" [style.left]=\"SectionLeftMeasure\" cdkDropListGroup>\n        <div class=\"time-sch-section-container\"\n             cdkDropList\n             cdkDropListSortingDisabled\n             [cdkDropListData]=\"sectionItem.section\"\n             (cdkDropListDropped)=\"drop($event)\"\n             *ngFor=\"let sectionItem of sectionItems; trackBy: trackByFn\"\n             [style.height]=\"sectionItem.minRowHeight + 'px'\"\n        >\n          <div class=\"time-sch-item\"\n               cdkDrag\n               cdkDragLockAxis=\"y\"\n               cdkDragBoundary=\".time-sch-section-wrapper\"\n               [cdkDragData]=\"itemMeta.item\"\n               [cdkDragDisabled]=\"!allowDragging\"\n               *ngFor=\"let itemMeta of sectionItem.itemMetas\"\n               [ngClass]=\"itemMeta.item.classes\"\n               (click)=\"events.ItemClicked ? events.ItemClicked(itemMeta.item) : false\"\n               (contextmenu)=\"events.ItemContextMenu ? events.ItemContextMenu(itemMeta.item, $event) : false\"\n               [style.height]=\"minRowHeight + 'px'\"\n               [style.top]=\"itemMeta.cssTop + 'px'\"\n               [style.left]=\"itemMeta.cssLeft + '%'\"\n               [style.width]=\"itemMeta.cssWidth + '%'\"\n          >\n            <div class=\"item-drag-placeholder\"\n                 *cdkDragPlaceholder\n                 [style.height]=\"(minRowHeight - 6) + 'px'\"\n                 [style.left]=\"itemMeta.cssLeft + '%'\"\n                 [style.width]=\"'calc('+ itemMeta.cssWidth + '% - 6px)'\"\n            ></div>\n            <div class=\"time-sch-item-start\" *ngIf=\"itemMeta.isStart\"></div>\n            <div class=\"time-sch-item-content\"\n                 [title]=\"itemMeta.item.tooltip? itemMeta.item.tooltip : ''\">\n              {{itemMeta.item.name}}\n            </div>\n            <div class=\"time-sch-item-end\" *ngIf=\"itemMeta.isEnd\"></div>\n          </div>\n        </div>\n\n        <div class=\"time-sch-current-time\"\n             *ngIf=\"showCurrentTime\"\n             [title]=\"currentTimeTitle\"\n             [style.visibility]=\"currentTimeVisibility\"\n             [style.left]=\"currentTimeIndicatorPosition\"\n        ></div>\n      </div>\n\n    </div>\n  </div>\n</div>\n",
        styles: [".d-inline-block{display:inline-block!important}.text-center{text-align:center!important}.m-0{margin:0!important}.mb-1{margin-bottom:1rem!important}.btn{border:1px solid #e1e1e1;font-weight:600;text-decoration:none;color:#222;height:30px;padding:.5em 1em;cursor:pointer;margin:.2rem;border-radius:4px}.goto-modal{position:absolute;top:100%;left:0;height:auto;width:auto;border-radius:4px;background-color:#ddd;padding:5px;text-align:left;z-index:1}.time-sch-wrapper{overflow:auto}.time-sch-header-wrapper,.time-sch-table-wrapper,.time-sch-wrapper{position:relative}.time-sch-header-wrapper{padding:.5em;margin-bottom:.5em}.time-sch-table{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0}.time-sch-period-container{float:left;position:relative}.time-sch-time-container{float:right;position:relative}.time-sch-wrapper .time-sch-section{width:200px}.time-sch-wrapper td,.time-sch-wrapper th{border-width:1px;border-style:solid;border-color:#e1e1e1 #c1c1c1}.time-sch-content-wrap{position:relative}.time-sch-section-wrapper{position:absolute;top:0;right:0;bottom:0;z-index:1;padding-left:1px;padding-right:1px}.time-sch-section-container{position:relative;overflow:hidden}.time-sch-item{position:absolute;min-height:1em;clear:both;background-color:#29d;color:#fff;border-radius:2px;cursor:pointer;transition:background-color .1s;border:1px solid #c1c1c1}.time-sch-item-content{overflow:hidden;white-space:nowrap;position:relative;z-index:1;padding:4px 0 4px 6px}.time-sch-item-end,.time-sch-item-start{position:absolute;top:2px;bottom:2px}.time-sch-item-start{left:1px;border-right:2px dotted #fff}.time-sch-item-end{right:1px;border-left:2px dotted #fff}.time-sch-current-time{position:absolute;top:0;bottom:0;z-index:2;background:0 0;border-left:1px dotted #000}.item-drag-placeholder{position:absolute;background:#ccc;border:3px dotted #999;transition:transform 250ms cubic-bezier(0,0,.2,1)}"]
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        NgxTimeSchedulerService])
], NgxTimeSchedulerComponent);
export { NgxTimeSchedulerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtc2NoZWR1bGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10aW1lLXNjaGVkdWxlci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtdGltZS1zY2hlZHVsZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUcsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sUUFBUSxFQUdSLFdBQVcsRUFFWCxJQUFJLEVBQ0osTUFBTSxFQUNQLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkIsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFxQ3BDLFlBQ1UsY0FBaUMsRUFDakMsT0FBZ0M7UUFEaEMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBakNqQyxzQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztRQUN4QyxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2QixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0Isa0NBQWtDO1FBQ3pCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsaUJBQVksR0FBRyxhQUFhLENBQUM7UUFDN0IsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIs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L0pBQWtEOztLQUVuRCxDQUFDO3FDQXVDMEIsaUJBQWlCO1FBQ3hCLHVCQUF1QjtHQXZDL0IseUJBQXlCLENBd1VyQztTQXhVWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtOZ3hUaW1lU2NoZWR1bGVyU2VydmljZX0gZnJvbSAnLi9uZ3gtdGltZS1zY2hlZHVsZXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBIZWFkZXJEZXRhaWxzLFxuICBIZWFkZXIsXG4gIEl0ZW1NZXRhLFxuICBJdGVtLFxuICBQZXJpb2QsXG4gIFNlY3Rpb25JdGVtLFxuICBTZWN0aW9uLFxuICBUZXh0LFxuICBFdmVudHNcbn0gZnJvbSAnLi9uZ3gtdGltZS1zY2hlZHVsZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdHNbaXRlbXNdW3BlcmlvZHNdW3NlY3Rpb25zXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGltZS1zY2hlZHVsZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtdGltZS1zY2hlZHVsZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVTY2hlZHVsZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3NlY3Rpb25UZCcpIHNldCBTZWN0aW9uVGQoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuU2VjdGlvbkxlZnRNZWFzdXJlID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoICsgJ3B4JztcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGN1cnJlbnRUaW1lRm9ybWF0ID0gJ0RELU1NTS1ZWVlZIEhIOm1tJztcbiAgQElucHV0KCkgc2hvd0N1cnJlbnRUaW1lID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0dvdG8gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VG9kYXkgPSB0cnVlO1xuICBASW5wdXQoKSBhbGxvd0RyYWdnaW5nID0gZmFsc2U7XG4gIC8vIEBJbnB1dCgpIGFsbG93UmVzaXppbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgbG9jYWxlID0gJyc7XG4gIEBJbnB1dCgpIHNob3dCdXNpbmVzc0RheU9ubHkgPSBmYWxzZTtcbiAgQElucHV0KCkgaGVhZGVyRm9ybWF0ID0gJ0RvIE1NTSBZWVlZJztcbiAgQElucHV0KCkgbWluUm93SGVpZ2h0ID0gNDA7XG4gIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgdGV4dCA9IG5ldyBUZXh0KCk7XG4gIEBJbnB1dCgpIGl0ZW1zOiBJdGVtW107XG4gIEBJbnB1dCgpIHNlY3Rpb25zOiBTZWN0aW9uW107XG4gIEBJbnB1dCgpIHBlcmlvZHM6IFBlcmlvZFtdO1xuICBASW5wdXQoKSBldmVudHM6IEV2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgQElucHV0KCkgc3RhcnQgPSBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcblxuICBlbmQgPSBtb21lbnQoKS5lbmRPZignZGF5Jyk7XG4gIHNob3dHb3RvTW9kYWwgPSBmYWxzZTtcbiAgY3VycmVudFRpbWVJbmRpY2F0b3JQb3NpdGlvbjogc3RyaW5nO1xuICBjdXJyZW50VGltZVZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gIGN1cnJlbnRUaW1lVGl0bGU6IHN0cmluZztcbiAgU2hvd0N1cnJlbnRUaW1lSGFuZGxlID0gbnVsbDtcbiAgU2VjdGlvbkxlZnRNZWFzdXJlID0gJzAnO1xuICBjdXJyZW50UGVyaW9kOiBQZXJpb2Q7XG4gIGN1cnJlbnRQZXJpb2RNaW51dGVEaWZmID0gMDtcbiAgaGVhZGVyOiBIZWFkZXJbXTtcbiAgc2VjdGlvbkl0ZW1zOiBTZWN0aW9uSXRlbVtdO1xuICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBOZ3hUaW1lU2NoZWR1bGVyU2VydmljZVxuICApIHtcbiAgICBtb21lbnQubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0U2VjdGlvbnNJblNlY3Rpb25JdGVtcygpO1xuICAgIHRoaXMuY2hhbmdlUGVyaW9kKHRoaXMucGVyaW9kc1swXSwgZmFsc2UpO1xuICAgIHRoaXMuaXRlbVB1c2goKTtcbiAgICB0aGlzLml0ZW1Qb3AoKTtcbiAgICB0aGlzLml0ZW1SZW1vdmUoKTtcbiAgICB0aGlzLnNlY3Rpb25QdXNoKCk7XG4gICAgdGhpcy5zZWN0aW9uUG9wKCk7XG4gICAgdGhpcy5zZWN0aW9uUmVtb3ZlKCk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICByZWZyZXNoVmlldygpIHtcbiAgICB0aGlzLnNldFNlY3Rpb25zSW5TZWN0aW9uSXRlbXMoKTtcbiAgICB0aGlzLmNoYW5nZVBlcmlvZCh0aGlzLmN1cnJlbnRQZXJpb2QsIGZhbHNlKTtcbiAgfVxuXG4gIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHNldFNlY3Rpb25zSW5TZWN0aW9uSXRlbXMoKSB7XG4gICAgdGhpcy5zZWN0aW9uSXRlbXMgPSBuZXcgQXJyYXk8U2VjdGlvbkl0ZW0+KCk7XG4gICAgdGhpcy5zZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgY29uc3QgcGVyU2VjdGlvbkl0ZW0gPSBuZXcgU2VjdGlvbkl0ZW0oKTtcbiAgICAgIHBlclNlY3Rpb25JdGVtLnNlY3Rpb24gPSBzZWN0aW9uO1xuICAgICAgcGVyU2VjdGlvbkl0ZW0ubWluUm93SGVpZ2h0ID0gdGhpcy5taW5Sb3dIZWlnaHQ7XG4gICAgICB0aGlzLnNlY3Rpb25JdGVtcy5wdXNoKHBlclNlY3Rpb25JdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEl0ZW1zSW5TZWN0aW9uSXRlbXMoKSB7XG4gICAgY29uc3QgaXRlbU1ldGFzID0gbmV3IEFycmF5PEl0ZW1NZXRhPigpO1xuXG4gICAgdGhpcy5zZWN0aW9uSXRlbXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgZWxlLml0ZW1NZXRhcyA9IG5ldyBBcnJheTxJdGVtTWV0YT4oKTtcbiAgICAgIGVsZS5taW5Sb3dIZWlnaHQgPSB0aGlzLm1pblJvd0hlaWdodDtcblxuICAgICAgdGhpcy5pdGVtcy5maWx0ZXIoaSA9PiB7XG4gICAgICAgIGxldCBpdGVtTWV0YSA9IG5ldyBJdGVtTWV0YSgpO1xuXG4gICAgICAgIGlmIChpLnNlY3Rpb25JRCA9PT0gZWxlLnNlY3Rpb24uaWQpIHtcbiAgICAgICAgICBpdGVtTWV0YS5pdGVtID0gaTtcbiAgICAgICAgICBpZiAoaXRlbU1ldGEuaXRlbS5zdGFydCA8PSB0aGlzLmVuZCAmJiBpdGVtTWV0YS5pdGVtLmVuZCA+PSB0aGlzLnN0YXJ0KSB7XG4gICAgICAgICAgICBpdGVtTWV0YSA9IHRoaXMuaXRlbU1ldGFDYWwoaXRlbU1ldGEpO1xuICAgICAgICAgICAgZWxlLml0ZW1NZXRhcy5wdXNoKGl0ZW1NZXRhKTtcbiAgICAgICAgICAgIGl0ZW1NZXRhcy5wdXNoKGl0ZW1NZXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc29ydGVkSXRlbXMgPSBpdGVtTWV0YXMucmVkdWNlKChzb3J0SXRlbXM6IHt9LCBpdGVtTWV0YTogSXRlbU1ldGEpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWN0aW9uSXRlbXMuZmluZEluZGV4KHNlY3Rpb25JdGVtID0+IHNlY3Rpb25JdGVtLnNlY3Rpb24uaWQgPT09IGl0ZW1NZXRhLml0ZW0uc2VjdGlvbklEKTtcbiAgICAgIGlmICghc29ydEl0ZW1zW2luZGV4XSkge1xuICAgICAgICBzb3J0SXRlbXNbaW5kZXhdID0gW107XG4gICAgICB9XG4gICAgICBzb3J0SXRlbXNbaW5kZXhdLnB1c2goaXRlbU1ldGEpO1xuICAgICAgcmV0dXJuIHNvcnRJdGVtcztcbiAgICB9LCB7fSk7XG5cbiAgICB0aGlzLmNhbENzc1RvcChzb3J0ZWRJdGVtcyk7XG4gIH1cblxuICBpdGVtTWV0YUNhbChpdGVtTWV0YTogSXRlbU1ldGEpIHtcbiAgICBjb25zdCBmb3VuZFN0YXJ0ID0gbW9tZW50Lm1heChpdGVtTWV0YS5pdGVtLnN0YXJ0LCB0aGlzLnN0YXJ0KTtcbiAgICBjb25zdCBmb3VuZEVuZCA9IG1vbWVudC5taW4oaXRlbU1ldGEuaXRlbS5lbmQsIHRoaXMuZW5kKTtcblxuICAgIGxldCB3aWR0aE1pbnV0ZURpZmYgPSBNYXRoLmFicyhmb3VuZFN0YXJ0LmRpZmYoZm91bmRFbmQsICdtaW51dGVzJykpO1xuICAgIGxldCBsZWZ0TWludXRlRGlmZiA9IGZvdW5kU3RhcnQuZGlmZih0aGlzLnN0YXJ0LCAnbWludXRlcycpO1xuICAgIGlmICh0aGlzLnNob3dCdXNpbmVzc0RheU9ubHkpIHtcbiAgICAgIHdpZHRoTWludXRlRGlmZiAtPSAodGhpcy5nZXROdW1iZXJPZldlZWtlbmREYXlzKG1vbWVudChmb3VuZFN0YXJ0KSwgbW9tZW50KGZvdW5kRW5kKSkgKiB0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lUGVyaW9kKTtcbiAgICAgIGxlZnRNaW51dGVEaWZmIC09ICh0aGlzLmdldE51bWJlck9mV2Vla2VuZERheXMobW9tZW50KHRoaXMuc3RhcnQpLCBtb21lbnQoZm91bmRTdGFydCkpICogdGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZVBlcmlvZCk7XG4gICAgfVxuXG4gICAgaXRlbU1ldGEuY3NzTGVmdCA9IChsZWZ0TWludXRlRGlmZiAvIHRoaXMuY3VycmVudFBlcmlvZE1pbnV0ZURpZmYpICogMTAwO1xuICAgIGl0ZW1NZXRhLmNzc1dpZHRoID0gKHdpZHRoTWludXRlRGlmZiAvIHRoaXMuY3VycmVudFBlcmlvZE1pbnV0ZURpZmYpICogMTAwO1xuXG4gICAgaWYgKGl0ZW1NZXRhLml0ZW0uc3RhcnQgPj0gdGhpcy5zdGFydCkge1xuICAgICAgaXRlbU1ldGEuaXNTdGFydCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpdGVtTWV0YS5pdGVtLmVuZCA8PSB0aGlzLmVuZCkge1xuICAgICAgaXRlbU1ldGEuaXNFbmQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtTWV0YTtcbiAgfVxuXG4gIGNhbENzc1RvcChzb3J0ZWRJdGVtcykge1xuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhzb3J0ZWRJdGVtcykpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydGVkSXRlbXNbcHJvcF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGVsZW1Cb3R0b207XG4gICAgICAgIGNvbnN0IGVsZW0gPSBzb3J0ZWRJdGVtc1twcm9wXVtpXTtcblxuICAgICAgICBmb3IgKGxldCBwcmV2ID0gMDsgcHJldiA8IGk7IHByZXYrKykge1xuICAgICAgICAgIGNvbnN0IHByZXZFbGVtID0gc29ydGVkSXRlbXNbcHJvcF1bcHJldl07XG4gICAgICAgICAgY29uc3QgcHJldkVsZW1Cb3R0b20gPSBwcmV2RWxlbS5jc3NUb3AgKyB0aGlzLm1pblJvd0hlaWdodDtcbiAgICAgICAgICBlbGVtQm90dG9tID0gZWxlbS5jc3NUb3AgKyB0aGlzLm1pblJvd0hlaWdodDtcblxuICAgICAgICAgIGlmICgoXG4gICAgICAgICAgICAocHJldkVsZW0uaXRlbS5zdGFydCA8PSBlbGVtLml0ZW0uc3RhcnQgJiYgZWxlbS5pdGVtLnN0YXJ0IDw9IHByZXZFbGVtLml0ZW0uZW5kKSB8fFxuICAgICAgICAgICAgKHByZXZFbGVtLml0ZW0uc3RhcnQgPD0gZWxlbS5pdGVtLmVuZCAmJiBlbGVtLml0ZW0uZW5kIDw9IHByZXZFbGVtLml0ZW0uZW5kKSB8fFxuICAgICAgICAgICAgKHByZXZFbGVtLml0ZW0uc3RhcnQgPj0gZWxlbS5pdGVtLnN0YXJ0ICYmIGVsZW0uaXRlbS5lbmQgPj0gcHJldkVsZW0uaXRlbS5lbmQpXG4gICAgICAgICAgKSAmJiAoXG4gICAgICAgICAgICAocHJldkVsZW0uY3NzVG9wIDw9IGVsZW0uY3NzVG9wICYmIGVsZW0uY3NzVG9wIDw9IHByZXZFbGVtQm90dG9tKSB8fFxuICAgICAgICAgICAgKHByZXZFbGVtLmNzc1RvcCA8PSBlbGVtQm90dG9tICYmIGVsZW1Cb3R0b20gPD0gcHJldkVsZW1Cb3R0b20pXG4gICAgICAgICAgKSkge1xuICAgICAgICAgICAgZWxlbS5jc3NUb3AgPSBwcmV2RWxlbUJvdHRvbSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbUJvdHRvbSA9IGVsZW0uY3NzVG9wICsgdGhpcy5taW5Sb3dIZWlnaHQgKyAxO1xuICAgICAgICBpZiAodGhpcy5zZWN0aW9uSXRlbXNbTnVtYmVyKHByb3ApXSAmJiBlbGVtQm90dG9tID4gdGhpcy5zZWN0aW9uSXRlbXNbTnVtYmVyKHByb3ApXS5taW5Sb3dIZWlnaHQpIHtcbiAgICAgICAgICB0aGlzLnNlY3Rpb25JdGVtc1tOdW1iZXIocHJvcCldLm1pblJvd0hlaWdodCA9IGVsZW1Cb3R0b207XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBQZXJpb2QsIHVzZXJUcmlnZ2VyOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuY3VycmVudFBlcmlvZCA9IHBlcmlvZDtcbiAgICBjb25zdCBfc3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgIHRoaXMuZW5kID0gbW9tZW50KF9zdGFydCkuYWRkKHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVPdmVyYWxsLCAnbWludXRlcycpLmVuZE9mKCdkYXknKTtcbiAgICB0aGlzLmN1cnJlbnRQZXJpb2RNaW51dGVEaWZmID0gTWF0aC5hYnModGhpcy5zdGFydC5kaWZmKHRoaXMuZW5kLCAnbWludXRlcycpKTtcblxuICAgIGlmICh1c2VyVHJpZ2dlciAmJiB0aGlzLmV2ZW50cy5QZXJpb2RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuZXZlbnRzLlBlcmlvZENoYW5nZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvd0J1c2luZXNzRGF5T25seSkge1xuICAgICAgdGhpcy5jdXJyZW50UGVyaW9kTWludXRlRGlmZiAtPVxuICAgICAgICAodGhpcy5nZXROdW1iZXJPZldlZWtlbmREYXlzKG1vbWVudCh0aGlzLnN0YXJ0KSwgbW9tZW50KHRoaXMuZW5kKSkgKiB0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lUGVyaW9kKTtcbiAgICB9XG5cbiAgICB0aGlzLmhlYWRlciA9IG5ldyBBcnJheTxIZWFkZXI+KCk7XG4gICAgdGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZUhlYWRlcnMuZm9yRWFjaCgoZWxlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHRoaXMuaGVhZGVyLnB1c2godGhpcy5nZXREYXRlc0JldHdlZW5Ud29EYXRlcyhlbGUsIGluZGV4KSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEl0ZW1zSW5TZWN0aW9uSXRlbXMoKTtcbiAgICB0aGlzLnNob3dDdXJyZW50VGltZUluZGljYXRvcigpO1xuICB9XG5cbiAgc2hvd0N1cnJlbnRUaW1lSW5kaWNhdG9yID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLlNob3dDdXJyZW50VGltZUhhbmRsZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuU2hvd0N1cnJlbnRUaW1lSGFuZGxlKTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpO1xuICAgIGlmIChjdXJyZW50VGltZSA+PSB0aGlzLnN0YXJ0ICYmIGN1cnJlbnRUaW1lIDw9IHRoaXMuZW5kKSB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lVmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgIHRoaXMuY3VycmVudFRpbWVJbmRpY2F0b3JQb3NpdGlvbiA9IChcbiAgICAgICAgKE1hdGguYWJzKHRoaXMuc3RhcnQuZGlmZihjdXJyZW50VGltZSwgJ21pbnV0ZXMnKSkgLyB0aGlzLmN1cnJlbnRQZXJpb2RNaW51dGVEaWZmKSAqIDEwMFxuICAgICAgKSArICclJztcbiAgICAgIHRoaXMuY3VycmVudFRpbWVUaXRsZSA9IGN1cnJlbnRUaW1lLmZvcm1hdCh0aGlzLmN1cnJlbnRUaW1lRm9ybWF0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50VGltZVZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgdGhpcy5TaG93Q3VycmVudFRpbWVIYW5kbGUgPSBzZXRUaW1lb3V0KHRoaXMuc2hvd0N1cnJlbnRUaW1lSW5kaWNhdG9yLCAzMDAwMCk7XG4gIH1cblxuICBnb3RvVG9kYXkoKSB7XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xuICAgIHRoaXMuY2hhbmdlUGVyaW9kKHRoaXMuY3VycmVudFBlcmlvZCk7XG4gIH1cblxuICBuZXh0UGVyaW9kKCkge1xuICAgIHRoaXMuc3RhcnQuYWRkKHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVPdmVyYWxsLCAnbWludXRlcycpO1xuICAgIHRoaXMuY2hhbmdlUGVyaW9kKHRoaXMuY3VycmVudFBlcmlvZCk7XG4gIH1cblxuICBwcmV2aW91c1BlcmlvZCgpIHtcbiAgICB0aGlzLnN0YXJ0LnN1YnRyYWN0KHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVPdmVyYWxsLCAnbWludXRlcycpO1xuICAgIHRoaXMuY2hhbmdlUGVyaW9kKHRoaXMuY3VycmVudFBlcmlvZCk7XG4gIH1cblxuICBnb3RvRGF0ZShldmVudDogYW55KSB7XG4gICAgdGhpcy5zaG93R290b01vZGFsID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydCA9IG1vbWVudChldmVudCkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5jaGFuZ2VQZXJpb2QodGhpcy5jdXJyZW50UGVyaW9kKTtcbiAgfVxuXG4gIGdldERhdGVzQmV0d2VlblR3b0RhdGVzKGZvcm1hdDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogSGVhZGVyIHtcbiAgICBjb25zdCBub3cgPSBtb21lbnQodGhpcy5zdGFydCk7XG4gICAgY29uc3QgZGF0ZXMgPSBuZXcgSGVhZGVyKCk7XG4gICAgbGV0IHByZXY6IHN0cmluZztcbiAgICBsZXQgY29sc3BhbiA9IDA7XG5cbiAgICB3aGlsZSAobm93LmlzQmVmb3JlKHRoaXMuZW5kKSB8fCBub3cuaXNTYW1lKHRoaXMuZW5kKSkge1xuICAgICAgaWYgKCF0aGlzLnNob3dCdXNpbmVzc0RheU9ubHkgfHwgKG5vdy5kYXkoKSAhPT0gMCAmJiBub3cuZGF5KCkgIT09IDYpKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckRldGFpbHMgPSBuZXcgSGVhZGVyRGV0YWlscygpO1xuICAgICAgICBoZWFkZXJEZXRhaWxzLm5hbWUgPSBub3cubG9jYWxlKHRoaXMubG9jYWxlKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgaWYgKHByZXYgJiYgcHJldiAhPT0gaGVhZGVyRGV0YWlscy5uYW1lKSB7XG4gICAgICAgICAgY29sc3BhbiA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sc3BhbisrO1xuICAgICAgICAgIGRhdGVzLmhlYWRlckRldGFpbHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IGhlYWRlckRldGFpbHMubmFtZTtcbiAgICAgICAgaGVhZGVyRGV0YWlscy5jb2xzcGFuID0gY29sc3BhbjtcbiAgICAgICAgaGVhZGVyRGV0YWlscy50b29sdGlwID0gdGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZUhlYWRlcnNUb29sdGlwICYmIHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVIZWFkZXJzVG9vbHRpcFtpbmRleF0gP1xuICAgICAgICAgIG5vdy5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdCh0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lSGVhZGVyc1Rvb2x0aXBbaW5kZXhdKSA6ICcnO1xuICAgICAgICBkYXRlcy5oZWFkZXJEZXRhaWxzLnB1c2goaGVhZGVyRGV0YWlscyk7XG4gICAgICB9XG4gICAgICBub3cuYWRkKHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVQZXJpb2QsICdtaW51dGVzJyk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlcztcbiAgfVxuXG4gIGdldE51bWJlck9mV2Vla2VuZERheXMoc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICB3aGlsZSAoc3RhcnREYXRlLmlzQmVmb3JlKGVuZERhdGUpIHx8IHN0YXJ0RGF0ZS5pc1NhbWUoZW5kRGF0ZSkpIHtcbiAgICAgIGlmICgoc3RhcnREYXRlLmRheSgpID09PSAwIHx8IHN0YXJ0RGF0ZS5kYXkoKSA9PT0gNikpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICAgIHN0YXJ0RGF0ZS5hZGQodGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZVBlcmlvZCwgJ21pbnV0ZXMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZHJvcChldmVudDogQ2RrRHJhZ0Ryb3A8U2VjdGlvbj4pIHtcbiAgICBldmVudC5pdGVtLmRhdGEuc2VjdGlvbklEID0gZXZlbnQuY29udGFpbmVyLmRhdGEuaWQ7XG4gICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgIHRoaXMuZXZlbnRzLkl0ZW1Ecm9wcGVkKGV2ZW50Lml0ZW0uZGF0YSk7XG4gIH1cblxuICBpdGVtUHVzaCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5zZXJ2aWNlLml0ZW1BZGQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChpdGVtOiBJdGVtKSA9PiB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSkpO1xuICB9XG5cbiAgaXRlbVBvcCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5zZXJ2aWNlLml0ZW0uYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMucG9wKCk7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSkpO1xuICB9XG5cbiAgaXRlbVJlbW92ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5zZXJ2aWNlLml0ZW1JZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGl0ZW1JZDogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gaXRlbUlkO1xuICAgICAgfSksIDEpO1xuICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHNlY3Rpb25QdXNoKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2Uuc2VjdGlvbkFkZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKHNlY3Rpb246IFNlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuc2VjdGlvbnMucHVzaChzZWN0aW9uKTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICBzZWN0aW9uUG9wKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2Uuc2VjdGlvbi5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zZWN0aW9ucy5wb3AoKTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICBzZWN0aW9uUmVtb3ZlKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2Uuc2VjdGlvbklkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoc2VjdGlvbklkOiBudW1iZXIpID0+IHtcbiAgICAgIHRoaXMuc2VjdGlvbnMuc3BsaWNlKHRoaXMuc2VjdGlvbnMuZmluZEluZGV4KChzZWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBzZWN0aW9uLmlkID09PSBzZWN0aW9uSWQ7XG4gICAgICB9KSwgMSk7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSkpO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5zZXJ2aWNlLnJlZnJlc2hWaWV3LmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=