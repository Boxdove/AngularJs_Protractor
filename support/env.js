//By default, asynchronous hooks and steps timeout after 5000 milliseconds.
//Here we global modify it
var configure = function () {
    this.setDefaultTimeout(600 * 1000);
};

module.exports = configure;