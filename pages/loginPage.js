(function () {

    var LoginPage = function () {

        var userNameTextBox = element(by.id("ctrlLogin_UserName"));
        var userPasswordTextBox = element(by.id("ctrlLogin_Password"));
        var loginButton = element(by.id("ctrlLogin_LoginButton"));

        this.login = function (username, password) {
            if (username && password) {
                setUserName(username);
                setPassword(password);
                return clickLoginButton();
            }
        };

        function setUserName(username) {
            logger.debug('Enter Login:', username);
            userNameTextBox.sendKeys(username);
        }

        function setPassword(password) {
            logger.debug('Enter password.');
            userPasswordTextBox.sendKeys(password);
        }

        function clickLoginButton() {
            logger.debug('Click Login button.');
            return loginButton.click()
                .then(function () {
                    return browser.waitForAngular().then(function () {
                        browser.ignoreSynchronization = false;
                    }, function () {
                        browser.ignoreSynchronization = true;
                    });
                });
        }

    };

    module.exports = LoginPage;
})();