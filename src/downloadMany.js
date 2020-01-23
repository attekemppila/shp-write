var zipMany = require('./zipMany');
var saveAs = require("file-saver").saveAs;

module.exports = function(gjArray, options) {
    zipMany(gjArray, options).then(function(blob) { saveAs(blob, options.file + '.zip'); });
};
