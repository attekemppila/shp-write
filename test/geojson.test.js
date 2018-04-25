var expect = require('expect.js'),
    geojson = require('../src/geojson'),
    turf = require('@turf/helpers');


describe('geojson', function() {

    describe('point', function() {

        it('empty', function() {
            var featureCollection = turf.featureCollection([]);

            expect(geojson.point(featureCollection)).to.eql({
                type: 'POINT',
                geometries: [],
                properties: []
            });
        });

        it('points', function() {
            var featureCollection = turf.featureCollection([
                turf.point([1, 1], { a: 1 }),
                turf.point([1, 2], { a: 2 }),
                turf.point([1, 3], { a: 3 }),
            ]);

            expect(geojson.point(featureCollection)).to.eql({
                type: 'POINT',
                geometries: [[1, 1], [1, 2], [1, 3]],
                properties: [{ a: 1 }, { a: 2 }, { a: 3 }]
            });
        });

        it('mixed', function() {
            var featureCollection = turf.featureCollection([
                turf.point([1, 1], { a: 1 }),
                turf.lineString([[1, 1], [2, 2]], { a: 2 }),
                turf.polygon([[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]], { a: 3 })
            ]);

            expect(geojson.point(featureCollection)).to.eql({
                type: 'POINT',
                geometries: [[1, 1]],
                properties: [{ a: 1 }]
            });
        });
    });

    describe('line', function() {

        it('empty', function() {
            var featureCollection = turf.featureCollection([]);

            expect(geojson.line(featureCollection)).to.eql({
                type: 'POLYLINE',
                geometries: [],
                properties: []
            });
        });


        it('lines', function() {
            var featureCollection = turf.featureCollection([
                turf.lineString([[1, 1], [2, 2]], { a: 1 }),
                turf.lineString([[1, 2], [2, 2]], { a: 2 }),
                turf.lineString([[1, 3], [2, 2]], { a: 3 }),
            ]);

            expect(geojson.line(featureCollection)).to.eql({
                type: 'POLYLINE',
                geometries: [
                    [[[1, 1], [2, 2]]],
                    [[[1, 2], [2, 2]]],
                    [[[1, 3], [2, 2]]]
                ],
                properties: [{ a: 1 }, { a: 2 }, { a: 3 }]
            });
        });

        it('mixed', function() {
            var featureCollection = turf.featureCollection([
                turf.point([1, 1], { a: 1 }),
                turf.lineString([[1, 1], [2, 2]], { a: 2 }),
                turf.polygon([[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]], { a: 3 })
            ]);

            expect(geojson.line(featureCollection)).to.eql({
                type: 'POLYLINE',
                geometries: [[[[1, 1], [2, 2]]]],
                properties: [{ a: 2 }]
            });
        });
    });

    describe('polygon', function() {

        it('empty', function() {
            var featureCollection = turf.featureCollection([]);

            expect(geojson.polygon(featureCollection)).to.eql({
                type: 'POLYGON',
                geometries: [],
                properties: []
            });
        });


        it('polygons', function() {
            var featureCollection = turf.featureCollection([
                turf.polygon([[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]], { a: 1 }),
                turf.polygon([[[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]]], { a: 2 }),
                turf.polygon([[[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]]], { a: 3 }),
            ]);

            expect(geojson.polygon(featureCollection)).to.eql({
                type: 'POLYGON',
                geometries: [
                    [[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]],
                    [[[1, 1], [1, 6], [6, 6], [6, 1], [1, 1]]],
                    [[[2, 2], [2, 7], [7, 7], [7, 2], [2, 2]]],
                ],
                properties: [{ a: 1 }, { a: 2 }, { a: 3 }]
            });
        });

        it('mixed', function() {
            var featureCollection = turf.featureCollection([
                turf.point([1, 1], { a: 1 }),
                turf.lineString([[1, 1], [2, 2]], { a: 2 }),
                turf.polygon([[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]], { a: 3 })
            ]);

            expect(geojson.polygon(featureCollection)).to.eql({
                type: 'POLYGON',
                geometries: [[[[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]]]],
                properties: [{ a: 3 }]
            });
        });
    });
});
