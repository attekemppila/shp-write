var zipMany = require('./zipMany');
var saveAs = require("file-saver").saveAs;

module.exports = function(gjCollections, options) {
    zipMany(gjCollections, options).then(function(blob) { saveAs(blob, options.file + '.zip'); });
};
