
var falcorGraph = require('./graph');
var get = require('lodash.get');
var counties = [36001,36003,36005,36007,36009,36011,36013,36015,36017,36019,36021,36023,36025,36027,36029,36031,36033,36035,36037,36039,36041,36043,36045,36047,36049,36051,36053,36055,36057,36059,36061,36063,36065,36067,36069,36071,36073,36075,36077,36079,36081,36083,36085,36087,36089,36091,36093,36095,36097,36099,36101,36103,36105,36107,36109,36111,36113,36115,36117,36119,36121,36123] 
var hazards = ["avalanche","coastal","coldwave","drought","earthquake","hail","heatwave","hurricane","icestorm","landslide","lightning","riverine","tornado","tsunami","volcano","wildfire","wind","winterweat"]
describe('Sheldus', () => {
	
	test('riskIndex worst query', (done) => {
		var getEvent = {
	  		'paths': `[
	  			["severeweather",[${counties}],${JSON.stringify(hazards)},{"from":1996,"to":2012},["crop_damage","fatalities","injuries","num_events","property_damage"]]]`,
	  		'method': 'get'
	  	}
	  	console.time('get big query')
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.log('meta response', JSON.stringify(response))
	  		console.timeEnd('get big query')
	  		expect(get(response, 'jsonGraph.sheldus.36001.wind.1996.num_events', null)).not.toBe(36582.86)
			done()
		});
	})

})

afterAll(() => {
  return falcorGraph.close();
});
