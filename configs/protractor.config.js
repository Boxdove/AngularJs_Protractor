var Environments = require('./environments');

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    params: {
        server: {
            BaseUrl: Environments.baseUrl,
            localApplicationUrl: Environments.localhost,
            isLocalRun: false
        },
        credentials: {
            username: "user@reports",
            password: "Password1"
        }
    },

    specs: [
        '../test/features/*/*.feature',

        //'../test/features/*/dropdownWidget.feature',

        //**************************************************************************************//

        // reports
        //'../test/features/*/detailedProfileReport.feature',

    ],

    // for external webdriver-manager running
    directConnect: true,

    capabilities: {
        'browserName': 'chrome'
        //'browserName': 'firefox'
    },

    rootElement: "[ng-app]",

    onPrepare: function () {

        var log4js = require('log4js');

        var chai = require("chai");
        var chaiAsPromised = require("chai-as-promised");
        chai.use(chaiAsPromised);

        global._ = require('underscore');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.logger = log4js.getLogger();
        global.Enum = require('enum');
        global.should = chai.should();
        global.utils = new require('../helpers/utilities')();

        console.log("Memory usage on start: ");
        console.log(process.memoryUsage());

        //TODO: fix for new protractor version
        //var origFn = browser.driver.controlFlow().execute;
        //browser.driver.controlFlow().execute = function () {
        //    var args = arguments;
        //    // queue 100ms wait
        //    origFn.call(browser.driver.controlFlow(), function () {
        //        return protractor.promise.delayed(100);
        //    });
        //    return origFn.apply(browser.driver.controlFlow(), args);
        //};
        by.addLocator('text',
            /**
             *
             * @param text - will be lowercased
             * @param selector - to get list of children
             * @param parent - protractor will provide this..
             */
            function(text, selector, _parent) {
                return Array.prototype.filter.call( (_parent || document).querySelectorAll(selector), function(e){
                    return e && !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) && e.textContent && e.textContent.toLowerCase().trim() === text.toLowerCase().trim();
                });
            });
    },

    onComplete: function () {
        global.gc();
        console.log("Memory usage on completion: ");
        console.log(process.memoryUsage());

    },

    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.

    allScriptsTimeout: 900000,
    // How long to wait for a page to load.
    getPageTimeout: 300000,

    framework: 'custom',

    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        require: ['../test/features/step_definitions/*.js', '../test/features/step_definitions/*/*.js', '../support/*.js'],
        //require: '../test/features/step_definitions/*.js',
        format: 'pretty',
        tags: [
            "~@ignore",
            "~@bug",
            //"~@unit",
            //"@test",
        ]
    },

    jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 360000
    },

    resultJsonOutputFile: './testresults/report.json'

};