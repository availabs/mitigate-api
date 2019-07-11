const falcorGraph = require('./graph'),
<<<<<<< HEAD
	get = require('lodash.get');

jest.setTimeout(10000)

describe('building', () => {

	test(`building.byGeoid[{keys:geoids}].length`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['building', 'byGeoid',
	  				['36011', '36001'],
	  				'length'
				]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byGeoid')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byGeoid')
			let data = get(response, 'jsonGraph.building', null);


			//console.log('36001', data.byGeoid['36001'].length)
			//console.log('36011', data.byGeoid['36011'].length)

			
			expect(+data.byGeoid['36001'].length).toBe(112176)
			expect(+data.byGeoid['36011'].length).toBe(43847)

			done();
		});
	})

	test(`building.byGeoid[{keys:geoids}].byIndex[{integers:indices}].id`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['building', 'byGeoid',
	  				['36011', '36001'],
	  				'byIndex',
	  				{ from: 0, to: 5 },
	  				'id'
					]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byGeoidByIndex')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byGeoidByIndex')	
			let data = get(response, 'jsonGraph.building', null);


			
			//console.log('36001', data.byGeoid['36001'].byIndex[0].id)
			//console.log('36011', data.byGeoid['36011'].byIndex[0].id)
			// console.log(
			// 	'test123',
			// 	Object.values(data.byGeoid['36001'].byIndex)
			// 	.map(d => d.id))

/*
			expect(
				Object.values(data.byGeoid['36001'].byIndex)
				.map(d => d.id))
				.toContain(4033935)*/

			expect(
				Object.values(data.byGeoid['36011'].byIndex)
				.map(d => d.id))
				.toContain(1383375)
			//expect(+data.byGeoid['36011'].byIndex[0].id).toBe(1383375)

			done();
		});
	})

	test(`building.byId[{keys:id}][ATTRIBUTES]`, (done) => {
		var getEvent = {
	  		'paths': [
	  			['building', 'byId',
	  				[246756, 4165651, 539393, 3 ],
						["geoid", "cousub_geoid", "replacement_value", "critical"]
					]
	  		],
	  		'method': 'get'
	  	}
	  	console.time('byIdSmall')
		falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
			console.timeEnd('byIdSmall')
			let data = get(response, 'jsonGraph.building', null);



			//console.log('246756 replacement_value', data.byId['246756'].replacement_value)
			//console.log('4165651', data.byId['4165651'].geoid)
			//console.log('539393', data.byId['539393'].cousub_geoid)
			//console.log('3 critical', data.byId['3'].critical)


			expect(data.byId[246756].replacement_value).toBe("121000");
			expect(data.byId[4165651].geoid).toBe("36005003800");
			expect(data.byId[539393].cousub_geoid).toBe("3610116738");
			expect(data.byId[3].critical).toBe("73004");

			done();
		});
	})
=======
    get = require('lodash.get');

describe('building', () => {

    const content_id = `my-special-content-id`
    const buildingOwners = [1,2,3,4,5,6,7,8,9,10,-999]
    /*
    test('building.byId', (done) => {
        const getEvent = {
            'paths': [
                ['building','byId', [1],['id', 'name', 'type', 'parcel_id']]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })
     */

    /*
    test('building.byGeoid', (done) => {
        const getEvent = {
            'paths': [
                ['building','byGeoid', [36001],'owner',[1],'length']
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })
     */

    test('building.byGeoid.owner', (done) => {
        const getEvent = {
            'paths': [
                ['building','byGeoid', [36001],'owner',buildingOwners,'sum',['count']]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done()
        });
    })



    /*
    test('actions.worksheet.byId::set', (done) => {
        const setEvent = {
            'method': 'set',
            'jsonGraph': {
                'paths': [['actions','worksheet','byId',[12], ['project_name','project_number']]],
                'jsonGraph': {
                    'actions': {
                        'worksheet':{
                            'byId': {
                                [12]: {
                                    'project_name': 'new_12',
                                    'project_number':5678
                                }
                            }
                        }

                    }
                }
            }
        }
        falcorGraph.respond({ queryStringParameters: setEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, `jsonGraph.content.byId.${ content_id }.body.value`)).toBe("New body text here!");
            done();
        });
    })
     */


    /*
    test('actions.worksheet.byIndex', (done) => {
        const getEvent = {
            'paths': [
                ['actions','worksheet','byIndex', [0],"id"]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })
     */

>>>>>>> 8c3300e5ceecb08f01c971bd6591855830c34db4

})

afterAll(() => {
<<<<<<< HEAD
	return falcorGraph.close();
=======
    return falcorGraph.close();
>>>>>>> 8c3300e5ceecb08f01c971bd6591855830c34db4
});