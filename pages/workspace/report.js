(function () {

    var Loader = require('../controls/loader')

    var Report = function () {

        var projectDetails = element(by.className('project-details'));
        var detailsButtons = projectDetails.element(by.className('details-buttons'));
        var cancelButton = element(by.text('Cancel', 'span'));
        var pdfFormatButton = detailsButtons.element(by.css('[title="Generate to PDF"]'));
        var excelFormatButton = detailsButtons.element(by.css('[title="Generate to Excel 2003"]'));
        var wordFormatButton = detailsButtons.element(by.css('[title = "Generate to Word 2003"]'));
        var word2007FormatButton = detailsButtons.element(by.css('[title = "Generate to Word 2007"]'));

        var loader = new Loader(projectDetails);

        var RenderFormat = new Enum(["PDF", "Excel2003", "Word2003", "Word2007"]);

        this.generateProject = function (reportFormat) {
            var formats;
            logger.debug('Generate project into the: ', reportFormat);
            formats = defineRenderFormats(reportFormat);
            return generate(formats);
        };

        this.closeProject = function () {                                           // TODO refactor with confirm dialog
            logger.debug('Close project.');
            return cancelButton.click();
        };

        function generate(formats) {
            var format = formats.splice(0, 1)[0];
            return format.renderFormatButton.click().then(function () {
                logger.debug('Generate into:', format.format.key);
                return loader.spinnerIsVisible().then(function () {
                    if (formats.length > 0) {
                        return generate(formats);
                    }
                });
            });
        }

        function defineRenderFormats(renderFormats) {
            var result;
            var selectedFormats = [];
            var formats = [
                {
                    format: RenderFormat.PDF,
                    renderFormatButton: pdfFormatButton,
                    formatIsEnabled: pdfFormatButton.isPresent()
                },
                {
                    format: RenderFormat.Excel2003,
                    renderFormatButton: excelFormatButton,
                    formatIsEnabled: excelFormatButton.isPresent()
                },
                {
                    format: RenderFormat.Word2003,
                    renderFormatButton: wordFormatButton,
                    formatIsEnabled: wordFormatButton.isPresent()
                },
                {
                    format: RenderFormat.Word2007,
                    renderFormatButton: word2007FormatButton,
                    formatIsEnabled: word2007FormatButton.isPresent()
                }
            ];

            if (renderFormats !== undefined) {
                renderFormats.forEach(function (format) {
                    if (format in RenderFormat) {
                        result = _.select(formats, function (f) {
                            return f.format.toString() === format;
                        });
                        selectedFormats.push(result[0]);
                    }
                });

                formats = selectedFormats;
            }
            return formats;
        }

        return this;
    };

    module.exports = Report;
})();