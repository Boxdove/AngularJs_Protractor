(function () {

    var Utilities = function () {

        this.hover = function (radiantControl) {
            return browser.actions().mouseMove(radiantControl).perform();
        };

        this.extend = function (target, source) {
            for (var i in source) {
                if (source.hasOwnProperty(i)) {
                    target[i] = source[i];
                }
            }
        };

        this.visitPage = function (url) {
            logger.debug('Navigating to:', url);
            return browser.get(url);
        };

        this.refreshPage = function () {
            logger.debug('Refresh page');
            return browser.refresh().then(function () {
                return browser.waitForAngular().thenFinally(function () {
                    browser.ignoreSynchronization = false;
                });
            });
        };

        return this;
    };

    module.exports = Utilities;
})();