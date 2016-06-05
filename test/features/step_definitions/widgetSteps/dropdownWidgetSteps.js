(function () {

    var DropdownWidget = require('./../../../../pages/widgets/dropdown-widget');
    var dropdownWidget;

    var dropdownWidgetSteps = function () {

        this.When(/^dropdown widget (.*) is available$/, function (widgetId, callback) {
            dropdownWidget = new DropdownWidget(widgetId);
            callback();
        });

        this.When(/^I select dropdown items (.*)$/, function (item, callback) {
            var items = item.split(';');
            dropdownWidget.clearAndSelect(items).then(function () {
                callback();
            });
        });

        this.When(/^I select all items$/, function (callback) {
            dropdownWidget.clearAndSelectAll().then(function () {
                callback();
            });
        });

        this.Then(/^dropdown items (.*) are displayed$/, function (items, callback) {
            dropdownWidget.getSelectedItems().then(function (selected) {
                expect(selected.join(';')).to.equal(items);
                callback();
            });
        });

        this.When(/^I filter dropdown items by (.*)/, function (filterText, callback) {
            dropdownWidget.clearAndSearch(filterText).then(function () {
                callback();
            });
        });

        this.Then(/^filtered search results (.*) are displayed$/, function (expectedSearchResults, callback) {
            dropdownWidget.getMenuItems().then(function (filtered) {
                expect(filtered.join(';')).to.equal(expectedSearchResults);
                callback();
            });
        });
    };

    module.exports = dropdownWidgetSteps;
})();
