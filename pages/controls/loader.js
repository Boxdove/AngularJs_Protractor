(function () {

    var Loader = function (container) {

        var loader = container.element(by.css('.loader'));
        var spinner = container.element(by.css('.loading-process'));

        this.spinnerIsVisible = function () {
            return browser.wait(function () {
                return spinner.isDisplayed().then(function (result) {
                    return !result;
                });
            }, 170000);
        };

        return this;
    };

    module.exports = Loader;
})();


