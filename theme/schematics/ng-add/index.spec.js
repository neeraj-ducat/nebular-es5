"use strict";
/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular/cdk/schematics");
var testing_1 = require("@angular-devkit/schematics/testing");
var test_1 = require("@schematics/angular/utility/test");
var config_1 = require("@schematics/angular/utility/config");
var schema_1 = require("@schematics/angular/application/schema");
var workspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '7.0.0'
};
var defaultAppOptions = {
    name: 'nebular',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: schema_1.Style.Scss,
    skipTests: false,
    skipPackageJson: false
};
var EXPECTED_STYLES_SCSS = "@import 'themes';\n\n@import '~@nebular/theme/styles/globals';\n\n@include nb-install() {\n  @include nb-theme-global();\n};\n";
var EXPECTED_THEME_SCSS = "@import '~@nebular/theme/styles/theming';\n@import '~@nebular/theme/styles/themes/default';\n\n$nb-themes: nb-register-theme((\n  // add your variables here like:\n  // color-bg: #4ca6ff,\n), default, default);\n";
function createTestWorkspace(runner, appOptions) {
    if (appOptions === void 0) {
        appOptions = {};
    }
    var workspace = runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    return runner.runExternalSchematicAsync('@schematics/angular', 'application', __assign({}, defaultAppOptions, appOptions), workspace);
}
function getPackageDependencies(tree) {
    var packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
    return packageJson.dependencies;
}
describe('ng-add', function () {
    var runner;
    var appTree;
    function runNgAddSchematic(options) {
        if (options === void 0) {
            options = {};
        }
        return runner.runSchematicAsync('ng-add', options, appTree);
    }
    function runSetupSchematic(options) {
        if (options === void 0) {
            options = {};
        }
        return runner.runSchematic('setup', options, appTree);
    }
    function runPostInstallSchematic(options) {
        if (options === void 0) {
            options = {};
        }
        return runner.runSchematic('post-install', options, appTree);
    }
    beforeEach(function (done) {
        var collectionPath = require.resolve('../collection.json');
        runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
        createTestWorkspace(runner).subscribe(function (tree) {
            appTree = tree;
            done();
        });
    });
    describe('ng-add', function () {
        var tree;
        beforeEach(function (done) {
            runNgAddSchematic().subscribe(function (applicationTree) {
                tree = applicationTree;
                done();
            });
        });
        it('should add @angular/cdk in package.json', function () {
            var dependencies = getPackageDependencies(tree);
            var angularCdkVersion = require('../../package.json').peerDependencies['@angular/cdk'];
            expect(dependencies['@angular/cdk']).toBeDefined();
            expect(dependencies['@angular/cdk']).toBe(angularCdkVersion);
        });
        it('should add @angular/animations in package.json', function () {
            var dependencies = getPackageDependencies(tree);
            var angularCoreVersion = dependencies['@angular/core'];
            expect(dependencies['@angular/animations']).toBeDefined();
            expect(dependencies['@angular/animations']).toBe(angularCoreVersion);
        });
        it('should add @nebular/theme in package.json', function () {
            var dependencies = getPackageDependencies(tree);
            var nebularThemeVersion = require('../../package.json').version;
            expect(dependencies['@nebular/theme']).toBeDefined();
            expect(dependencies['@nebular/theme']).toBe(nebularThemeVersion);
        });
        it('should add @nebular/eva-icons in package.json', function () {
            var dependencies = getPackageDependencies(tree);
            var nebularEvaIconsVersion = require('../../package.json').version;
            expect(dependencies['@nebular/eva-icons']).toBeDefined();
            expect(dependencies['@nebular/eva-icons']).toBe(nebularEvaIconsVersion);
            tree = runPostInstallSchematic();
            dependencies = getPackageDependencies(tree);
            var evaIconsVersion = require('../../../eva-icons/package.json').peerDependencies['eva-icons'];
            expect(dependencies['eva-icons']).toBeDefined();
            expect(dependencies['eva-icons']).toBe(evaIconsVersion);
        });
    });
    it('should register NbThemeModule.forRoot()', function () {
        var tree = runSetupSchematic();
        var appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');
        expect(appModuleContent).toContain("NbThemeModule.forRoot({ name: 'default' })");
    });
    it('should register NbThemeModule with specified theme', function () {
        var tree = runSetupSchematic({ theme: 'cosmic' });
        var appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');
        expect(appModuleContent).toContain("NbThemeModule.forRoot({ name: 'cosmic' })");
    });
    it('should register NbLayoutModule', function () {
        var tree = runSetupSchematic();
        var appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');
        expect(appModuleContent).toContain("NbLayoutModule");
    });
    it('should create AppRoutingModule if no Router already registered', function () {
        var tree = runSetupSchematic();
        var appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');
        expect(appModuleContent).toContain("AppRoutingModule");
        expect(tree.files).toContain('/projects/nebular/src/app/app-routing.module.ts');
    });
    it('should register inline theme if no theme already registered', function () {
        var tree = runSetupSchematic({ customization: false });
        var workspace = config_1.getWorkspace(tree);
        var project = schematics_1.getProjectFromWorkspace(workspace);
        var styles = schematics_1.getProjectTargetOptions(project, 'build').styles;
        expect(styles).toContain('./node_modules/@nebular/theme/styles/prebuilt/default.css');
    });
    it('should create theme.scss and plug it into the project', function (done) {
        createTestWorkspace(runner, { style: schema_1.Style.Scss }).subscribe(function (applicationTree) {
            appTree = applicationTree;
            var tree = runSetupSchematic({ customization: true });
            var styles = tree.readContent('/projects/nebular/src/styles.scss');
            var themes = tree.readContent('/projects/nebular/src/themes.scss');
            expect(styles).toContain(EXPECTED_STYLES_SCSS);
            expect(themes).toContain(EXPECTED_THEME_SCSS);
            done();
        });
    });
    it('should throw error if adding scss themes in css project', function (done) {
        createTestWorkspace(runner, { style: schema_1.Style.Css }).subscribe(function (tree) {
            appTree = tree;
            expect(function () {
                return runSetupSchematic({ customization: true });
            }).toThrow();
            done();
        });
    });
    it('should add the BrowserAnimationsModule to the project module', function () {
        var tree = runSetupSchematic({ animations: true });
        var fileContent = test_1.getFileContent(tree, '/projects/nebular/src/app/app.module.ts');
        expect(fileContent).toContain('BrowserAnimationsModule', 'Expected the project app module to import the "BrowserAnimationsModule".');
    });
    it('should add the NoopAnimationsModule to the project module', function () {
        var tree = runSetupSchematic({ animations: false });
        var fileContent = test_1.getFileContent(tree, '/projects/nebular/src/app/app.module.ts');
        expect(fileContent).toContain('NoopAnimationsModule', 'Expected the project app module to import the "NoopAnimationsModule".');
    });
    it('should not add NoopAnimationsModule if BrowserAnimationsModule is set up', function () {
        var workspace = config_1.getWorkspace(appTree);
        var project = schematics_1.getProjectFromWorkspace(workspace);
        // Simulate the case where a developer uses `ng-add` on an Angular CLI project which already
        // explicitly uses the `BrowserAnimationsModule`. It would be wrong to forcibly change
        // to noop animations.
        var fileContent = schematics_1.addModuleImportToRootModule(appTree, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
        runSetupSchematic({ animations: false });
        expect(fileContent).not.toContain('NoopAnimationsModule', 'Expected the project app module to not import the "NoopAnimationsModule".');
    });
});
//# sourceMappingURL=index.spec.js.map
//# sourceMappingURL=index.spec.js.map