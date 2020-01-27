require('./src/download')({
    "type": "FeatureCollection",
    "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            24.936046600341797,
                            60.175245406790246
                        ],
                        [
                            24.920597076416016,
                            60.15577400466598
                        ],
                        [
                            24.953556060791016,
                            60.1570553725571
                        ],
                        [
                            24.936046600341797,
                            60.175245406790246
                        ]
                    ],
                    [
                        [
                            24.93523120880127,
                            60.169247224327165
                        ],
                        [
                            24.945573806762695,
                            60.15874243076889
                        ],
                        [
                            24.928064346313477,
                            60.15825127085746
                        ],
                        [
                            24.93523120880127,
                            60.169247224327165
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        24.920940399169922,
                        60.17977000114811
                    ],
                    [
                        24.953556060791016,
                        60.17486121440947
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    24.925403594970703,
                    60.171830205844614
                ]
            }
        }
    ]
}, {
    file: 'shapefiles',
    folder: 'shapefiles',
    types: {
        point: 'points',
        polygon: 'polygons',
        polyline: 'lines'
    },
    prj: 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'
});

require('./src/downloadMany')({
    "polygonLayer1": {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            24.936046600341797,
                            60.175245406790246
                        ],
                        [
                            24.920597076416016,
                            60.15577400466598
                        ],
                        [
                            24.953556060791016,
                            60.1570553725571
                        ],
                        [
                            24.936046600341797,
                            60.175245406790246
                        ]
                    ],
                    [
                        [
                            24.93523120880127,
                            60.169247224327165
                        ],
                        [
                            24.945573806762695,
                            60.15874243076889
                        ],
                        [
                            24.928064346313477,
                            60.15825127085746
                        ],
                        [
                            24.93523120880127,
                            60.169247224327165
                        ]
                    ]
                ]
            }
        }]
    },
    "polygonLayer2": {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            24.936046600341797,
                            60.175245406790246
                        ],
                        [
                            24.920597076416016,
                            60.15577400466598
                        ],
                        [
                            24.953556060791016,
                            60.1570553725571
                        ],
                        [
                            24.936046600341797,
                            60.175245406790246
                        ]
                    ],
                    [
                        [
                            24.93523120880127,
                            60.169247224327165
                        ],
                        [
                            24.945573806762695,
                            60.15874243076889
                        ],
                        [
                            24.928064346313477,
                            60.15825127085746
                        ],
                        [
                            24.93523120880127,
                            60.169247224327165
                        ]
                    ]
                ]
            }
        }]
    }
},
{
    file: 'shapefilesMany',
    folder: 'shapefilesMany',
    prj: 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'
});

try {
    require('./src/downloadMany')({
        "pointLayer": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            24.925403594970703,
                            60.171830205844614
                        ]
                    }
                }
            ]
        }
    },
    {
        file: 'shapefiles',
        folder: 'shapefiles',
        prj: 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'
    });
} catch(e) {
    console.error(e); // downloadMany should throw error for points
}

try {
    require('./src/downloadMany')({
        "lineLayer": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                24.920940399169922,
                                60.17977000114811
                            ],
                            [
                                24.953556060791016,
                                60.17486121440947
                            ]
                        ]
                    }
                }
            ]
        }
    },
    {
        file: 'shapefiles',
        folder: 'shapefiles',
        prj: 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'
    });
} catch(e) {
    console.error(e); // downloadMany should throw error for lines
}
