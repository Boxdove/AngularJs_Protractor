(function () {

    var Select = function (container) {

        var control = container.element(by.className('select'));

        var dropdownMenu = control.element(by.css('.dropdown-menu'));
        var searchField = dropdownMenu.element(by.css('.select-filter')).element(by.tagName('input'));
        var selectAll = control.element(by.cssContainingText('.checkbox', 'Select All'));
        var dropdownButton = control.element(by.css('.btn'));
        var dropdownIcon = dropdownButton.element(by.css('.fa'));

        this.clear = function () {
            return control.evaluate('selectedItems.clear()');
        };

        this.clearAndSelect = function (items) {
            return this.clear().then(function () {
                return dropdownIcon.click().then(function () {
                    return select(items).then(function () {
                        return dropdownMenu.isDisplayed().then(function (isVisible) {
                            if (isVisible) {
                                return dropdownIcon.click();
                            }
                        });
                    });
                });
            });
        };

        this.clearAndSearch = function (searchText) {
            return this.clear().then(function () {
                return dropdownIcon.click().then(function () {
                    return searchItem(searchText);
                });
            });
        };

        this.getSelectedItems = function () {
            var selectedItems = [];
            return dropdownButton.all(by.tagName('item-template')).then(function (items) {
                items.forEach(function (item) {
                    item.getText().then(function (itemName) {
                        selectedItems.push(itemName);
                    });
                });
                return selectedItems;
            });
        };

        this.getMenuItems = function () {
            var selectedItems = [];
            return dropdownMenu.all(by.tagName('li')).then(function (items) {
                items.forEach(function (item) {
                    item.getText().then(function (itemName) {
                        selectedItems.push(itemName);
                    });
                });
                return selectedItems;
            });
        };

        this.clearAndSelectAll = function () {
            return this.clear().then(function () {
                return dropdownIcon.click().then(function () {
                    return selectAll.click().then(function () {
                        return dropdownIcon.click();
                    });
                });
            });
        };

        function searchItem(searchText) {
            return searchField.sendKeys(searchText);
        }

        function dropdownItem(name) {
            return control.element(by.cssContainingText('li', name));
        }

        function select(items) {
            if (typeof items === 'string') {
                return dropdownItem(items).click();
            }
            else {
                return dropdownItem(items[0]).click().then(function () {
                    items.splice(0, 1);
                    if (items.length > 0) {
                        return select(items);
                    }
                });
            }
        }

    };

    module.exports = Select;
})();