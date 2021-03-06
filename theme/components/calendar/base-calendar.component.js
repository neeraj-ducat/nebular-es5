"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NbBaseCalendarComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _calendarKit = require("../calendar-kit");

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
var NbBaseCalendarComponent = /** @class */function () {
    function NbBaseCalendarComponent(dateService) {
        this.dateService = dateService;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines active view for calendar.
         * */
        this.activeViewMode = _calendarKit.NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = _calendarKit.NbCalendarSize.MEDIUM;
        /**
         * Determines should we show calendars header or not.
         * */
        this.showHeader = true;
        /**
         * Emits date when selected.
         * */
        this.dateChange = new _core.EventEmitter();
        this.ViewMode = _calendarKit.NbCalendarViewMode;
    }
    NbBaseCalendarComponent.prototype.ngOnInit = function () {
        if (!this.visibleDate) {
            this.visibleDate = this.dateService.today();
        }
    };
    Object.defineProperty(NbBaseCalendarComponent.prototype, "medium", {
        get: function get() {
            return this.size === _calendarKit.NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBaseCalendarComponent.prototype, "large", {
        get: function get() {
            return this.size === _calendarKit.NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbBaseCalendarComponent.prototype.setViewMode = function (viewMode) {
        this.activeViewMode = viewMode;
    };
    NbBaseCalendarComponent.prototype.setVisibleDate = function (visibleDate) {
        this.visibleDate = visibleDate;
    };
    NbBaseCalendarComponent.prototype.prevMonth = function () {
        this.changeVisibleMonth(-1);
    };
    NbBaseCalendarComponent.prototype.nextMonth = function () {
        this.changeVisibleMonth(1);
    };
    NbBaseCalendarComponent.prototype.prevYears = function () {
        this.changeVisibleYear(-1);
    };
    NbBaseCalendarComponent.prototype.nextYears = function () {
        this.changeVisibleYear(1);
    };
    NbBaseCalendarComponent.prototype.navigateToday = function () {
        this.setViewMode(_calendarKit.NbCalendarViewMode.DATE);
        this.visibleDate = this.dateService.today();
    };
    NbBaseCalendarComponent.prototype.changeVisibleMonth = function (direction) {
        this.visibleDate = this.dateService.addMonth(this.visibleDate, direction);
    };
    NbBaseCalendarComponent.prototype.changeVisibleYear = function (direction) {
        this.visibleDate = this.dateService.addYear(this.visibleDate, direction * _calendarKit.YEARS_IN_VIEW);
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], NbBaseCalendarComponent.prototype, "boundingMonth", void 0);
    __decorate([(0, _core.Input)('startView'), __metadata("design:type", String)], NbBaseCalendarComponent.prototype, "activeViewMode", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], NbBaseCalendarComponent.prototype, "min", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], NbBaseCalendarComponent.prototype, "max", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Function)], NbBaseCalendarComponent.prototype, "filter", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _core.Type)], NbBaseCalendarComponent.prototype, "dayCellComponent", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _core.Type)], NbBaseCalendarComponent.prototype, "monthCellComponent", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _core.Type)], NbBaseCalendarComponent.prototype, "yearCellComponent", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], NbBaseCalendarComponent.prototype, "size", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], NbBaseCalendarComponent.prototype, "visibleDate", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], NbBaseCalendarComponent.prototype, "showHeader", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], NbBaseCalendarComponent.prototype, "date", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], NbBaseCalendarComponent.prototype, "dateChange", void 0);
    __decorate([(0, _core.HostBinding)('class.medium'), __metadata("design:type", Object), __metadata("design:paramtypes", [])], NbBaseCalendarComponent.prototype, "medium", null);
    __decorate([(0, _core.HostBinding)('class.large'), __metadata("design:type", Object), __metadata("design:paramtypes", [])], NbBaseCalendarComponent.prototype, "large", null);
    NbBaseCalendarComponent = __decorate([(0, _core.Component)({
        selector: 'nb-base-calendar',
        template: "<nb-card> <nb-card-header *ngIf=\"showHeader\"> <nb-calendar-header (navigateToday)=\"navigateToday()\"></nb-calendar-header> </nb-card-header> <nb-card-body [ngSwitch]=\"activeViewMode\"> <ng-container *ngSwitchCase=\"ViewMode.DATE\"> <nb-calendar-pageable-navigation *ngSwitchCase=\"ViewMode.DATE\" [date]=\"visibleDate\" (next)=\"nextMonth()\" (prev)=\"prevMonth()\" (changeMode)=\"setViewMode(ViewMode.YEAR)\"> </nb-calendar-pageable-navigation> <nb-calendar-day-picker [boundingMonths]=\"boundingMonth\" [cellComponent]=\"dayCellComponent\" [min]=\"min\" [max]=\"max\" [filter]=\"filter\" [visibleDate]=\"visibleDate\" [size]=\"size\" [date]=\"date\" (dateChange)=\"dateChange.emit($event)\"> </nb-calendar-day-picker> </ng-container> <ng-container *ngSwitchCase=\"ViewMode.YEAR\"> <nb-calendar-pageable-navigation [date]=\"visibleDate\" (next)=\"nextYears()\" (prev)=\"prevYears()\" (changeMode)=\"setViewMode(ViewMode.DATE)\"> </nb-calendar-pageable-navigation> <nb-calendar-year-picker [cellComponent]=\"yearCellComponent\" [date]=\"date\" [min]=\"min\" [max]=\"max\" [filter]=\"filter\" [size]=\"size\" [year]=\"visibleDate\" (yearChange)=\"setVisibleDate($event); setViewMode(ViewMode.MONTH)\"> </nb-calendar-year-picker> </ng-container> <ng-container *ngSwitchCase=\"ViewMode.MONTH\"> <nb-calendar-navigation [date]=\"visibleDate\" (changeMode)=\"setViewMode(ViewMode.DATE)\"> </nb-calendar-navigation> <nb-calendar-month-picker [cellComponent]=\"monthCellComponent\" [min]=\"min\" [max]=\"max\" [filter]=\"filter\" [size]=\"size\" [month]=\"visibleDate\" (monthChange)=\"setVisibleDate($event); setViewMode(ViewMode.DATE)\"> </nb-calendar-month-picker> </ng-container> </nb-card-body> </nb-card> "
    }), __metadata("design:paramtypes", [_calendarKit.NbDateService])], NbBaseCalendarComponent);
    return NbBaseCalendarComponent;
}();
exports.NbBaseCalendarComponent = NbBaseCalendarComponent;
//# sourceMappingURL=base-calendar.component.js.map
//# sourceMappingURL=base-calendar.component.js.map