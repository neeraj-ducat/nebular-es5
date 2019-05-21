"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NbRegisterComponent = undefined;

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

var NbRegisterComponent = /** @class */function () {
    function NbRegisterComponent(service, options, cd, router) {
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
        this.socialLinks = [];
        this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
        this.showMessages = this.getConfigValue('forms.register.showMessages');
        this.strategy = this.getConfigValue('forms.register.strategy');
        this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    }
    NbRegisterComponent.prototype.register = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.register(this.strategy, this.user).subscribe(function (result) {
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
    NbRegisterComponent.prototype.getConfigValue = function (key) {
        return (0, _helpers.getDeepFromObject)(this.options, key, null);
    };
    NbRegisterComponent = __decorate([(0, _core.Component)({
        selector: 'nb-register',
        styles: [":host .title{margin-bottom:2rem} "],
        template: "<h1 id=\"title\" class=\"title\">Register</h1> <nb-alert *ngIf=\"showMessages.error && errors?.length && !submitted\" outline=\"danger\" role=\"alert\"> <p class=\"alert-title\"><b>Oh snap!</b></p> <ul class=\"alert-message-list\"> <li *ngFor=\"let error of errors\" class=\"alert-message\">{{ error }}</li> </ul> </nb-alert> <nb-alert *ngIf=\"showMessages.success && messages?.length && !submitted\" outline=\"success\" role=\"alert\"> <p class=\"alert-title\"><b>Hooray!</b></p> <ul class=\"alert-message-list\"> <li *ngFor=\"let message of messages\" class=\"alert-message\">{{ message }}</li> </ul> </nb-alert> <form (ngSubmit)=\"register()\" #form=\"ngForm\" aria-labelledby=\"title\"> <div class=\"form-control-group\"> <label class=\"label\" for=\"input-name\">Full name:</label> <input nbInput [(ngModel)]=\"user.fullName\" #fullName=\"ngModel\" id=\"input-name\" name=\"fullName\" placeholder=\"Full name\" autofocus fullWidth [status]=\"email.dirty ? (email.invalid  ? 'danger' : 'success') : ''\" [required]=\"getConfigValue('forms.validation.fullName.required')\" [minlength]=\"getConfigValue('forms.validation.fullName.minLength')\" [maxlength]=\"getConfigValue('forms.validation.fullName.maxLength')\" [attr.aria-invalid]=\"fullName.invalid && fullName.touched ? true : null\"> <ng-container *ngIf=\"fullName.invalid && fullName.touched\"> <p class=\"error-message\" *ngIf=\"fullName.errors?.required\"> Full name is required! </p> <p class=\"error-message\" *ngIf=\"fullName.errors?.minlength || fullName.errors?.maxlength\"> Full name should contains from {{getConfigValue('forms.validation.fullName.minLength')}} to {{getConfigValue('forms.validation.fullName.maxLength')}} characters </p> </ng-container> </div> <div class=\"form-control-group\"> <label class=\"label\" for=\"input-email\">Email address:</label> <input nbInput [(ngModel)]=\"user.email\" #email=\"ngModel\" id=\"input-email\" name=\"email\" pattern=\".+@.+..+\" placeholder=\"Email address\" fullWidth [status]=\"email.dirty ? (email.invalid  ? 'danger' : 'success') : ''\" [required]=\"getConfigValue('forms.validation.email.required')\" [attr.aria-invalid]=\"email.invalid && email.touched ? true : null\"> <ng-container *ngIf=\"email.invalid && email.touched\"> <p class=\"error-message\" *ngIf=\"email.errors?.required\"> Email is required! </p> <p class=\"error-message\" *ngIf=\"email.errors?.pattern\"> Email should be the real one! </p> </ng-container> </div> <div class=\"form-control-group\"> <label class=\"label\" for=\"input-password\">Password:</label> <input nbInput [(ngModel)]=\"user.password\" #password=\"ngModel\" type=\"password\" id=\"input-password\" name=\"password\" placeholder=\"Password\" fullWidth [status]=\"email.dirty ? (email.invalid  ? 'danger' : 'success') : ''\" [required]=\"getConfigValue('forms.validation.password.required')\" [minlength]=\"getConfigValue('forms.validation.password.minLength')\" [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\" [attr.aria-invalid]=\"password.invalid && password.touched ? true : null\"> <ng-container *ngIf=\"password.invalid && password.touched\"> <p class=\"error-message\" *ngIf=\"password.errors?.required\"> Password is required! </p> <p class=\"error-message\" *ngIf=\"password.errors?.minlength || password.errors?.maxlength\"> Password should contains from {{ getConfigValue('forms.validation.password.minLength') }} to {{ getConfigValue('forms.validation.password.maxLength') }} characters </p> </ng-container> </div> <div class=\"form-control-group\"> <label class=\"label\" for=\"input-re-password\">Repeat password:</label> <input nbInput [(ngModel)]=\"user.confirmPassword\" #rePass=\"ngModel\" type=\"password\" id=\"input-re-password\" name=\"rePass\" placeholder=\"Confirm Password\" fullWidth [status]=\"email.dirty ? (email.invalid || password.value != rePass.value  ? 'danger' : 'success') : ''\" [required]=\"getConfigValue('forms.validation.password.required')\" [attr.aria-invalid]=\"rePass.invalid && rePass.touched ? true : null\"> <ng-container *ngIf=\"rePass.invalid && rePass.touched\"> <p class=\"error-message\" *ngIf=\"rePass.errors?.required\"> Password confirmation is required! </p> <p class=\"error-message\" *ngIf=\"password.value != rePass.value && !rePass.errors?.required\"> Password does not match the confirm password. </p> </ng-container> </div> <div class=\"form-control-group accept-group\" *ngIf=\"getConfigValue('forms.register.terms')\"> <nb-checkbox name=\"terms\" [(ngModel)]=\"user.terms\" [required]=\"getConfigValue('forms.register.terms')\"> Agree to <a href=\"#\" target=\"_blank\"><strong>Terms & Conditions</strong></a> </nb-checkbox> </div> <button nbButton fullWidth status=\"success\" [disabled]=\"submitted || !form.valid\" [class.btn-pulse]=\"submitted\"> Register </button> </form> <section *ngIf=\"socialLinks && socialLinks.length > 0\" class=\"links\" aria-label=\"Social sign in\"> or enter with: <div class=\"socials\"> <ng-container *ngFor=\"let socialLink of socialLinks\"> <a *ngIf=\"socialLink.link\" [routerLink]=\"socialLink.link\" [attr.target]=\"socialLink.target\" [attr.class]=\"socialLink.icon\" [class.with-icon]=\"socialLink.icon\">{{ socialLink.title }}</a> <a *ngIf=\"socialLink.url\" [attr.href]=\"socialLink.url\" [attr.target]=\"socialLink.target\" [attr.class]=\"socialLink.icon\" [class.with-icon]=\"socialLink.icon\">{{ socialLink.title }}</a> </ng-container> </div> </section> <section class=\"another-action\" aria-label=\"Sign in\"> Already have an account? <a class=\"text-link\" routerLink=\"../login\">Log in</a> </section> ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __param(1, (0, _core.Inject)(_auth.NB_AUTH_OPTIONS)), __metadata("design:paramtypes", [_auth2.NbAuthService, Object, _core.ChangeDetectorRef, _router.Router])], NbRegisterComponent);
    return NbRegisterComponent;
}();
exports.NbRegisterComponent = NbRegisterComponent;
//# sourceMappingURL=register.component.js.map
//# sourceMappingURL=register.component.js.map