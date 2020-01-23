var write = require('./write'),
    geojson = require('./geojson'),
    JSZip = require('jszip');

module.exports = function(gjArray, options) {

    var zip = new JSZip(),
        layers = zip.folder(options && options.folder ? options.folder : 'layers');

    gjArray.forEach(function(gj, layerIndex) {
      [geojson.polygon(gj)]
          .forEach(function(l) {
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
                      var fileName = options && options.layerNames ? options.layerNames[layerIndex] : l.type;
                      layers.file(fileName + '.shp', files.shp.buffer, { binary: true });
                      layers.file(fileName + '.shx', files.shx.buffer, { binary: true });
                      layers.file(fileName + '.dbf', files.dbf.buffer, { binary: true });
                      layers.file(fileName + '.prj', options.prj);
                  });
          }
      });
    });

    return zip.generateAsync({
        type: process.browser === undefined ? 'nodebuffer' : 'blob',
        compression: 'DEFLATE'
    });
};
