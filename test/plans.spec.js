const falcorGraph = require('./graph'),
    get = require('lodash.get');

describe('actions', () => {

    const content_id = `my-special-content-id`


    /*
    test('plans.county.insert', (done) => {
        const getEvent = {
            'callPath': ['plans','county','insert'],
            'method': 'call',
            'args': ["36","abc","12/01/2019","grant","url","status",'{Hamilton,Fulton}']
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',response)
            //expect(get(response, 'jsonGraph.actions.worksheet', null)).toBe("number");
            done();
        });
    })
     */


    /*
    test('plans.county.length', (done) => {
        const getEvent = {
            'paths': [
                ['plans','county','length']
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(typeof get(response, 'jsonGraph.capabilities.length.value', null)).toBe("number");
            done();
        });
    })
     */


    /*
    test('actions.worksheet.remove', (done) => {
        const callEvent = {
            'method': 'call',
            'callPath': ['actions','worksheet','remove'],
            'args': ['12']
        }
        falcorGraph.respond({ queryStringParameters: callEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(typeof get(response, 'jsonGraph.content.byIndex.length.value', null)).toBe("number");
            done();
        });
    })
     */

    /*
    test('plans.county.byId', (done) => {
        const getEvent = {
            'paths': [
                ['plans','county','byId', [3],"fips"]
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
    test('plans.county.byId::set', (done) => {
        const setEvent = {
            'method': 'set',
            'jsonGraph': {
                'paths': [['plans','county','byId',[3], ['plan_grant']]],
                'jsonGraph': {
                    'plans': {
                        'county':{
                            'byId': {
                                [3]: {
                                    'plan_grant': 'granted'
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

    test('plans.county.byIndex', (done) => {
        const getEvent = {
            'paths': [
                ['plans','county','byIndex', [0],"id"]
            ],
            'method': 'get'
        }
        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',JSON.stringify(response))
            //expect(get(response, 'jsonGraph.capabilities.byId.1.name.value', null)).toBe("Notify NYC");
            done();
        });
    })



})

afterAll(() => {
    return falcorGraph.close();
});