const falcorGraph = require('./graph'),
	get = require('lodash.get');

jest.setTimeout(10000)

describe('building', () => {

    const content_id = `my-special-content-id`
    const buildingOwners = [1,2,3,4,5,6,7,8,9,10,-999]


    /*
    test('building.byId', (done) => {
        const getEvent = {
            'paths': [
                ['building','byId', [2281553],["prop_class","replacement_value"]]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })

    test('building.byId', (done) => {
        const getEvent = {
            'paths': [
                ['building','byId', [2281553],["id","name","type","parcel_id"]]
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
                ['building','byGeoid', [36001],'propType',[100],'length']
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

    test('building.byGeoid.propType', (done) => {
        const getEvent = {
            'paths': [
                ['building','byGeoid', [36035],'propType',[112],'sum',['count']]
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
    test('building.byGeoid.owner', (done) => {
        const getEvent = {
            'paths': [
                ['building','byGeoid', [3603555101],'owner',buildingOwners,'sum',['count','replacement_value']]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done()
        });
    })
     */
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


})

afterAll(() => {
    return falcorGraph.close();
});