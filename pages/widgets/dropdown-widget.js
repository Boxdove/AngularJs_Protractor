(function () {

    var BaseWidget = require('../BaseWidget');
    var Select = require('../controls/select');

    var DropdownWidget = function (widgetId) {

        BaseWidget.call(this, widgetId, 'dropdown-widget');
        var select = new Select(this.widget);

        utils.extend(this, select);

        return this;
    };

    DropdownWidget.prototype = new BaseWidget();

    module.exports = DropdownWidget;
})();
