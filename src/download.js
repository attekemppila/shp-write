var zip = require('./zip');
var FileSaver = require("file-saver");

module.exports = function(gj, options) {
    return zip(gj, options).then(function(blob) { return FileSaver.saveAs(blob, options.file + '.zip'); });
};
