var expect = require('expect.js'),
    prj = require('./prj'),
    shapefile = require('shapefile'),
    turf = require('@turf/helpers'),
    write = require('../src/write');


describe('write', function() {

    it('works with one point', function(done) {
        var geometryType = 'POINT';
        var points = [
            [1, 1]
        ];
        var properties = points.map(generateIdProperty);

        write(properties, geometryType, points, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.point([1, 1], { id: 1 })
                ])
            );
        }));
    });

    it('works with multiple points', function(done) {
        var geometryType = 'POINT';
        var points = [
            [1, 3],
            [2, 2],
            [3, 1]
        ];
        var properties = points.map(generateIdProperty);

        write(properties, geometryType, points, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.point([1, 3], { id: 1 }),
                    turf.point([2, 2], { id: 2 }),
                    turf.point([3, 1], { id: 3 })
                ])
            );
        }));
    });

    it('works with one linestring', function(done) {
        var geometryType = 'POLYLINE';
        var lines = [
            [[[1, 1], [2, 2]]]
        ];
        var properties = lines.map(generateIdProperty);

        write(properties, geometryType, lines, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.lineString([[1, 1], [2, 2]], { id: 1 })
                ])
            );
        }));
    });

    it('works with multiple linestrings', function(done) {
        var geometryType = 'POLYLINE';
        var lines = [
            [[[1, 1], [2, 2]]],
            [[[0, 0], [0, 1], [0, 2]]],
            [[[0, 0], [1, 0], [2, 0], [3, 0]]]
        ];
        var properties = lines.map(generateIdProperty);

        write(properties, geometryType, lines, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.lineString([[1, 1], [2, 2]], { id: 1 }),
                    turf.lineString([[0, 0], [0, 1], [0, 2]], { id: 2 }),
                    turf.lineString([[0, 0], [1, 0], [2, 0], [3, 0]], { id: 3 })
                ])
            );
        }));
    });

    it('works with one polygon', function(done) {
        var geometryType = 'POLYGON';
        var polygons = [
            [[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]]
        ];
        var properties = polygons.map(generateIdProperty);

        write(properties, geometryType, polygons, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.polygon([[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]], { id: 1 })
                ])
            );
        }));
    });

    it('works with multiple polygons', function(done) {
        var geometryType = 'POLYGON';
        var polygons = [
            [[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]],
            [[[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]]],
            [[[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]]]
        ];
        var properties = polygons.map(generateIdProperty);

        write(properties, geometryType, polygons, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.polygon([[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]], { id: 1 }),
                    turf.polygon([[[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]]], { id: 2 }),
                    turf.polygon([[[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]]], { id: 3 })
                ])
            );
        }));
    });

    it('works with one polygon with one hole', function(done) {
        var geometryType = 'POLYGON';
        // shell/exterior clockwise, hole/interior counter-clockwise
        var polygons = [
            [
                [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                [[1, 1], [2, 1], [1, 2], [1, 1]]
            ]
        ];
        var properties = polygons.map(generateIdProperty);

        write(properties, geometryType, polygons, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.polygon(
                        [
                            [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                            [[1, 1], [2, 1], [1, 2], [1, 1]]
                        ],
                        { id: 1 })
                ])
            );
        }));
    });

    it('works with one polygon with multiple holes', function(done) {
        var geometryType = 'POLYGON';
        // shell/exterior clockwise, hole/interior counter-clockwise
        var polygons = [
            [
                [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                [[1, 1], [2, 1], [1, 2], [1, 1]],
                [[4, 4], [3, 4], [4, 3], [4, 4]]
            ]
        ];
        var properties = polygons.map(generateIdProperty);

        write(properties, geometryType, polygons, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.polygon(
                        [
                            [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                            [[1, 1], [2, 1], [1, 2], [1, 1]],
                            [[4, 4], [3, 4], [4, 3], [4, 4]]
                        ],
                        { id: 1 })
                ])
            );
        }));
    });

    it('works with multiple polygons with one hole', function(done) {
        var geometryType = 'POLYGON';
        // shell/exterior clockwise, hole/interior counter-clockwise
        var polygons = [
            [
                [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                [[1, 1], [2, 1], [1, 2], [1, 1]]
            ],
            [
                [[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]],
                [[2, 2], [3, 2], [2, 3], [2, 2]]
            ],
            [
                [[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]],
                [[3, 3], [4, 3], [3, 4], [3, 3]]
            ]
        ];
        var properties = polygons.map(generateIdProperty);

        write(properties, geometryType, polygons, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.polygon(
                        [
                            [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                            [[1, 1], [2, 1], [1, 2], [1, 1]]
                        ],
                        { id: 1 }),
                    turf.polygon(
                        [
                            [[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]],
                            [[2, 2], [3, 2], [2, 3], [2, 2]]
                        ],
                        { id: 2 }),
                    turf.polygon(
                        [
                            [[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]],
                            [[3, 3], [4, 3], [3, 4], [3, 3]]
                        ],
                        { id: 3 })
                ])
            );
        }));
    });

    it('works with multiple polygons with multiple holes', function(done) {
        var geometryType = 'POLYGON';
        // shell/exterior clockwise, hole/interior counter-clockwise
        var polygons = [
            [
                [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                [[1, 1], [2, 1], [1, 2], [1, 1]],
                [[4, 4], [3, 4], [4, 3], [4, 4]]
            ],
            [
                [[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]],
                [[2, 2], [3, 2], [2, 3], [2, 2]],
                [[5, 5], [4, 5], [5, 4], [5, 5]]
            ],
            [
                [[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]],
                [[3, 3], [4, 3], [3, 4], [3, 3]],
                [[6, 6], [5, 6], [6, 5], [6, 6]]
            ]
        ];
        var properties = polygons.map(generateIdProperty);

        write(properties, geometryType, polygons, prj, callback(done, function(featureCollection) {
            delete featureCollection.bbox;
            expect(featureCollection).to.eql(
                turf.featureCollection([
                    turf.polygon(
                        [
                            [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]],
                            [[1, 1], [2, 1], [1, 2], [1, 1]],
                            [[4, 4], [3, 4], [4, 3], [4, 4]]
                        ],
                        { id: 1 }),
                    turf.polygon(
                        [
                            [[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]],
                            [[2, 2], [3, 2], [2, 3], [2, 2]],
                            [[5, 5], [4, 5], [5, 4], [5, 5]]
                        ],
                        { id: 2 }),
                    turf.polygon(
                        [
                            [[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]],
                            [[3, 3], [4, 3], [3, 4], [3, 3]],
                            [[6, 6], [5, 6], [6, 5], [6, 6]]
                        ],
                        { id: 3 })
                ])
            );
        }));
    });
});


function generateIdProperty(value, index) {
    return { id: index + 1 };
}

function callback(done, assert) {
    return function(err, files) {
        if (err) return done(err);

        return shapefile.read(files.shp.buffer, files.dbf.buffer)
            .then(function(featureCollection) {
                assert(featureCollection);
                return done();
            })
            .catch(function(e) {
                return done(e)
            });
    };
}
