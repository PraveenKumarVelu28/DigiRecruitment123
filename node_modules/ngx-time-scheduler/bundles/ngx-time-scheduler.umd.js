(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('moment'), require('@angular/common'), require('@angular/cdk/drag-drop')) :
    typeof define === 'function' && define.amd ? define('ngx-time-scheduler', ['exports', '@angular/core', 'rxjs', 'moment', '@angular/common', '@angular/cdk/drag-drop'], factory) :
    (global = global || self, factory(global['ngx-time-scheduler'] = {}, global.ng.core, global.rxjs, global.moment_, global.ng.common, global.ng.cdk.dragDrop));
}(this, (function (exports, core, rxjs, moment_, common, dragDrop) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var NgxTimeSchedulerService = /** @class */ (function () {
        function NgxTimeSchedulerService() {
            this.item = new rxjs.Subject();
            this.itemAdd = new rxjs.Subject();
            this.itemId = new rxjs.Subject();
            this.sectionAdd = new rxjs.Subject();
            this.section = new rxjs.Subject();
            this.sectionId = new rxjs.Subject();
            this.refreshView = new rxjs.Subject();
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
        NgxTimeSchedulerService.ɵprov = core.ɵɵdefineInjectable({ factory: function NgxTimeSchedulerService_Factory() { return new NgxTimeSchedulerService(); }, token: NgxTimeSchedulerService, providedIn: "root" });
        NgxTimeSchedulerService = __decorate([
            core.Injectable({
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
            this.subscription = new rxjs.Subscription();
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
            { type: core.ChangeDetectorRef },
            { type: NgxTimeSchedulerService }
        ]; };
        __decorate([
            core.ViewChild('sectionTd'),
            __metadata("design:type", core.ElementRef),
            __metadata("design:paramtypes", [core.ElementRef])
        ], NgxTimeSchedulerComponent.prototype, "SectionTd", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "currentTimeFormat", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "showCurrentTime", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "showGoto", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "showToday", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "allowDragging", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "locale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "showBusinessDayOnly", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "headerFormat", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "minRowHeight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], NgxTimeSchedulerComponent.prototype, "maxHeight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "text", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NgxTimeSchedulerComponent.prototype, "items", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NgxTimeSchedulerComponent.prototype, "sections", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NgxTimeSchedulerComponent.prototype, "periods", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Events)
        ], NgxTimeSchedulerComponent.prototype, "events", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgxTimeSchedulerComponent.prototype, "start", void 0);
        NgxTimeSchedulerComponent = __decorate([
            core.Component({
                selector: 'ngx-ts[items][periods][sections]',
                template: "<div class=\"time-sch-wrapper\" [style.height]=\"maxHeight\">\n  <div class=\"time-sch-header-wrapper mb-1\">\n    <div class=\"time-sch-period-container\">\n      <button class=\"btn\"\n              *ngFor=\"let period of periods\"\n              [ngClass]=\"period.classes\"\n              (click)=\"changePeriod(period)\"\n              [title]=\"period.tooltip? period.tooltip : ''\"\n      >\n        {{period.name}}\n      </button>\n    </div>\n\n    <div class=\"time-sch-time-container\">\n      <button class=\"btn\" *ngIf=\"showGoto\" (click)=\"showGotoModal = !showGotoModal\">{{text.GotoButton}}</button>\n      <div class=\"goto-modal\" *ngIf=\"showGotoModal\">\n        <label>\n          <input type=\"date\" (change)=\"gotoDate($event.target.value)\">\n        </label>\n      </div>\n\n      <button class=\"btn\" *ngIf=\"showToday\" (click)=\"gotoToday()\">{{text.TodayButton}}</button>\n      <button class=\"btn\" (click)=\"previousPeriod()\">{{text.PrevButton}}</button>\n      <button class=\"btn\" (click)=\"nextPeriod()\">{{text.NextButton}}</button>\n    </div>\n\n    <h3 class=\"text-center m-0\">\n      {{ start.locale(locale).format(headerFormat) + ' - ' + end.locale(locale).format(headerFormat)}}\n    </h3>\n  </div>\n\n  <div class=\"time-sch-table-wrapper\">\n    <table class=\"time-sch-table\">\n      <tr *ngFor=\"let timeFrameHeader of header; let i = index; trackBy: trackByFn\">\n\n        <td class=\"time-sch-section text-center\" *ngIf=\"i === 0\" [rowSpan]=\"periods.length\">\n          {{text.SectionTitle}}\n        </td>\n\n        <td class=\"text-center\"\n            *ngFor=\"let dateTime of timeFrameHeader.headerDetails; trackBy: trackByFn\"\n            [colSpan]=\"dateTime.colspan\"\n            [title]=\"dateTime.tooltip? dateTime.tooltip : ''\"\n        >\n          {{dateTime.name}}\n        </td>\n\n      </tr>\n    </table>\n\n    <div class=\"time-sch-content-wrap\">\n      <table class=\"time-sch-table\">\n        <tr *ngFor=\"let sectionItem of sectionItems; trackBy: trackByFn\"\n            [style.height]=\"sectionItem.minRowHeight + 'px'\">\n          <td class=\"time-sch-section text-center\" #sectionTd\n              (click)=\"events.SectionClickEvent ? events.SectionClickEvent(sectionItem.section) : false\"\n              (contextmenu)=\"events.SectionContextMenuEvent ? events.SectionContextMenuEvent(sectionItem.section, $event) : false\"\n              [style.cursor]=\"events.SectionClickEvent ? 'pointer' : ''\"\n              [title]=\"sectionItem.section.tooltip? sectionItem.section.tooltip : ''\"\n          >\n            {{sectionItem.section.name}}\n          </td>\n\n          <td *ngFor=\"let td of header[header.length - 1].headerDetails; trackBy: trackByFn\"></td>\n        </tr>\n      </table>\n\n      <div class=\"time-sch-section-wrapper\" [style.left]=\"SectionLeftMeasure\" cdkDropListGroup>\n        <div class=\"time-sch-section-container\"\n             cdkDropList\n             cdkDropListSortingDisabled\n             [cdkDropListData]=\"sectionItem.section\"\n             (cdkDropListDropped)=\"drop($event)\"\n             *ngFor=\"let sectionItem of sectionItems; trackBy: trackByFn\"\n             [style.height]=\"sectionItem.minRowHeight + 'px'\"\n        >\n          <div class=\"time-sch-item\"\n               cdkDrag\n               cdkDragLockAxis=\"y\"\n               cdkDragBoundary=\".time-sch-section-wrapper\"\n               [cdkDragData]=\"itemMeta.item\"\n               [cdkDragDisabled]=\"!allowDragging\"\n               *ngFor=\"let itemMeta of sectionItem.itemMetas\"\n               [ngClass]=\"itemMeta.item.classes\"\n               (click)=\"events.ItemClicked ? events.ItemClicked(itemMeta.item) : false\"\n               (contextmenu)=\"events.ItemContextMenu ? events.ItemContextMenu(itemMeta.item, $event) : false\"\n               [style.height]=\"minRowHeight + 'px'\"\n               [style.top]=\"itemMeta.cssTop + 'px'\"\n               [style.left]=\"itemMeta.cssLeft + '%'\"\n               [style.width]=\"itemMeta.cssWidth + '%'\"\n          >\n            <div class=\"item-drag-placeholder\"\n                 *cdkDragPlaceholder\n                 [style.height]=\"(minRowHeight - 6) + 'px'\"\n                 [style.left]=\"itemMeta.cssLeft + '%'\"\n                 [style.width]=\"'calc('+ itemMeta.cssWidth + '% - 6px)'\"\n            ></div>\n            <div class=\"time-sch-item-start\" *ngIf=\"itemMeta.isStart\"></div>\n            <div class=\"time-sch-item-content\"\n                 [title]=\"itemMeta.item.tooltip? itemMeta.item.tooltip : ''\">\n              {{itemMeta.item.name}}\n            </div>\n            <div class=\"time-sch-item-end\" *ngIf=\"itemMeta.isEnd\"></div>\n          </div>\n        </div>\n\n        <div class=\"time-sch-current-time\"\n             *ngIf=\"showCurrentTime\"\n             [title]=\"currentTimeTitle\"\n             [style.visibility]=\"currentTimeVisibility\"\n             [style.left]=\"currentTimeIndicatorPosition\"\n        ></div>\n      </div>\n\n    </div>\n  </div>\n</div>\n",
                styles: [".d-inline-block{display:inline-block!important}.text-center{text-align:center!important}.m-0{margin:0!important}.mb-1{margin-bottom:1rem!important}.btn{border:1px solid #e1e1e1;font-weight:600;text-decoration:none;color:#222;height:30px;padding:.5em 1em;cursor:pointer;margin:.2rem;border-radius:4px}.goto-modal{position:absolute;top:100%;left:0;height:auto;width:auto;border-radius:4px;background-color:#ddd;padding:5px;text-align:left;z-index:1}.time-sch-wrapper{overflow:auto}.time-sch-header-wrapper,.time-sch-table-wrapper,.time-sch-wrapper{position:relative}.time-sch-header-wrapper{padding:.5em;margin-bottom:.5em}.time-sch-table{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0}.time-sch-period-container{float:left;position:relative}.time-sch-time-container{float:right;position:relative}.time-sch-wrapper .time-sch-section{width:200px}.time-sch-wrapper td,.time-sch-wrapper th{border-width:1px;border-style:solid;border-color:#e1e1e1 #c1c1c1}.time-sch-content-wrap{position:relative}.time-sch-section-wrapper{position:absolute;top:0;right:0;bottom:0;z-index:1;padding-left:1px;padding-right:1px}.time-sch-section-container{position:relative;overflow:hidden}.time-sch-item{position:absolute;min-height:1em;clear:both;background-color:#29d;color:#fff;border-radius:2px;cursor:pointer;transition:background-color .1s;border:1px solid #c1c1c1}.time-sch-item-content{overflow:hidden;white-space:nowrap;position:relative;z-index:1;padding:4px 0 4px 6px}.time-sch-item-end,.time-sch-item-start{position:absolute;top:2px;bottom:2px}.time-sch-item-start{left:1px;border-right:2px dotted #fff}.time-sch-item-end{right:1px;border-left:2px dotted #fff}.time-sch-current-time{position:absolute;top:0;bottom:0;z-index:2;background:0 0;border-left:1px dotted #000}.item-drag-placeholder{position:absolute;background:#ccc;border:3px dotted #999;transition:transform 250ms cubic-bezier(0,0,.2,1)}"]
            }),
            __metadata("design:paramtypes", [core.ChangeDetectorRef,
                NgxTimeSchedulerService])
        ], NgxTimeSchedulerComponent);
        return NgxTimeSchedulerComponent;
    }());

    var NgxTimeSchedulerModule = /** @class */ (function () {
        function NgxTimeSchedulerModule() {
        }
        NgxTimeSchedulerModule = __decorate([
            core.NgModule({
                declarations: [NgxTimeSchedulerComponent],
                imports: [
                    common.CommonModule,
                    dragDrop.DragDropModule
                ],
                exports: [NgxTimeSchedulerComponent]
            })
        ], NgxTimeSchedulerModule);
        return NgxTimeSchedulerModule;
    }());

    exports.Events = Events;
    exports.Header = Header;
    exports.HeaderDetails = HeaderDetails;
    exports.Item = Item;
    exports.ItemMeta = ItemMeta;
    exports.NgxTimeSchedulerComponent = NgxTimeSchedulerComponent;
    exports.NgxTimeSchedulerModule = NgxTimeSchedulerModule;
    exports.NgxTimeSchedulerService = NgxTimeSchedulerService;
    exports.Period = Period;
    exports.Section = Section;
    exports.SectionItem = SectionItem;
    exports.Text = Text;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-time-scheduler.umd.js.map
