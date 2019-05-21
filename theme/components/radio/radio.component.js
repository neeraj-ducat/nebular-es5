"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NbRadioComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _helpers = require("../helpers");

/*
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
 * The `NbRadioComponent` provides the same functionality as native `<input type="radio">`
 * with Nebular styles and animations.
 *
 * @stacked-example(Showcase, radio/radio-showcase.component)
 *
 * ### Installation
 *
 * Import `NbRadioModule` to your feature module.
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbRadioModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * Radio buttons should be wrapped in `nb-radio-group` to provide form bindings.
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * You can disable some radios in the group using a `disabled` attribute.
 *
 * @stacked-example(Disabled, radio/radio-disabled.component)
 *
 *
 * @styles
 *
 * radio-width
 * radio-height:
 * radio-background-color:
 * radio-border-style:
 * radio-border-width:
 * radio-text-color:
 * radio-text-font-family:
 * radio-text-font-size:
 * radio-text-font-weight:
 * radio-text-line-height:
 * radio-outline-color:
 * radio-outline-width:
 * radio-disabled-border-color:
 * radio-disabled-text-color:
 * radio-disabled-inner-circle-color:
 * radio-primary-border-color:
 * radio-primary-inner-circle-color:
 * radio-primary-focus-border-color:
 * radio-primary-focus-inner-circle-color:
 * radio-primary-hover-border-color:
 * radio-primary-hover-inner-circle-color:
 * radio-primary-active-border-color:
 * radio-primary-active-inner-circle-color:
 * radio-success-border-color:
 * radio-success-inner-circle-color:
 * radio-success-focus-border-color:
 * radio-success-focus-inner-circle-color:
 * radio-success-hover-border-color:
 * radio-success-hover-inner-circle-color:
 * radio-success-active-border-color:
 * radio-success-active-inner-circle-color:
 * radio-warning-border-color:
 * radio-warning-inner-circle-color:
 * radio-warning-focus-border-color:
 * radio-warning-focus-inner-circle-color:
 * radio-warning-hover-border-color:
 * radio-warning-hover-inner-circle-color:
 * radio-warning-active-border-color:
 * radio-warning-active-inner-circle-color:
 * radio-danger-border-color:
 * radio-danger-inner-circle-color:
 * radio-danger-focus-border-color:
 * radio-danger-focus-inner-circle-color:
 * radio-danger-hover-border-color:
 * radio-danger-hover-inner-circle-color:
 * radio-danger-active-border-color:
 * radio-danger-active-inner-circle-color:
 * radio-info-border-color:
 * radio-info-inner-circle-color:
 * radio-info-focus-border-color:
 * radio-info-focus-inner-circle-color:
 * radio-info-hover-border-color:
 * radio-info-hover-inner-circle-color:
 * radio-info-active-border-color:
 * radio-info-active-inner-circle-color:
 * */
var NbRadioComponent = /** @class */function () {
    function NbRadioComponent(cd) {
        this.cd = cd;
        this._checked = false;
        this._disabled = false;
        this._status = 'primary';
        this.valueChange = new _core.EventEmitter();
        this.blur = new _core.EventEmitter();
    }
    Object.defineProperty(NbRadioComponent.prototype, "name", {
        get: function get() {
            return this._name;
        },
        set: function set(value) {
            if (this._name !== value) {
                this._name = value;
                this.cd.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "checked", {
        get: function get() {
            return this._checked;
        },
        set: function set(value) {
            var boolValue = (0, _helpers.convertToBoolProperty)(value);
            if (this._checked !== boolValue) {
                this._checked = boolValue;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "value", {
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            if (this._value !== value) {
                this._value = value;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "disabled", {
        get: function get() {
            return this._disabled;
        },
        set: function set(disabled) {
            var boolValue = (0, _helpers.convertToBoolProperty)(disabled);
            if (this._disabled !== boolValue) {
                this._disabled = boolValue;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "status", {
        get: function get() {
            return this._status;
        },
        set: function set(value) {
            if (this._status !== value) {
                this._status = value;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isPrimary", {
        get: function get() {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isSuccess", {
        get: function get() {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isWarning", {
        get: function get() {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isDanger", {
        get: function get() {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isInfo", {
        get: function get() {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    NbRadioComponent.prototype.onChange = function (event) {
        event.stopPropagation();
        this.checked = true;
        this.valueChange.emit(this.value);
    };
    NbRadioComponent.prototype.onClick = function (event) {
        event.stopPropagation();
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", String), __metadata("design:paramtypes", [String])], NbRadioComponent.prototype, "name", null);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean), __metadata("design:paramtypes", [Boolean])], NbRadioComponent.prototype, "checked", null);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], NbRadioComponent.prototype, "value", null);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean), __metadata("design:paramtypes", [Boolean])], NbRadioComponent.prototype, "disabled", null);
    __decorate([(0, _core.Input)(), __metadata("design:type", String), __metadata("design:paramtypes", [String])], NbRadioComponent.prototype, "status", null);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], NbRadioComponent.prototype, "valueChange", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], NbRadioComponent.prototype, "blur", void 0);
    __decorate([(0, _core.HostBinding)('class.status-primary'), __metadata("design:type", Boolean), __metadata("design:paramtypes", [])], NbRadioComponent.prototype, "isPrimary", null);
    __decorate([(0, _core.HostBinding)('class.status-success'), __metadata("design:type", Boolean), __metadata("design:paramtypes", [])], NbRadioComponent.prototype, "isSuccess", null);
    __decorate([(0, _core.HostBinding)('class.status-warning'), __metadata("design:type", Boolean), __metadata("design:paramtypes", [])], NbRadioComponent.prototype, "isWarning", null);
    __decorate([(0, _core.HostBinding)('class.status-danger'), __metadata("design:type", Boolean), __metadata("design:paramtypes", [])], NbRadioComponent.prototype, "isDanger", null);
    __decorate([(0, _core.HostBinding)('class.status-info'), __metadata("design:type", Boolean), __metadata("design:paramtypes", [])], NbRadioComponent.prototype, "isInfo", null);
    NbRadioComponent = __decorate([(0, _core.Component)({
        selector: 'nb-radio',
        template: "\n    <label>\n      <input\n        type=\"radio\"\n        class=\"native-input visually-hidden\"\n        [name]=\"name\"\n        [value]=\"value\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        (change)=\"onChange($event)\"\n        (click)=\"onClick($event)\">\n      <span class=\"radio-circle\"></span>\n      <span class=\"text\">\n        <ng-content></ng-content>\n      </span>\n    </label>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        styles: [":host{display:block}:host label{display:inline-flex;margin:0;min-height:inherit;padding:0.375rem 1.5rem 0.375rem 0;align-items:center}:host .radio-circle{border-radius:50%;border-style:solid;flex-shrink:0;display:flex;justify-content:center;align-items:center}:host .radio-circle::before{content:'';border-radius:50%;height:75%;width:75%}[dir=ltr] :host .text{padding-left:.5rem}[dir=rtl] :host .text{padding-right:.5rem} "]
    }), __metadata("design:paramtypes", [_core.ChangeDetectorRef])], NbRadioComponent);
    return NbRadioComponent;
}();
exports.NbRadioComponent = NbRadioComponent;
//# sourceMappingURL=radio.component.js.map
//# sourceMappingURL=radio.component.js.map