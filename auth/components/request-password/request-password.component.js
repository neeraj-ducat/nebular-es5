"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NbRequestPasswordComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _router = require("@angular/router");

var _auth = require("../../auth.options");

var _helpers = require("../../helpers");

var _auth2 = require("../../services/auth.service");

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
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

var NbRequestPasswordComponent = /** @class */function () {
    function NbRequestPasswordComponent(service, options, cd, router) {
        if (options === void 0) {
            options = {};
        }
        this.service = service;
        this.options = options;
        this.cd = cd;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.strategy = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
        this.strategy = this.getConfigValue('forms.requestPassword.strategy');
    }
    NbRequestPasswordComponent.prototype.requestPass = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.requestPassword(this.strategy, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            } else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
            _this.cd.detectChanges();
        });
    };
    NbRequestPasswordComponent.prototype.getConfigValue = function (key) {
        return (0, _helpers.getDeepFromObject)(this.options, key, null);
    };
    NbRequestPasswordComponent = __decorate([(0, _core.Component)({
        selector: 'nb-request-password-page',
        styles: [":host .form-group:last-of-type{margin-bottom:3rem} "],
        template: "<h1 id=\"title\" class=\"title\">Forgot Password</h1> <p class=\"sub-title\">Enter your email address and we’ll send a link to reset your password</p> <nb-alert *ngIf=\"showMessages.error && errors?.length && !submitted\" outline=\"danger\" role=\"alert\"> <p class=\"alert-title\"><b>Oh snap!</b></p> <ul class=\"alert-message-list\"> <li *ngFor=\"let error of errors\" class=\"alert-message\">{{ error }}</li> </ul> </nb-alert> <nb-alert *ngIf=\"showMessages.success && messages?.length && !submitted\" outline=\"success\" role=\"alert\"> <p class=\"alert-title\"><b>Hooray!</b></p> <ul class=\"alert-message-list\"> <li *ngFor=\"let message of messages\" class=\"alert-message\">{{ message }}</li> </ul> </nb-alert> <form (ngSubmit)=\"requestPass()\" #requestPassForm=\"ngForm\" aria-labelledby=\"title\"> <div class=\"form-control-group\"> <label class=\"label\" for=\"input-email\">Enter your email address:</label> <input nbInput [(ngModel)]=\"user.email\" #email=\"ngModel\" id=\"input-email\" name=\"email\" pattern=\".+@.+\..+\" placeholder=\"Email address\" autofocus fullWidth [status]=\"email.dirty ? (email.invalid  ? 'danger' : 'success') : ''\" [required]=\"getConfigValue('forms.validation.email.required')\" [attr.aria-invalid]=\"email.invalid && email.touched ? true : null\"> <ng-container *ngIf=\"email.invalid && email.touched\"> <p class=\"error-message\" *ngIf=\"email.errors?.required\"> Email is required! </p> <p class=\"error-message\" *ngIf=\"email.errors?.pattern\"> Email should be the real one! </p> </ng-container> </div> <button nbButton fullWidth status=\"success\" [disabled]=\"submitted || !requestPassForm.valid\" [class.btn-pulse]=\"submitted\"> Request password </button> </form> <section class=\"sign-in-or-up\" aria-label=\"Sign in or sign up\"> <p><a class=\"text-link\" routerLink=\"../login\">Back to Log In</a></p> <p><a routerLink=\"../register\" class=\"text-link\">Register</a></p> </section> ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __param(1, (0, _core.Inject)(_auth.NB_AUTH_OPTIONS)), __metadata("design:paramtypes", [_auth2.NbAuthService, Object, _core.ChangeDetectorRef, _router.Router])], NbRequestPasswordComponent);
    return NbRequestPasswordComponent;
}();
exports.NbRequestPasswordComponent = NbRequestPasswordComponent;
//# sourceMappingURL=request-password.component.js.map
//# sourceMappingURL=request-password.component.js.map