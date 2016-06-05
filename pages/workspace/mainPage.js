(function () {

    var MainPage = function () {

        var tree = element(by.css('.report-library'));
        var alert = $('.widget-errors').$('.alert');

        this.openReport = function (path) {
            logger.info('Open report: ', path);
            var levels = path.split('/');
            var self = this;
            return getPanelItem(levels[0]).click().then(function () {
                levels.splice(0, 1);
                if (levels.length !== 0) {
                    return self.openReport(levels.join('/'));
                }
            }).then(function () {
                alert.isPresent().then(function (isPresent) {
                    if (isPresent) {
                        alert.getText().then(function (errorText) {
                            logger.error('JSON parsing error is present: ' + errorText);
                        });
                    }
                    assert.notOk(isPresent, 'JSON parsing error is present');
                });
            });
        };

        function getPanelItem(name) {
            return tree.element(by.css('[title="' + name + '"]'));
        }

        return this;
    };

    module.exports = MainPage;
})();