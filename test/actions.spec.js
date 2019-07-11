const falcorGraph = require('./graph'),
    get = require('lodash.get');

describe('actions', () => {

    const content_id = `my-special-content-id`


    test('actions.worksheet.insert', (done) => {
        const getEvent = {
            'callPath': ['actions','worksheet','insert'],
            'method': 'call',
            'args': ["new","23245","None","","hazard","problem","solution","yes","level","useful","33","544","high","3","organization","6",
            "funding","local","a1","44","e1","a2","1000","e2","a3","100","e3","10/12/2019","reporting","update"]
        }

        falcorGraph.respond({ queryStringParameters: getEvent }, (error, response) => {
            console.log('response',response)
            //expect(get(response, 'jsonGraph.actions.worksheet', null)).toBe("number");
            done();
        });
    })



    /*
    test('actions.worksheet.length', (done) => {
        const getEvent = {
            'paths': [
                ['actions','worksheet','length']
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
    test('actions.worksheet.byId', (done) => {
        const getEvent = {
            'paths': [
                ['actions','worksheet','byId', [1],"project_name"]
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