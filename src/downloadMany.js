var zipMany = require('./zipMany');
var FileSaver = require("file-saver");

module.exports = function(gjCollections, options) {
    return zipMany(gjCollections, options).then(function(blob) { return FileSaver.saveAs(blob, options.file + '.zip'); });
};
