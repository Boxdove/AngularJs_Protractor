(function () {

    var BaseWidget = function (widgetId, widgetClass) {

        if (!widgetId) {
            return;
        }

        var baseWidget = element(by.id(widgetId));

        if (widgetClass) {
            this.widget = baseWidget.element(by.className(widgetClass));
        }

    };

    var prototype = BaseWidget.prototype;

    prototype.clear = function () {
        return this.widget.evaluate('selectedItems.clear()');
    };

    module.exports = BaseWidget;
})();