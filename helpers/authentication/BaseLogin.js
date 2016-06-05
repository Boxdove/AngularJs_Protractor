(function () {

    var loginPage = new require('../../pages/loginPage')();
    var Urls = require('../../helpers/Urls');

    var BaseLogin = function () {

        this.loginToApp = function (url, username, password) {
            browser.ignoreSynchronization = true;
            browser.driver.manage().window().maximize();
            return utils.visitPage(url).then(function () {
                var loginButton = element(by.id("ctrlLogin_LoginButton"));
                return loginButton.isPresent().then(function (isPresent) {
                    if (isPresent) {
                        return loginPage.login(username, password);
                    }
                }).then(function () {
                    return browser.waitForAngular().thenFinally(function () {
                        browser.ignoreSynchronization = false;
                    });
                });
            });
        };

        this.loginToLocalEnvironment = function (url) {
            browser.driver.manage().window().maximize();
            return utils.visitPage(url).then(function () {
                    return browser.waitForAngular().thenFinally(function () {
                        browser.ignoreSynchronization = false;
                    });
                });
        };

        this.logout = function () {
            browser.ignoreSynchronization = true;
            return utils.visitPage(browser.params.server.BaseUrl + Urls.logout).then(function () {
                return utils.visitPage(browser.params.server.BaseUrl);
            });
        };

        return this;
    };

    module.exports = BaseLogin;
})();