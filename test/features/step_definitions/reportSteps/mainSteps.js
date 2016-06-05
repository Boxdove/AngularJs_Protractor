(function () {

    var baseLogin = new require('../../../../helpers/authentication/BaseLogin')();
    var MainPage = require('../../../../pages/workspace/mainPage');
    var Report = require('../../../../pages/workspace/report');
    var Urls = require('../../../../helpers/Urls');
    var mainPage;
    var report;

    var MainSteps = function () {

        this.BeforeFeature(function (event, callback) {
            var feature = event.getPayloadItem('feature');
            console.log('*********************************************************************');
            console.log('FEATURE "' + feature.getName() + '" STARTED');
            callback();
        });

        this.Before(function (scenario, callback) {
            console.log('---------------------------------------------------------------------');
            console.log('Scenario "' + scenario.getName() + '" started');
            callback();
        });

        this.Given(/^I login into Reports Application$/, function (callback) {
            var loginPromise;
            if (!browser.params.server.isLocalRun) {
                loginPromise = baseLogin.loginToApp(browser.params.server.BaseUrl + Urls.Application, browser.params.credentials.username, browser.params.credentials.password);
            }
            else {
                loginPromise = baseLogin.loginToLocalEnvironment(browser.params.server.localApplicationUrl);
            }
            loginPromise.then(function () {
                mainPage = new MainPage();
                callback();
            }, function (err) {
                logger.error("An error was thrown: ", err);
            });
        });

        this.Given(/^I open trial report (.*)$/, function (path, callback) {
            report = new Report();
            mainPage.openReport(path).then(function () {
                callback();
            });
        });

        this.When(/^I refresh page$/, function (callback) {
            utils.refreshPage().then(function () {
                callback();
            });
        });

        this.When(/^I generate project in (.*)$/, function (reportFormat, callback) {
            var reportFormats = reportFormat.split(";");
            element(by.cssContainingText("div", "Report Details")).isDisplayed().then(function () {
                logger.debug('Report Formats: ', reportFormats);
                report.generateProject(reportFormats).then(function () {
                    callback();
                });
            });
        });

        this.When(/^I close project$/, function (callback) {
            report.closeProject().then(function () {
                callback();
            });
        });

        return this;
    };

    module.exports = MainSteps;
})();