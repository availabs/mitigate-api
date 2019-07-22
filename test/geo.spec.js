var falcorGraph = require('./graph');
var get = require('lodash.get');
// var hazards = ["geo",[36001,36003,36005,36007,36009,36011,36013,36015,36017,36019,36021,36023,36025,36027,36029,36031,36033,36035,36037,36039,36041,36043,36045,36047,36049,36051,36053,36055,36057,36059,36061,36063,36065,36067,36069,36071,36073,36075,36077,36079,36081,36083,36085,36087,36089,36091,36093,36095,36097,36099,36101,36103,36105,36107,36109,36111,36113,36115,36117,36119,36121,36123],"name"]

describe('Geography tools', () => {
	
	/*
	test('geoid info', (done) => {
		var getEvent = {
	  		'paths': `[[
  				'geo',
  				['36','36001','3601755959', '36093033102'],
  				['geoid','name', 'type']
	  		]]`,
	  		'method': 'get'
	  	}

	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		expect(get(response, 'jsonGraph.geo.3601755959.name', null)).toBe("Oxford town")
			done()
		});
	})
	 */


	test('nys counties', (done) => {
		var getEvent = {
	  		'paths': `[['geo','36','counties']]`,
	  		'method': 'get'
	  	}

	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.log('response',JSON.stringify(response))
	  		//expect(get(response, 'jsonGraph.geo.36.counties.value', null)).not.toBe(null)
	  		// ny should have 62 counties
	  		//expect(get(response, 'jsonGraph.geo.36.counties.value', null).length).toBe(62)
			done()
		});
	})


	//----------------My code ----------------------

	/*
	test('nys counties', (done) => {
		var getEvent = {
			'paths': `[['geo',['36001'],['name']]]`,
			'method': 'get'
		}

		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			console.log('response',JSON.stringify(response))
			//expect(get(response, 'jsonGraph.geo.36.counties.value', null)).not.toBe(null)
			// ny should have 62 counties
			//expect(get(response, 'jsonGraph.geo.36.counties.value', null).length).toBe(62)
			done()
		});
	})
	 */

	/*
	test('nys counties', (done) => {
		var getEvent = {
			'paths': `[['geo',["3600161181", "3600106211", "3600140002", "3600179851", "3600131104", "3600150672", "3600116694", "3600117343", "3600101000", "3600106354", "3600116749", "3600178674", "3600130532"],['name']]]`,
			'method': 'get'
		}

		falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
			console.log('response',JSON.stringify(response))
			done()
		});
	})
	 */
	/*
	test('nys tracts', (done) => {
		var getEvent = {
	  		'paths': `[['geo',['36','36001'],'tracts']]`,
	  		'method': 'get'
	  	}

	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {

	  		// console.log('meta response', JSON.stringify(response))
	  		expect(get(response, 'jsonGraph.geo.36.tracts.value', null)).not.toBe(null)

	  		// ny should have 4918 tracts
	  		expect(get(response, 'jsonGraph.geo.36.tracts.value', null).length).toBe(4918)

	  		// albany county should have 75 tracts
	  		expect(get(response, 'jsonGraph.geo.36001.tracts.value', null).length).toBe(75)

			done()
		});
	})

	test('CensusAcsByGeoidByYear', done => {
		const getEvent = {
			paths: `[
				['geo', ['36', '36001', '3600106354', '36001013505'], [2018, 2017, 2016, 2015, 2014], ['population', 'under_5']]
			]`,
			method: 'get'
		}
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			expect(get(response, 'jsonGraph.geo.36.2018.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2017.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2016.population', null)).toBe(19697457);
			expect(get(response, 'jsonGraph.geo.36.2015.population', null)).toBe(19673174);
			expect(get(response, 'jsonGraph.geo.36.2014.population', null)).toBe(19594330);

			expect(get(response, 'jsonGraph.geo.36001.2018.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36001.2017.population', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36001.2016.population', null)).toBe(307891);
			expect(get(response, 'jsonGraph.geo.36001.2015.population', null)).toBe(307463);
			expect(get(response, 'jsonGraph.geo.36001.2014.population', null)).toBe(306124);

			expect(get(response, 'jsonGraph.geo.36.2018.under_5', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2017.under_5', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36.2016.under_5', null)).toBe(598437 + 572286);
			expect(get(response, 'jsonGraph.geo.36.2015.under_5', null)).toBe(601900 + 574532);
			expect(get(response, 'jsonGraph.geo.36.2014.under_5', null)).toBe(597992 + 572266);

			expect(get(response, 'jsonGraph.geo.36001.2018.under_5', null)).toBe(0);
			expect(get(response, 'jsonGraph.geo.36001.2017.under_5', null)).toBe(0);
			expect(typeof get(response, 'jsonGraph.geo.36001.2016.under_5', null)).toBe('number');
			expect(typeof get(response, 'jsonGraph.geo.36001.2015.under_5', null)).toBe('number');
			expect(typeof get(response, 'jsonGraph.geo.36001.2014.under_5', null)).toBe('number');

			done();
		})
	})
	 */

})

afterAll(() => {
  return falcorGraph.close();
});
