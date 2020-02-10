var write = require('./write'),
    geojson = require('./geojson'),
    JSZip = require('jszip');

module.exports = function(gjCollections, options) {

    var zip = new JSZip(),
        layers = zip.folder(options && options.folder ? options.folder : 'layers');

    Object.keys(gjCollections).forEach(function(gjKey) {
        var gj = gjCollections[gjKey];

        if (geojson.point(gj).geometries.length) throw new Error("point is not supported");
        if (geojson.line(gj).geometries.length) throw new Error("line is not supported");

        var gjPolygons = [geojson.polygon(gj)];
        gjPolygons.forEach(function(l) {
            if (l.geometries.length && l.geometries[0].length) {
                write(
                    // field definitions
                    l.properties,
                    // geometry type
                    l.type,
                    // geometries
                    l.geometries,
                    options.prj,
                    function(err, files) {
                        var fileName = gjKey;
                        layers.file(fileName + '.shp', files.shp.buffer, { binary: true });
                        layers.file(fileName + '.shx', files.shx.buffer, { binary: true });
                        layers.file(fileName + '.dbf', files.dbf.buffer, { binary: true });
                        if (options.prj !== null) layers.file(fileName + '.prj', options.prj);
                    });
            }
        });
    });

    return zip.generateAsync({
        type: process.browser === undefined ? 'nodebuffer' : 'blob',
        compression: 'DEFLATE'
    });
};
