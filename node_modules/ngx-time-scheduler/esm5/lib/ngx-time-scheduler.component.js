import { __decorate, __metadata, __values } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxTimeSchedulerService } from './ngx-time-scheduler.service';
import { HeaderDetails, Header, ItemMeta, SectionItem, Text, Events } from './ngx-time-scheduler.model';
import * as moment_ from 'moment';
import { Subscription } from 'rxjs';
var moment = moment_;
var NgxTimeSchedulerComponent = /** @class */ (function () {
    function NgxTimeSchedulerComponent(changeDetector, service) {
        var _this = this;
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
        this.showCurrentTimeIndicator = function () {
            if (_this.ShowCurrentTimeHandle) {
                clearTimeout(_this.ShowCurrentTimeHandle);
            }
            var currentTime = moment();
            if (currentTime >= _this.start && currentTime <= _this.end) {
                _this.currentTimeVisibility = 'visible';
                _this.currentTimeIndicatorPosition = ((Math.abs(_this.start.diff(currentTime, 'minutes')) / _this.currentPeriodMinuteDiff) * 100) + '%';
                _this.currentTimeTitle = currentTime.format(_this.currentTimeFormat);
            }
            else {
                _this.currentTimeVisibility = 'hidden';
            }
            _this.ShowCurrentTimeHandle = setTimeout(_this.showCurrentTimeIndicator, 30000);
        };
        moment.locale(this.locale);
    }
    Object.defineProperty(NgxTimeSchedulerComponent.prototype, "SectionTd", {
        set: function (elementRef) {
            this.SectionLeftMeasure = elementRef.nativeElement.clientWidth + 'px';
            this.changeDetector.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    NgxTimeSchedulerComponent.prototype.ngOnInit = function () {
        this.setSectionsInSectionItems();
        this.changePeriod(this.periods[0], false);
        this.itemPush();
        this.itemPop();
        this.itemRemove();
        this.sectionPush();
        this.sectionPop();
        this.sectionRemove();
        this.refresh();
    };
    NgxTimeSchedulerComponent.prototype.refreshView = function () {
        this.setSectionsInSectionItems();
        this.changePeriod(this.currentPeriod, false);
    };
    NgxTimeSchedulerComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    NgxTimeSchedulerComponent.prototype.setSectionsInSectionItems = function () {
        var _this = this;
        this.sectionItems = new Array();
        this.sections.forEach(function (section) {
            var perSectionItem = new SectionItem();
            perSectionItem.section = section;
            perSectionItem.minRowHeight = _this.minRowHeight;
            _this.sectionItems.push(perSectionItem);
        });
    };
    NgxTimeSchedulerComponent.prototype.setItemsInSectionItems = function () {
        var _this = this;
        var itemMetas = new Array();
        this.sectionItems.forEach(function (ele) {
            ele.itemMetas = new Array();
            ele.minRowHeight = _this.minRowHeight;
            _this.items.filter(function (i) {
                var itemMeta = new ItemMeta();
                if (i.sectionID === ele.section.id) {
                    itemMeta.item = i;
                    if (itemMeta.item.start <= _this.end && itemMeta.item.end >= _this.start) {
                        itemMeta = _this.itemMetaCal(itemMeta);
                        ele.itemMetas.push(itemMeta);
                        itemMetas.push(itemMeta);
                    }
                }
            });
        });
        var sortedItems = itemMetas.reduce(function (sortItems, itemMeta) {
            var index = _this.sectionItems.findIndex(function (sectionItem) { return sectionItem.section.id === itemMeta.item.sectionID; });
            if (!sortItems[index]) {
                sortItems[index] = [];
            }
            sortItems[index].push(itemMeta);
            return sortItems;
        }, {});
        this.calCssTop(sortedItems);
    };
    NgxTimeSchedulerComponent.prototype.itemMetaCal = function (itemMeta) {
        var foundStart = moment.max(itemMeta.item.start, this.start);
        var foundEnd = moment.min(itemMeta.item.end, this.end);
        var widthMinuteDiff = Math.abs(foundStart.diff(foundEnd, 'minutes'));
        var leftMinuteDiff = foundStart.diff(this.start, 'minutes');
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
    };
    NgxTimeSchedulerComponent.prototype.calCssTop = function (sortedItems) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(sortedItems)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                for (var i = 0; i < sortedItems[prop].length; i++) {
                    var elemBottom = void 0;
                    var elem = sortedItems[prop][i];
                    for (var prev = 0; prev < i; prev++) {
                        var prevElem = sortedItems[prop][prev];
                        var prevElemBottom = prevElem.cssTop + this.minRowHeight;
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    NgxTimeSchedulerComponent.prototype.changePeriod = function (period, userTrigger) {
        var _this = this;
        if (userTrigger === void 0) { userTrigger = true; }
        this.currentPeriod = period;
        var _start = this.start;
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
        this.currentPeriod.timeFrameHeaders.forEach(function (ele, index) {
            _this.header.push(_this.getDatesBetweenTwoDates(ele, index));
        });
        this.setItemsInSectionItems();
        this.showCurrentTimeIndicator();
    };
    NgxTimeSchedulerComponent.prototype.gotoToday = function () {
        this.start = moment().startOf('day');
        this.changePeriod(this.currentPeriod);
    };
    NgxTimeSchedulerComponent.prototype.nextPeriod = function () {
        this.start.add(this.currentPeriod.timeFrameOverall, 'minutes');
        this.changePeriod(this.currentPeriod);
    };
    NgxTimeSchedulerComponent.prototype.previousPeriod = function () {
        this.start.subtract(this.currentPeriod.timeFrameOverall, 'minutes');
        this.changePeriod(this.currentPeriod);
    };
    NgxTimeSchedulerComponent.prototype.gotoDate = function (event) {
        this.showGotoModal = false;
        this.start = moment(event).startOf('day');
        this.changePeriod(this.currentPeriod);
    };
    NgxTimeSchedulerComponent.prototype.getDatesBetweenTwoDates = function (format, index) {
        var now = moment(this.start);
        var dates = new Header();
        var prev;
        var colspan = 0;
        while (now.isBefore(this.end) || now.isSame(this.end)) {
            if (!this.showBusinessDayOnly || (now.day() !== 0 && now.day() !== 6)) {
                var headerDetails = new HeaderDetails();
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
    };
    NgxTimeSchedulerComponent.prototype.getNumberOfWeekendDays = function (startDate, endDate) {
        var count = 0;
        while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
            if ((startDate.day() === 0 || startDate.day() === 6)) {
                count++;
            }
            startDate.add(this.currentPeriod.timeFramePeriod, 'minutes');
        }
        return count;
    };
    NgxTimeSchedulerComponent.prototype.drop = function (event) {
        event.item.data.sectionID = event.container.data.id;
        this.refreshView();
        this.events.ItemDropped(event.item.data);
    };
    NgxTimeSchedulerComponent.prototype.itemPush = function () {
        var _this = this;
        this.subscription.add(this.service.itemAdd.asObservable().subscribe(function (item) {
            _this.items.push(item);
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.itemPop = function () {
        var _this = this;
        this.subscription.add(this.service.item.asObservable().subscribe(function () {
            _this.items.pop();
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.itemRemove = function () {
        var _this = this;
        this.subscription.add(this.service.itemId.asObservable().subscribe(function (itemId) {
            _this.items.splice(_this.items.findIndex(function (item) {
                return item.id === itemId;
            }), 1);
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.sectionPush = function () {
        var _this = this;
        this.subscription.add(this.service.sectionAdd.asObservable().subscribe(function (section) {
            _this.sections.push(section);
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.sectionPop = function () {
        var _this = this;
        this.subscription.add(this.service.section.asObservable().subscribe(function () {
            _this.sections.pop();
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.sectionRemove = function () {
        var _this = this;
        this.subscription.add(this.service.sectionId.asObservable().subscribe(function (sectionId) {
            _this.sections.splice(_this.sections.findIndex(function (section) {
                return section.id === sectionId;
            }), 1);
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.refresh = function () {
        var _this = this;
        this.subscription.add(this.service.refreshView.asObservable().subscribe(function () {
            _this.refreshView();
        }));
    };
    NgxTimeSchedulerComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    NgxTimeSchedulerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgxTimeSchedulerService }
    ]; };
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
    return NgxTimeSchedulerComponent;
}());
export { NgxTimeSchedulerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtc2NoZWR1bGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10aW1lLXNjaGVkdWxlci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtdGltZS1zY2hlZHVsZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUcsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sUUFBUSxFQUdSLFdBQVcsRUFFWCxJQUFJLEVBQ0osTUFBTSxFQUNQLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkI7SUFxQ0UsbUNBQ1UsY0FBaUMsRUFDakMsT0FBZ0M7UUFGMUMsaUJBS0M7UUFKUyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFqQ2pDLHNCQUFpQixHQUFHLG1CQUFtQixDQUFDO1FBQ3hDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixrQ0FBa0M7UUFDekIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QixpQkFBWSxHQUFHLGFBQWEsQ0FBQztRQUM3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixjQUFTLEdBQVcsSUFBSSxDQUFD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QWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7K0RBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzs4REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7a0NBQVMsTUFBTTs2REFBZ0I7SUFDOUI7UUFBUixLQUFLLEVBQUU7OzREQUFpQztJQXRCOUIseUJBQXlCO1FBTHJDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQ0FBa0M7WUFDNUMsNi9KQUFrRDs7U0FFbkQsQ0FBQzt5Q0F1QzBCLGlCQUFpQjtZQUN4Qix1QkFBdUI7T0F2Qy9CLHlCQUF5QixDQXdVckM7SUFBRCxnQ0FBQztDQUFBLEFBeFVELElBd1VDO1NBeFVZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge05neFRpbWVTY2hlZHVsZXJTZXJ2aWNlfSBmcm9tICcuL25neC10aW1lLXNjaGVkdWxlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEhlYWRlckRldGFpbHMsXG4gIEhlYWRlcixcbiAgSXRlbU1ldGEsXG4gIEl0ZW0sXG4gIFBlcmlvZCxcbiAgU2VjdGlvbkl0ZW0sXG4gIFNlY3Rpb24sXG4gIFRleHQsXG4gIEV2ZW50c1xufSBmcm9tICcuL25neC10aW1lLXNjaGVkdWxlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10c1tpdGVtc11bcGVyaW9kc11bc2VjdGlvbnNdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC10aW1lLXNjaGVkdWxlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC10aW1lLXNjaGVkdWxlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGltZVNjaGVkdWxlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnc2VjdGlvblRkJykgc2V0IFNlY3Rpb25UZChlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5TZWN0aW9uTGVmdE1lYXN1cmUgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggKyAncHgnO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgQElucHV0KCkgY3VycmVudFRpbWVGb3JtYXQgPSAnREQtTU1NLVlZWVkgSEg6bW0nO1xuICBASW5wdXQoKSBzaG93Q3VycmVudFRpbWUgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93R290byA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dUb2RheSA9IHRydWU7XG4gIEBJbnB1dCgpIGFsbG93RHJhZ2dpbmcgPSBmYWxzZTtcbiAgLy8gQElucHV0KCkgYWxsb3dSZXNpemluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUgPSAnJztcbiAgQElucHV0KCkgc2hvd0J1c2luZXNzRGF5T25seSA9IGZhbHNlO1xuICBASW5wdXQoKSBoZWFkZXJGb3JtYXQgPSAnRG8gTU1NIFlZWVknO1xuICBASW5wdXQoKSBtaW5Sb3dIZWlnaHQgPSA0MDtcbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSB0ZXh0ID0gbmV3IFRleHQoKTtcbiAgQElucHV0KCkgaXRlbXM6IEl0ZW1bXTtcbiAgQElucHV0KCkgc2VjdGlvbnM6IFNlY3Rpb25bXTtcbiAgQElucHV0KCkgcGVyaW9kczogUGVyaW9kW107XG4gIEBJbnB1dCgpIGV2ZW50czogRXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBASW5wdXQoKSBzdGFydCA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xuXG4gIGVuZCA9IG1vbWVudCgpLmVuZE9mKCdkYXknKTtcbiAgc2hvd0dvdG9Nb2RhbCA9IGZhbHNlO1xuICBjdXJyZW50VGltZUluZGljYXRvclBvc2l0aW9uOiBzdHJpbmc7XG4gIGN1cnJlbnRUaW1lVmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgY3VycmVudFRpbWVUaXRsZTogc3RyaW5nO1xuICBTaG93Q3VycmVudFRpbWVIYW5kbGUgPSBudWxsO1xuICBTZWN0aW9uTGVmdE1lYXN1cmUgPSAnMCc7XG4gIGN1cnJlbnRQZXJpb2Q6IFBlcmlvZDtcbiAgY3VycmVudFBlcmlvZE1pbnV0ZURpZmYgPSAwO1xuICBoZWFkZXI6IEhlYWRlcltdO1xuICBzZWN0aW9uSXRlbXM6IFNlY3Rpb25JdGVtW107XG4gIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHNlcnZpY2U6IE5neFRpbWVTY2hlZHVsZXJTZXJ2aWNlXG4gICkge1xuICAgIG1vbWVudC5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRTZWN0aW9uc0luU2VjdGlvbkl0ZW1zKCk7XG4gICAgdGhpcy5jaGFuZ2VQZXJpb2QodGhpcy5wZXJpb2RzWzBdLCBmYWxzZSk7XG4gICAgdGhpcy5pdGVtUHVzaCgpO1xuICAgIHRoaXMuaXRlbVBvcCgpO1xuICAgIHRoaXMuaXRlbVJlbW92ZSgpO1xuICAgIHRoaXMuc2VjdGlvblB1c2goKTtcbiAgICB0aGlzLnNlY3Rpb25Qb3AoKTtcbiAgICB0aGlzLnNlY3Rpb25SZW1vdmUoKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHJlZnJlc2hWaWV3KCkge1xuICAgIHRoaXMuc2V0U2VjdGlvbnNJblNlY3Rpb25JdGVtcygpO1xuICAgIHRoaXMuY2hhbmdlUGVyaW9kKHRoaXMuY3VycmVudFBlcmlvZCwgZmFsc2UpO1xuICB9XG5cbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgc2V0U2VjdGlvbnNJblNlY3Rpb25JdGVtcygpIHtcbiAgICB0aGlzLnNlY3Rpb25JdGVtcyA9IG5ldyBBcnJheTxTZWN0aW9uSXRlbT4oKTtcbiAgICB0aGlzLnNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBjb25zdCBwZXJTZWN0aW9uSXRlbSA9IG5ldyBTZWN0aW9uSXRlbSgpO1xuICAgICAgcGVyU2VjdGlvbkl0ZW0uc2VjdGlvbiA9IHNlY3Rpb247XG4gICAgICBwZXJTZWN0aW9uSXRlbS5taW5Sb3dIZWlnaHQgPSB0aGlzLm1pblJvd0hlaWdodDtcbiAgICAgIHRoaXMuc2VjdGlvbkl0ZW1zLnB1c2gocGVyU2VjdGlvbkl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SXRlbXNJblNlY3Rpb25JdGVtcygpIHtcbiAgICBjb25zdCBpdGVtTWV0YXMgPSBuZXcgQXJyYXk8SXRlbU1ldGE+KCk7XG5cbiAgICB0aGlzLnNlY3Rpb25JdGVtcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICBlbGUuaXRlbU1ldGFzID0gbmV3IEFycmF5PEl0ZW1NZXRhPigpO1xuICAgICAgZWxlLm1pblJvd0hlaWdodCA9IHRoaXMubWluUm93SGVpZ2h0O1xuXG4gICAgICB0aGlzLml0ZW1zLmZpbHRlcihpID0+IHtcbiAgICAgICAgbGV0IGl0ZW1NZXRhID0gbmV3IEl0ZW1NZXRhKCk7XG5cbiAgICAgICAgaWYgKGkuc2VjdGlvbklEID09PSBlbGUuc2VjdGlvbi5pZCkge1xuICAgICAgICAgIGl0ZW1NZXRhLml0ZW0gPSBpO1xuICAgICAgICAgIGlmIChpdGVtTWV0YS5pdGVtLnN0YXJ0IDw9IHRoaXMuZW5kICYmIGl0ZW1NZXRhLml0ZW0uZW5kID49IHRoaXMuc3RhcnQpIHtcbiAgICAgICAgICAgIGl0ZW1NZXRhID0gdGhpcy5pdGVtTWV0YUNhbChpdGVtTWV0YSk7XG4gICAgICAgICAgICBlbGUuaXRlbU1ldGFzLnB1c2goaXRlbU1ldGEpO1xuICAgICAgICAgICAgaXRlbU1ldGFzLnB1c2goaXRlbU1ldGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzb3J0ZWRJdGVtcyA9IGl0ZW1NZXRhcy5yZWR1Y2UoKHNvcnRJdGVtczoge30sIGl0ZW1NZXRhOiBJdGVtTWV0YSkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlY3Rpb25JdGVtcy5maW5kSW5kZXgoc2VjdGlvbkl0ZW0gPT4gc2VjdGlvbkl0ZW0uc2VjdGlvbi5pZCA9PT0gaXRlbU1ldGEuaXRlbS5zZWN0aW9uSUQpO1xuICAgICAgaWYgKCFzb3J0SXRlbXNbaW5kZXhdKSB7XG4gICAgICAgIHNvcnRJdGVtc1tpbmRleF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHNvcnRJdGVtc1tpbmRleF0ucHVzaChpdGVtTWV0YSk7XG4gICAgICByZXR1cm4gc29ydEl0ZW1zO1xuICAgIH0sIHt9KTtcblxuICAgIHRoaXMuY2FsQ3NzVG9wKHNvcnRlZEl0ZW1zKTtcbiAgfVxuXG4gIGl0ZW1NZXRhQ2FsKGl0ZW1NZXRhOiBJdGVtTWV0YSkge1xuICAgIGNvbnN0IGZvdW5kU3RhcnQgPSBtb21lbnQubWF4KGl0ZW1NZXRhLml0ZW0uc3RhcnQsIHRoaXMuc3RhcnQpO1xuICAgIGNvbnN0IGZvdW5kRW5kID0gbW9tZW50Lm1pbihpdGVtTWV0YS5pdGVtLmVuZCwgdGhpcy5lbmQpO1xuXG4gICAgbGV0IHdpZHRoTWludXRlRGlmZiA9IE1hdGguYWJzKGZvdW5kU3RhcnQuZGlmZihmb3VuZEVuZCwgJ21pbnV0ZXMnKSk7XG4gICAgbGV0IGxlZnRNaW51dGVEaWZmID0gZm91bmRTdGFydC5kaWZmKHRoaXMuc3RhcnQsICdtaW51dGVzJyk7XG4gICAgaWYgKHRoaXMuc2hvd0J1c2luZXNzRGF5T25seSkge1xuICAgICAgd2lkdGhNaW51dGVEaWZmIC09ICh0aGlzLmdldE51bWJlck9mV2Vla2VuZERheXMobW9tZW50KGZvdW5kU3RhcnQpLCBtb21lbnQoZm91bmRFbmQpKSAqIHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVQZXJpb2QpO1xuICAgICAgbGVmdE1pbnV0ZURpZmYgLT0gKHRoaXMuZ2V0TnVtYmVyT2ZXZWVrZW5kRGF5cyhtb21lbnQodGhpcy5zdGFydCksIG1vbWVudChmb3VuZFN0YXJ0KSkgKiB0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lUGVyaW9kKTtcbiAgICB9XG5cbiAgICBpdGVtTWV0YS5jc3NMZWZ0ID0gKGxlZnRNaW51dGVEaWZmIC8gdGhpcy5jdXJyZW50UGVyaW9kTWludXRlRGlmZikgKiAxMDA7XG4gICAgaXRlbU1ldGEuY3NzV2lkdGggPSAod2lkdGhNaW51dGVEaWZmIC8gdGhpcy5jdXJyZW50UGVyaW9kTWludXRlRGlmZikgKiAxMDA7XG5cbiAgICBpZiAoaXRlbU1ldGEuaXRlbS5zdGFydCA+PSB0aGlzLnN0YXJ0KSB7XG4gICAgICBpdGVtTWV0YS5pc1N0YXJ0ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGl0ZW1NZXRhLml0ZW0uZW5kIDw9IHRoaXMuZW5kKSB7XG4gICAgICBpdGVtTWV0YS5pc0VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1NZXRhO1xuICB9XG5cbiAgY2FsQ3NzVG9wKHNvcnRlZEl0ZW1zKSB7XG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKHNvcnRlZEl0ZW1zKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWRJdGVtc1twcm9wXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZWxlbUJvdHRvbTtcbiAgICAgICAgY29uc3QgZWxlbSA9IHNvcnRlZEl0ZW1zW3Byb3BdW2ldO1xuXG4gICAgICAgIGZvciAobGV0IHByZXYgPSAwOyBwcmV2IDwgaTsgcHJldisrKSB7XG4gICAgICAgICAgY29uc3QgcHJldkVsZW0gPSBzb3J0ZWRJdGVtc1twcm9wXVtwcmV2XTtcbiAgICAgICAgICBjb25zdCBwcmV2RWxlbUJvdHRvbSA9IHByZXZFbGVtLmNzc1RvcCArIHRoaXMubWluUm93SGVpZ2h0O1xuICAgICAgICAgIGVsZW1Cb3R0b20gPSBlbGVtLmNzc1RvcCArIHRoaXMubWluUm93SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKChcbiAgICAgICAgICAgIChwcmV2RWxlbS5pdGVtLnN0YXJ0IDw9IGVsZW0uaXRlbS5zdGFydCAmJiBlbGVtLml0ZW0uc3RhcnQgPD0gcHJldkVsZW0uaXRlbS5lbmQpIHx8XG4gICAgICAgICAgICAocHJldkVsZW0uaXRlbS5zdGFydCA8PSBlbGVtLml0ZW0uZW5kICYmIGVsZW0uaXRlbS5lbmQgPD0gcHJldkVsZW0uaXRlbS5lbmQpIHx8XG4gICAgICAgICAgICAocHJldkVsZW0uaXRlbS5zdGFydCA+PSBlbGVtLml0ZW0uc3RhcnQgJiYgZWxlbS5pdGVtLmVuZCA+PSBwcmV2RWxlbS5pdGVtLmVuZClcbiAgICAgICAgICApICYmIChcbiAgICAgICAgICAgIChwcmV2RWxlbS5jc3NUb3AgPD0gZWxlbS5jc3NUb3AgJiYgZWxlbS5jc3NUb3AgPD0gcHJldkVsZW1Cb3R0b20pIHx8XG4gICAgICAgICAgICAocHJldkVsZW0uY3NzVG9wIDw9IGVsZW1Cb3R0b20gJiYgZWxlbUJvdHRvbSA8PSBwcmV2RWxlbUJvdHRvbSlcbiAgICAgICAgICApKSB7XG4gICAgICAgICAgICBlbGVtLmNzc1RvcCA9IHByZXZFbGVtQm90dG9tICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtQm90dG9tID0gZWxlbS5jc3NUb3AgKyB0aGlzLm1pblJvd0hlaWdodCArIDE7XG4gICAgICAgIGlmICh0aGlzLnNlY3Rpb25JdGVtc1tOdW1iZXIocHJvcCldICYmIGVsZW1Cb3R0b20gPiB0aGlzLnNlY3Rpb25JdGVtc1tOdW1iZXIocHJvcCldLm1pblJvd0hlaWdodCkge1xuICAgICAgICAgIHRoaXMuc2VjdGlvbkl0ZW1zW051bWJlcihwcm9wKV0ubWluUm93SGVpZ2h0ID0gZWxlbUJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFBlcmlvZCwgdXNlclRyaWdnZXI6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5jdXJyZW50UGVyaW9kID0gcGVyaW9kO1xuICAgIGNvbnN0IF9zdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgdGhpcy5lbmQgPSBtb21lbnQoX3N0YXJ0KS5hZGQodGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZU92ZXJhbGwsICdtaW51dGVzJykuZW5kT2YoJ2RheScpO1xuICAgIHRoaXMuY3VycmVudFBlcmlvZE1pbnV0ZURpZmYgPSBNYXRoLmFicyh0aGlzLnN0YXJ0LmRpZmYodGhpcy5lbmQsICdtaW51dGVzJykpO1xuXG4gICAgaWYgKHVzZXJUcmlnZ2VyICYmIHRoaXMuZXZlbnRzLlBlcmlvZENoYW5nZSkge1xuICAgICAgdGhpcy5ldmVudHMuUGVyaW9kQ2hhbmdlKHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG93QnVzaW5lc3NEYXlPbmx5KSB7XG4gICAgICB0aGlzLmN1cnJlbnRQZXJpb2RNaW51dGVEaWZmIC09XG4gICAgICAgICh0aGlzLmdldE51bWJlck9mV2Vla2VuZERheXMobW9tZW50KHRoaXMuc3RhcnQpLCBtb21lbnQodGhpcy5lbmQpKSAqIHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVQZXJpb2QpO1xuICAgIH1cblxuICAgIHRoaXMuaGVhZGVyID0gbmV3IEFycmF5PEhlYWRlcj4oKTtcbiAgICB0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lSGVhZGVycy5mb3JFYWNoKChlbGU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy5oZWFkZXIucHVzaCh0aGlzLmdldERhdGVzQmV0d2VlblR3b0RhdGVzKGVsZSwgaW5kZXgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0SXRlbXNJblNlY3Rpb25JdGVtcygpO1xuICAgIHRoaXMuc2hvd0N1cnJlbnRUaW1lSW5kaWNhdG9yKCk7XG4gIH1cblxuICBzaG93Q3VycmVudFRpbWVJbmRpY2F0b3IgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuU2hvd0N1cnJlbnRUaW1lSGFuZGxlKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5TaG93Q3VycmVudFRpbWVIYW5kbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCk7XG4gICAgaWYgKGN1cnJlbnRUaW1lID49IHRoaXMuc3RhcnQgJiYgY3VycmVudFRpbWUgPD0gdGhpcy5lbmQpIHtcbiAgICAgIHRoaXMuY3VycmVudFRpbWVWaXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgdGhpcy5jdXJyZW50VGltZUluZGljYXRvclBvc2l0aW9uID0gKFxuICAgICAgICAoTWF0aC5hYnModGhpcy5zdGFydC5kaWZmKGN1cnJlbnRUaW1lLCAnbWludXRlcycpKSAvIHRoaXMuY3VycmVudFBlcmlvZE1pbnV0ZURpZmYpICogMTAwXG4gICAgICApICsgJyUnO1xuICAgICAgdGhpcy5jdXJyZW50VGltZVRpdGxlID0gY3VycmVudFRpbWUuZm9ybWF0KHRoaXMuY3VycmVudFRpbWVGb3JtYXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lVmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICB0aGlzLlNob3dDdXJyZW50VGltZUhhbmRsZSA9IHNldFRpbWVvdXQodGhpcy5zaG93Q3VycmVudFRpbWVJbmRpY2F0b3IsIDMwMDAwKTtcbiAgfVxuXG4gIGdvdG9Ub2RheSgpIHtcbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XG4gICAgdGhpcy5jaGFuZ2VQZXJpb2QodGhpcy5jdXJyZW50UGVyaW9kKTtcbiAgfVxuXG4gIG5leHRQZXJpb2QoKSB7XG4gICAgdGhpcy5zdGFydC5hZGQodGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZU92ZXJhbGwsICdtaW51dGVzJyk7XG4gICAgdGhpcy5jaGFuZ2VQZXJpb2QodGhpcy5jdXJyZW50UGVyaW9kKTtcbiAgfVxuXG4gIHByZXZpb3VzUGVyaW9kKCkge1xuICAgIHRoaXMuc3RhcnQuc3VidHJhY3QodGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZU92ZXJhbGwsICdtaW51dGVzJyk7XG4gICAgdGhpcy5jaGFuZ2VQZXJpb2QodGhpcy5jdXJyZW50UGVyaW9kKTtcbiAgfVxuXG4gIGdvdG9EYXRlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNob3dHb3RvTW9kYWwgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXJ0ID0gbW9tZW50KGV2ZW50KS5zdGFydE9mKCdkYXknKTtcbiAgICB0aGlzLmNoYW5nZVBlcmlvZCh0aGlzLmN1cnJlbnRQZXJpb2QpO1xuICB9XG5cbiAgZ2V0RGF0ZXNCZXR3ZWVuVHdvRGF0ZXMoZm9ybWF0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBIZWFkZXIge1xuICAgIGNvbnN0IG5vdyA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcbiAgICBjb25zdCBkYXRlcyA9IG5ldyBIZWFkZXIoKTtcbiAgICBsZXQgcHJldjogc3RyaW5nO1xuICAgIGxldCBjb2xzcGFuID0gMDtcblxuICAgIHdoaWxlIChub3cuaXNCZWZvcmUodGhpcy5lbmQpIHx8IG5vdy5pc1NhbWUodGhpcy5lbmQpKSB7XG4gICAgICBpZiAoIXRoaXMuc2hvd0J1c2luZXNzRGF5T25seSB8fCAobm93LmRheSgpICE9PSAwICYmIG5vdy5kYXkoKSAhPT0gNikpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyRGV0YWlscyA9IG5ldyBIZWFkZXJEZXRhaWxzKCk7XG4gICAgICAgIGhlYWRlckRldGFpbHMubmFtZSA9IG5vdy5sb2NhbGUodGhpcy5sb2NhbGUpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICBpZiAocHJldiAmJiBwcmV2ICE9PSBoZWFkZXJEZXRhaWxzLm5hbWUpIHtcbiAgICAgICAgICBjb2xzcGFuID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2xzcGFuKys7XG4gICAgICAgICAgZGF0ZXMuaGVhZGVyRGV0YWlscy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2ID0gaGVhZGVyRGV0YWlscy5uYW1lO1xuICAgICAgICBoZWFkZXJEZXRhaWxzLmNvbHNwYW4gPSBjb2xzcGFuO1xuICAgICAgICBoZWFkZXJEZXRhaWxzLnRvb2x0aXAgPSB0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lSGVhZGVyc1Rvb2x0aXAgJiYgdGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZUhlYWRlcnNUb29sdGlwW2luZGV4XSA/XG4gICAgICAgICAgbm93LmxvY2FsZSh0aGlzLmxvY2FsZSkuZm9ybWF0KHRoaXMuY3VycmVudFBlcmlvZC50aW1lRnJhbWVIZWFkZXJzVG9vbHRpcFtpbmRleF0pIDogJyc7XG4gICAgICAgIGRhdGVzLmhlYWRlckRldGFpbHMucHVzaChoZWFkZXJEZXRhaWxzKTtcbiAgICAgIH1cbiAgICAgIG5vdy5hZGQodGhpcy5jdXJyZW50UGVyaW9kLnRpbWVGcmFtZVBlcmlvZCwgJ21pbnV0ZXMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVzO1xuICB9XG5cbiAgZ2V0TnVtYmVyT2ZXZWVrZW5kRGF5cyhzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHdoaWxlIChzdGFydERhdGUuaXNCZWZvcmUoZW5kRGF0ZSkgfHwgc3RhcnREYXRlLmlzU2FtZShlbmREYXRlKSkge1xuICAgICAgaWYgKChzdGFydERhdGUuZGF5KCkgPT09IDAgfHwgc3RhcnREYXRlLmRheSgpID09PSA2KSkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgICAgc3RhcnREYXRlLmFkZCh0aGlzLmN1cnJlbnRQZXJpb2QudGltZUZyYW1lUGVyaW9kLCAnbWludXRlcycpO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBkcm9wKGV2ZW50OiBDZGtEcmFnRHJvcDxTZWN0aW9uPikge1xuICAgIGV2ZW50Lml0ZW0uZGF0YS5zZWN0aW9uSUQgPSBldmVudC5jb250YWluZXIuZGF0YS5pZDtcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgdGhpcy5ldmVudHMuSXRlbURyb3BwZWQoZXZlbnQuaXRlbS5kYXRhKTtcbiAgfVxuXG4gIGl0ZW1QdXNoKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2UuaXRlbUFkZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGl0ZW06IEl0ZW0pID0+IHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICBpdGVtUG9wKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2UuaXRlbS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pdGVtcy5wb3AoKTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICBpdGVtUmVtb3ZlKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2UuaXRlbUlkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoaXRlbUlkOiBudW1iZXIpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuZmluZEluZGV4KChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpdGVtSWQ7XG4gICAgICB9KSwgMSk7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSkpO1xuICB9XG5cbiAgc2VjdGlvblB1c2goKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuc2VydmljZS5zZWN0aW9uQWRkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoc2VjdGlvbjogU2VjdGlvbikgPT4ge1xuICAgICAgdGhpcy5zZWN0aW9ucy5wdXNoKHNlY3Rpb24pO1xuICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHNlY3Rpb25Qb3AoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuc2VydmljZS5zZWN0aW9uLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNlY3Rpb25zLnBvcCgpO1xuICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHNlY3Rpb25SZW1vdmUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuc2VydmljZS5zZWN0aW9uSWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChzZWN0aW9uSWQ6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy5zZWN0aW9ucy5zcGxpY2UodGhpcy5zZWN0aW9ucy5maW5kSW5kZXgoKHNlY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb24uaWQgPT09IHNlY3Rpb25JZDtcbiAgICAgIH0pLCAxKTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnNlcnZpY2UucmVmcmVzaFZpZXcuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==