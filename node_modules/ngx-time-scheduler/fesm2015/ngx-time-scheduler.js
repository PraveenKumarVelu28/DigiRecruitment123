import { __decorate, __metadata } from 'tslib';
import { ɵɵdefineInjectable, Injectable, ChangeDetectorRef, ViewChild, ElementRef, Input, Component, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as moment_ from 'moment';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

let NgxTimeSchedulerService = class NgxTimeSchedulerService {
    constructor() {
        this.item = new Subject();
        this.itemAdd = new Subject();
        this.itemId = new Subject();
        this.sectionAdd = new Subject();
        this.section = new Subject();
        this.sectionId = new Subject();
        this.refreshView = new Subject();
    }
    itemPush(item) {
        this.itemAdd.next(item);
    }
    itemPop() {
        this.item.next();
    }
    itemRemove(id) {
        this.itemId.next(id);
    }
    sectionPush(section) {
        this.sectionAdd.next(section);
    }
    sectionPop() {
        this.section.next();
    }
    sectionRemove(id) {
        this.sectionId.next(id);
    }
    refresh() {
        this.refreshView.next();
    }
};
NgxTimeSchedulerService.ɵprov = ɵɵdefineInjectable({ factory: function NgxTimeSchedulerService_Factory() { return new NgxTimeSchedulerService(); }, token: NgxTimeSchedulerService, providedIn: "root" });
NgxTimeSchedulerService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], NgxTimeSchedulerService);

class Period {
}
class Item {
}
class Section {
}
class Text {
    constructor() {
        this.NextButton = 'Next';
        this.PrevButton = 'Prev';
        this.TodayButton = 'Today';
        this.GotoButton = 'Go to';
        this.SectionTitle = 'Section';
    }
}
class Events {
}
class SectionItem {
    constructor() {
        this.itemMetas = new Array();
    }
}
class ItemMeta {
    constructor() {
        this.cssTop = 0;
        this.cssLeft = 0;
        this.cssWidth = 0;
    }
}
class Header {
    constructor() {
        this.headerDetails = new Array();
    }
}
class HeaderDetails {
}

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

let NgxTimeSchedulerModule = class NgxTimeSchedulerModule {
};
NgxTimeSchedulerModule = __decorate([
    NgModule({
        declarations: [NgxTimeSchedulerComponent],
        imports: [
            CommonModule,
            DragDropModule
        ],
        exports: [NgxTimeSchedulerComponent]
    })
], NgxTimeSchedulerModule);

/*
 * Public API Surface of ngx-time-scheduler
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Events, Header, HeaderDetails, Item, ItemMeta, NgxTimeSchedulerComponent, NgxTimeSchedulerModule, NgxTimeSchedulerService, Period, Section, SectionItem, Text };
//# sourceMappingURL=ngx-time-scheduler.js.map
