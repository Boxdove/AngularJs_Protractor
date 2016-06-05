module.exports = function JsonOutputHook() {
    var Cucumber = require('cucumber');
    var JsonFormatter = Cucumber.Listener.JsonFormatter();
    var fs = require('fs');
    var path = require('path');
    var outputDir = path.join(__dirname, '../testresults');
    var baseLogin = new require('../helpers/authentication/BaseLogin')();

    this.AfterFeature(function (feature, callback) {
        baseLogin.logout().then(function () {
            callback();
        });
    });

    this.After(function(scenario, callback) {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function(base64png) {
                var decodedImage = new Buffer(base64png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                callback();
            }, function(err) {
                callback(err);
            });
        } else {
            callback();
        }
    });

    var createHtmlReport = function(sourceJson) {
        var CucumberHtmlReport = require('cucumber-html-report');
        var report = new CucumberHtmlReport({
            source: sourceJson, // source json
            dest: outputDir // target directory (will create if not exists)
        });
        report.createReport();
    };

    JsonFormatter.log = function (json) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        var targetJson = path.join(outputDir + '/cucumber_report.json');
        fs.writeFile(targetJson, json, function (err) {
            if (err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            }
            else {
                console.log('json file location: ' + path.join(__dirname, '../testresults/cucumber_report.json'));

                createHtmlReport(targetJson);
            }
        });
    };

    this.registerListener(JsonFormatter);
};