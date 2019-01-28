var falcorGraph = require('./graph');
var get = require('lodash.get');
// var hazards = ["geo",[36001,36003,36005,36007,36009,36011,36013,36015,36017,36019,36021,36023,36025,36027,36029,36031,36033,36035,36037,36039,36041,36043,36045,36047,36049,36051,36053,36055,36057,36059,36061,36063,36065,36067,36069,36071,36073,36075,36077,36079,36081,36083,36085,36087,36089,36091,36093,36095,36097,36099,36101,36103,36105,36107,36109,36111,36113,36115,36117,36119,36121,36123],"name"]

describe('Geography tools', () => {



test('CensusAcsByGeoidByYearByKey', done => {
    const getEvent = {
        paths: `[
				['geo', ['36001'], [2014], 'acs',['B01003]]
			]`,
        method: 'get'
    }
    falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
        console.log('ran hte test', error, response)
        expect(get(response, 'jsonGraph.geo.36.2018.population', null)).toBe(null);


        done();
        })
    })

})

afterAll(() => {
    return falcorGraph.close();
});
