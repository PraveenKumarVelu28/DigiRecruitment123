import { __decorate, __metadata, __values } from 'tslib';
import { ɵɵdefineInjectable, Injectable, ChangeDetectorRef, ViewChild, ElementRef, Input, Component, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as moment_ from 'moment';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

var NgxTimeSchedulerService = /** @class */ (function () {
    function NgxTimeSchedulerService() {
        this.item = new Subject();
        this.itemAdd = new Subject();
        this.itemId = new Subject();
        this.sectionAdd = new Subject();
        this.section = new Subject();
        this.sectionId = new Subject();
        this.refreshView = new Subject();
    }
    NgxTimeSchedulerService.prototype.itemPush = function (item) {
        this.itemAdd.next(item);
    };
    NgxTimeSchedulerService.prototype.itemPop = function () {
        this.item.next();
    };
    NgxTimeSchedulerService.prototype.itemRemove = function (id) {
        this.itemId.next(id);
    };
    NgxTimeSchedulerService.prototype.sectionPush = function (section) {
        this.sectionAdd.next(section);
    };
    NgxTimeSchedulerService.prototype.sectionPop = function () {
        this.section.next();
    };
    NgxTimeSchedulerService.prototype.sectionRemove = function (id) {
        this.sectionId.next(id);
    };
    NgxTimeSchedulerService.prototype.refresh = function () {
        this.refreshView.next();
    };
    NgxTimeSchedulerService.ɵprov = ɵɵdefineInjectable({ factory: function NgxTimeSchedulerService_Factory() { return new NgxTimeSchedulerService(); }, token: NgxTimeSchedulerService, providedIn: "root" });
    NgxTimeSchedulerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], NgxTimeSchedulerService);
    return NgxTimeSchedulerService;
}());

var Period = /** @class */ (function () {
    function Period() {
    }
    return Period;
}());
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
var Section = /** @class */ (function () {
    function Section() {
    }
    return Section;
}());
var Text = /** @class */ (function () {
    function Text() {
        this.NextButton = 'Next';
        this.PrevButton = 'Prev';
        this.TodayButton = 'Today';
        this.GotoButton = 'Go to';
        this.SectionTitle = 'Section';
    }
    return Text;
}());
var Events = /** @class */ (function () {
    function Events() {
    }
    return Events;
}());
var SectionItem = /** @class */ (function () {
    function SectionItem() {
        this.itemMetas = new Array();
    }
    return SectionItem;
}());
var ItemMeta = /** @class */ (function () {
    function ItemMeta() {
        this.cssTop = 0;
        this.cssLeft = 0;
        this.cssWidth = 0;
    }
    return ItemMeta;
}());
var Header = /** @class */ (function () {
    function Header() {
        this.headerDetails = new Array();
    }
    return Header;
}());
var HeaderDetails = /** @class */ (function () {
    function HeaderDetails() {
    }
    return HeaderDetails;
}());

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

var NgxTimeSchedulerModule = /** @class */ (function () {
    function NgxTimeSchedulerModule() {
    }
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
    return NgxTimeSchedulerModule;
}());

/*
 * Public API Surface of ngx-time-scheduler
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Events, Header, HeaderDetails, Item, ItemMeta, NgxTimeSchedulerComponent, NgxTimeSchedulerModule, NgxTimeSchedulerService, Period, Section, SectionItem, Text };
//# sourceMappingURL=ngx-time-scheduler.js.map
